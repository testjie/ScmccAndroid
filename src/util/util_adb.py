# -*- coding: utf-8 -*-
__author__ = 'snake'

import re
from src.util.util_common import exec_cmd


def connect(device):
    """
    连接adb和设备
    :param device:
    :return:
    """
    exec_cmd("adb connect " + device)


def disconnect(device):
    """
    断开adb设备连接
    :param device:
    :return:
    """
    return exec_cmd("adb disconnect " + device)


def start_adb_server():
    """
    启动adb服务
    :return:
    """
    return exec_cmd("adb start-server")


def stop_adb_server():
    """
    停止adb服务
    :return:
    """
    return exec_cmd("adb kill-server")


def restart_adb_server():
    """
    重启adb-server
    :return:
    """
    stop_adb_server()
    start_adb_server()


def reconncet_adb(device):
    """
    重连adb设备
    :param device:
    :return:
    """
    disconnect(device)
    connect(device)


def init_adb(device):
    """
    初始化adb环境,包括重启adb 重新连接adb
    :param device:
    :return:
    """
    restart_adb_server()
    reconncet_adb(device)


def is_connect_devices(devices):
    """
    判断哪些手机是否连接
    :return:
    """
    cmd = "adb devices"
    list_dev = []
    for device in devices:
        str = "{}\tdevice".format(device["deviceName"])
        if str in exec_cmd(cmd):
            list_dev.append(device)

    return list_dev


def _adb_get_display_px(uuid=""):
    """
    通过adb获取屏幕分辨率
    :param uuid:
    :return:
    """
    if uuid == "":
        cmd = "adb shell dumpsys window displays"
    else:
        cmd = "adb -s {} shell dumpsys window displays".format(uuid)

    try:
        display_px = re.findall("cur=(.+?) app=", exec_cmd(cmd))[0]
        width = display_px.split("x")[0]
        height = display_px.split("x")[1]
    except:
        pass

    return width, height


def adb_slide_unlock(uuid="", slide_dire="UP"):
    """
    使用adb命令模拟滑动解锁，vivo需要在开发者选项中中开启USB模拟点击
    :param slide_dire: UP:上滑 / DOWN: 下滑 / RIGHT: 右滑 / LEFG: 左滑; uuid: 设备序列号
    :return:
    """
    cmds = []
    if uuid == "":
        display_power = "adb shell dumpsys power"
        screen_power = "adb shell input keyevent 26"
        slide_cmd = "adb shell input touchscreen swipe"
    else:
        display_power = "adb {} shell dumpsys power".format("-s " + uuid)
        screen_power = "adb {} shell input keyevent 26".format("-s " + uuid)
        slide_cmd = "adb {} shell input touchscreen swipe".format("-s " + uuid)

    # 判断屏幕是否亮并模拟电源键点亮屏幕
    if "Display Power: state=OFF" in exec_cmd(display_power):
        cmds.append(screen_power)

    x, y = _adb_get_display_px(uuid=uuid)

    # 模拟上下左右滑动解锁
    if slide_dire.upper() == "UP":
        if x is None or y is None:
            cmds.append(slide_cmd + " 600 1000 600 1")
        else:
            cmds.append(slide_cmd + " {} {} {} {}".format(int(x)/2, int(y)-100, int(x)/2, 100))
    if slide_dire.upper() == "DOWN":
        if x is None or y is None:
            cmds.append(slide_cmd + " 600 1 600 1000")
        else:
            cmds.append(slide_cmd + " {} {} {} {}".format(int(x)/2, 100, int(x)/2, int(y)-100))
    if slide_dire.upper() == "RIGHT":
        if x is None or y is None:
            cmds.append(slide_cmd + " 1 300 600 300")
        else:
            cmds.append(slide_cmd + " {} {} {} {}".format(100, int(y)/2, int(x)/2-100, int(y)/2))
    if slide_dire.upper() == "LEFT":
        if x is None or y is None:
            cmds.append(slide_cmd + " 600 300 1 300")
        else:
            cmds.append(slide_cmd + " {} {} {} {}".format(int(x)/2-100, int(y)/2, 100, int(y)/2))

    for cmd in cmds:
        exec_cmd(cmd)


if __name__ == "__main__":
    from src.util.util_xml import get_phone_config

    devices = get_phone_config(xml_path="../../conf/phone.xml")
    for device in is_connect_devices(devices):
        adb_slide_unlock(device["device_name"], slide_dire="right")
