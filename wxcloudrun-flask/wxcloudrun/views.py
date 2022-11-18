import json
from datetime import datetime
from flask import render_template, request
from run import app
from wxcloudrun.notedao import insert_note
from wxcloudrun.model import dbNote
from wxcloudrun.response import make_succ_empty_response, make_succ_response, make_err_response


@app.route('/')
def index():
    """
    :return: 返回index页面
    """
    return 'index'


@app.route('/note', methods=['GET', 'POST'])
def judge_opt():
    if request.method == 'POST':
        print(request.json)
        opt = request.form['opt']
        if opt == 'upload_user_note':
            data = {}
            data['user_id'] = request.form['user_id']
            data['note_id'] = request.form['note_id']
            data['image_path'] = request.form['image_path']
            data['content'] = request.form['content']

            return json.dumps(data)
    elif request.method == 'GET':
        opt = request.args.get('opt')
        if opt == 'upload_user_note':
            data = {}
            data['user_id'] = request.args.get('user_id')
            data['note_id'] = request.args.get('note_id')
            data['image_path'] = request.args.get('image_path')
            data['content'] = request.args.get('content')
            note = dbNote()
            note.note_id = request.args.get('note_id')
            note.publisher_id = request.args.get('user_id')
            note.publisher_time = datetime.now()
            note.content = request.args.get('content')
            note.photo_path = request.args.get('image_path')
            res = insert_note(note)
            return res
        else:
            return "note"

