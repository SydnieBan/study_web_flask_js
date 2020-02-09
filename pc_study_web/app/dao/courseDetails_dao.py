from app.dao.sqls.courseDetails_sqls import sql_dict
from app.dao.__init__ import POOL
import pymysql


# 获取课程id的方向，分类，名字，难度
def get_course_info(id):
    """
    获取课程id的方向，分类，名字，难度
    :return:
    """
    try:
        db = POOL.connection()
        res = None
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict.get('get_course_info').format(id=id)
        cursor.execute(sql)
        res = cursor.fetchone()
        return res
    except Exception as e:
        print(e)
        return res

    finally:
        if db:
            db.close()


# 获取课程的学习人数
def get_course_num(id):
    """
    获取课程的学习人数
    :return:
    """
    try:
        db = POOL.connection()
        res = None
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict.get('get_course_num').format(id=id)
        cursor.execute(sql)
        res = cursor.fetchone()
        return res
    except Exception as e:
        print(e)
        return res

    finally:
        if db:
            db.close()


# 获取课程收藏的人数
def get_course_collect_num(id):
    """
    获取课程收藏的人数
    :return:
    """
    try:
        db = POOL.connection()
        res = None
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict.get('get_course_collect_num').format(id=id)
        cursor.execute(sql)
        res = cursor.fetchone()
        return res
    except Exception as e:
        print(e)
        return res

    finally:
        if db:
            db.close()


# 获取课程id的所有视频信息
def get_course_video(id):
    """
    获取课程id的所有视频信息
    :return:
    """
    try:
        db = POOL.connection()
        res = None
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict.get('get_course_video').format(id=id)
        cursor.execute(sql)
        res = cursor.fetchall()
        return res
    except Exception as e:
        print(e)
        return res

    finally:
        if db:
            db.close()


# 获取课程id的所有课件信息
def get_course_ware(id):
    """
    获取课程id的所有课件信息
    :return:
    """
    try:
        db = POOL.connection()
        res = None
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict.get('get_course_ware').format(id=id)
        cursor.execute(sql)
        res = cursor.fetchall()
        return res
    except Exception as e:
        print(e)
        return res

    finally:
        if db:
            db.close()


# 获取课程的评论
def get_course_evaluation(id):
    """
    获取课程的评论
    :return:
    """
    try:
        db = POOL.connection()
        res = None
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict.get('get_course_evaluation').format(id=id)
        cursor.execute(sql)
        res = cursor.fetchall()
        return res
    except Exception as e:
        print(e)
        return res

    finally:
        if db:
            db.close()


# 添加课程收藏
def add_course_collect(user_id, course_id):
    """
    添加课程收藏
    :return:
    """
    try:
        db = POOL.connection()
        res = None
        # cursor = db.cursor(pymysql.cursors.DictCursor)
        cursor = db.cursor()
        user_id
        sql = sql_dict.get('add_course_collect').format(user_id=user_id, course_id=course_id)
        res = cursor.execute(sql)
        db.commit()
        return res
    except Exception as e:
        print(e)
        if db:
            db.rollback()
        return res

    finally:
        if db:
            db.close()


# 取消课程收藏
def del_course_collect(user_id, course_id):
    """
    取消课程收藏
    :return:
    """
    try:
        db = POOL.connection()
        res = None
        # cursor = db.cursor(pymysql.cursors.DictCursor)
        cursor = db.cursor()
        sql = sql_dict.get('del_course_collect').format(user_id=user_id, course_id=course_id)
        res = cursor.execute(sql)
        db.commit()
        return res
    except Exception as e:
        print(e)
        if db:
            db.rollback()
        return res

    finally:
        if db:
            db.close()

# ********************* 用户是否选课 *****************************
def get_is_select_course(user_id,course_id):
    """
   判断用户是否选课
    :return:
    """
    try:
        db = POOL.connection()
        cursor = db.cursor()
        sql = sql_dict.get('get_is_select_course').format(user_id=user_id, course_id=course_id)
        cursor.execute(sql)
        res = cursor.fetchone()
        return res[0]
    except Exception as e:
        print(e)
    finally:
        if db:
            db.close()
# ********************* 用户选课 *****************************
# 查看用户积分
def select_user_integral(user_id):
    '''
    :param user_id:
    :return:{'sum_integral': 6}
    '''
    try:
        db = POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict.get('select_user_integral').format(user_id=user_id)
        cursor.execute(sql)
        res=cursor.fetchone()

        res["sum_integral"]=int(res["sum_integral"])
        print('用户积分：',res)
        return res
    except Exception as e:
        print(e)
    finally:
        if db:
            db.close()

# 用户扣除积分并添加课程
def add_course_unique_to_user(user_id, course_id,need_integral):
    try:
        db = POOL.connection()
        cursor = db.cursor()
        sql1 = sql_dict.get('reduce_user_integral').format(integral=need_integral,user_id=user_id,get_date='NOW()')
        print('扣除用户积分：',sql1)
        sql2 = sql_dict.get('add_course_to_user').format(user_id, course_id, 'CURDATE()')
        print('添加精品选课：',sql2)
        res = cursor.execute(sql1) & cursor.execute(sql2)
        db.commit()
        return res
    except Exception as e:
        print(e)
        if db:
            db.rollback()
    finally:
        if db:
            db.close()
