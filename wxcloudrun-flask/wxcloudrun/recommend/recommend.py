import json
import logging
import random
from flask import Blueprint, request
from sqlalchemy import desc
from wxcloudrun.model import dbNote, dbUser

# 初始化日志
logger = logging.getLogger('log')

recommend = Blueprint("recommend", __name__, url_prefix='/recommend')

#首页推荐，获得note_id_lastest、note_id_earliest
#返回十条
@recommend.route('/index', methods=['GET'])
def index():
    times = int(request.args.get('times'))
    note_id_lastest = request.args.get('note_id_lastest')
    note_id_earliest = request.args.get('note_id_earliest')

    all_note = dbNote.query.order_by(desc(dbNote.publish_time)).all()

    res = {}
    note_id_tmp =[]
    note_image_tmp = []
    note_title_tmp = []
    user_head_tmp = []
    user_name_tmp = []
    user_id_tmp = []


    #首次点击，返回最新的十条，应该确保数据库中的笔记大于100条
    if times == 0:
        the_10 = all_note[0:10]
    else:
        the_later = dbNote.query.filter(dbNote.note_id > note_id_lastest).all()
        later_count = len(the_later)

        if later_count >= 10:
            the_10 = the_later[later_count-10:]
        else:
            the_earlier_all = dbNote.query.filter(dbNote.note_id < note_id_earliest).all()
            the_earlier = the_earlier_all[0:10 - later_count]
            the_10 = the_later + the_earlier

    for i in the_10:
        note_id_tmp.append(i.note_id)
        note_image_tmp.append(i.photo_path)
        note_title_tmp.append(i.title)
        publisher = dbUser.query.filter(dbUser.user_id == i.publisher_id).first()
        user_head_tmp.append(publisher.head_image_path)
        user_name_tmp.append(publisher.user_name)
        user_id_tmp.append(publisher.user_id)

    note_id = {'note_id':note_id_tmp}
    note_image = {'note_image':note_image_tmp}
    note_title = {'note_title':note_title_tmp}
    user_id = {'user_id':user_id_tmp}
    user_name = {'user_name':user_name_tmp}
    user_head = {'user_head':user_head_tmp}

    res.update(note_id)
    res.update(note_image)
    res.update(note_title)
    res.update(user_id)
    res.update(user_name)
    res.update(user_head)

    return json.dumps(res)


@recommend.route('/order_for_me', methods=['GET'])
#从所有数据中随机
def order_for_me():
    all_note = dbNote.query.order_by(desc(dbNote.publish_time)).all()
    all_num = len(all_note)
    chosen = random.randint(0, all_num)
    res = all_note[chosen]
    res_photo = res.photo_path

    return json.dumps(res_photo)


