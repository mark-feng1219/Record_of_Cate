from datetime import datetime
from wxcloudrun import db


class dbNote(db.Model):
    __tablename__ = 'note'
    note_id = db.Column('note_id', db.String(30), nullable=False, primary_key=True)
    publisher_id = db.Column('publisher_id', db.String(20), nullable=False)
    publish_time = db.Column('publish_time', db.TIMESTAMP, nullable=False, default=datetime.now())
    content = db.Column('content', db.Text, nullable=False)
    photo_path = db.Column('photo_path', db.Text, nullable=False)
    likes_num = db.Column('likes_num', db.Integer, nullable=False, default=0)
    title = db.Column('title', db.String(40), nullable=False, default='')
    tag = db.Column('tag', db.String(15), default='')


class dbUser(db.Model):
    __tablename__ = 'user_info'
    user_id = db.Column('user_id', db.String(50), nullable=False, primary_key=True)
    user_name = db.Column('user_name', db.String(20), nullable=False)
    head_image_path = db.Column('head_image_path', db.String(255), nullable=False,default='')
    user_sex = db.Column('user_sex', db.String(4), default='保密')
    likes_num = db.Column('likes_num', db.Integer, nullable=False, default=0)
    follow_num = db.Column('follow_num', db.Integer, nullable=False, default=0)
    fans_num = db.Column('fans_num', db.Integer, nullable=False, default=0)
    user_motto = db.Column('user_motto', db.Text, nullable=False, default='这个人很懒~，什么都没留下')


class dbComment(db.Model):
    __tablename__ = 'comments'
    comment_id = db.Column('comment_id', db.String(20), nullable=False, primary_key=True)
    comment_publisher_id = db.Column('comment_publisher_id', db.String(50), nullable=False, primary_key=True)
    comment_publish_time = db.Column('comment_publish_time', db.TIMESTAMP, nullable=False, default=datetime.now())
    comment_content = db.Column('comment_content', db.Text, nullable=True)
    publishAt_note_id = db.Column('publishAt_note_id', db.String(20), nullable=False)



class dbFollow(db.Model):
    __tablename__ = 'follow'
    blogger_id = db.Column('blogger_id', db.String(50), nullable=False, primary_key=True)
    fans_id = db.Column('fans_id', db.String(50), nullable=False, primary_key=True)


class dbSupport(db.Model):
    __tablename__ = 'user_likes_note'
    note_id = db.Column('note_id', db.String(30), nullable=False, primary_key=True)
    user_id = db.Column('user_id', db.String(50), nullable=False, primary_key=True)
    like_time = db.Column('like_time', db.TIMESTAMP, nullable=False, default=datetime.now())


class Counters(db.Model):
    # 设置结构体表格名称
    __tablename__ = 'Counters'

    # 设定结构体对应表格的字段
    id = db.Column(db.Integer, primary_key=True)
    count = db.Column(db.Integer, default=1)
    created_at = db.Column('createdAt', db.TIMESTAMP, nullable=False, default=datetime.now())
    updated_at = db.Column('updatedAt', db.TIMESTAMP, nullable=False, default=datetime.now())
