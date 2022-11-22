from flask import request,Blueprint
import json
from wxcloudrun.model import dbUser
from wxcloudrun.user.WXBizDataCrypt import WXBizDataCrypt
from wxcloudrun.user.userdao import update_user_info, create_user, search_id
import urllib.parse
import urllib.request   # 注意会与flask的request冲突
# import requests
from config import APPID, SECRET

user = Blueprint("user", __name__, url_prefix= '/user')

@user.route('/code', methods=['POST'])
def user_wxlogin():
    iv = request.json.get('iv')   # 将前端json数据转为字典
    code = request.json.get('code')  # 前端post过来的微信临时登录凭证code
    encrypteddata = request.json.get('encrypteddata')

    appid = APPID  # 开发者关于微信小程序的appid
    appsecret = SECRET  # 开发者关于微信小程序的appsecret
#     req_params = {
#         'appid': appid,
#         'secret': appsecret,
#         'js_code': code,
#         'grant_type': 'authorization_code'
#     }
    wx_login_api = 'https://api.weixin.qq.com/sns/jscode2session'
    headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:6.0) Gecko/20100101 Firefox/6.0'}
    
    appid = urllib.parse.quote(appid)
    secret = urllib.parse.quote(appsecret)
    js_code = urllib.parse.quote(code)
    grant_type = urllib.parse.quote('authorization_code')
    data="appid="+appid+"&secret="+secret+"&js_code="+js_code+"&grant_type="+grant_type
    full_url = "http://api.weixin.qq.com/sns/jscode2session?"+ data
    
    req = urllib.request.Request(url=full_url,headers=headers)
    return {'iv':iv,'code':code}
#     res = request.urlopen(req)
#     response = res.read().decode('utf-8')

    
#     response_data = requests.get(wx_login_api, params=req_params,headers=headers) # 向api发起get请求
#     resdata = response_data.json()
    


#     openid = resdata['openid']  # 得到用户关于当前小程序的openid
#     session_key = resdata['session_key']  # 得到用户关于当前小程序的会话密钥session_key

#     pc = WXBizDataCrypt(appid, session_key)  # 对用户信息进行解密
#     userinfo = pc.decrypt(encrypteddata, iv)  # 获得用户信息

#     search_res = search_id(openid)  # 数据库中寻找用户

#     if search_res is None:
#         user = dbUser()  # 创建新的用户
#         user.user_id = openid
#         user.user_name = list(userinfo.values())[0]
#         user.user_sex = '男'if list(userinfo.values())[1]==0 else '女'
#         create_user(user)  # 数据添加到数据库中
#     else:
#         user = search_res  # 返回已存在的用户

#     res = {}
#     user_name = {'user_name': user.user_name}
#     head_image_path = {'head_image_path': user.head_image_path}
#     motto = {'motto': user.user_motto}

#     res.update(user_name)
#     res.update(head_image_path)
#     res.update(motto)

#     return json.dumps(res)


@user.route('/modify', methods=['POST'])
def user_modify():
    # 寻找用户
    user_id = request.json.get('user_id')

    # 获取用户的最新信息
    head_image_path = request.json.get('head_image_path')
    user_name = request.json.get('user_name')
    user_sex = request.json.get('user_sex')
    user_motto = request.json.get('user_motto')

    #进行更新
    res = update_user_info(user_id, head_image_path, user_name, user_sex, user_motto)

    #返回状态
    status = {"status": res}
    return json.dumps(status)






