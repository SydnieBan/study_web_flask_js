from . import POOL
# from app.dao.__init__ import POOL
import pymysql
from app.dao.sqls.course_sqls import sql_dict

# 获取所有方向
def get_all_directions():
    try:
        db=POOL.connection()
        cursor=db.cursor(pymysql.cursors.DictCursor)
        sql=sql_dict["get_all_directions"]
        cursor.execute(sql)
        res=cursor.fetchall()
        return res
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()

# 根据方向名获取方向id集合
def get_direction_id_by_name(direction):
    # direction为方向名，而不是方向id
    try:
        db = POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict["get_direction_id_by_name"].format(direction=direction)
        cursor.execute(sql)
        res = cursor.fetchall()
        return res
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()

# 根据方向名id获取分类
def get_types(direction_id):
    # direction为方向名，而不是方向id
    try:
        db=POOL.connection()
        cursor=db.cursor(pymysql.cursors.DictCursor)
        direction_id = int(direction_id)
        sql=sql_dict["get_types"].format(direction_id=direction_id) # 根据方向id获取其分类
        cursor.execute(sql)
        res=cursor.fetchall()
        return res
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()
# def get_all_types():
#     try:
#         db=POOL.connection()
#         cursor=db.cursor(pymysql.cursors.DictCursor)
#         sql=sql_dict["get_all_types"]
#         cursor.execute(sql)
#         res=cursor.fetchall()
#         return res
#     except Exception as ex:
#         print(ex)
#     finally:
#         if db:
#             db.close()

# 获取课程
def get_courses(direction,type,difficulty,page,page_items,flag):
    try:
        db=POOL.connection()
        cursor=db.cursor(pymysql.cursors.DictCursor)
        # sql=sql_dict["get_courses"].format(direction=direction,type=type,difficulty=difficulty,page=(page-1)*(page_items),page_items=page_items)
        flag=int(flag)
        if(flag==0): # 时间降序
            sql= sql_dict["get_all_courses"].format(direction=direction,type=type,difficulty=difficulty,page=(page-1)*(page_items),page_items=page_items)
        elif(flag==1): # 选课人数
            sql=sql_dict["get_all_courses_by_sc"].format(direction=direction,type=type,difficulty=difficulty,page=(page-1)*(page_items),page_items=page_items)
        elif(flag==2): # 收藏量
            sql =sql_dict["get_all_course_by_collection"].format(direction=direction,type=type,difficulty=difficulty,page=(page-1)*(page_items),page_items=page_items)
        cursor.execute(sql)
        res=cursor.fetchall()
        print(res)
        return res
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()

# 获取所有课程个数
def get_pages(direction,type,difficulty,page,page_items):
    try:
        db=POOL.connection()
        cursor=db.cursor()
        sql = sql_dict["get_pages"].format(direction=direction, type=type, difficulty=difficulty,page=(page - 1) * (page_items), page_items=page_items)
        cursor.execute(sql)
        res=cursor.fetchone()
        return res[0]
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()

# 获取精品课程
def get_uniquecourses(direction,type,difficulty,page,page_items,flag):
    try:
        db=POOL.connection()
        cursor=db.cursor(pymysql.cursors.DictCursor)
        # sql=sql_dict["get_uniquecourse"].format(direction=direction,type=type,difficulty=difficulty,page=(page-1)*(page_items),page_items=page_items)
        flag = int(flag)
        if (flag == 0):  # 时间降序
            sql = sql_dict["get_uniquecourse"].format(direction=direction, type=type, difficulty=difficulty,page=(page - 1) * (page_items), page_items=page_items)
        elif (flag == 1):  # 选课人数
            sql = sql_dict["get_uniquecourse_by_sc"].format(direction=direction, type=type, difficulty=difficulty,page=(page - 1) * (page_items), page_items=page_items)
        elif (flag == 2):  # 收藏量
            sql = sql_dict["get_uniquecourse_by_collection"].format(direction=direction, type=type, difficulty=difficulty,page=(page - 1) * (page_items), page_items=page_items)
        cursor.execute(sql)
        res=cursor.fetchall()
        return res
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()
# 获取精品课程个数
def get_uniquepages(direction,type,difficulty):
    try:
        db=POOL.connection()
        cursor=db.cursor()
        sql=sql_dict["get_uniquepages"].format(direction=direction,type=type,difficulty=difficulty)
        cursor.execute(sql)
        res=cursor.fetchone()
        return res[0]
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()
# 获取免费课程
def get_free_course(direction,type,difficulty,page,page_items,flag):
    try:
        db=POOL.connection()
        cursor=db.cursor(pymysql.cursors.DictCursor)
        # sql=sql_dict["get_free_course"].format(direction=direction,type=type,difficulty=difficulty,page=(page-1)*(page_items),page_items=page_items)
        flag = int(flag)
        if (flag == 0):  # 时间降序
            sql = sql_dict["get_free_course"].format(direction=direction, type=type, difficulty=difficulty,page=(page - 1) * (page_items), page_items=page_items)
        elif (flag == 1):  # 选课人数
            sql = sql_dict["get_free_course_by_sc"].format(direction=direction, type=type, difficulty=difficulty,page=(page - 1) * (page_items), page_items=page_items)
        elif (flag == 2):  # 收藏量
            sql = sql_dict["get_free_course_by_collection"].format(direction=direction, type=type, difficulty=difficulty,page=(page - 1) * (page_items), page_items=page_items)
        cursor.execute(sql)
        res=cursor.fetchall()
        return res
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()
# 获取免费课程个数
def get_free_pages(direction,type,difficulty):
    try:
        db=POOL.connection()
        cursor=db.cursor()
        sql=sql_dict["get_free_pages"].format(direction=direction,type=type,difficulty=difficulty)
        cursor.execute(sql)
        res=cursor.fetchone()
        return res[0]
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()
# 获取所有课程个数
def get_pages(direction,type,difficulty,page,page_items):
    try:
        db=POOL.connection()
        cursor=db.cursor()
        sql = sql_dict["get_pages"].format(direction=direction, type=type, difficulty=difficulty,page=(page - 1) * (page_items), page_items=page_items)
        cursor.execute(sql)
        res=cursor.fetchone()
        return res[0]
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()


# 点击某一分类获取方向
def get_direction_by_classify(type_id):
    try:
        db=POOL.connection()
        cursor=db.cursor(pymysql.cursors.DictCursor)
        # print(type_id)
        sql=sql_dict["get_direction_by_classify"].format(id=type_id)
        cursor.execute(sql)
        res=cursor.fetchall()
        return res
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()

# if __name__ == '__main__':
#     get_types('前端开发')
