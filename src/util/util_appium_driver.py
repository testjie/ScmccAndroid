"""
    AppiumDvier：初始化AppiumDriver
"""
# -*- coding: utf-8 -*-
__author__ = 'snake'

from functools import wraps
from appium import webdriver


def _singleton(cls):
    instances = {}

    @wraps(cls)
    def get_instance(*args, **kw):
        if cls not in instances:
            instances[cls] = cls(*args, **kw)
        return instances[cls]

    return get_instance


@_singleton
class AppiumDriver:
    def __init__(self, device_name, platform_name, platform_version, app_package, app_activity, url):
        __desired_caps = {}
        __desired_caps['udid'] = device_name
        __desired_caps['deviceName'] = device_name  # adb devices查到的设备名
        __desired_caps['platformName'] = platform_name
        __desired_caps['platformVersion'] = platform_version
        __desired_caps['appPackage'] = app_package  # 被测App的包名
        __desired_caps['appActivity'] = app_activity  # 启动时的Activity
        __desired_caps['unicodeKeyboard'] = True
        __desired_caps['resetKeyboard'] = True
        __desired_caps['autoAcceptAlerts'] = True  # 自动设置弹窗警告，类似于权限申请
        __desired_caps['recreateChromeDriverSessions'] = True

        self.__driver = webdriver.Remote(url, __desired_caps)

    def get_driver(self):
        return self.__driver