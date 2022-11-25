import logging
from sqlalchemy import and_, TIMESTAMP, desc, func
from sqlalchemy.exc import OperationalError
from wxcloudrun import db
from wxcloudrun.model import dbNote, dbSupport, dbFollow, dbUser

# 初始化日志
logger = logging.getLogger('log')


#笔记点赞数+1
def like_add_1(note_id):
    try:
        dbNote.query.filter(dbNote.note_id == note_id).update({'likes_num':dbNote.likes_num+1})
        db.session.commit()
        return True

    except OperationalError as e:
        logger.info("like_add_1 errorMsg= {} ".format(e))


#笔记点赞数-1
def like_delete_1(note_id):
    try:
        dbNote.query.filter(dbNote.note_id == note_id).update({'likes_num': dbNote.likes_num - 1})
        db.session.commit()
        return True

    except OperationalError as e:
        logger.info("like_delete_1 errorMsg= {} ".format(e))


#用户喜欢数+1
def user_like_add(user_id):
    try:
        dbUser.query.filter(dbUser.user_id == user_id).update({'likes_num':dbUser.likes_num+1})
        db.session.commit()
        return True

    except OperationalError as e:
        logger.info("user_like_add errorMsg= {} ".format(e))


#用户喜欢数-1
def user_like_cancel(user_id):
    try:
        dbUser.query.filter(dbUser.user_id == user_id).update({'likes_num':dbUser.likes_num-1})
        db.session.commit()
        return True

    except OperationalError as e:
        logger.info("user_like_cancel errorMsg= {} ".format(e))


#添加点赞信息
def add_support(dbSupport):
    try:
        db.session.add(dbSupport)
        db.session.commit()
        return  True
    except OperationalError as e:
        logger.info("add_support errorMsg= {} ".format(e))


#删除点赞信息
def delete_support(note_id, user_id):
    try:
        counter = dbSupport.query.filter(and_(dbSupport.note_id == note_id, dbSupport.user_id == user_id)).first()
        if counter is None:
            return "failed"
        else:
            db.session.delete(counter)
            db.session.commit()
            return True

    except OperationalError as e:
        logger.info("delete_support errorMsg= {} ".format(e))


#返回用户喜欢的笔记
def return_like_note(user_id):
    try:
        tmp = []
        counter = dbSupport.query.filter(dbSupport.user_id == user_id).order_by(desc(dbSupport.like_time)).all()
        if counter is None:
            return 'failed'
        else:
            for i in range(0, len(counter)):
                res = dbNote.query.filter(dbNote.note_id == counter[i].note_id).first()
                if res is not None:
                    tmp.append(res)
            return tmp

    except OperationalError as e:
        logger.info("return_like_note errorMsg= {} ".format(e))