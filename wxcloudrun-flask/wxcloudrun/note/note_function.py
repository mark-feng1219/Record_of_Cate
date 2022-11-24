import logging
from sqlalchemy import and_, TIMESTAMP, desc
from sqlalchemy.exc import OperationalError
from wxcloudrun import db
from wxcloudrun.model import dbNote, dbSupport, dbFollow

# 初始化日志
logger = logging.getLogger('log')

#上传笔记
def upload_note(dbNote):
    try:
        db.session.add(dbNote)
        db.session.commit()
        return "upload_note success"
    except OperationalError as e:
        logger.info("insert_note errorMsg= {} ".format(e))


#返回用户的笔记,返回值dbNote类型构成的list
def return_user_note(user_id):
    try:
        counter = dbNote.query.filter(dbNote.publisher_id == user_id).order_by(desc(dbNote.publish_time)).all()
        if counter is None:
            return 'failed'
        else:
            return counter
    except OperationalError as e:
        logger.info("return_user_newest errorMsg= {}".format(e))


#返回笔记信息，返回值dbNote类型
def return_note(note_id):
    try:
        counter = dbNote.query.filter(dbNote.note_id == note_id).first()
        if counter is None:
            return 'failed'
        else:
            return counter
    except OperationalError as e:
        logger.info("return_note errorMsg= {} ".format(e))










