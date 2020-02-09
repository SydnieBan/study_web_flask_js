from flask import Blueprint,request
from app.service.utils.password_util import password_encryption,password_check
from app.service.utils.token_util import make_token,check_token
from app.service.utils.status_code import status_code
from app.service.decorate.check_user import check_login
from app.dao.user_dao import *
import json


user = Blueprint('user', __name__)

@user.route('/')
def index():
    return 'user...index...'

# ****************************************************************************
# 获取验证码
@user.route('/get_verification_code/')
def get_verification_code():
    number=request.args.get('telephone')
    from short_message.get_verification_code import get_verification_code
    res=get_verification_code(number)
    return res

@user.route('/register/', methods=['GET','POST'])
def register():
    """
    用户注册
    {"telephone":"1388888888","password":"888888"}
    :return:
    """
    if request.method == 'GET':
        return 'user...register...GET'
    else:
        user = request.get_json()
        user['psw'] = password_encryption(user['psw'])
        res = insert_user(user)
        if res:
            token = make_token(user['tel'])
            status_code['register_success']['token']=token.decode()
            return status_code['register_success']
        else:
            return status_code['register_fail']
        # return 'user...register...POST...'
# *********************************************** 用户登录异地登录 **********************************************
@user.route('/login/', methods=['GET','POST'])
def login():
    """
    用户登录
    {"telephone":"13777777777","password":"777777"}
    :return:
    """
    if request.method == 'GET':
        return 'user...login...GET'
    else:
        user = request.get_json()
        data = get_password_by_id(user['tel'])
        psw=data["psw"]
        if psw:
            res = password_check(psw, user['psw'])
            if res:
                token = make_token(user['tel'])
                new_data={"id":data["id"],"tel":data["tel"],"token":token.decode()}
                return new_data
            else:
                return status_code['password_error']
        else:
            return status_code['user_none']
        # return 'user...login....POST'

# ****************************************************** 用户登录异地登录 ***************************************

@user.route('/show/')
# @check_login
def show():
    """
    查看用户信息 通过 tel
    :return: name id tel icon_img
    """
    token = request.headers['token']
    tel = check_token(token)
    user = get_user_by_id(tel)
    if user:
        # user["register_time"]=user["register_time"].strftime('%Y-%m-%d %H:%M:%S')
        return json.dumps(user)
    else:
        return status_code["show_user_error"]
#
#
# @user.route('/please_login/')
# def please_login():
#     return '请登录'
#
#
# @user.route('/chance_password/', methods=['GET', 'POST'])
# # @check_login
# def chance_password():
#     """
#     修改用户密码
#     {"telephone":"13777777777","password":"777777"}
#     :return:
#     """
#     if request.method.upper() == "GET:":
#         return "GET"
#     else:
#         user = request.get_json()
#         user['psw'] = password_encryption(user['psw'])
#         res = chance_password_id(user)
#         if res:
#             return status_code["chance_password_success"]
#         else:
#             return status_code["chance_password_fail"]

@user.route('/icon/', methods=['GET','POST'])
def icon():
    """
    用户修改信息
    {"telephone":"1388888888","password":"888888"}
    :return:
    """
    if request.method == 'GET':
        return 'user...register...GET'
    else:
        user = request.get_json()
        result = add_img_to_icon(user['img_url'])
        if result:
            print('tesst....icon')
            res = update_icon(user)
            if res:
                return status_code['profile_success']
            else:
                return status_code['profile_fail']


# 得到全部课程
@user.route('/total/', methods=["GET", "POST"])
# @check_login
def total():
    """
    得到全部课程
    {"id": int,.,}
    :return:
    """
    if request.method.upper() == "GET":
        return 'this is get total'
    else:
        user = request.get_json()
        data=total_course(user)
        for i in data:
            i["publish_time"]=i["publish_time"].strftime('%Y-%m-%d')
        if data:
           data=json.dumps(data)
           return data
        else:
            return status_code["total_fail"]
# 分页
@user.route('/get_total_page/', methods=["GET", "POST"])
def get_total_page():
    if request.method.upper() == "GET":
        return 'this is get finish'
    else:
        user = request.get_json()
        data=get_total_num(user)
        if data:
            data=json.dumps(data)
            return data
        else:
            return status_code["get_total_num_fail"]

