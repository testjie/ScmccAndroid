# -*- coding: utf-8 -*-
__author__ = 'snake'

import smtplib
from src.util.util_logger import logger
from email.mime.text import MIMEText


class Mail:
    def __init__(self, user, pwd, host):
        self.mail_user = user
        self.mail_pwd = pwd
        self.mail_server = smtplib.SMTP_SSL()
        self.mail_server.connect(host)
        self.mail_server.ehlo()
        self.mail_server.login(self.mail_user, self.mail_pwd)

    def __del__(self):
        self.mail_server.close()

    # 发送邮件
    def send_mail(self, recipient, subject, text):
        msg = MIMEText(text, 'html', 'utf-8')
        msg["From"] = self.mail_user
        msg["Subject"] = subject
        msg["To"] = ",".join(recipient)
        self.mail_server.sendmail(self.mail_user, recipient, msg.as_string())
        logger.info("邮件发送成功")


class EmailReportTemplate:
    def __init__(self):
        self.html = """<html>
                    <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <style type="text/css">
                    body,table{
                        font-size:12px;
                    }
                    table{
                        table-layout:fixed;
                        empty-cells:show; 
                        border-collapse: collapse;
                        margin:0 auto;
                    }
                    td{
                        height:20px;
                    }
                    h1,h2,h3{
                        font-size:12px;
                        margin:0;
                        padding:0;
                    }
                    .title { background: #FFF; border: 1px solid #9DB3C5; padding: 1px; width:90%;margin:20px auto; }
                        .title h1 { line-height: 31px; text-align:center;  background: #2F589C url(th_bg2.gif); background-repeat: repeat-x; background-position: 0 0; color: #FFF; }
                            .title th, .title td { border: 1px solid #CAD9EA; padding: 5px; }
    
                    table.t1{
                        border:1px solid #cad9ea;
                        color:#666;
                    }
                    table.t1 th {
                        background-image: url(th_bg1.gif);
                        background-repeat::repeat-x;
                        height:30px;
                    }
                    table.t1 td,table.t1 th{
                        border:1px solid #cad9ea;
                        padding:0 1em 0;
                    }
                    table.t1 tr.a1{
                        background-color:#f5fafe;
                    }
                    </style>
                    </head>
                    <body>
                    <div class="title">
                        <h1>掌厅自动化测试异常反馈-beta</h1>
                    </div>
                    <table width="90%" id="mytab"  border="1" class="t1">
                      <thead>
                        <th width="5%">ID</th>
                        <th width="45%">业务来源</th>
						<th width="40%">业务方法</th>
						<th width="10%">类型</th>
                      </thead>"""

        self.html_ft = """                    
                        </table>
                        </body>
                        </html>
                        """

    def set_content(self, ctts=[]):
        """
        设置邮件内容
        :param ctts:[(id, module, method, type),()]
        :return:
        """
        if len(ctts) == 0 or not isinstance(ctts, list):
            raise Exception("数据格式不正确，数据格式为：[(id, module, method, type),()]")

        details = ""
        for ctt in ctts:
            cts = """\n\t\t\t\t\t\t<tr class="a1">\n"""
            for c in ctt:
                cts += """\t\t\t\t\t\t\t<td style="word-wrap:break-word;word-break:break-all;">{}</td>\n""".format(c)
            cts += """\t\t\t\t\t\t</tr>\n"""
            details += cts

        return self.html + details + self.html_ft


if __name__ == "__main__":
    ctt = EmailReportTemplate().set_content([("1",
                                              "333sdfasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd  sdfsddd            ddddddddddddddddddddddddddddd\n dddddddddddddd",
                                              "ccc", "3333333", "3333")])
    print(ctt)
