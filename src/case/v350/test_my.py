# -*- coding: utf-8  -*-
"""
    首页-我的
"""
__author__ = 'snake'

import unittest
from src.util.util_logger import logger
from src.case.v350.testcase_base import TestCaseBase


class TestCaseMy(TestCaseBase):
    def test_dqye(self):
        """
        检查当前余额，规则：为空/0/没有单位
        :return:
        """
        self._click_my_button()

        # 获取余额和消费
        balance = self.find_element("id", "com.sunrise.scmbhc:id/id_mobile_balance_txt").text
        consume = self.find_element("id", "com.sunrise.scmbhc:id/id_mobile_consume_txt").text

        if "加载中" in balance or "加载中" in consume:
            logger.info("话费或余额显示加载中,重新定位元素")
            balance = self.find_element("id", "com.sunrise.scmbhc:id/id_mobile_balance_txt").text
            consume = self.find_element("id", "com.sunrise.scmbhc:id/id_mobile_consume_txt").text

        # 判断为空
        if balance is None or balance == "" or balance == 0:
            self.assertEquals(1, 2, "话费余额为空,请检查我的-当前余额")

        # 去掉余额单位
        try:
            blc = float(balance.replace("元", ""))
            consume = float(consume.replace("元", ""))
            logger.info("当前余额金额->{}".format(balance))
        except:
            logger.war("当前余额转换异常,金额->{}".format(balance))
            self.assertEquals(1, 2, "当前余额异常,金额->{}".format(balance))

        # 判断话费余额类型，防止出现"--"的问题
        if not isinstance(blc, float):
            self.assertEquals(1, 2, "当前余额格式异常,余额->{}".format(balance))

        # 余额为0
        if blc == 0 and consume == 0:
            self.assertEquals(1, 2, "当前余额格式异常,余额->{}".format(balance))

    def test_dyxf(self):
        """
        检查当前消费，规则：为空/0/没有单位
        :return:
        """
        self._click_my_button()
        # 获取余额和消费
        balance = self.find_element("id", "com.sunrise.scmbhc:id/id_mobile_balance_txt").text
        consume = self.find_element("id", "com.sunrise.scmbhc:id/id_mobile_consume_txt").text

        if "加载中" in balance or "加载中" in consume:
            logger.info("话费或余额显示加载中,重新定位元素")
            balance = self.find_element("id", "com.sunrise.scmbhc:id/id_mobile_balance_txt").text
            consume = self.find_element("id", "com.sunrise.scmbhc:id/id_mobile_consume_txt").text

        # 判断为空
        if consume is None or consume == "" or consume == 0:
            self.assertEquals(1, 2, "当月消费余额为空,请检查我的-当月消费")

        # 去掉余额单位
        try:
            cse = float(consume.replace("元", ""))
            balance = float(balance.replace("元", ""))
            logger.info("当前消费金额->{}".format(consume))
        except:
            logger.war("当前消费金额转换异常,金额->{}".format(consume))
            self.assertEquals(1, 2, "当前消费金额异常,金额->{}".format(consume))

        # 判断话费余额类型，防止出现"--"的问题
        if not isinstance(cse, float):
            self.assertEquals(1, 2, "当前消费金额格式异常,余额->{}".format(consume))

        # 余额和话费同时为0
        if balance == 0 and cse == 0:
            self.assertTrue(False, "当前消费金额异常,余额为->{}".format(consume))

    @unittest.skip("")
    def test_syll(self):
        """
         检查当前剩余流量，规则：为空/0/没有单位
         :return:
         """
        self._click_my_button()
        flow = self.find_element( "id", "com.sunrise.scmbhc:id/id_mobile_flow_txt").text

        if "加载中" in flow:
            logger.info("流量显示加载中,重新定位元素")
            flow = self.find_element("id", "com.sunrise.scmbhc:id/id_mobile_flow_txt").text

        # 判断为空
        if flow is None or flow == "" or flow == 0:
            self.assertEquals(1, 2, "剩余流量为空,请检查我的-剩余流量")

        # 去掉余额单位
        try:
            if "GB" in flow:
                cse = float(flow.replace("GB", ""))
            elif "MB" in flow:
                cse = float(flow.replace("MB", ""))
            else:
                self.assertEquals(1, 2, "剩余流量异常,流量->{}".format(flow))
            logger.info("剩余流量->{}".format(flow))
        except:
            logger.war("剩余流量转换异常,流量->{}".format(flow))
            self.assertEquals(1, 2, "剩余流量异常,流量->{}".format(flow))

        # 判断话费余额类型，防止出现"--"的问题
        if not isinstance(cse, float):
            self.assertEquals(1, 2, "剩余流量格式异常,流量->{}".format(flow))

        # 余额为0
        if cse == 0.0 or cse == 0:
            self.assertEquals(1, 2, "当前消费金额异常,余量->{}".format(flow))

    @unittest.skip("")
    def test_syyy(self):
        """
        检查剩余语音，规则：为空/0/没有单位
        :return:
        """
        self._click_my_button()
        flow = self.find_element("id", "com.sunrise.scmbhc:id/id_mobile_flow_txt").text
        voice = self.find_element("id", "com.sunrise.scmbhc:id/id_mobile_volte_txt").text

        if "加载中" in voice or "加载中" in flow:
            logger.info("语音或流量显示加载中,重新定位元素")
            voice = self.find_element("id", "com.sunrise.scmbhc:id/id_mobile_volte_txt").text
            flow = self.find_element("id", "com.sunrise.scmbhc:id/id_mobile_flow_txt").text

        # 判断为空
        if voice is None or voice == "" or voice == 0:
            if flow is None or flow == "" or flow == 0:
                self.assertEquals(1, 2, "剩余语音余量为空,请检查我的-剩余语音")

        # 去掉余额单位
        try:
            cse = int(voice.replace("分钟", ""))
            logger.info("剩余语音->{}".format(voice))

            try:
                if "GB" in flow:
                    flows = float(flow.replace("GB", ""))
                elif "MB" in flow:
                    flows = float(flow.replace("MB", ""))
            except:
                pass
        except:
            logger.war("剩余语音转换异常,金额->{}".format(voice))
            self.assertEquals(1, 2, "剩余语音异常,余量->{}".format(voice))

        # 判断语音余额类型，防止出现"--"的问题
        if not isinstance(cse, int):
            self.assertEquals(1, 2, "剩余语音格式异常,余量->{}".format(voice))

        # 余额为0
        if cse == 0.0 or cse == 0:
            if flows is None or flows == 0.0 or flows == 0:
                self.assertEquals(1, 2, "剩余语音异常,余量为->{}".format(voice))

    @unittest.skip("测试号积分为0")
    def test_kyjf(self):
        """
         检查我的-积分，规则：为空/0/没有单位
         :return:
         """
        sore = self.find_element("id", "com.sunrise.scmbhc:id/id_my_mobile_sore")
        self.assertNotEqual(sore, None, "判断可用积分是否存在")
        sore = sore.text

        # 判断为空
        if sore is None or sore == "" or sore == 0:
            self.assertEquals(1, 2, "可用积分余量为空,请检查我的-可用积分")

        if int(sore) < 0:
            self.assertEquals(1, 2, "可用积分余量小于0,请检查我的-可用积分")

        # 判断可用积分类型，防止出现"--"的问题
        if not isinstance(sore, int):
            self.assertEquals(1, 2, "可用积分格式异常,余量->{}".format(sore))

    @unittest.skip("")
    def test_user_num(self):
        """
        检查我的-手机号 规则：不为空
        :return:
        """
        self._click_my_button()
        # 获取手机号
        user_my_num = self.find_element("id", "com.sunrise.scmbhc:id/id_my_mobile_number")
        self.assertNotEqual(user_my_num, None, "判断用户手机号存在")

        # 判断手机号不为空
        if user_my_num.text is None or user_my_num.text == "":
            self.assertEquals(1, 2, "我的-手机号为空,请及时检查")

    @unittest.skip("测试星级跳过")
    def test_user_star(self):
        """
        检查我的-星级 规则：不为空，星级范围在 准星用户/一星用户/二星用户/三星用户/四星用户/五星用户/无星级
        :return:
        """
        # 星级对象的父对象
        f_star = "//android.widget.LinearLayout[@resource-id='com.sunrise.scmbhc:id/right_relative']" \
                 "/android.widget.LinearLayout[1]/android.widget.LinearLayout[1]"
        f_start_obj = self.find_element("xpath", f_star)
        self.assertNotEqual(f_start_obj, None, "判断星级父元素存在")

        # 信用星级对象
        user_star = f_start_obj.find_elements_by_class_name("android.widget.TextView")[1].text

        # 不为空
        if user_star is None or user_star == "":
            self.assertEquals(1, 2, "我的-信用星级为空")

        # 在等级范围内
        if user_star not in ["准星用户", "一星用户", "二星用户", "三星用户", "四星用户", "五星用户", "无星级"]:
            msg = "我的-信用星级异常,信用星级-{}".format(user_star)
            self.assertEquals(1, 2, msg)

    @unittest.skip("")
    def test_tclx(self):
        """
        检查我的-套餐类型 规则：不为空
        :return:
        """
        self._click_my_button()
        # 获取套餐类型
        meal = self.find_element("id", "com.sunrise.scmbhc:id/id_my_mobile_meal")
        self.assertNotEqual(meal, None, "判断我的按钮存在")
        meal = meal.text

        if meal is None or meal == "":
            msg = "我的-套餐类型异常,套餐类型-{}".format(meal)
            self.assertEquals(1, 2, msg)

    def _click_my_button(self):
        """
        点击我的按钮
        :return:
        """
        # 点击我的
        my_btn = "//android.widget.TextView[@text='我的']"
        menu_layout = "com.sunrise.scmbhc:id/menubottomlayout"
        menu_layout_obj = self.find_element("id", menu_layout)
        menu_layout_obj.find_element("xpath", my_btn).click()
