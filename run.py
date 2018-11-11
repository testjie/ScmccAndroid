# -*- coding: utf-8 -*-
from src.case.v350.basecase import TestCaseBase

__author__ = 'snake'

import os
import time
import requests
import unittest
from multiprocessing import Pool
from multiprocessing import Process

from src.util.util_email import Mail
from src.util.util_logger import logger
from src.util.util_excel import read_excel
from src.util.util_xml import get_phone_config
from src.util.util_adb import is_connect_devices
from src.util.util_xml import get_project_config
from src.util.util_email import EmailReportTemplate
from src.util.util_appium_server import AppiumServer


REPORTS_PATH = "./reports/"                                                             # 测试报告路径
START_TEST_TIME = time.strftime('%Y-%m-%d-%H-%M')                                       # 测试开始时间

def run(run_verion):
    """
    :param run_verion:版本信息，格式见project.xml
    :return:
    """
    conn_devices = is_connect_devices(get_phone_config())                                # 已连接的设备
    current_app_ver = run_verion.get("version").replace(".", "").lower()                 # 当前执行版本

    # 启动SeleniumGridServer
    _start_selenium_grid_server()
    logger.info("等待5S秒启动SeleniumServer")
    time.sleep(5)

    # 启动AppiumServer
    _start_appium_servers(conn_devices)
    logger.info("等待20S启动AppiumServer")
    time.sleep(20)

    # 注册AppiumServer到SeleniumGrid并且并行执行多个设备的Case
    pool = Pool(len(conn_devices))
    pool.map(_run_case, conn_devices)
    pool.close()
    pool.join()

    # 关闭AppiumServer
    _stop_appium_server()


def _run_case(devices):
    """
    多设备并发异步运行CASE
    :param devices:
    :return:
    """
    logger.info("开始执行测试用例")
    test_suites = _get_test_suites(devices=devices)
    runner = unittest.TextTestRunner()
    result = runner.run(test_suites)

    # success, errors, failures = _generate_results(runner, result, version)        # 获取结果
    # success, errors, failures = _remove_retry_pass_results(success, errors, failures)  # 错误结果去重
    # _push_results(success, errors, failures, start_testing_time, version)         # 发送测试反馈


def _get_test_suites(version="v350", kw="test_", devices=None):
    """
    获取测试组件
    :param version:
    :param kw:
    :return:
    """
    test_suite = []
    test_suits = unittest.TestSuite()
    for dir in os.listdir(".\\src\\case\\{}\\".format(version)):
        if kw in dir:
            module = dir.split(".")[0]
            exec("from src.case.{} import {}".format(version, module))
            kcls = list(eval(module).__dict__)[-1]
            exec("from src.case.{}.{} import {}".format(version, module, kcls))
            test_suite.append(TestCaseBase.parametrize(eval(kcls), param=devices))

    test_suits.addTests(test_suite)
    return test_suits


def _start_selenium_grid_server(selenium_grid_path=".\\libs\\seleniumgrid\\selenium-server-standalone-3.141.0.jar"):
    command = "java -jar {} -role hub".format(selenium_grid_path)
    Process(target=os.system(command)).start()


def _appium_server_status(devices):
    """
    判断每个AppiumServer是否正常启动
    :param devices:
    :return:
    """
    status = False
    appium_port = 4720
    for _ in devices:
        appium_port = appium_port + 3
        status = status + _is_appium_server_running(appium_port)

    if status == 0:
        return False
    else:
        return True


def _is_appium_server_running(ap=4723, to=30):
    """
    判断单个AppiumServer是否运行
    :param ap:
    :param timeout:
    :return:
    """
    timeout = 1
    while True:
        try:
            if timeout > to:
                return False
            url = "http://localhost:{}/wd/hub/status".format(ap)
            res = requests.get(url, timeout=timeout)
            res_json = res.json()
            return res_json["status"] == 0
        except:
            time.sleep(1)
            timeout = timeout + 1


def _remove_retry_pass_results(success, errors, failures):
    """
    错误结果去重
    :param success:
    :param errors:
    :param failures:
    :return:
    """
    logger.info("开始错误结果去重")
    if len(errors) == 0 and len(failures) == 0:
        logger.info("没有发现失败和错误的case!")
        return success, errors, failures

    # 如果重新retry后的case在success中存在，那么则认为case通过
    for e in errors:
        for s in success:
            if e[2] == s[2]:
                errors.remove(e)

    # 如果重新retry后的case在success中存在，那么则认为case通过
    for f in failures:
        for s in success:
            if f[2] == s[2]:
                failures.remove(f)

    # 失败结果去重
    for f in failures:
        if f[2]._testMethodDoc is not None and "retry" in f[2]._testMethodDoc:
            failures.remove(f)

    # 错误结果去重
    for e in errors:
        if e[2]._testMethodDoc is not None and "retry" in e[2]._testMethodDoc:
            errors.remove(e)

    return success, errors, failures


