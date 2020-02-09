import jwt
from datetime import datetime, timedelta

# 私钥
SECRET_KEY = '2019-08-12'
# 过期时间
EXPIRE = 1800

def make_token(id):
    datetimeInt = datetime.utcnow() + timedelta(seconds=EXPIRE)
    # 载荷
    option = {
        "iss": "jobapp.com",  # token签发者
        "exp": datetimeInt,  # 过期时间
        "iat": datetime.utcnow(),
        "aud": "webkit",
        "id": id
    }
    token = jwt.encode(option, SECRET_KEY, 'HS256')
    return token

def check_token(token):
    id = None
    try:
        decoded = jwt.decode(token, SECRET_KEY, audience='webkit', algorithms=['HS256'])
        id = decoded.get('id')
    except jwt.ExpiredSignatureError as ese:
        print(ese)
    except Exception as ex:
        print(ex)
    finally:
        return id