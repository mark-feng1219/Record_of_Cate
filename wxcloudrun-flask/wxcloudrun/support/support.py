import json
import logging
from flask import request, Blueprint
from wxcloudrun.model import dbSupport
from wxcloudrun.support.support_function import delete_support, like_delete_1, like_add_1, add_support, \
    return_like_note, user_like_add, user_like_cancel

support = Blueprint("support", __name__, url_prefix='/support')

logger = logging.getLogger('log') #初始化日志

#点赞或取消点赞
@support.route('/operate_note',methods=['GET'])
def operate_note():
    user_id = request.args.get('user_id')
    note_id = request.args.get('note_id')
    choice = request.args.get('choice')
    if choice == "insert":
        # note的点赞数+1
        res_1 = like_add_1(note_id)

        #用户喜欢数+1
        res_2 = user_like_add(user_id)

        # support表增加记录
        support = dbSupport()
        support.note_id = note_id
        support.user_id = user_id
        res_3 = add_support(support)

        if res_1 and res_2 and res_3:
            res = 'like success'
        else:
            res = 'like failed'

        return json.dumps(res)

    if choice == "delete":
        # note的点赞数-1
        res_1 = like_delete_1(note_id)

        # 用户的喜欢数-1
        res_2 = user_like_cancel(user_id)

        # support表删除记录
        res_3 = delete_support(note_id, user_id)

        if res_1 and res_2 and res_3:
            res = 'cancel success'
        else:
            res = 'cancel failed'
        return json.dumps(res)

#返回用户点赞的笔记的信息
@support.route('/like_note_info',methods=['GET'])
def like_note_info():
    user_id = request.args.get('user_id')

    like_note = return_like_note(user_id)

    res = {}
    title_tmp = []
    photo_path_tmp = []
    note_id_tmp = []

    for i in like_note:
        title_tmp.append(i.title)
        photo_path_tmp.append(i.photo_path)
        note_id_tmp.append(i.note_id)

    title = {'title': title_tmp}
    photo_path = {'photo_path': photo_path_tmp}
    note = {'note_id':note_id_tmp}
    #comment = {'comment': comment_tmp}

    res.update(title)
    res.update(photo_path)
    res.update(note)

    return json.dumps(res)