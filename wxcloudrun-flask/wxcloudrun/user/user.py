from flask import request,Blueprint
import json
from wxcloudrun.user.userdao import update_user_info


user = Blueprint("user", __name__, url_prefix= '/user')

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






