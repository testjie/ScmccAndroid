# -*- coding: utf-8 -*-
"""
    生成NodeConfig配置文件模板
"""

__author__ = 'snake'


class SeleniumGridConfig:
    """
        SeleniumGridServer配置文件
    """
    HUB_HOST = "127.0.0.1"
    HUB_PORT = "4444"


class NodeConfigTemplate:
    def __init__(self, uuid=None, platform_version=None, appium_host="127.0.0.1",
                 appium_port=None, hub_host=SeleniumGridConfig.HUB_HOST, hub_port=SeleniumGridConfig.HUB_PORT):
        """
        :param uuid:        手机UUID
        :param platform:    平台版本
        :param appium_host: AppiumServer主机地址
        :param appium_port: AppiumServer主机端口
        :param hub_host:    SeleniumGrid主机地址
        :param hub_port:    SeleniumGrid主机端口
        """
        self.__template = """
                        {
                          "capabilities":
                              [
                               {
                              "deviceName": "%s",
                              "version": "%s",
                              "maxInstances": 3,
                              "platform": "ANDROID",
                              "browserName": "chrome"
                                }
                              ],
                          "configuration":
                          {
                            "cleanUpCycle":2000,
                            "timeout":30000,
                            "proxy":"org.openqa.grid.selenium.proxy.DefaultRemoteProxy",
                            "url":"http://%s:%s/wd/hub",
                            "host":"%s",
                            "port":%s,
                            "maxSession":10,
                            "register":true,
                            "registerCycle":1000,
                            "hubPort":%s,
                            "hubHost":"%s"
                          }
                        }
                    """ % (uuid, platform_version, appium_host,
                           str(appium_port), str(appium_host), str(appium_port), str(hub_port), hub_host)

    def get_template(self):
        """
        获取配置模板
        :return:
        """
        return self.__template


if __name__ == "__main__":
    print(NodeConfigTemplate(uuid="3fdd3d97", platform_version="7.0", appium_port=4723).get_template())