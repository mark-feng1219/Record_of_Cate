import json
from datetime import datetime
from flask import request,Blueprint
from run import app
from wxcloudrun.note.notedao import insert_note, like_add_1, add_support, delete_support, like_delete_1, delete_content, \
    test_class, return_user_newest, blogger_newest, return_like_note
from wxcloudrun.model import dbNote, dbSupport, dbFollow

note = Blueprint("note", __name__)

@note.route('/')
def index():
    """
    :return: 返回index页面
    """
    return 'note_bp_index'

#为了测试 所有的post请求暂时用get替代

#点赞或取消点赞
@note.route('/note/operate_note',methods=['GET'])
def operate_note():
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

        return res_note + '\n' + res_user

    if choice == "delete":
        # note的点赞数+1
        res_note = like_delete_1(note_id)
        #support表删除记录
        res_user = delete_support(note_id, user_id)
        return res_note + "\n" + res_user

#删除笔记
@note.route('/note/delete_user_note',methods=['GET'])
def delete_user_note():
    note_id = request.args.get('note_id')

    res = delete_content(note_id)

    return res

#上传笔记
@note.route('/note/upload_user_note', methods=['POST'])
def upload_user_note():
    note = dbNote()
    note.publisher_id = request.form['publisher_id']
    note.note_id = request.form['note_id']
    note.publisher_time = datetime.now()
    note.photo_path = request.form['photo_path']
    note.content = request.form['content']
    res = insert_note(note)

    test = {"status": res}
    return json.dumps(test)
    # 多行
    #json.dumps(test, indent=2, sort_keys=True, ensure_ascii=False)

#用于测试
@note.route('/note/test', methods=['GET'])
def test():
    user_id = request.args.get('user_id')

    res = test_class(user_id)

    test = {"result": res}

    return json.dumps(test)

#返回关注博主的最新笔记
@note.route('/note/select_newest', methods=['GET'])
def select_newest():
    fans_id = request.args.get('user_id')
    newest_note = blogger_newest(fans_id)

    s = [i.content for i in newest_note]
    return json.dumps(s)

#返回选中用户的笔记
@note.route('/note/user_note', methods=['GET'])
def FocusUser_newest():
    user_id = request.args.get('user_id')
    user_newest = return_user_newest(user_id)
    s = [i.content for i in user_newest]
    return json.dumps(s)

# 我的笔记
@note.route('/note/myNote', methods=['GET'])
def reurn_myNote():
    user_id = request.args.get('user_id')
    user_newest = return_user_newest(user_id)
    s = [i.content for i in user_newest]
    return json.dumps(s)

#我的点赞
@note.route('/note/myLikes', methods=['GET'])
def return_myLikes():
    user_id = request.args.get('user_id')
    like_note = return_like_note(user_id)
    s = [i.content for i in like_note]
    return json.dumps(s)