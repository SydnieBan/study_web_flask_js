from flask import render_template,request
from app.app import app
from app.service.home_service import home
from app.service.course_service import course
from app.service.user_service import user
from app.service.courseDetails_service import courseDetails
from app.service.search_service import search
from app.service.video_service import video
from app.service.note_service import note
from app.service.courseware_service import courseWare
import json
app.register_blueprint(home,url_prefix='/home')
app.register_blueprint(course,url_prefix='/course')
app.register_blueprint(user,url_prefix='/user')
app.register_blueprint(courseDetails,url_prefix='/courseDetails')
app.register_blueprint(search,url_prefix='/search')
app.register_blueprint(video,url_prefix='/video')
app.register_blueprint(note,url_prefix='/note')
app.register_blueprint(courseWare,url_prefix='/courseWare')


@app.route('/')
def index():
    return 'idnex...'

# **************七牛云***************
@app.route('/upload_token/')
def upload_token():
    from qiniu import Auth
    import uuid
    # 1. 获取前端的filename（图片名）
    local_file_name=request.args.get('local_file_name')
    # 2. 需要填写你的 Access Key 和 Secret Key
    access_key='zIBE0Qqwx4WGfUjwkPa8Mh2JGBJhI6dUpvfW8JQl'
    secret_key='MRR6Bla7WJy0_SKUdLKo4YoQk1uK6QUIh1VoGNTB'
    # 3. 构建鉴权对象
    q = Auth(access_key, secret_key)
    # 4. 要上传的空间（空间名）
    bucket_name = 'sherlockx'
    # 5. 上传后保存的文件名（后缀前端传过来）
    key = str(uuid.uuid4())+'.'+local_file_name.split('.')[1]
    # 6. 生成上传 token，可以指定过期时间等
    token = q.upload_token(bucket_name, key, 3600)
    # 7. 将 token、key（上传后保存到文件名）给前端即可
    return json.dumps({"upload_token":token,"new_file_name":key})

# ************************************

@app.errorhandler(404)
def miss(e):
    return render_template('404.html')

@app.errorhandler(500)
def error(e):
    return render_template('500.html')

