# -*- coding:utf-8 -*-
__author__ = 'snake'

import xlrd


def read_excel(excel_path, sheet_name):
    """
    获取excel所有行
    :param excel_path:
    :param sheet_name:
    :return:
    """
    result = []
    try:
        data = xlrd.open_workbook(excel_path)
        table = data.sheet_by_name(sheet_name)

        for row in range(1, table.nrows):
            result.append(table.row_values(row))
    except:
        pass

    return result


if __name__ == "__main__":
    res = read_excel("../../doc/掌厅自动化测试用例v1.1.xlsx", "v3.4.4")
    print(res)
