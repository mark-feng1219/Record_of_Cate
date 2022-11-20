import logging
from wxcloudrun import db
from wxcloudrun.model import dbComment, dbNote
from sqlalchemy.exc import OperationalError

logger = logging.getLogger('log')     # 初始化日志

'''
对数据库的所有操作
'''
def return_comment(note_id):
    try:
        counter = dbComment.query.filter(dbComment.publishAt_note_id == note_id).all()
        if counter is None:
            return 'failed'
        else:
            return counter
    except OperationalError as e:
        logger.info("return_comment errorMsg= {} ".format(e))


def return_note(note_id):
    try:
        counter = dbNote.query.filter(dbNote.note_id == note_id).first()
        if counter is None:
            return 'failed'
        else:
            return counter
    except OperationalError as e:
        logger.info("return_note errorMsg= {} ".format(e))


def insert_comment(new_comment):
    try:
        db.session.add(new_comment)
        db.session.commit()
        return "success"
    except OperationalError as e:
        logger.info("insert_comment errorMsg= {} ".format(e))
        return "failure"
