import pymysql
from app.dao.__init__ import POOL
from app.dao.sqls.note_sqls import sql_dict

# 查询个人笔记
def get_personal_notes(user_id):
    try:
        db=POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql=sql_dict["get_notes_by_id"].format(user_id=user_id)
        cursor.execute(sql)
        res=cursor.fetchall()
        return res
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()
# 删除个人笔记
def delete_personal_notes(user_id):
    try:
        db=POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql=sql_dict["delete_notes_by_id"].format(id=user_id)
        cursor.execute(sql)
        res=cursor.fetchone()
        db.commit()
        return res
    except Exception as ex:
        print(ex)
        if db:
            db.rollback()
    finally:
        if db:
            db.close()

# 写入笔记
def add_personal_notes(date):
    """
    写入笔记
    :return:
    """
    try:
        db = POOL.connection()
        res = None
        # cursor = db.cursor(pymysql.cursors.DictCursor)
        cursor = db.cursor()
        sql = sql_dict.get('add_personal_notes').format(date['title'],date['content_html'],date['content_editor'],'now()',date['user_id'],date['type'],date['mold'])
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

#
def display_note_by_noteid(note_id):
    try:
        db=POOL.connection()
        cursor = db.cursor(pymysql.cursors.DictCursor)
        sql=sql_dict["display_note_by_noteid"].format(note_id=note_id)
        cursor.execute(sql)
        res=cursor.fetchall()
        print(res)
        return res
    except Exception as ex:
        print(ex)
    finally:
        if db:
            db.close()