def _start_appium_servers(devices, ap=4720, bp=4721, sp=4722):
    """
    线程
    :param devices:
    :param ap:  appium-port
    :param bp:  bootstrap-port
    :param sp:  selendroid-port
    :return:
    """
    for dev in devices:
        ap, bp, sp = ap + 3, bp + 3, sp + 3
        server = AppiumServer(device=dev, ap=ap, bp=bp, sp=sp)
        Process(target=server.start_server).start()


def _stop_appium_server():
    """
    关闭AppiumServer
    :return:
    """
    logger.info("关闭AppiumServer")
    os.system("taskkill /f /im node.exe")


def _generate_results(runner, result, version):
    """
    生成测试测试报告的邮件结果
    :param runner:
    :param result:
    :return:
    """
    logger.info("测试用例执行完成,开始收集测试结果")

    s_id, f_id, e_id = 1, 1, 1
    success, errors, failures = [], [], []
    sorted_result = runner.sortResult(result.result)
    cases = read_excel("./doc/掌厅自动化测试用例v1.1.xlsx", version)
    for cid, (cls, cls_results) in enumerate(sorted_result):
        for tid, (n, t, o, e) in enumerate(cls_results):
            module = _get_case_module(cases, t._testMethodName)
            if n == 0:  # success
                res = (s_id, module, t, "成功")
                success.append(res)
                s_id += 1
            if n == 1:  # fail
                res = (f_id, module, t, "失败")
                failures.append(res)
                f_id += 1
            if n == 2:  # error
                res = (e_id, module, t, "错误")
                errors.append(res)
                e_id += 1

    return success, errors, failures


def _push_results(success, errors, failures, start_testing_time, version):
    """
    反馈测试报告
    :param success:
    :param errors:
    :param failures:
    :return:
    """
    logger.info("测试结果收集完成，开始发送测试报告")

    # errors反馈给测试
    receiver = ["zhaoyingjie@xwtec.cn", "zhanghaichuan@xwtec.cn"]  # 收件人
    if errors:
        logger.info("发现错误的case:{}".format(errors))
        logger.info("发送错误的case的测试报告邮件，请相及时修改bug")

        # 邮件帐号密码/接受方密码
        report_title = "【错误反馈】 掌厅{}".format(start_testing_time)
        report_desc = EmailReportTemplate().set_content(errors)

        # 发送测试结果
        try:
            _send_mail(receiver, report_title, report_desc)
        except Exception as e:
            logger.error("{}".format(e))

    # failures反馈给所有人
    if failures:
        logger.info("发现执行失败case: --> {}".format(failures))
        logger.info("发送执行失败case的测试报告邮件")

        # 邮件帐号密码/接受方密码
        #  todo 这里需要添加收件人信息
        receiver.append("656882274@qq.com")
        receiver.append("jiangweijun@xwtec.cn")
        receiver.append("tangqiangsheng@xwtec.cn")
        report_title = "【异常告警】四川移动掌厅自动化测试反馈{}-{}".format(version, start_testing_time)
        report_desc = EmailReportTemplate().set_content(failures)
        # 发送测试结果
        try:
            _send_mail(receiver, report_title, report_desc)
        except Exception as e:
            logger.error("{}".format(e))


def _send_mail(receiver, report_title, report_desc):
    """
    发送邮件
    :param receiver:        收件人
    :param report_title:    标题
    :param report_desc:     内容
    :return:
    """
    try:
        mail = Mail("656882274@qq.com", "qsumwxnxynttbbhj", "smtp.qq.com")
        mail.send_mail(receiver, report_title, report_desc)
    except Exception as e:
        logger.error("{}".format(e))


def _get_case_module(cases, case):
    """
    获取case名字
    :param case:
    :return:
    """
    try:
        for cass in cases:
            if cass[4].strip().lower() == case.strip().lower():
                return cass[2].strip() + "-" + cass[1].strip()
    except Exception as e:
        logger.info(e)

    return ""


if __name__ == "__main__":
    """执行当前配置版本的App
    """
    for current_run_verion in get_project_config():
        run(current_run_verion)

    # print(_get_test_suites(version="v350", kw="test_"))

"""
启动服务端
java -jar C://Users//SNake//Desktop//selenium-server-standalone-3.141.0.jar -role hub

注册节点
cd /d C:\\Users\\SNake\\PycharmProjects\\ScmccAndroid

.\\libs\\nodejs\\node.exe .\\libs\\appium\\build\\lib\\main.js -p 4724 -bp 4734 -U 1f09cafe --nodeconfig .\\conf\\vivor9s.json

.\\libs\\nodejs\\node.exe .\\libs\\appium\\build\\lib\\main.js -p 4723 -bp 4733 -U 1d32d8a27d14 --nodeconfig .\\conf\\redmi4x.json
"""