from flask import Blueprint, request, jsonify

# from app.dao.courseDetails_dao import get_course_info, get_course_num, get_course_collect_num,get_course_video

from app.dao.courseDetails_dao import *
from app.service.utils.status_code import status_code
import json

courseDetails = Blueprint('/courseDetails', __name__)


@courseDetails.route('/')
def index():
    return 'courseDetails...index...'


# 获得课程基本信息
@courseDetails.route('/courseInfo', methods=['GET', 'POST'])
def courseInfo():
    if request.method.upper() == "POST":
        return '正在post数据'
    else:
        id = request.args.get('course_id')
        res = get_course_info(id)
        return jsonify(res)


# 获取课程选择人数
@courseDetails.route('/selectNum', methods=['GET', 'POST'])
def selectNum():
    if request.method.upper() == "POST":
        return '正在post数据'
    else:
        id = request.args.get('course_id')
        res = get_course_num(id)
        return jsonify(res)


# 获取收藏人数
@courseDetails.route('/collectionNum', methods=['GET', 'POST'])
def collectionNum():
    if request.method.upper() == "POST":
        return '正在post数据'
    else:
        id = request.args.get('course_id')
        res = get_course_collect_num(id)
        return jsonify(res)


# 获取视频
@courseDetails.route('/getVideo', methods=['GET', 'POST'])
def getVideo():
    if request.method.upper() == "POST":
        return '正在post数据'
    else:
        import datetime
        id = request.args.get('course_id')
        res = get_course_video(id)
        sum_date = datetime.timedelta()
        ch_id = None
        new_list = []
        for i in range(len(res)):
            sum_date += res[i]['video_time']
            res[i]['video_time'] = str(res[i]['video_time'])

        for i in range(len(res)):
            if res[i]['chapter_id'] != ch_id:
                ch_id = res[i]['chapter_id']
                res[i]['video_name'] = [{"video_name": res[i]['video_name'], "video_id": res[i]['id']}]
                new_list.append(res[i])
            else:
                new_list[len(new_list) - 1]['video_name'].append(
                    {"video_name": res[i]['video_name'], "video_id": res[i]['id']})

        new_list.append({"sum_date": str(sum_date.total_seconds())})
        return jsonify(new_list)


# 获取课件
@courseDetails.route('/getWare', methods=['GET', 'POST'])
def getWare():
    if request.method.upper() == "POST":
        return '正在post数据'
    else:
        import datetime
        id = request.args.get('course_id')
        res = get_course_ware(id)
        sum_date = datetime.timedelta()
        ch_id = None
        new_list = []
        for i in range(len(res)):
            sum_date += res[i]['courseware_time']
            res[i]['courseware_time'] = str(res[i]['courseware_time'])

        for i in range(len(res)):
            if res[i]['chapter_id'] != ch_id:
                ch_id = res[i]['chapter_id']
                res[i]['ware_name'] = [{"ware_name": res[i]['ware_name'], "ware_id": res[i]['id']}]
                new_list.append(res[i])
            else:
                new_list[len(new_list) - 1]['ware_name'].append(
                    {"ware_name": res[i]['ware_name'], "ware_id": res[i]['id']})

        new_list.append({"sum_date": str(sum_date.total_seconds())})
        return jsonify(new_list)


# 课程评论
@courseDetails.route('/courseEvaluation', methods=['GET', 'POST'])
def courseEvaluation():
    if request.method.upper() == "POST":
        return '正在post数据'
    else:
        id = request.args.get('course_id')
        res = get_course_evaluation(id)
        return jsonify(res)


# 添加收藏课程
@courseDetails.route('/addCollect', methods=["GET", "POST"])
def addCollect():
    if request.method.upper() == "POST":
        return 'this is get add_collcet'
    else:
        user_id = request.args.get('user_id')
        user_id=int(user_id)
        course_id = request.args.get('course_id')
        course_id=int(course_id)
        res = add_course_collect(user_id, course_id)
        if res:
            return json.dumps(status_code["add_collect_success"])
        else:
            return json.dumps(status_code["add_collect_error"])


# 取消收藏课程
@courseDetails.route('/delCollect', methods=["GET", "POST"])
def delCollect():
    if request.method.upper() == "POST":
        return 'this is get del_collcet'
    else:
        user_id = request.args.get('user_id')
        course_id = request.args.get('course_id')
        res = del_course_collect(user_id, course_id)
        if res:
            return json.dumps(status_code["del_collect_success"])
        else:
            return json.dumps(status_code["del_collect_error"])

#  **************************** 判断用户是否选了这门课 **************************
@courseDetails.route('/is_select_course/')
def is_select_course():
    user_id=request.args.get('user_id')
    course_id=request.args.get('course_id')
    res=get_is_select_course(user_id,course_id)
    print(res)
    return json.dumps({"is_select_course":res})
