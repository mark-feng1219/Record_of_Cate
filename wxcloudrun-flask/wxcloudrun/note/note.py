import json
import logging
from datetime import datetime
from flask import request,Blueprint
from wxcloudrun.comment.comment_function import return_comment
from wxcloudrun.note.note_function import upload_note, return_user_note, return_note
from wxcloudrun.model import dbNote

note = Blueprint("note", __name__, url_prefix='/note')

logger = logging.getLogger('log') #初始化日志

@note.route('/')
def index():
    """
    :return: 返回index页面
    """
    return 'note_bp_index'


#上传笔记
@note.route('/upload_user_note', methods=['POST'])
def upload_user_note():
    note = dbNote() #创建新的笔记

    note.publish_time = datetime.now()
    note.publisher_id = request.json.get('publisher_id')
    note.note_id = request.json.get('note_id')
    note.title = request.json.get('title')
    note.photo_path = request.json.get('photo_path')
    note.content = request.json.get('content')
    note.tag = request.json.get('tag')

    res = upload_note(note)

    status = {"status": res}
    return json.dumps(status)
    # 多行
    #json.dumps(test, indent=2, sort_keys=True, ensure_ascii=False)


#返回选中用户的笔记
@note.route('/user_note', methods=['GET'])
def user_note():

    user_id = request.args.get('user_id')
    user_newest = return_user_note(user_id)

    res = {}
    title_tmp = []
    photo_path_tmp = []
    note_id_tmp = []

    for i in user_newest:
        title_tmp.append(i.title)
        photo_path_tmp.append(i.photo_path)
        note_id_tmp.append(i.note_id)

    title = {'title': title_tmp}
    photo_path = {'photo_path': photo_path_tmp}
    note = {'note_id':note_id_tmp}

    res.update(title)
    res.update(photo_path)
    res.update(note)

    return json.dumps(res)


#返回给定笔记内容和评论
@note.route('/note_details', methods=['GET'])
def note_details():
    note_id = request.args.get('note_id')
    res = {}

    comment = return_comment(note_id)
    note = return_note(note_id)

    comment_tmp = [i.comment_content for i in comment]

    note_content = {'note_content': note.content}
    comment_content = {'comment_content':comment_tmp}

    res.update(note_content)
    res.update(comment_content)

    return json.dumps(res)





