from . import POOL
# from app.dao.__init__ import POOL
import pymysql
from app.dao.sqls.search_sqls import sql_dict


# 根据搜索条件获取课程
def get_courses(search_con,page,page_items,flag):
    try:
        db=POOL.connection()
        cursor=db.cursor(pymysql.cursors.DictCursor)
        flag=int(flag)
        if(flag==0): # 时间降序
            sql= sql_dict["get_all_courses"].format(search_con=search_con,page=(page-1)*(page_items),page_items=page_items)
        elif(flag==1): # 选课人数
            sql=sql_dict["get_all_courses_by_sc"].format(search_con=search_con,page=(page-1)*(page_items),page_items=page_items)
        elif(flag==2): # 收藏量
            sql =sql_dict["get_all_course_by_collection"].format(search_con=search_con,page=(page-1)*(page_items),page_items=page_items)
        cursor.execute(sql)
        res=cursor.fetchall()
        return res
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()

# 根据搜索条件获取所有课程个数
def get_pages(search_con,page,page_items):
    try:
        db=POOL.connection()
        cursor=db.cursor()
        sql = sql_dict["get_pages"].format(search_con=search_con,page=(page-1)*(page_items),page_items=page_items)
        cursor.execute(sql)
        res=cursor.fetchone()
        return res[0]
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()
