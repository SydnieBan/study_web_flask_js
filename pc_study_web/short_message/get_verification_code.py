from short_message.zhenzismsclient import ZhenziSmsClient
import ssl
import json
ssl._create_default_https_context = ssl._create_unverified_context
import random

def get_verification_code(number):
    """
    给用户发送验证码并返回该验证码
    :return: 发给用户的验证码
    """
    apiUrl = 'https://sms_developer.zhenzikj.com'  # 请求地址
    appId = '102572'  # 应用id
    appSecret = 'dc754994-8b71-4c9f-b8fe-ce9787d6c60d'  # 应用密钥
    # number = '17864207686'  # 短信接收号码
    # number = '17805597200'  # 短信接收号码
    number=number

    # 生成4位随机数验证码
    verification_code = ''
    for i in range(1,5):
        verification_code += str(random.randint(0,9))
    message = '您的验证码为' + verification_code + '，有效时间为5分钟...'  # 短信内容
    messageId = 'StudyWeb'  # 短信唯一标识

    client = ZhenziSmsClient(apiUrl, appId, appSecret)
    res = client.send(number, message,messageId)

    res=json.loads(res)
    res["verification_code"]=verification_code
    return json.dumps(res)