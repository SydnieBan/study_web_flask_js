from flask import Blueprint,request
from app.dao.home_dao import *
from app.service.utils.status_code import status_code
import  json

home=Blueprint('home',__name__)
@home.route('/')
def index():
    return 'home....index..'

@home.route('/get')


# 获取新手入门课程
@home.route('/newcourses/')
def newcourses():
    res=get_free_courses()
    # print(res)
    if res:
        data=json.dumps(res)
        return data
    else:
        return status_code["display_error"]


# 获取新上好课
@home.route('/good_courses/')
def good_courses():
    res = get_good_courses()
    # print(res)
    if res:
        data = json.dumps(res)
        return data
    else:
        return status_code["display_error"]

# 获取精品课程
@home.route('/head_unique/')
def head_unique():
    data = get_head_uniquecourse()
    if data:
        data = json.dumps(data)
        return data
    else:
        return status_code["display_error"]

# 获取技术提升课程
@home.route('/promote/')
def promote():
    data = get_promate()
    if data:
        data = json.dumps(data)
        return data
    else:
        return status_code["display_error"]
# 获取实战课程
@home.route('/combat/')
def combat():
    data = get_combat()
    if data:
        data = json.dumps(data)
        return data
    else:
        return status_code["display_error"]

@home.route('/teacher/')
def teacher():
    data = get_teacher()
    if data:
        data = json.dumps(data)
        return data
    else:
        return status_code["display_error"]
