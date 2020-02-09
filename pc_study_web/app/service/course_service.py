from flask import Blueprint,jsonify,request
from app.dao.course_dao import *
from app.service.utils.status_code import status_code
import json

course=Blueprint('course',__name__)

@course.route('/')
def index():
    return 'course...index....'

# 获取所有方向
@course.route('/directions/')
def directions():
    data=get_all_directions()
    if data:
        data=json.dumps(data)
        return data
    else:
        return status_code["display_error"]

# 获取分类
@course.route('/types/')
def types():
    direction = request.args.get('direction')
    direction_ids = get_direction_id_by_name(direction)  # 获取方向id集合
    data=[]
    for i in direction_ids:
        data.extend(get_types(i.get("id")))
    if data:
        data=json.dumps(data)
        return data
    else:
        return status_code["display_error"]

# 获取分类__根据方向id
@course.route('/types_by_direction_id/')
def types_by_direction_id():
    dir_id = request.args.get('direction_id')
    dir_id=int(dir_id)
    data=get_types(dir_id)
    if data:
        data=json.dumps(data)
        return data
    else:
        return status_code["display_error"]

# 获取课程
@course.route('/courses/')
def courses():
    direction=request.args.get('direction')
    type=request.args.get('classify')
    difficulty=request.args.get('difficulty')
    page=request.args.get('page')
    page = int(page)
    page_items=request.args.get('page_items')
    page_items = int(page_items)
    flag=request.args.get('flag')
    flag = int(flag)
    data=get_courses(direction,type,difficulty,page,page_items,flag)
    if data:
        for i in range(len(data)):
            data[i]['publish_time'] = data[i]['publish_time'].strftime('%Y-%m-%d %H:%M:%S')
        data=json.dumps(data)
        return data
    else:
        return status_code["display_error"]

# 获取课程个数
@course.route('/pages/')
def pages():
    direction = request.args.get('direction')
    type = request.args.get('classify')
    difficulty = request.args.get('difficulty')
    page = request.args.get('page')
    page = int(page)
    page_items = request.args.get('page_items')
    page_items = int(page_items)
    data=get_pages(direction,type,difficulty,page,page_items)
    if data:
        data=json.dumps(data)
        return data
    else:
        return status_code["display_error"]

# 点击某一分类获取方向
@course.route('/get_direction_by_classify_id/')
def get_direction_by_classify_id():
    type_id = request.args.get('classify_id')
    data = get_direction_by_classify(type_id)
    if data:
        data = json.dumps(data)
        return data
    else:
        return status_code["display_error"]

# 获取精品课程
@course.route('/unique_courses/')
def unique_courses():
    direction = request.args.get('direction')
    type = request.args.get('classify')
    difficulty = request.args.get('difficulty')
    page = request.args.get('page')
    page = int(page)
    page_items = request.args.get('page_items')
    page_items = int(page_items)
    flag = request.args.get('flag')
    flag = int(flag)
    data = get_uniquecourses(direction, type, difficulty, page, page_items,flag)
    if data:
        for i in range(len(data)):
            data[i]['publish_time'] = data[i]['publish_time'].strftime('%Y-%m-%d %H:%M:%S')
        data = json.dumps(data)
        return data
    else:
        return status_code["display_error"]

# 获取精品课程个数
@course.route('/unique_pages/')
def unique_pages():
    direction = request.args.get('direction')
    type = request.args.get('classify')
    difficulty = request.args.get('difficulty')
    data = get_uniquepages(direction, type, difficulty)
    if data:
        data = json.dumps(data)
        return data
    else:
        return status_code["display_error"]


# 获取免费课程
@course.route('/free_courses/')
def free_courses():
    direction = request.args.get('direction')
    type = request.args.get('classify')
    difficulty = request.args.get('difficulty')
    page = request.args.get('page')
    page = int(page)
    page_items = request.args.get('page_items')
    page_items = int(page_items)
    flag = request.args.get('flag')
    flag = int(flag)
    data = get_free_course(direction, type, difficulty, page, page_items,flag)
    if data:
        for i in range(len(data)):
            data[i]['publish_time'] = data[i]['publish_time'].strftime('%Y-%m-%d %H:%M:%S')
        data = json.dumps(data)
        return data
    else:
        return status_code["display_error"]


# 获取免费课程个数
@course.route('/free_pages/')
def free_pages():
    direction = request.args.get('direction')
    type = request.args.get('classify')
    difficulty = request.args.get('difficulty')
    data = get_free_pages(direction, type, difficulty)
    if data:
        data = json.dumps(data)
        return data
    else:
        return status_code["display_error"]



