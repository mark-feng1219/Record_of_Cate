import json
from datetime import datetime
from flask import request,Blueprint
from wxcloudrun.follow.follow_function import return_user_follow, blogger_fans_add, fans_follow_add, add_follow, \
    cancel_follow
from wxcloudrun.model import dbFollow
from wxcloudrun.note.note_function import return_user_note, order_by_time
from wxcloudrun.user.user_function import return_id_name

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


#用户关注的所有博主发布的笔记中的最新五条
@follow.route('/newest_5', methods=['GET'])
def newest_5():
    user_id = request.args.get('user_id')
    user_followed = return_user_follow(user_id) #用户关注的所有博主
    note_newest = []

    for i in user_followed:
        blogger_note = return_user_note(i.user_id) #每个博主发布的所有笔记
        note_newest = note_newest + blogger_note

    note_newest.sort(key=lambda x: x.publisher_time, reverse=True)

    note_id_tmp = []
    publisher_id_tmp =[]
    publisher_name_tmp = []
    note_image_tmp  = []
    note_title_tmp = []

    count = 1
    for i in note_newest:
        if count > 5:
            break
        else:
            note_id_tmp.append(i.note_id)
            publisher_id_tmp.append(i.publisher_id)
            note_image_tmp.append(i.photo_path)
            note_title_tmp.append(i.title)
            count = count + 1

    for i in range(0, len(publisher_id_tmp)):
        id_name = return_id_name(publisher_id_tmp[i])
        publisher_name_tmp.append(id_name)

    res = {}
    note_id = {'note_id':note_id_tmp}
    publisher_id = {'publisher_id':publisher_id_tmp}
    publisher_name = {'publisher_name':publisher_name_tmp}
    note_image = {'note_image':note_image_tmp}
    note_title = {'note_title':note_title_tmp}

    res.update(note_id)
    res.update(publisher_id)
    res.update(publisher_name)
    res.update(note_image)
    res.update(note_title)

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


#用户关注的所有博主发布的笔记中的最新五条
@follow.route('/test', methods=['GET'])
def test():
    user_id = request.args.get('user_id')

    note_newest = return_user_note(user_id)

    note_newest.sort(key=lambda x:x.publisher_time,reverse = True)

    note_id_tmp = []
    publisher_id_tmp =[]
    publisher_name_tmp = []
    note_image_tmp  = []
    note_title_tmp = []


    for i in note_newest:
        note_id_tmp.append(i.note_id)
        publisher_id_tmp.append(i.publisher_id)
        note_image_tmp.append(i.photo_path)
        note_title_tmp.append(i.title)

    for i in range(0, len(publisher_id_tmp)):
        id_name = return_id_name(publisher_id_tmp[i])
        publisher_name_tmp.append(id_name)

    res = {}
    note_id = {'note_id':note_id_tmp}
    publisher_id = {'publisher_id':publisher_id_tmp}
    publisher_name = {'publisher_name': publisher_name_tmp}
    note_image = {'note_image': note_image_tmp}
    note_title = {'note_title': note_title_tmp}

    res.update(note_id)
    res.update(publisher_id)
    res.update(publisher_name)
    res.update(note_image)
    res.update(note_title)

    return json.dumps(res)



