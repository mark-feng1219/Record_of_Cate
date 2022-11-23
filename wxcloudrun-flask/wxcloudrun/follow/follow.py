import json
from datetime import datetime
from flask import request,Blueprint
from wxcloudrun.follow.follow_function import return_user_follow, blogger_fans_add, fans_follow_add, add_follow, \
    cancel_follow
from wxcloudrun.model import dbFollow

follow = Blueprint("follow", __name__, url_prefix='/follow')

#用户所关注博主的信息
@follow.route('/focus_user_info', methods=['GET'])
def focus_user_info():
    user_id = request.args.get('user_id')
    user_followed = return_user_follow(user_id)

    res = {}
    id_tmp = []
    user_head_tmp = []

    for i in user_followed:
        id_tmp.append(i.user_id)
        user_head_tmp.append(i.head_image_path)

    id = {'user_id':id_tmp}
    user_head = {"user_head":user_head_tmp}

    res.update(id)
    res.update(user_head)

    return json.dumps(res)


#关注博主或者取消关注
@follow.route('/operate_user',methods=['GET'])
def operate_user():
    fans_id = request.args.get('fans_id')
    blogger_id = request.args.get('blogger_id')
    choice = request.args.get('choice')

    if choice == "follow":
        # blogger的粉丝数+1
        res_1 = blogger_fans_add(blogger_id)
        #fans的关注数+1
        res_2 = fans_follow_add(fans_id)
        # follow表增加记录
        follow = dbFollow()
        follow.blogger_id = blogger_id
        follow.fans_id = fans_id
        res_3= add_follow(follow)

        if res_1 and res_2 and res_3:
            res = 'follow success'
        else:
            res = 'failed'

        return json.dumps(res)


    if choice == "cancel":
        # blogger的粉丝数-1
        res_1 = blogger_fans_add(blogger_id)
        #fans的关注数-1
        res_2 = fans_follow_add(fans_id)
        #support表删除记录
        res_3 = cancel_follow(blogger_id, fans_id)

        if res_1 and res_2 and res_3:
            res = 'follow success'
        else:
            res = 'failed'

        return json.dumps(res)




