"""
    AppiumServer：初始化AppiumServer
"""
# -*- coding: utf-8 -*-
__author__ = 'snake'

import os


class AppiumServer:
    def __init__(self, url="127.0.0.1", device=None, ap=4723, bp=4724, sp=4725):
        self.ap = ap
        self.bp = bp
        self.sp = sp
        self.url = url
        self.device = device

    def start_server(self):
        node_server_path = ".\\libs\\nodejs\\node.exe"
        appium_server_path = ".\\libs\\appium\\build\\lib\\main.js"
        chrome_driver_path = ".\\libs\\chromedriver\\chromedriver-vivox9.exe"
        command = "{} {} --address {} --port {} --bootstrap-port {} --selendroid-port {}" \
                  " -U {} --chromedriver-executable {} --no-reset --session-override " \
                  "--nodeconfig .\\conf\\{}.json".format(node_server_path, appium_server_path,
                                                         self.url, self.ap, self.bp, self.sp,
                                                         chrome_driver_path, self.device["deviceName"], self.device["band"])
        os.system(command)