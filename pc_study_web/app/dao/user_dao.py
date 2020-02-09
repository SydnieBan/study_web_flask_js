# from . import POOL
from app.dao.__init__ import POOL
import pymysql
from app.dao.sqls.user_sqls import sql_dict

def insert_user(user):
    """
    用户注册
    :param user:
    :return:
    """
    try:
        db = POOL.connection()
        cursor = db.cursor()
        keys = ','.join(list(user.keys()))
        values = "','".join(list(user.values()))
        sql = sql_dict["insert_user"].format(key=keys, value=values, regist_date='NOW()')
        res = cursor.execute(sql)
        db.commit()
        return res
    except Exception as ex:
        print(ex)
        if db:
            db.rollback()
    finally:
        if db:
            db.close()

def get_password_by_id(id):
    """
    根据用户telephone 获取密码
    :param id:
    :return: *  即 id tel email psw register_time session_id
    """
    try:
        db = POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict["get_password_by_id"].format(id)
        cursor.execute(sql)
        res = cursor.fetchone()
        return res
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()

def get_user_by_id(tel):
    """
    根据用户 telephone 获取用户
    :param id:
    :return:
    """
    try:
        db = POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict["get_user_by_tel"].format(tel)
        cursor.execute(sql)
        res = cursor.fetchone()
        return res
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()


def chance_password_id(user):
    """
     修改用户密码
    :param user:
    :return:
    """
    try:
        db = POOL.connection()
        cursor = db.cursor()
        sql = sql_dict.get('chance_password_id').format(user['psw'],user['tel'])
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

# *******************************************************

def add_collect_id(user):
    """
    添加收藏
    :param user:
    :return:
    """
    try:
        db = POOL.connection()
        cursor = db.cursor()
        sql = sql_dict.get('add_collect_id').format(user["user_id"], user["position_id"])
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

def del_collcet_id(user):
    """
    取消收藏
    :param user:
    :return:
    """
    try:
        db = POOL.connection()
        cursor = db.cursor()
        sql = sql_dict.get('del_collcet_id').format(user['user_id'], user['position_id'])
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
#添加用户信息
def inster_change(user):
    """
    添加用户信息 user_info
    user_info = {
        "user_name": result2.tel,
        "user_id": result2.id
    };
    :param user:
    :return:
    """

    try:
        db = POOL.connection()
        cursor = db.cursor()
        sql = sql_dict["insert_change"].format(user_name=user['user_name'],user_id=user['user_id'],user_icon=user["user_icon"])
        res = cursor.execute(sql)
        db.commit()
        return res
    except Exception as ex:
        print(ex)
        if db:
            db.rollback()
    finally:
        if db:
            db.close()

# 修改用户信息
def update_change(user):
    """
    修改用户信息
    :param user:
    :return:
    """
    try:
        db = POOL.connection()
        cursor = db.cursor()
        sql = sql_dict["update_change"].format(user['name'],user['sex'],user['identity'],user['address'],user['introduce'],user['id'])
        res = cursor.execute(sql)
        db.commit()
        return res
    except Exception as ex:
        print(ex)
        if db:
            db.rollback()
    finally:
        if db:
            db.close()


#更新头像
def update_icon(user):
    """
    取消收藏
    :param user:
    :return:
    """
    try:
        db = POOL.connection()
        cursor = db.cursor()
        sql = sql_dict.get('update_icon').format(icon=user['user_icon'],tel=user['tel'])
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
#获取全部课程
def total_course(condition):
    try:
        db = POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict.get('total_course').format(id=condition['user_id'],index=(int(condition['page_index']) - 1) * 5)
        cursor.execute(sql)
        res = cursor.fetchall()
        return res

    except Exception as e:
        print(e)
    finally:
        if db:
            db.close()
# 全部课程分页
def get_total_num(user):

    try:
        db = POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict.get('get_total_num').format(id=user['user_id'])
        cursor.execute(sql)
        res=cursor.fetchone()
        return res
    except Exception as e:
        print(e)
    finally:
        if db:
            db.close()
