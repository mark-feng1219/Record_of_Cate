import logging
from sqlalchemy import and_
from sqlalchemy.exc import OperationalError
from wxcloudrun import db
from wxcloudrun.model import dbNote, dbSupport

# 初始化日志
logger = logging.getLogger('log')

def insert_note(dbNote):
    try:
        db.session.add(dbNote)
        db.session.commit()
        return "insert_note success"
    except OperationalError as e:
        logger.info("insert_note errorMsg= {} ".format(e))

def like_add_1(note_id):
    try:
        dbNote.query.filter(dbNote.note_id == note_id).update({'likes_num':dbNote.likes_num+1})
        db.session.commit()
        return "like_add_1 success"

    except OperationalError as e:
        logger.info("like_add_1 errorMsg= {} ".format(e))

def like_delete_1(note_id):
    try:
        dbNote.query.filter(dbNote.note_id == note_id).update({'likes_num': dbNote.likes_num - 1})
        db.session.commit()
        return "like_delete_1 success"

    except OperationalError as e:
        logger.info("like_delete_1 errorMsg= {} ".format(e))

def add_support(dbSupport):
    try:
        db.session.add(dbSupport)
        db.session.commit()
        return "add_support success"
    except OperationalError as e:
        logger.info("add_support errorMsg= {} ".format(e))

def delete_support(note_id,user_id):
    try:
        counter = dbSupport.query.filter(and_(dbSupport.note_id == note_id, dbSupport.user_id == user_id)).first()
        if counter is None:
            return "failed"
        else:
            db.session.delete(counter)
            db.session.commit()
            return "delete_support success"

    except OperationalError as e:
        logger.info("delete_support errorMsg= {} ".format(e))

def delete_content(note_id):
    try:
        counter = dbNote.query.filter(dbNote.note_id == note_id).first()
        if counter is None:
            return 'failed'
        else:
            db.session.delete(counter)
            db.session.commit()
            return "delete_content success"

    except OperationalError as e:
        logger.info("delete_content errorMsg= {} ".format(e))
        return  'failed'



