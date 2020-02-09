"""
    作者：zxr
    日期：2019/9/5 9:33
    工具：PyCharm
    Python版本：3.6.5
"""
# from . import POOL
import pymysql
from app.dao.__init__ import POOL

from app.dao.sqls.home_sqls import sql_dict

# 获取新手免费课程
def get_free_courses():
    try:
        db=POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql=sql_dict["get_part_courses"]
        cursor.execute(sql)
        res=cursor.fetchall()
        return res
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()

#获取新上好课
def get_good_courses():
    try:
        db=POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql=sql_dict["get_gd_courses"]
        cursor.execute(sql)
        res=cursor.fetchall()
        return res
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()

# 获取精品课程
def get_head_uniquecourse():
    try:
        db=POOL.connection()
        cursor=db.cursor(pymysql.cursors.DictCursor)
        sql=sql_dict["get_head_uniquecourse"]
        cursor.execute(sql)
        res=cursor.fetchall()
        return res
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()

# 获取技术提升课程
def get_promate():
    try:
        db=POOL.connection()
        cursor=db.cursor(pymysql.cursors.DictCursor)
        sql=sql_dict["get_promate"]
        cursor.execute(sql)
        res=cursor.fetchall()
        return res
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()


# 获取实战课程
def get_combat():
    try:
        db=POOL.connection()
        cursor=db.cursor(pymysql.cursors.DictCursor)
        sql=sql_dict["get_promatelessons"]
        cursor.execute(sql)
        res=cursor.fetchall()
        return res
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()

# 获取老师
def get_teacher():
    try:
        db=POOL.connection()
        cursor=db.cursor(pymysql.cursors.DictCursor)
        sql=sql_dict["get_teacher"].format(start_id=3023,end_id=3032)
        cursor.execute(sql)
        res=cursor.fetchall()
        return res
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()