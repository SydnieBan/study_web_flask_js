from flask import Blueprint,jsonify,request
from app.dao.search_dao import *
from app.service.utils.status_code import status_code
import json

search=Blueprint('search',__name__)

@search.route('/')
def index():
    return 'search...index....'


# 根据搜索条件获取课程
@search.route('/courses/')
def courses():
    search_con=request.args.get('search_con')
    page=request.args.get('page')
    page = int(page)
    page_items=request.args.get('page_items')
    page_items = int(page_items)
    flag=request.args.get('flag')
    flag = int(flag)
    data=get_courses(search_con,page,page_items,flag)
    if data:
        for i in range(len(data)):
            data[i]['publish_time'] = data[i]['publish_time'].strftime('%Y-%m-%d %H:%M:%S')
        data=json.dumps(data)
        return data
    else:
        return status_code["display_error"]

# 根据搜索条件获取课程个数
@search.route('/pages/')
def pages():
    search_con = request.args.get('search_con')
    page = request.args.get('page')
    page = int(page)
    page_items = request.args.get('page_items')
    page_items = int(page_items)
    data=get_pages(search_con,page,page_items)
    if data:
        data=json.dumps(data)
        return data
    else:
        return status_code["display_error"]