from datetime import datetime

from wxcloudrun import db


class dbNote(db.Model):
    __tablename__ = 'note'

    note_id = db.Column('note_id', db.String(20), nullable=False, primary_key=True)
    publisher_id = db.Column('publisher_id', db.String(20), nullable=False)
    publisher_time = db.Column('publish_time', db.TIMESTAMP, nullable=False, default=datetime.now())
    content = db.Column('content', db.Text, nullable=True)
    photo_path = db.Column('photo_path', db.Text, nullable=True)
    likes_num = db.Column('likes_num', db.Integer, nullable=False, default=0)


class dbUser(db.Model):
    __tablename__ = 'user_info'
    user_id = db.Column('user_id', db.String(20), nullable=False, primary_key=True)
    user_name = db.Column('user_name', db.String(20), nullable=False)
    head_image_path = db.Column('head_image_path', db.String(100), nullable=False)
    user_sex = db.Column('user_sex', db.String(4), default='保密')
    likes_num = db.Column('likes_num', db.Integer, nullable=False, default=0)
    follow_num = db.Column('follow_num', db.Integer, nullable=False, default=0)
    fans_num = db.Column('fans_num', db.Integer, nullable=False, default=0)


class dbComment(db.Model):
    __tablename__ = 'comments'
    comment_id = db.Column('comment_id', db.String(20), nullable=False, primary_key=True)
    comment_publisher_id = db.Column('comment_publisher_id', db.String(20), nullable=False, primary_key=True)
    comment_publish_time = db.Column('comment_publish_time', db.TIMESTAMP, nullable=False, default=datetime.now())
    comment_content = db.Column('comment_content', db.Text, nullable=True)
class Counters(db.Model):
    # 设置结构体表格名称
    __tablename__ = 'Counters'

    # 设定结构体对应表格的字段
    id = db.Column(db.Integer, primary_key=True)
    count = db.Column(db.Integer, default=1)
    created_at = db.Column('createdAt', db.TIMESTAMP, nullable=False, default=datetime.now())
    updated_at = db.Column('updatedAt', db.TIMESTAMP, nullable=False, default=datetime.now())