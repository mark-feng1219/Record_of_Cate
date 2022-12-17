from flask import request, Blueprint
import json
import config
import logging
from wxcloudrun.model import dbUser
from wxcloudrun.user.WXBizDataCrypt import WXBizDataCrypt
from wxcloudrun.user.user_function import update_user_info, create_user, search_id

user = Blueprint("user", __name__, url_prefix='/user')

logger = logging.getLogger('log')  # 初始化日志


@user.route('/login', methods=['POST'])
def user_wxlogin():
    try:
        openid = request.json.get('openid')
        user_name = request.json.get('Nickname')
        user_sex = request.json.get('gender')
        head_image_path = request.json.get('head_image')

        search_res = search_id(openid)  # 数据库中寻找用户

        if search_res is None:
            user = dbUser()  # 创建新的用户
            user.user_id = openid
            user.user_name = user_name
            user.user_sex = '男' if user_sex == 0 else '女'
            user.head_image_path = head_image_path

            res = create_user(user)  # 数据添加到数据库中

            return res
        else:
            res = {}
            name = {'user_name': search_res.user_name}
            sex = {'user_sex': search_res.user_sex}
            head = {'user_head': search_res.head_image_path}
            motto = {'motto': search_res.user_motto}
            res.update(name)
            res.update(sex)
            res.update(head)
            res.update(motto)

            return json.dumps(res)

    except Exception as err:
        return err


@user.route('/secret', methods=['GET'])
def get_secret():
    return {'appid': config.APPID, 'secret': config.SECRET}


@user.route('/modify', methods=['POST'])
def user_modify():
    # 寻找用户
    user_id = request.json.get('user_id')

    # 获取用户的最新信息
    head_image_path = request.json.get('head_image_path')
    user_name = request.json.get('user_name')
    user_sex = request.json.get('user_sex')
    user_motto = request.json.get('user_motto')

    # 进行更新
    res = update_user_info(user_id, head_image_path, user_name, user_sex, user_motto)

    # 返回状态
    status = {"status": res}
    return json.dumps(status)
