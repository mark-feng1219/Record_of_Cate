from flask import Blueprint

comment = Blueprint("comment", __name__)


@comment.route('/comment')
def comment_op():
    return