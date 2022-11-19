import json
from datetime import datetime
from flask import request,Blueprint
from run import app
from wxcloudrun.note.notedao import insert_note, like_add_1, add_support, delete_support, like_delete_1, delete_content
from wxcloudrun.model import dbNote, dbSupport


note = Blueprint("note", __name__)


@note.route('/')
def index():
    """
    :return: 返回index页面
    """
    return 'note_bp_index'

#为了测试 所有的post请求暂时用get替代

@note.route('/note/operate_note',methods=['GET']) #应该只有post
def operate_note():
    #user_id = request.form['user_id']
    #note_id = request.form['note_id']
    #choice = request.form['choice']
    user_id = request.args.get('user_id')
    note_id = request.args.get('note_id')
    choice = request.args.get('choice')
    if choice == "insert":
        # note的点赞数+1
        res_note = like_add_1(note_id)
        # support表增加记录
        support = dbSupport()
        support.note_id = note_id
        support.user_id = user_id
        res_user = add_support(support)

        return res_note + "/n" + res_user

    if choice == "delete":
        # note的点赞数+1
        res_note = like_delete_1(note_id)
        #support表删除记录
        res_user = delete_support(note_id,user_id)
        return res_note + "/n" + res_user

@note.route('/note/delete_user_note',methods=['GET']) #应该为post
def delete_user_note():
    #user_id = request.form['user_id']
    #note_id = request.form['note_id']
    #user_id = request.args.get('user_id')
    note_id = request.args.get('note_id')

    res = delete_content(note_id)

    return res


@note.route('/note/upload_user_note', methods=['GET']) #应该为post
def upload_user_note():
    note = dbNote()
    # data['user_id'] = request.form['user_id']
    # data['note_id'] = request.form['note_id']
    # data['image_path'] = request.form['image_path']
    # data['content'] = request.form['content']
    note.note_id = request.args.get('note_id')
    note.publisher_id = request.args.get('user_id')
    note.publisher_time = datetime.now()
    note.content = request.args.get('content')
    note.photo_path = request.args.get('image_path')

    res = insert_note(note)

    return res

