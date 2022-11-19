import logging
from sqlalchemy.exc import OperationalError
from wxcloudrun import db
from wxcloudrun.model import dbUser

# 初始化日志
logger = logging.getLogger('log')




def modify_user_name(id, new_name):
    """
    根据ID修改name的值
    """
    try:
        dbUser.query.filter_by(dbUser.id == id).updata({"user_name": new_name})
        db.session.commit() 
    except OperationalError as e:
        logger.info("query_counterbyid errorMsg= {} ".format(e))
        

def modify_user_sex(id, new_sex):
    """
    根据ID修改sex的值
    """
    try:
        dbUser.query.filter_by(dbUser.id == id).updata({"user_sex": new_sex})
        db.session.commit()
    except OperationalError as e:
        logger.info("query_counterbyid errorMsg= {} ".format(e))
