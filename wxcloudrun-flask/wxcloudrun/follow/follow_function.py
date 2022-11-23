import logging

from sqlalchemy import and_, TIMESTAMP, desc
from sqlalchemy.exc import OperationalError
from wxcloudrun import db
from wxcloudrun.model import dbNote, dbSupport, dbFollow, dbUser

# 初始化日志
logger = logging.getLogger('log')

# blogger的粉丝数+1
def blogger_fans_add(blogger_id):
    try:
        dbUser.query.filter(dbUser.user_id == blogger_id).update({'fans_num': dbUser.fans_num + 1})
        db.session.commit()
        return True

    except OperationalError as e:
        logger.info("fans_follow_add errorMsg= {} ".format(e))

# fans的关注数+1
def fans_follow_add(fans_id):
    try:
        dbUser.query.filter(dbUser.user_id == fans_id).update({'follow_num':dbUser.follow_num+1})
        db.session.commit()
        return True

    except OperationalError as e:
        logger.info("fans_follow_add errorMsg= {} ".format(e))

#follow表增加记录
def add_follow(dbFollow):
    try:
        db.session.add(dbFollow)
        db.session.commit()
        return True
    except OperationalError as e:
        logger.info("add_follow errorMsg= {} ".format(e))



# blogger的粉丝数-1
def blogger_fans_cancel(blogger_id):
    try:
        dbUser.query.filter(dbUser.user_id == blogger_id).update({'fans_num': dbUser.fans_num - 1})
        db.session.commit()
        return True

    except OperationalError as e:
        logger.info("blogger_fans_cancel errorMsg= {} ".format(e))

# fans的关注数-1
def fans_follow_cancel(fans_id):
    try:
        dbUser.query.filter(dbUser.user_id == fans_id).update({'follow_num':dbUser.follow_num - 1})
        db.session.commit()
        return True

    except OperationalError as e:
        logger.info("fans_follow_cancel errorMsg= {} ".format(e))

#follow表取消记录
def cancel_follow(blogger_id, fans_id):
    try:
        counter = dbFollow.query.filter(and_(dbFollow.blogger_id == blogger_id, dbFollow.fans_id == fans_id)).first()
        if counter is None:
            return False
        else:
            db.session.delete(counter)
            db.session.commit()
            return True

    except OperationalError as e:
        logger.info("cancel_follow errorMsg= {} ".format(e))



#返回用户关注的博主 dbUser类型
def return_user_follow(user_id):
    try:
        counter = dbFollow.query.filter(dbFollow.fans_id == user_id).all()

        if counter is None:
            return 'you have not followed any Blogger'
        else:
            tmp = []
            for i in range(0, len(counter)):
                res = dbUser.query.filter(dbUser.user_id == counter[i].blogger_id).first()
                tmp.append(res)
            return tmp

    except OperationalError as e:
        logger.info("return_user_follow errorMsg= {} ".format(e))
