# -*- coding: utf-8 -*-
__author__ = 'snake'

from src.util.util_logger import logger
from src.bll.v350.index import close_index_alerts
from src.util.util_appium_tools import find_element


def is_need_login(driver):
    """
    判断是否需要登录
    :param driver:
    :return:
    """
    logger.info("开始执行is_need_login方法")
    logger.info("尝试使用我的页面手机号进行登录判断")

    try:
        my_btn = "//android.widget.TextView[@text='我的']"
        menu_layout = "com.sunrise.scmbhc:id/menubottomlayout"
        menu_layout_obj = find_element(driver, "id", menu_layout)
        find_element(menu_layout_obj, "xpath", my_btn).click()

        login_but = find_element(driver, "id", "com.sunrise.scmbhc:id/id_my_mobile_login_btn", timeout=1)
        user_num_obj = find_element(driver, "id", "com.sunrise.scmbhc:id/id_my_mobile_number", timeout=1)
        if login_but is None and user_num_obj is not None:
            logger.info("手机号元素文本为->{}, app已登录, 返回False".format(user_num_obj.text))
            find_element(driver, "xpath", "//android.widget.TextView[@text='首页']").click()
            return False
    except Exception as e:
        logger.error(e)
        logger.war("判断登录失败，返回None")
        find_element(driver, "xpath", "//android.widget.TextView[@text='首页']").click()
        return None

    logger.info("成功定位首页手机号元素,app未登录, 返回True")
    return True


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
        login = is_need_login(driver)
        if login is None:
            logger.war("app检查登录失败!")
            return False

        if login is False:
            logger.info("app已经登录,返回True")
            return True

        find_element(driver, "xpath", "//android.widget.TextView[@text='我的']", timeout=1).click()
        find_element(driver=driver, by="id", value="com.sunrise.scmbhc:id/id_my_mobile_login_btn").click()
        find_element(driver=driver, by="id", value="com.sunrise.scmbhc:id/login_onekey_btn").click()

        login = is_need_login(driver)
        if login is None:
            logger.war("app检查登录失败")
            return False

        if login is False:
            logger.info("app已经登录,返回True")
            return True

    except Exception as e:
        logger.error("错误信息{}, 返回False".format(e))

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
