import json
import logging
from datetime import datetime
from flask import request,Blueprint
from wxcloudrun.comment.comment_function import return_comment
from wxcloudrun.note.note_function import upload_note, return_user_note, return_note
from wxcloudrun.model import dbNote, dbUser

note = Blueprint("note", __name__, url_prefix='/note')

logger = logging.getLogger('log') #初始化日志


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


#返回我的所有笔记信息
@note.route('/mynote', methods=['GET'])
def mynote():

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

#搜索
@note.route('/search', methods=['GET'])
def search():
    key_words = request.args.get('key_words')
    res_note = dbNote.query.filter(dbNote.tag.in_([key_words])).all()

    res = {}
    note_id_tmp = []
    note_publisher_id_tmp = []
    note_title_tmp = []
    note_image_tmp = []
    publisher_name_tmp = []
    publisher_head_tmp = []

    for i in res_note:
        note_id_tmp.append(i.note_id)
        note_publisher_id_tmp.append(i.publisher_id)
        note_title_tmp.append(i.title)
        note_image_tmp.append(i.photo_path)
        publisher = dbUser.query.filter(dbUser.user_id == i.publisher_id).first()
        publisher_name_tmp.append(publisher.user_name)
        publisher_head_tmp.append(publisher.head_image_path)

    note_id = {'note_id':note_id_tmp}
    note_publisher_id = {'note_publisher_id':note_publisher_id_tmp}
    note_title = {'note_title':note_title_tmp}
    note_image = {'note_image':note_image_tmp}
    publisher_name = {'publisher_name':publisher_name_tmp}
    publisher_head = {'publisher_head':publisher_head_tmp}

    res.update(note_id)
    res.update(note_publisher_id)
    res.update(note_title)
    res.update(note_image)
    res.update(publisher_name)
    res.update(publisher_head)

    return json.dumps(res)