# 得到未完成的课程
@user.route('/on/', methods=["GET", "POST"])
# @check_login
def on():
    """
    得到未完成课程
    {"tel":"13512345678"}
    :return:
    """
    if request.method.upper() == "GET":
        return 'this is get on'
    else:
        user = request.get_json()
        data=on_course(user)
        for i in data:
            i["publish_time"]=i["publish_time"].strftime('%Y-%m-%d')
        if data:
           data=json.dumps(data)
           return data
        else:
            return status_code["on_fail"]
# 完成课程
@user.route('/finish/', methods=["GET", "POST"])
def finish():
    """
       得到完成课程
       {"tel":"13512345678"}
       :return:
    """
    if request.method.upper() == "GET":
        return 'this is get finish'
    else:
        user = request.get_json()
        data=finished_course(user)
        for i in data:
            i["publish_time"]=i["publish_time"].strftime('%Y-%m-%d')
        if data:
           data=json.dumps(data)
           return data
        else:
            return status_code["on_fail"]

# 收藏课程
@user.route('/collect/', methods=["GET", "POST"])
def collect():
    """
       收藏课程
       {"tel":"13512345678"}
       :return:
    """
    if request.method.upper() == "GET":
        return 'this is get finish'
    else:
        user = request.get_json()
        data=collect_course(user)
        for i in data:
            i["publish_time"]=i["publish_time"].strftime('%Y-%m-%d')
        if data:
           data=json.dumps(data)
           return data
        else:
            return status_code["on_fail"]

#获取用户信息根据id
@user.route('/information/', methods=["GET", "POST"])
def information():
    if request.method.upper() == "GET":
        return 'this is get finish'
    else:
        user = request.get_json()
        data=get_information(user)
        # print(data)
        if data:
            data=json.dumps(data)
            return data
        else:
            return status_code["get_fail"]

# 用户签到功能：home页
@user.route('/check_in/')
def check_in():
    user_id = request.args.get('id')
    res=insert_check_in(user_id)
    if res:
        return status_code["check_in_success"]
    else:
        return status_code["check_in_error"]

# 插入用户信息
@user.route('/insert_user_info/', methods=["GET", "POST"])
def insert_user_info():
    if request.method.upper() == "GET":
        return 'this is get finish'
    else:
        user = request.get_json()
        data=inster_change(user)
        if data:
            return status_code["insert_user_info_success"]
        else:
            return status_code["insert_user_info_fail"]

# 修改用户信息
@user.route('/update/', methods=["GET", "POST"])
def update():
    if request.method.upper() == "GET":
        return 'this is get finish'
    else:
        user = request.get_json()
        data=update_change(user)
        if data==1 or data==0:
            return status_code["update_user_info_success"]
        else:
            return status_code["update_user_info_fail"]


# **************************
#积分数
@user.route('/integral/', methods=["GET", "POST"])
def integral():
    if request.method.upper() == "GET":
        return 'this is get finish'
    else:
        user = request.get_json()
        data=get_integral(user)
        if data:
            data=json.dumps(data)
            return data
        else:
            return status_code["integral_fail"]

#笔记数量
@user.route('/get_note_num/', methods=["GET", "POST"])
def get_note_num():
    if request.method.upper() == "GET":
        return 'this is get finish'
    else:
        user = request.get_json()
        data=get_notes(user)
        if data:
            data=json.dumps(data)
            return data
        else:
            return status_code["get_num_fail"]
#得到登录账号
@user.route('/get_account/', methods=["GET", "POST"])
def get_account():
    if request.method.upper() == "GET":
        return 'this is get finish'
    else:
        user = request.get_json()
        data=get_number(user)
        if data:
            data=json.dumps(data)
            return data
        else:
            return status_code["get_account_fail"]

# 计算学习时长
@user.route('/count_study_time/')
def count_study_time():
    user_id = request.args.get('id')
    data=select_study_time(user_id)
    if data:
        return json.dumps({"sum_study_time":data})
    else:
        return status_code["get_account_fail"]



