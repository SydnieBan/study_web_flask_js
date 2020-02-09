from flask import Blueprint,request
from app.dao.note_dao import *
from app.service.utils.status_code import status_code
import json

note = Blueprint('note',__name__)
@note.route('/')
def index():
    return 'note.....index..'

# 查询个人笔记
@note.route('/select_note/',methods=['GET','POST'])
def select_note():
    '''
    根据用户id查询个人笔记信息
    :return:
    '''
    if request.method == 'GET':
        return 'Get...'
    else:
        user = request.get_json()
        res=get_personal_notes(user['id'])
        if res:
            for i in range(len(res)):
                res[i]['publish_date']=res[i]['publish_date'].strftime('%Y-%m-%d %H:%M:%S')
            return json.dumps(res)
        else:
            return status_code["display_error"]

# 删除个人笔记
@note.route('/delete_note/',methods=['GET','POST'])
def delete_note():
    '''
    根据用户id删除个人笔记信息
    :return:
    '''
    if request.method == 'POST':
        return 'Get...'
    else:
        note_id = request.args.get('note_id')
        res=delete_personal_notes(note_id)
        if res:
            return status_code["delete_success"]
        else:
            return status_code["delete_error"]

# 添加个人笔记
@note.route('/add_note/',methods=['GET','POST'])
def add_note():
    '''
    添加个人笔记
    :return:
    '''
    if request.method == 'GET':
        return 'Get...'
    else:
        date = request.get_json()
        res=add_personal_notes(date)
        if res:
            return json.dumps(status_code["add_note_success"])
        else:
            return json.dumps( status_code["add_note_error"])

# 查询某个笔记
@note.route('/display_note/')
def display_note():
    note_id = request.args.get('note_id')
    res=display_note_by_noteid(note_id)
    if res:
        for i in range(len(res)):
            res[i]['publish_date']=res[i]['publish_date'].strftime('%Y-%m-%d %H:%M:%S')
        return json.dumps(res)
    else:
        return status_code["display_error"]