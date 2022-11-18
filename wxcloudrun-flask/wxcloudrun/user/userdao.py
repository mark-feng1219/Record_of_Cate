import logging
from sqlalchemy.exc import OperationalError
from wxcloudrun import db
from wxcloudrun.model import dbUser

# 初始化日志
logger = logging.getLogger('log')


def query_counterbyid(id):
    """
    根据ID查询Counter实体
    :param id: Counter的ID
    :return: Counter实体
    """
    try:
        return dbUser.query.filter(dbUser.id == id).first()
    except OperationalError as e:
        logger.info("query_counterbyid errorMsg= {} ".format(e))
        return None


def delete_counterbyid(id):
    """
    根据ID删除Counter实体
    :param id: Counter的ID
    """
    try:
        counter = dbUser.query.get(id)
        if counter is None:
            return
        db.session.delete(counter)
        db.session.commit()
    except OperationalError as e:
        logger.info("delete_counterbyid errorMsg= {} ".format(e))


def insert_counter(counter):
    """
    插入一个Counter实体
    :param counter: Counters实体
    """
    try:
        db.session.add(counter)
        db.session.commit()
    except OperationalError as e:
        logger.info("insert_counter errorMsg= {} ".format(e))


def update_counterbyid(counter):
    """
    根据ID更新counter的值
    :param counter实体
    """
    try:
        counter = query_counterbyid(counter.id)
        if counter is None:
            return
        db.session.flush()
        db.session.commit()
    except OperationalError as e:
        logger.info("update_counterbyid errorMsg= {} ".format(e))


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