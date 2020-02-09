from functools import wraps
from app.service.utils.token_util import check_token
from flask import request,redirect


def check_login(func):
    @wraps(func)
    def wrapper():
        token = request.headers.get('token')
        id = check_token(token)
        if id:
            return func()
        else:
            # redirect('/user/login/')
            return redirect('/user/please_login/')
    return wrapper