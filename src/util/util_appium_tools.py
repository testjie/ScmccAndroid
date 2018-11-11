# -*- coding: utf-8 -*-
"""
appium相关方法封装
"""
__author__ = 'snake'

from src.util.util_logger import logger
from selenium.webdriver.support.select import Select
from selenium.webdriver.support.wait import WebDriverWait


def find_elements(driver, by="id", value="", timeout=10):
    """
    在运行次数内等待并获取结果, 默认10秒超时
    :param driver:
    :param by:
        ID = "id"
        XPATH = "xpath"
        LINK_TEXT = "link text"
        PARTIAL_LINK_TEXT = "partial link text"
        NAME = "name"
        TAG_NAME = "tag name"
        CLASS_NAME = "class name"
        CSS_SELECTOR = "css selector"
    :param value:
    :param timeout:
    :return:
    """
    try:
        logger.info("开始执行find_elements方法")
        elements = WebDriverWait(driver, timeout).until(lambda x: x.find_elements(by=by, value=value))
        logger.info("成功定位元素集,by->{}, value={}, 返回元素->{}".format(by, value, elements))
        return elements
    except:
        logger.war("定位元素失败,by->{}, value={}, 返回None".format(by, value))
        logger.info("当前activity->{}".format(driver.current_activity))

    return None


def find_element(driver, by="id", value="", timeout=10):
    """
    在运行次数内等待并获取结果, 默认10秒超时
    :param driver:
    :param by:
        ID = "id"
        XPATH = "xpath"
        LINK_TEXT = "link text"
        PARTIAL_LINK_TEXT = "partial link text"
        NAME = "name"
        TAG_NAME = "tag name"
        CLASS_NAME = "class name"
        CSS_SELECTOR = "css selector"
    :param value:
    :param timeout:
    :return:
    """
    logger.info("开始执行find_element方法")
    try:
        element = WebDriverWait(driver, timeout).until(lambda x: x.find_element(by=by, value=value))
        logger.info("成功定位元素,by->{}, value={}, 返回元素->{}".format(by, value, element))
        return element
    except:
        logger.war("定位元素失败,by->{}, value={}, 返回None".format(by, value))
        logger.info("当前activity->{}".format(driver.current_activity))

    return None


def switch_to_alert(driver):
    """
    切换到弹窗
    :param driver:
    :return:
    """
    driver.switch_to_alert()


def switch_to_default_content(driver):
    """
    切换到默认窗口,常用语从弹窗切换回页面
    :param self:
    :return:
    """
    driver.switch_to_default_content()


def is_displayed(element):
    """
    检查元素是否显示
    :param element:
    :return:
    """
    try:
        element.is_displayed()
        return True
    except:
        return False


def input_set(driver, element_property, property_value, values):
    """
    通过js设置input输入框的值

    :param driver: 初始化driver对象
    :param element_property: 元素属性（id/name/classname/xpath）
    :param property_value: 元素属性对应的值（id=”login“，name=”username“）
    :param values:  需要设置的值
    :return:
    """
    js = "$('input[%s=%s]').attr('value','%s');" % (element_property, property_value, values)
    driver.execute_script(js)


def select_set(self, locator, values):
    """
    设置select的值，常用语地区设置
    :param locator:
    :param values:
    :return:
    """
    Select(locator).select_by_visible_text(values)


def get_screen_shot(driver, path):
    """
    截图
    :return:
    """
    driver.get_screenshot_as_file(path)
