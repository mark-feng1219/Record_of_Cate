import json
import logging
import random
from flask import Blueprint, request
from sqlalchemy import and_, TIMESTAMP, desc, func

from wxcloudrun.model import dbNote, dbSupport, dbFollow
from wxcloudrun.support.support_function import return_like_note

# 初始化日志

logger = logging.getLogger('log')

recommend = Blueprint("recommend", __name__, url_prefix='/recommend')


# 随机推荐算法
# 有点赞，则在点赞中抽取一片笔记返回
# 无点赞，返回点赞最多的10篇笔记中任意一篇
@recommend.route('/')
def recommendFunc():
    user_id = request.args.get('user_id')
    like_note = return_like_note(user_id)  # 数组类型
    if len(like_note) > 0:
        for i in like_note:
            print(i)
        randomNum = random.randint(0, len(like_note) - 1)
        # print(randomNum)
        photoPath = dbNote.query.filter(dbNote.note_id == like_note[randomNum].note_id).first().photo_path

    else:
        photoPath = ''
        res = dbNote.query.order_by(desc(dbNote.likes_num)).all()
        randomNum = random.randint(0, 10)
        photoPath = res[randomNum].photo_path
        while photoPath is not None:
            randomNum = random.randint(0, 10)
            photoPath = res[randomNum].photo_path
    return photoPath


# 首页推荐  兜底按时间排序
@recommend.route('/index')
def index_rec():
    like_note = dbNote.query.order_by(desc(dbNote.publish_time))

    res = {}
    title_tmp = []
    photo_path_tmp = []
    note_id_tmp = []
    publish_time_tmp = []

    for i in like_note:
        title_tmp.append(i.title)
        photo_path_tmp.append(i.photo_path)
        note_id_tmp.append(i.note_id)
        publish_time_tmp.append(str(i.publish_time))

    title = {'title': title_tmp}
    photo_path = {'photo_path': photo_path_tmp}
    note = {'note_id': note_id_tmp}
    publish_time = {'publish_time' : publish_time_tmp}
    # comment = {'comment': comment_tmp}

    res.update(title)
    res.update(photo_path)
    res.update(note)
    res.update(publish_time)

    return json.dumps(res)
