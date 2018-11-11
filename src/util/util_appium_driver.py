"""
    AppiumDvier：初始化AppiumDriver
"""
# -*- coding: utf-8 -*-
__author__ = 'snake'

from appium import webdriver


class AppiumDriver:
    def __init__(self, device_name, platform_name, platform_version, app_package, app_activity, url):
        desired_caps = {}
        desired_caps['udid'] = device_name
        desired_caps['deviceName'] = device_name  # adb devices查到的设备名
        desired_caps['platformName'] = platform_name
        desired_caps['platformVersion'] = platform_version
        desired_caps['appPackage'] = app_package  # 被测App的包名
        desired_caps['appActivity'] = app_activity  # 启动时的Activity
        desired_caps['unicodeKeyboard'] = True
        desired_caps['resetKeyboard'] = True
        desired_caps['autoAcceptAlerts'] = True  # 自动设置弹窗警告，类似于权限申请
        desired_caps['recreateChromeDriverSessions'] = True

        self.driver = webdriver.Remote(url, desired_caps)

    def get_driver(self):
        return self.driver