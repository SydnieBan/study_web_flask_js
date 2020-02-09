import pymysql
# from . import POOL
from app.dao.__init__ import POOL
from app.dao.sqls.video_sqls import sql_dict

# 获取课程章
def get_chapters_by_course_id(course_id):
    try:
        db = POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict["get_chapters_by_course_id"].format(course_id=course_id)
        cursor.execute(sql)
        res = cursor.fetchall()
        return res
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()

# 根据章id获取其小节信息
def get_videos_by_chapter_id(chapter_id):
    try:
        db = POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict["get_videos_by_chapter_id"].format(chapter_id=chapter_id)
        cursor.execute(sql)
        res = cursor.fetchall()
        return res
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()


# 根据视频id获取其视频
def get_video_by_video_id(video_id):
    try:
        db = POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict["get_video_by_video_id"].format(video_id=video_id)
        cursor.execute(sql)
        res = cursor.fetchone()
        return res
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()

# 获取老师
def get_teacher_by_course_id(course_id):
    try:
        db = POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict["get_teacher_by_course_id"].format(course_id=course_id)
        cursor.execute(sql)
        res = cursor.fetchone()
        return res
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()

# 获取该视频对应的问答
def get_video_question_info_by_video_id(video_id):
    try:
        db = POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict["get_video_question_info_by_video_id"].format(video_id=video_id)
        cursor.execute(sql)
        res = cursor.fetchall()
        return res
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()


# 用户添加课程问题
def insert_video_question_info(content,video_id,user_id):
    try:
        db = POOL.connection()
        cursor = db.cursor()
        sql = sql_dict["insert_video_question_info"].format(content=content,video_id=video_id,user_id=user_id,qv_date='NOW()')
        res=cursor.execute(sql)
        db.commit()
        return res
    except Exception as ex:
        print(ex)
        if db:
            db.rollback()
    finally:
        if db:
            db.close()

# 添加user_video
def insert_user_video(video_id,user_id):
    try:
        db = POOL.connection()
        cursor = db.cursor()
        sql = sql_dict["insert_user_video"].format(video_id=video_id,user_id=user_id)
        res=cursor.execute(sql)
        db.commit()
        return res
    except Exception as ex:
        print(ex)
        if db:
            db.rollback()
    finally:
        if db:
            db.close()

# 查看 user_video 的 progress
def select_user_video_progress(video_id,user_id):
    '''
    :param video_id:
    :param user_id:
    :return:  0:00:12   datetime.timedelta
    '''
    try:
        db = POOL.connection()
        cursor = db.cursor()
        sql = sql_dict["select_user_video_progress"].format(video_id=video_id,user_id=user_id)
        cursor.execute(sql)
        res = cursor.fetchone()
        db.commit()
        return res[0]
    except Exception as ex:
        print(ex)
        if db:
            db.rollback()
    finally:
        if db:
            db.close()

# 修改 user_video
def update_user_video_progress(progress,video_id,user_id):
    try:
        db = POOL.connection()
        cursor = db.cursor()
        sql = sql_dict["update_user_video_progress"].format(progress=progress,video_id=video_id,user_id=user_id)
        print(sql)
        res=cursor.execute(sql)
        db.commit()
        return res
    except Exception as ex:
        print(ex)
        if db:
            db.rollback()
    finally:
        if db:
            db.close()

# if __name__ == '__main__':
#     res=select_user_video_progress(1003, 17)
#     print(res)