# 用户添加免费课程
def add_course_free_to_user(user_id, course_id):
    try:
        db = POOL.connection()
        cursor = db.cursor()
        sql = sql_dict.get('add_course_to_user').format(user_id, course_id, 'CURDATE()')
        print('添加免费选课：', sql)
        res = cursor.execute(sql)
        db.commit()
        return res
    except Exception as e:
        print(e)
        if db:
            db.rollback()
    finally:
        if db:
            db.close()
# **************************************************

# 用户添加课程评论
def add_course_evaluation(content, course_id, user_id):
    """
    用户添加课程评论
    :return:
    """
    try:
        db = POOL.connection()
        res = None
        # cursor = db.cursor(pymysql.cursors.DictCursor)
        cursor = db.cursor()
        sql = sql_dict.get('add_course_evaluation').format(content, course_id, user_id, 'NOW()')
        res = cursor.execute(sql)
        db.commit()
        return res
    except Exception as e:
        print(e)
        if db:
            db.rollback()
        return res

    finally:
        if db:
            db.close()


# 获取用户视频学习进程
def get_user_course_video_progress(user_id, course_id):
    """
    获取用户视频学习进程
    :return:
    """
    try:
        db = POOL.connection()
        res = None
        cursor = db.cursor(pymysql.cursors.DictCursor)
        # cursor = db.cursor()
        sql = sql_dict.get('get_user_course_video_progress').format(user_id=user_id, course_id=course_id)
        # res = cursor.execute(sql)
        cursor.execute(sql)
        res = cursor.fetchall()
        return res
    except Exception as e:
        print(e)
        # if db:
        #     db.rollback()
        return res

    finally:
        if db:
            db.close()


# 获取用户课件学习进程
def get_user_course_ware_progress(user_id, course_id):
    """
    获取用户视频学习进程
    :return:
    """
    try:
        db = POOL.connection()
        res = None
        cursor = db.cursor(pymysql.cursors.DictCursor)
        # cursor = db.cursor()
        sql = sql_dict.get('get_user_course_ware_progress').format(user_id=user_id, course_id=course_id)
        # res = cursor.execute(sql)
        cursor.execute(sql)
        res = cursor.fetchall()
        return res
    except Exception as e:
        print(e)
        # if db:
        #     db.rollback()
        return res

    finally:
        if db:
            db.close()


# 获取课程的前置课程
def get_pre_course(course_id):
    """
    获取课程的前置课程
    :return:
    """
    try:
        db = POOL.connection()
        res = None
        cursor = db.cursor(pymysql.cursors.DictCursor)
        # cursor = db.cursor()
        sql = sql_dict.get('get_pre_course').format(course_id=course_id)
        # res = cursor.execute(sql)
        cursor.execute(sql)
        res = cursor.fetchall()
        return res
    except Exception as e:
        print(e)
        # if db:
        #     db.rollback()
        return res

    finally:
        if db:
            db.close()


# 获取与课程分类相同的课程
def get_same_type_course(course_id, len_course):
    """
   获取与课程分类相同的课程
    :return:
    """
    try:
        db = POOL.connection()
        res = None
        cursor = db.cursor(pymysql.cursors.DictCursor)
        # cursor = db.cursor()
        sql = sql_dict.get('get_same_type_course').format(course_id, course_id, len_course)
        # res = cursor.execute(sql)
        cursor.execute(sql)
        res = cursor.fetchall()
        return res
    except Exception as e:
        print(e)
        # if db:
        #     db.rollback()
        return res

    finally:
        if db:
            db.close()

# 判断用户是否收藏过该课程
def get_iscollection(user_id,course_id):
    """
   判断用户是否收藏过该课程
    :return:
    """
    try:
        db = POOL.connection()
        cursor = db.cursor()
        sql = sql_dict.get('get_iscollection').format(user_id=user_id, course_id=course_id)
        cursor.execute(sql)
        res=cursor.fetchone()
        return res[0]
    except Exception as e:
        print(e)
    finally:
        if db:
            db.close()
# ************************************************************************
# *************** 点击视频，添加 user_video ******************************
def insert_user_video(video_id,user_id):
    try:
        db = POOL.connection()
        cursor = db.cursor()
        sql = sql_dict.get('insert_user_video').format(video_id=video_id, user_id=user_id)
        res=cursor.execute(sql)
        db.commit()
        return res
    except Exception as e:
        print(e)
        if db:
            db.rollback()
    finally:
        if db:
            db.close()
# ************************************************************************
# *************** 点击课件，添加 user_courseware ******************************
def insert_user_courseware(courseware_id,user_id):
    try:
        db = POOL.connection()
        cursor = db.cursor()
        sql = sql_dict.get('insert_user_courseware').format(courseware_id=courseware_id, user_id=user_id)
        res=cursor.execute(sql)
        db.commit()
        return res
    except Exception as e:
        print(e)
        if db:
            db.rollback()
    finally:
        if db:
            db.close()



if __name__ == '__main__':
    ress=insert_user_courseware(2010,5)
    print(ress)
    if ress:
        print('成功')
    else:
        print('失败')
    # res=insert_user_video(1003,6)
    # print(res)
    # if res:
    #     print('成功')
    # else:
    #     print('失败')
    # res = get_course_info(200)
    # print(res)
    # res = get_course_num(200)
    # print(res)
    # res = get_course_collect_num(200)
    # print(res)
    # res = get_course_video(228)
    # print(res)
    # res = get_same_type_course(228, 3)
    # print(res)
    # res=select_user_integral(17)
    # print(res)
    # res=get_is_select_course(3,228)
    # print(res)
