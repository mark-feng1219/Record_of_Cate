import logging
from wxcloudrun import db
from wxcloudrun.model import dbComment
from sqlalchemy.exc import OperationalError

# 初始化日志
logger = logging.getLogger('log')

def select_comment():
    try:
        return dbComment.query.filter(dbComment)
    except OperationalError as e:
        return "select_comment failure"

# def query_counterbyid(id):
#     """
#     根据ID查询Counter实体
#     :param id: Counter的ID
#     :return: Counter实体
#     """
#     try:
#         return Counters.query.filter(Counters.id == id).first()
#     except OperationalError as e:
#         logger.info("query_counterbyid errorMsg= {} ".format(e))
#         return None