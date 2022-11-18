import logging

from sqlalchemy.exc import OperationalError

from wxcloudrun import db
from wxcloudrun.model import dbNote

# 初始化日志
logger = logging.getLogger('log')


def insert_note(dbNote):
    try:
        db.session.add(dbNote)
        db.session.commit()
        return "success"
    except OperationalError as e:
        return e._message()


