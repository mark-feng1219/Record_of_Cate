import json
import logging
from flask import request,Blueprint
from sqlalchemy import and_

from wxcloudrun.follow.follow_function import return_user_follow, blogger_fans_add, fans_follow_add, add_follow, \
    cancel_follow
from wxcloudrun.model import dbFollow
from wxcloudrun.note.note_function import return_user_note
from wxcloudrun.user.user_function import return_id_name

follow = Blueprint("follow", __name__, url_prefix='/follow')

logger = logging.getLogger('log') #初始化日志

#我的关注页面，返回关注的博主和最新的五条内容
@follow.route('/myfocus', methods=['GET'])
def myfocus():
    user_id = request.args.get('user_id')
    user_followed = return_user_follow(user_id) #用户关注的所有博主
    note_newest = []

    res = {}
    id_tmp = []
    user_head_tmp = []
    user_name_tmp = []
    note_id_tmp = []
    publisher_id_tmp =[]
    publisher_name_tmp = []
    note_image_tmp  = []
    note_title_tmp = []


    #所有关注的博主发布的所有笔记用note_newest存储(使用连接而不是append)
    for i in user_followed:
        id_tmp.append(i.user_id)
        user_head_tmp.append(i.head_image_path)
        user_name_tmp.append(i.user_name) # 每个博主的信息
        blogger_note = return_user_note(i.user_id)  # 每个博主发布的所有笔记
        note_newest = note_newest + blogger_note

    #按时间排序
    note_newest.sort(key=lambda x: x.publish_time, reverse=True)

    # 保存最新五条笔记的信息
    if len(note_newest) > 5:
        note_newest = note_newest[0:5]

    for i in note_newest:
        note_id_tmp.append(i.note_id)
        publisher_id_tmp.append(i.publisher_id)
        note_image_tmp.append(i.photo_path)
        note_title_tmp.append(i.title)

    #寻找发布id的name
    for i in range(0, len(publisher_id_tmp)):
        id_name = return_id_name(publisher_id_tmp[i])
        publisher_name_tmp.append(id_name)


    id = {'user_id':id_tmp}
    user_head = {"user_head":user_head_tmp}
    user_name = {'user_name':user_name_tmp}
    note_id = {'note_id': note_id_tmp}
    publisher_id = {'publisher_id': publisher_id_tmp}
    publisher_name = {'publisher_name': publisher_name_tmp}
    note_image = {'note_image': note_image_tmp}
    note_title = {'note_title': note_title_tmp}

    res.update(id)
    res.update(user_head)
    res.update(user_name)
    res.update(note_id)
    res.update(publisher_id)
    res.update(publisher_name)
    res.update(note_image)
    res.update(note_title)


    return json.dumps(res)


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

    #所有关注的博主发布的所有笔记用note_newest存储(使用连接而不是append)
    for i in user_followed:
        blogger_note = return_user_note(i.user_id) #每个博主发布的所有笔记
        note_newest = note_newest + blogger_note

    #按时间排序
    note_newest.sort(key=lambda x: x.publish_time, reverse=True)

    note_id_tmp = []
    publisher_id_tmp =[]
    publisher_name_tmp = []
    note_image_tmp  = []
    note_title_tmp = []


    # 保存最新五条笔记的信息
    if len(note_newest) > 5:
        note_newest = note_newest[0:5]

    for i in note_newest:
        note_id_tmp.append(i.note_id)
        publisher_id_tmp.append(i.publisher_id)
        note_image_tmp.append(i.photo_path)
        note_title_tmp.append(i.title)


    #寻找发布id的name
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

        #避免重复关注
        record = dbFollow.query.filter(and_(dbFollow.blogger_id == blogger_id, dbFollow.fans_id == fans_id)).first()
        if record is None:
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

        else:
            res = 'you have alredy followed'

        return json.dumps(res)


    if choice == "cancel":
        # blogger的粉丝数-1
        res_1 = blogger_fans_add(blogger_id)
        #fans的关注数-1
        res_2 = fans_follow_add(fans_id)
        #support表删除记录
        res_3 = cancel_follow(blogger_id, fans_id)

        if res_1 and res_2 and res_3:
            res = 'cancel success'
        else:
            res = 'failed'

        return json.dumps(res)


#用于测试
@follow.route('/test', methods=['GET'])
def test():
    user_id = request.args.get('user_id')

    note_newest = return_user_note(user_id)

    note_newest.sort(key=lambda x:x.publisher_time,reverse = True)

    note_id_tmp = []
    publisher_id_tmp =[]
    publisher_name_tmp = []
    note_image_tmp = []
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



