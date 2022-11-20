import json
from datetime import datetime
from wxcloudrun.model import dbComment
from flask import Blueprint, request
from wxcloudrun.comment.commentdao import insert_comment, return_comment, return_note

comment = Blueprint("comment", __name__, url_prefix='/comment')

#用来展现评论内容
@comment.route('/return_note_comment', methods=['GET'])
def return_note_comment():
    note_id = request.args.get('note_id')
    res = {}

    comment = return_comment(note_id)
    note = return_note(note_id)

    comment_tmp = [i.comment_content for i in comment]

    note_content = {'note_content': note.content}
    comment_content = {'comment_content':comment_tmp}

    res.update(note_content)
    res.update(comment_content)


    return json.dumps(res)


@ comment.route('/insert_comment',methods=['GET'])  # 这个是错的,要用POST
def insert_note_comment():
    if request.method == 'GET':
        comment_ = dbComment()
        comment_.comment_id = request.args.get('comment_id')
        comment_.comment_publisher_id = request.args.get('comment_publisher_id')
        comment_.comment_publish_time = datetime.now()
        comment_.comment_content = request.args.get('comment_content')
        comment_.publishAt_note_id = request.args.get('publishAt_note_id')
        res = insert_comment(comment_)
        return res
    else:
        return "insert_comment failure"

# 测试的URL
# http://127.0.0.1:5000/comment/insert_comment?comment_id=1&comment_publisher_id=2&comment_content=%E6%88%91%E4%B8%8D%E6%98%AF&publishAt_note_id=3