# 未完成的课程
def on_course(user):

    try:
        db = POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict.get('on_course').format(tel=user['tel'],complete=user['complete'])
        cursor.execute(sql)
        res=cursor.fetchall()
        return res
    except Exception as e:
        print(e)
    finally:
        if db:
            db.close()


#完成的课程

def finished_course(user):

    try:
        db = POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict.get('finished_course').format(tel=user['tel'],complete=user['complete'])
        cursor.execute(sql)
        res=cursor.fetchall()
        return res
    except Exception as e:
        print(e)
    finally:
        if db:
            db.close()

def collect_course(user):

    try:
        db = POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict.get('collect_course').format(tel=user['tel'])
        cursor.execute(sql)
        res=cursor.fetchall()
        return res
    except Exception as e:
        print(e)
    finally:
        if db:
            db.close()
def get_information(user):
    try:
        db = POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict.get('get_information').format(id=user['id'])
        cursor.execute(sql)
        res=cursor.fetchone()
        return res
    except Exception as e:
        print(e)
    finally:
        if db:
            db.close()

# 用户签到功能：home页
def  insert_check_in(user_id):
    try:
        db = POOL.connection()
        cursor = db.cursor()
        sql = sql_dict.get('insert_check_in').format(user_id=user_id)
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
# ***********************************************
# 获取积分
def get_integral(user):
    try:
        db = POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict.get('get_integral').format(user['id'])
        cursor.execute(sql)
        res=cursor.fetchone()
        res['num']=int(res['num'])
        return res
    except Exception as e:
        print(e)
    finally:
        if db:
            db.close()
# 获取笔记数量
def get_notes(user):
    try:
        db = POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict.get('get_notes').format(user['id'])
        cursor.execute(sql)
        res=cursor.fetchone()
        return res
    except Exception as e:
        print(e)
    finally:
        if db:
            db.close()
# 获取用户id
def get_number(user):
    try:
        db = POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql = sql_dict.get('get_number').format(id=user['user_id'])
        cursor.execute(sql)
        res=cursor.fetchone()
        return res
    except Exception as e:
        print(e)
    finally:
        if db:
            db.close()
# 计算学习时长
def select_study_time(user_id):
    try:
        db = POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql1 = sql_dict.get('select_study_time_video').format(user_id=user_id)
        cursor.execute(sql1)
        res_video=cursor.fetchall()
        res=0
        for i in res_video:
            i['progress']=int(str(i['progress']).split(':')[0])*60*60+int(str(i['progress']).split(':')[1])*60+int(str(i['progress']).split(':')[2])
            res+=i['progress']
        sql2 = sql_dict.get('select_study_time_courseware').format(user_id=user_id)
        cursor.execute(sql2)
        res_courseware = cursor.fetchall()
        for j in res_courseware:
            j['courseware_time'] = int(str(j['courseware_time']).split(':')[0]) * 60 * 60 + int(str(j['courseware_time']).split(':')[1]) * 60 + int(str(j['courseware_time']).split(':')[2])
            res+=j['courseware_time']
        return res
    except Exception as e:
        print(e)
    finally:
        if db:
            db.close()

#添加头像地址到数据库
def add_img_to_icon(img_url):
    """
    添加头像地址到数据库
    :param url_img:
    :return:
    """
    try:
        db = POOL.connection()
        cursor = db.cursor()
        sql = sql_dict.get('add_img_to_icon').format(img_url=img_url)
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


#更新头像
def update_icon(user):
    """
    更新头像
    :param user:
    :return:
    """
    try:
        db = POOL.connection()
        cursor = db.cursor()
        sql = sql_dict.get('update_icon').format(img_url=user['img_url'],tel=user['tel'])
        print(sql)
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


# if __name__ == '__main__':
#     print(select_study_time(17))