import logging
from sqlalchemy.exc import OperationalError
from wxcloudrun import db
from wxcloudrun.model import dbUser

# 初始化日志
logger = logging.getLogger('log')


def update_user_info(user_id, head_image_path, user_name, user_sex, user_motto):
    try:
        dbUser.query.filter(dbUser.user_id == user_id).update({'head_image_path':head_image_path})
        dbUser.query.filter(dbUser.user_id == user_id).update({'user_name': user_name})
        dbUser.query.filter(dbUser.user_id == user_id).update({'user_sex': user_sex})
        dbUser.query.filter(dbUser.user_id == user_id).update({'user_motto': user_motto})
        db.session.commit()

        return "update_user_info success"

    except OperationalError as e:
        logger.info("return_user_info errorMsg= {}".format(e))


def search_id(openid):
    try:
        return dbUser.query.filter(dbUser.user_id == openid).first()

    except OperationalError as e:
        logger.info("search_id errorMsg= {}".format(e))


def create_user(dbUser):
    try:
        db.session.add(dbUser)
        db.session.commit()

    except OperationalError as e:
        logger.info("create_user errorMsg= {} ".format(e))


