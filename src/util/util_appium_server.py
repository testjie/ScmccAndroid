# -*- coding: utf-8 -*-
"""
    AppiumServer：初始化AppiumServer
"""
__author__ = 'snake'

import os


class AppiumServer:
    def __init__(self, url="127.0.0.1", device=None):
        self.__url = url
        self.__device = device

    def start_server(self):
        node_server_path = ".\\libs\\nodejs\\node.exe"
        appium_server_path = ".\\libs\\appium\\build\\lib\\main.js"
        chrome_driver_path = ".\\libs\\chromedriver\\chromedriver-vivox9.exe"
        command = "{} {} --address {}".format(node_server_path, appium_server_path, self.__url)
        command += " --port {} --bootstrap-port {} --selendroid-port {}".format(self.__device["ap"], self.__device["bp"], self.__device["sp"])
        command += " -U {} --chromedriver-executable {} --no-reset --session-override --nodeconfig .\\conf\\{}.json".format(chrome_driver_path, self.__device["deviceName"], self.__device["band"])

        os.system(command)