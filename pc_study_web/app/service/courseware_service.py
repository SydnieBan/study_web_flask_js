from flask import Blueprint, request, jsonify

from app.dao.courseware_dao import *
from app.service.utils.status_code import status_code
import json

courseWare = Blueprint('/courseWare', __name__)


@courseWare.route('/')
def index():
    return 'courseWare...index...'


# 根据课件id获取课程名和id
@courseWare.route('/courseName', methods=['GET', 'POST'])
def courseName():
    if request.method.upper() == "POST":
        return '正在post数据'
    else:
        ware_id = request.args.get('ware_id')
        res = get_course_name(ware_id)
        if res:
            return jsonify(res)
        else:
            return status_code["display_course_info_error"]


# 获取课件
@courseWare.route('/getWare', methods=['GET', 'POST'])
def getWare():
    if request.method.upper() == "POST":
        return '正在post数据'
    else:

        id = request.args.get('course_id')
        res = get_course_ware(id)
        if res:
            ch_id = None
            new_list = []

            for i in range(len(res)):
                if res[i]['chapter_id'] != ch_id:
                    ch_id = res[i]['chapter_id']
                    res[i]['ware_name'] = [{"ware_name": res[i]['ware_name'], "ware_id": res[i]['id']}]
                    new_list.append(res[i])
                else:
                    new_list[len(new_list) - 1]['ware_name'].append(
                        {"ware_name": res[i]['ware_name'], "ware_id": res[i]['id']})
            return jsonify(new_list)
        else:
            return status_code["display_course_info_error"]


# 获取课件内容
@courseWare.route('/getWareContent', methods=['GET', 'POST'])
def getWareContent():
    if request.method.upper() == "POST":
        return '正在post数据'
    else:
        ware_id = request.args.get('ware_id')
        res = get_ware_content(ware_id)
        if res:
            return jsonify(res)
        else:
            return status_code["display_course_info_error"]


# 获取课件问题
@courseWare.route('/getWareQuestion', methods=['GET', 'POST'])
def getWareQuestion():
    if request.method.upper() == "POST":
        return '正在post数据'
    else:
        ware_id = request.args.get('ware_id')
        res = get_ware_question(ware_id)
        if res:
            for i in range(len(res)):
                res[i]['qc_date'] = str(res[i]['qc_date'])

            return jsonify(res)
        else:
            return status_code["display_course_info_error"]


# 用户添加课程问题
@courseWare.route('/addWareQuestion', methods=["GET", "POST"])
def addWareQuestion():
    if request.method.upper() == "POST":
        return 'this is get addCourse'
    else:
        content = request.args.get('content')
        user_id = request.args.get('user_id')
        ware_id = request.args.get('ware_id')
        res = add_ware_question(content, ware_id, user_id)
        if res:
            return json.dumps(status_code["add_ware_success"])
        else:
            return json.dumps(status_code["add_ware_error"])
