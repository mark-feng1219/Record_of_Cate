from flask import request,Blueprint
import json
from wxcloudrun.model import dbUser
from wxcloudrun.user.WXBizDataCrypt import WXBizDataCrypt
from wxcloudrun.user.userdao import update_user_info, create_user
import requests
from config import APPID, SECRET

user = Blueprint("user", __name__, url_prefix= '/user')

@user.route('/code', methods=['GET','POST'])
def user_wxlogin():
    appid = APPID  # 开发者关于微信小程序的appid
    appsecret = SECRET  # 开发者关于微信小程序的appsecret

    iv = request.values.get('iv')   # 将前端json数据转为字典
    code =  request.values.get('code')  # 前端post过来的微信临时登录凭证code
    encrypteddata = request.values.get('encrypteddata')

    req_params = {
        'appid': appid,
        'secret': appsecret,
        'js_code': code,
        'grant_type': 'authorization_code'
    }
    wx_login_api = 'https://api.weixin.qq.com/sns/jscode2session'

    response_data = requests.get(wx_login_api, params=req_params)# 向api发起get请求

    resdata = response_data.json()

    openid = resdata['openid']  # 得到用户关于当前小程序的openid
    session_key = resdata['session_key']  # 得到用户关于当前小程序的会话密钥session_key
    pc = WXBizDataCrypt(appid, session_key)  # 对用户信息进行解密
    userinfo = pc.decrypt(encrypteddata, iv)  # 获得用户信息

    user = dbUser()
    user.user_id = openid
    user.user_name = list(userinfo.values())[0]
    user.user_sex = '男'if list(userinfo.values())[1]==0 else '女'
    res = create_user(user)

    return res



@user.route('/modify', methods=['GET','POST'])
def user_modify():
    # 寻找用户
    user_id = request.values.get('user_id')

    # 获取用户的最新信息
    head_image_path = request.values.get('head_image_path')
    user_name = request.values.get('user_name')
    user_sex = request.values.get('user_sex')
    user_motto = request.values.get('user_motto')

    #进行更新
    res = update_user_info(user_id, head_image_path, user_name, user_sex, user_motto)

    #返回状态
    status = {"status": res}
    return json.dumps(status)






