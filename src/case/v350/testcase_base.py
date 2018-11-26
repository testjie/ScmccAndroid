# -*- coding: utf-8 -*-
"""
    testbase:所有测试用例的基类
    作用：
        1. 参数化设备信息
        2. 初始化driver
        3. 初始化所有用例
"""
__author__ = 'snake'


import unittest
from selenium.webdriver.support.wait import WebDriverWait

from src.util.util_logger import logger
from src.bll.v350.index import back_to_index
from src.bll.v350.login import one_key_login
from src.util.util_adb import adb_slide_unlock
from src.util.util_config import SeleniumGridConfig
from src.util.util_appium_driver import AppiumDriver


class TestCaseBase(unittest.TestCase):

    def __init__(self, methodName="runTest", param=None):
        super(TestCaseBase, self).__init__(methodName)
        self.__param = param

    # @classmethod
    # def setUpClass(cls, param):
    #     logger.info("="*100)
    #     cls.driver =
    #     logger.info("开始执行测试集->{}".format(cls.__name__))
    #     logger.info("开始获取AppiumDriver")
    #     logger.info("成功获取driver, driver信息->{}".format(cls.driver))
    #
    # @classmethod
    # def tearDownClass(cls):
    #     logger.info("开始关闭driver")
    #     cls.driver.quit()
    #     logger.info("成功关闭driver")
    #     logger.info("="*100)

    def setUp(self):
        self.driver = TestCaseBase._get_driver(self.__param)
        logger.info("*"*100)
        logger.info("开始执行用例->{}.{}".format(self.__class__, self._testMethodName))
        logger.info("开始执行返回首页")
        back_to_index(self.driver)

        if one_key_login(self.driver) is False:
            logger.info("判断掌厅登录状态失败，app启动异常!")
            raise Exception("判断掌厅登录状态失败，app启动异常!!")

    def tearDown(self):
        self.driver._switch_to.context(self.driver.contexts[0])
        logger.info("结束执行用例->{}.{}".format(self.__class__, self._testMethodName))
        self.driver.close_app()

    @staticmethod
    def parametrize(testcase_klass, param=None):
        """ Create a suite containing all tests taken from the given
            subclass, passing them the parameter 'param'.
        """
        testloader = unittest.TestLoader()
        testnames = testloader.getTestCaseNames(testcase_klass)
        suite = unittest.TestSuite()
        for name in testnames:
            suite.addTest(testcase_klass(name, param=param))
        return suite

    def find_elements(self, by="id", value="", timeout=10):
        """查找多个元素, 默认10秒超时
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
            elements = WebDriverWait(self.driver, timeout).until(lambda x: x.find_elements(by=by, value=value))
            logger.info("成功定位元素集,by->{}, value={}, 返回元素->{}".format(by, value, elements))
            return elements
        except:
            logger.war("定位元素失败,by->{}, value={}, 返回None".format(by, value))
            logger.info("当前activity->{}".format(self.driver.current_activity))

        return None

    def find_element(self, by="id", value="", timeout=10):
        """
        查找单个元素, 默认10秒超时
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
            element = WebDriverWait(self.driver, timeout).until(lambda x: x.find_element(by=by, value=value))
            logger.info("成功定位元素,by->{}, value={}, 返回元素->{}".format(by, value, element))
            return element
        except:
            logger.war("定位元素失败,by->{}, value={}, 返回None".format(by, value))
            logger.info("当前activity->{}".format(self.driver.current_activity))

        return None

    @staticmethod
    def _get_driver(device):
        """
        获取AppiumDriver
        :return:
        """
        device_name = device["deviceName"]
        app_package = device["appPackage"]
        app_activity = device["appActivity"]
        platform_name = device["platformName"]
        platform_version = device["platformVersion"]
        url = "http://{}:{}/wd/hub".format(SeleniumGridConfig.HUB_HOST, SeleniumGridConfig.HUB_PORT)

        try:
            adb_slide_unlock(uuid=device_name, slide_dire="up")
        except:
            logger.error("自定义滑动解锁失败!")

        return AppiumDriver(device_name, platform_name, platform_version, app_package, app_activity, url).get_driver()