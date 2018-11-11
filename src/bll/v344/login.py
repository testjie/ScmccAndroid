# -*- coding: utf-8 -*-
"""
登录相关业务集成代码
"""
__author__ = 'snake'

from src.util.util_logger import logger
from src.bll.v344.index import close_index_alerts
from src.util.util_appium_tools import find_element


def is_need_login(driver):
    """
    判断是否需要登录,10S超时
    :param driver:
    :return: ture: 需要 / false: 不需要
    """

    logger.info("开始执行is_need_login方法")
    logger.info("开始定位首页手机号元素,方式->by_id, 值->com.sunrise.scmbhc:id/head_num_tv")
    user_num = find_element(driver=driver, by="id", value="com.sunrise.scmbhc:id/head_num_tv")
    if user_num is None:
        logger.info("定位手机号元素失败,无法判断是否需要登录! 返回None")
        return None

    if user_num.text != "点击登录":
        logger.info("手机号元素文本为->{}, 返回False".format(user_num.text))
        return False

    logger.info("成功定位首页手机号元素,方法退出, 返回True")
    return True


def is_need_login_beta(driver):
    logger.info("开始执行is_need_login_beta方法")
    # logger.info("调用back_to_index方法返回到首页")
    # back_to_index(driver)
    try:
        logger.info("尝试使用首页手机号进行登录判断")
        user_num_obj = find_element(driver, "id", "com.sunrise.scmbhc:id/head_num_tv", timeout=1)
        assert user_num_obj is not None
        if user_num_obj.text != "点击登录":
            logger.info("手机号元素文本为->{}, app已登录, 返回False".format(user_num_obj.text))
            return False

        logger.info("成功定位首页手机号元素,app未登录, 返回True")
        return True
    except:
        logger.info("手机号定位失败,尝试使用我的-登录按钮进行登录判断")
        find_element(driver, "xpath", "//android.widget.TextView[@text='我的']").click()
        login_btn = find_element(driver, "id", "com.sunrise.scmbhc:id/id_my_mobile_login_btn", timeout=1)
        find_element(driver, "xpath", "//android.widget.TextView[@text='首页']").click()
        if login_btn is not None:
            logger.info("找到我的-登录按钮，app需要登录，返回True")
            return True
        else:
            logger.info("未找到我的-登录按钮，app需要不登录，返回False")
            return False


def one_key_login(driver):
    """
    本机号码一键登录，支持3.4.4以上的版本
    :param driver:
    :return:
    """
    logger.info("开始执行one_key_login方法")

    try:
        # 检查首页弹窗
        if close_index_alerts(driver) is False:
            logger.war("首页弹窗关闭失败,返回False")
            return False

        # 判断是否需要登录
        # login = is_need_login(driver)
        login = is_need_login_beta(driver)
        if login is None:
            logger.war("app检查登录失败!")
            return False

        if login is False:
            logger.info("app已经登录,返回True")
            return True

        find_element(driver=driver, by="id", value="com.sunrise.scmbhc:id/head_num_tv").click()
        find_element(driver=driver, by="id", value="com.sunrise.scmbhc:id/login_onekey_btn").click()

        # login = is_need_login(driver)
        login = is_need_login_beta(driver)
        if login is None:
            logger.war("app检查登录失败")
            return False

        if login is False:
            logger.info("app已经登录,返回True")
            return True

    except Exception as e:
        logger.error("错误信息{}, 返回False".format(e))

    return False


def user_phone_login(driver, userphone="15008420334", msg="150000"):
    """
    手机号和密码登录
    :param driver:
    :param userphone:
    :param msg:
    :return:
    """
    logger.info("开始执行user_phone_login方法")

    try:
        # 检查首页弹窗
        if close_index_alerts(driver) is False:
            logger.error("首页弹窗关闭失败,返回False")
            return False

        # 判断是否需要登录
        # login = is_need_login(driver)
        login = is_need_login_beta(driver)
        if login is None:
            logger.war("app检查登录失败")
            return False

        if login is False:
            logger.info("app已经登录,返回True")
            return True

        find_element(driver=driver, by="id", value="com.sunrise.scmbhc:id/head_num_tv").click()
        find_element(driver=driver, by="id", value="com.sunrise.scmbhc:id/user_et").send_keys(userphone)
        find_element(driver=driver, by="id", value="com.sunrise.scmbhc:id/afresh_pwd").click()
        find_element(driver=driver, by="id", value="com.sunrise.scmbhc:id/pwd_et").send_keys(msg)

        # login = is_need_login(driver)
        login = is_need_login_beta(driver)
        if login is None:
            logger.war("app检查登录失败")
            return False

        if login is False:
            logger.info("app已经登录,返回True")
            return True

    except Exception as e:
        logger.error("登录失败,错误信息{}, 返回False".format(e))

    return False


def logout(driver):
    """
    退出账号
    :param driver:
    :return:
    """
    # 检查首页弹窗
    if close_index_alerts(driver) is False:
        logger.error("首页弹窗关闭失败,返回False")
        return False

    if is_need_login(driver) is True:
        logger.info("app已经登录,返回True")
        return True

    try:
        find_element(driver=driver, by="id", value="com.sunrise.scmbhc:id/head_view").click()
        find_element(driver=driver, by="id", value="com.sunrise.scmbhc:id/confirmButton").click()
        driver.back()
        return True

    except Exception as e:
        logger.error("退出账号失败,错误信息->{}, 返回False".format(e))
        return False
