import logging
from wxcloudrun import db
from wxcloudrun.model import dbComment
from sqlalchemy.exc import OperationalError

logger = logging.getLogger('log')     # 初始化日志

'''
对数据库的所有操作
'''
def select_comment(note_id):
    try:
        # return note_id
        return dbComment.query.filter(dbComment.publishAt_note_id == str(note_id)).all()
    except OperationalError as e:
        logger.info("select_comment_by_id errorMsg= {} ".format(e))
        return None

def insert_comment(new_comment):
    try:
        db.session.add(new_comment)
        db.session.commit()
        return "success"
    except OperationalError as e:
        logger.info("insert_comment errorMsg= {} ".format(e))
        return "failure"
