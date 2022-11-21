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
#     note.publisher_id = request.args.get('publisher_id')  # 用GET绝对可以，就是不应该是GET，而是POST
#     note.note_id = request.args.get('note_id')
#     note.photo_path = request.args.get('photo_path')
#     note.content = request.args.get('content')
#     note.publisher_time = datetime.now()
    note.publisher_id = request.form.get('publisher_id')
    note.note_id = request.form.get('note_id')
    note.title = request.form.get('title')
    note.photo_path = request.form.get('photo_path')
    note.content = request.form.get('content')
    note.tag = request.form.get('tag')
    
    res = insert_note(note)

    test = {"status": res}
    return json.dumps(test)
    # 多行
    #json.dumps(test, indent=2, sort_keys=True, ensure_ascii=False)

# 用于测试微信云托管能否接收POST参数
@note.route('/note/receive_args',methods=['POST'])
def test_arg():
    user_id = request.form.get('user_id')
    return user_id

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

    res = {}
    title_tmp = []
    photo_path_tmp = []
    # content_tmp = []
    # comment_tmp = []
    note_id_tmp = []

    for i in user_newest:
        title_tmp.append(i.title)
        photo_path_tmp.append(i.photo_path)
        # content_tmp.append(i.content)
        note_id_tmp.append(i.note_id)
        # 找到每篇note对应的所有comment
        # note_coment = select_comment(i.note_id)
        # s = [r.comment_content for r in note_coment]
        # s = json.dumps(s)
        # comment_tmp.append(s)

    title = {'title': title_tmp}
    photo_path = {'photo_path': photo_path_tmp}
    # content = {'content': content_tmp}
    note = {'note_id':note_id_tmp}
    #comment = {'comment': comment_tmp}

    res.update(title)
    res.update(photo_path)
    # res.update(content)
    res.update(note)

    return json.dumps(res)

#我的点赞
@note.route('/note/myLikes', methods=['GET'])
def return_myLikes():
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


