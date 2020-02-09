from app.dao.sqls.courseware_sqls import sql_dict
from app.dao.__init__ import POOL
import pymysql


# 根据课件id获取课程名和id
def get_course_name(ware_id):
    """
    根据课件id获取课程名和id
    :return:
    """
    try:
        db = POOL.connection()
        res = None
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict.get('get_course_name').format(id=ware_id)
        cursor.execute(sql)
        res = cursor.fetchone()
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


# 获取课件的内容
def get_ware_content(ware_id):
    """
    获取课件的内容
    :return:
    """
    try:
        db = POOL.connection()
        res = None
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict.get('get_ware_content').format(id=ware_id)
        cursor.execute(sql)
        res = cursor.fetchone()
        return res
    except Exception as e:
        print(e)
        return res

    finally:
        if db:
            db.close()


# 获取课件的问题
def get_ware_question(ware_id):
    """
    获取课件的问题
    :return:
    """
    try:
        db = POOL.connection()
        res = None
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict.get('get_ware_question').format(id=ware_id)
        cursor.execute(sql)
        res = cursor.fetchall()
        return res
    except Exception as e:
        print(e)
        return res

    finally:
        if db:
            db.close()


# 用户添加课程问题
def add_ware_question(content, ware_id, user_id):
    """
    用户添加课程评论
    :return:
    """
    try:
        db = POOL.connection()
        res = None
        # cursor = db.cursor(pymysql.cursors.DictCursor)
        cursor = db.cursor()
        sql = sql_dict.get('add_ware_question').format(content, ware_id, user_id, 'NOW()')
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


# if __name__ == '__main__':
#     # res = get_ware_question(2001)
#     # print(res)
#     res = add_ware_question('我也是打酱油的',2001,1)
#     print(res)