#  ******************************************************************************
#  **************************** 用户选课 ****************************************
# 获取用户对应积分
@courseDetails.route('/get_user_integral/', methods=["GET", "POST"])
def get_user_integral():
    if request.method.upper() == "POST":
        return 'this is get addCourse'
    else:
        user_id = request.args.get('user_id')
        res = select_user_integral(user_id)
        if res:
            return res
        else:
            return json.dumps(status_code["get_user_integral_error"])
# 用户扣除积分并添加课程
@courseDetails.route('/addCourse_unique/', methods=["GET", "POST"])
def addCourse_unique():
    '''
    {"user_id":user.id,"course_id":condition.course_id,"need_integral":need_integral}
    :return:
    '''
    if request.method.upper() == "POST":
        return 'this is get addCourse'
    else:
        user_id = request.args.get('user_id')
        course_id = request.args.get('course_id')
        need_integral=request.args.get('need_integral')
        res = add_course_unique_to_user(user_id, course_id,need_integral)
        if res:
            return json.dumps(status_code["add_course_unique_success"]) # 1022
        else:
            return json.dumps(status_code["add_course_unique_error"]) # 4022
# 用户添加免费课程
@courseDetails.route('/addCourse_free/', methods=["GET", "POST"])
def addCourse():
    if request.method.upper() == "POST":
        return 'this is get addCourse'
    else:
        user_id = request.args.get('user_id')
        course_id = request.args.get('course_id')
        res = add_course_free_to_user(user_id, course_id)
        if res:
            return json.dumps(status_code["add_course_free_success"]) # 1023
        else:
            return json.dumps(status_code["add_course_free_error"]) # 4023
# ************************************************************************


# 用户添加课程评论
@courseDetails.route('/addEvaluation', methods=["GET", "POST"])
def addEvaluation():
    if request.method.upper() == "POST":
        return 'this is get addCourse'
    else:
        content = request.args.get('content')
        user_id = request.args.get('user_id')
        course_id = request.args.get('course_id')
        res = add_course_evaluation(content, course_id, user_id)
        if res:
            return json.dumps(status_code["add_evaluation_success"])
        else:
            return json.dumps(status_code["add_evaluation_error"])


# 获取用户学习时间
@courseDetails.route('/getStudyLearn', methods=['GET', 'POST'])
def getStudyLearn():
    if request.method.upper() == "POST":
        return '正在post数据'
    else:
        import datetime
        user_id = request.args.get('user_id')
        course_id = request.args.get('course_id')
        video_time = get_user_course_video_progress(user_id, course_id)
        ware_time = get_user_course_ware_progress(user_id, course_id)
        sum_video_date = datetime.timedelta()
        sum_ware_date = datetime.timedelta()
        for i in range(len(video_time)):
            sum_video_date += video_time[i]['progress']
        for i in range(len(ware_time)):
            sum_ware_date += ware_time[i]['courseware_time']

        all_time = sum_video_date + sum_ware_date

        return jsonify({"all_date": str(all_time.total_seconds())})


# 课程推荐
@courseDetails.route('/courseRecommended/', methods=['GET', 'POST'])
def courseRecommended():
    if request.method.upper() == "POST":
        return '正在post数据'
    else:
        course_id = request.args.get('course_id')
        pre_course = get_pre_course(course_id)
        len_course = 6 - len(pre_course)

        if len_course > 0:
            so_ty_course = get_same_type_course(course_id, len_course)
            if len(pre_course)==0:
                return jsonify(so_ty_course)
            else:
                pre_course.extend(so_ty_course)
        return jsonify(pre_course)

# 判断用户是否收藏过该课程
@courseDetails.route('/iscollection/')
def iscollection():
    user_id=request.args.get('user_id')
    course_id=request.args.get('course_id')
    res=get_iscollection(user_id,course_id)
    return json.dumps({"iscollection":res})

# ************************************************************************
# *************** 点击视频，添加 user_video ******************************
@courseDetails.route('/add_user_video/')
def add_user_video():
    # {"video_id":sitem.id,"user_id":user.id}
    user_id=request.args.get('user_id')
    video_id=request.args.get('video_id')
    res=insert_user_video(video_id,user_id)
    if res:
        return status_code["add_user_video_success"]
    else:
        return status_code["add_user_video_error"]

# ************************************************************************
# *************** 点击课件，添加 user_courseware *************************
@courseDetails.route('/add_user_courseware/')
def add_user_courseware():
    # {"courseware_id":sitem.id,"user_id":user.id}
    user_id=request.args.get('user_id')
    courseware_id=request.args.get('courseware_id')
    res=insert_user_courseware(courseware_id,user_id)
    if res:
        return status_code["add_user_courseware_success"]
    else:
        return status_code["add_user_courseware_error"]