from flask import Blueprint, request
from wxcloudrun.model import dbComment

comment = Blueprint("comment", __name__,url_prefix='/comment')


@comment.route('/select_comment',methods=['GET', 'POST'])
def return_note_comment():
    if request.method == 'GET':
        # note_id = request.form['note_id']  # form是POST时候用的
        note_id = request.args.get('note_id')
        com = dbComment()

