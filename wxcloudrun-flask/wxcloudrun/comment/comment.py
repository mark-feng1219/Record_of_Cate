import json
import logging
from datetime import datetime
from wxcloudrun.model import dbComment
from flask import Blueprint, request
from wxcloudrun.comment.comment_function import insert_comment

logger = logging.getLogger('log') #初始化日志

comment = Blueprint("comment", __name__, url_prefix='/comment')


#发表评论
@comment.route('/insert_comment',methods=['POST'])
def insert_note_comment():

    comment = dbComment()#创建新评论
    comment.comment_id = request.args.get('comment_id')
    comment.comment_publisher_id = request.args.get('comment_publisher_id')
    comment.comment_publish_time = datetime.now()
    comment.comment_content = request.args.get('comment_content')
    comment.publishAt_note_id = request.args.get('publishAt_note_id')

    res = insert_comment(comment)
    status = {'status':res}
    return res



