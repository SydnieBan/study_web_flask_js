from flask import Blueprint,jsonify,request
import datetime
from app.dao.video_dao import *
from app.service.utils.status_code import status_code
import json

video=Blueprint('video',__name__)

@video.route('/')
def index():
    return 'vide...index..'

# 根据课程id获取其章节信息
@video.route('/get_chapters_video_by_course_id/')
def get_chapters_video_by_course_id():
    course_id = request.args.get('course_id')
    data={}
    chapters = get_chapters(course_id)
    for item in chapters:
        data[item.get("name")]=get_videos(item.get("id"))
    if data:
        data = json.dumps(data)
        return data
    else:
        return status_code["display_error"]

# 根据课程id获取其 章信息
# @video.route('/get_chapters/')
def get_chapters(course_id):
    # course_id=request.args.get('course_id')
    data = get_chapters_by_course_id(course_id)
    if data:
        # data = json.dumps(data)
        return data
    else:
        return status_code["display_error"]

# 根据章id获取其 小节信息
@video.route('/get_videos/')
def get_videos(chapter_id):
    # chapter_id=request.args.get('chapter_id')
    data = get_videos_by_chapter_id(chapter_id)
    if data:
        for i in range(len(data)):
            data[i]['video_time'] = str(data[i]['video_time'])
        # data = json.dumps(data)
        return data
    # else:
    #     return status_code["display_error"]


# 根据视频id获取其视频
@video.route('/get_video_by_id/')
def get_video_by_id():
    video_id = request.args.get('video_id')
    data = get_video_by_video_id(video_id)
    if data:
        data['video_time'] = str(data['video_time'])
        data = json.dumps(data)
        return data
    else:
        return status_code["display_error"]


# 根据课程id获取其 老师信息
@video.route('/get_teacher/')
def get_teacher():
    course_id=request.args.get('course_id')
    data = get_teacher_by_course_id(course_id)
    if data:
        data = json.dumps(data)
        return data
    else:
        return status_code["display_error"]

# 获取该视频对应的问答
@video.route('/get_video_question_info_by_video_id/')
def get_video_question_info():
    video_id = request.args.get('video_id')
    data = get_video_question_info_by_video_id(video_id)
    if data:
        for i in range(len(data)):
            data[i]['qv_date'] = data[i]['qv_date'].strftime('%Y-%m-%d %H:%M:%S')
        data = json.dumps(data)
        return data
    else:
        return status_code["display_error"]


# 添加用户视频问答
@video.route('/add_video_question_info/')
def add_video_question_info():
    user_id = request.args.get('user_id')
    video_id = request.args.get('video_id')
    content = request.args.get('content')
    res = insert_video_question_info(content,video_id,user_id)
    if res:
        return json.dumps(status_code["add_video_question_success"]) # 1020
    else:
        return json.dumps(status_code["add_video_question_error"])

# 添加user_video
@video.route('/add_user_video/')
def add_user_video():
    user_id = request.args.get('user_id')
    video_id = request.args.get('video_id')
    res = insert_user_video(video_id,user_id)
    if res:
        return json.dumps(status_code["add_video_question_success"])
    else:
        return json.dumps(status_code["add_video_question_error"])


# 查看 user_video 的progress
@video.route('/select_user_video/')
def select_user_video():
    user_id = request.args.get('user_id')
    video_id = request.args.get('video_id')
    res = select_user_video_progress(video_id,user_id)
    if res:
        res=str(res)
        return json.dumps({"progress":res})
    else:
        return json.dumps(status_code["select_user_video_error"])

# 修改 user_video
@video.route('/update_user_video/')
def update_user_video():
    user_id = request.args.get('user_id') # 17
    video_id = request.args.get('video_id') # 1003
    progress_timestamp = float(request.args.get('progress')) # 13.603542 时间戳，秒
    hh=int(progress_timestamp//(60*60))
    mm=int(progress_timestamp%(60*60)//60)
    ss=int(progress_timestamp%60)
    progress=str(hh if hh>9 else '0'+str(hh))+":"+str(mm if mm>9 else '0'+str(mm))+":"+str(ss if ss>9 else '0'+str(ss))
    res = update_user_video_progress(progress,video_id,user_id)
    if res:
        return json.dumps(status_code["update_user_video_success"])
    else:
        return json.dumps(status_code["update_user_video_error"])