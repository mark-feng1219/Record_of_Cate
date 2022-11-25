import pytest
from TestForApp.data.test_comment_data import *

return_comment_data = get_return_comment_data()
@pytest.fixture(params=return_comment_data)
def initialize_return_comment(request):
    id = request.param['notes_id']
    expection = request.param['expected']
    print("\nstarting test on module:comment")
    print('笔记id:',id)
    print('预期返回值:',expection)
    yield id,expection
    print("\ntest finished")

insert_comment_data = get_insert_comment_data()
@pytest.fixture(params=insert_comment_data)
def initialize_insert_comment(request):
    print("\nstarting test on module:comment")
    comment_id = request.param['comment_id']
    comment_publisher_id = request.param['comment_publisher_id']
    comment_publish_time = request.param['comment_publish_time']
    comment_content = request.param['comment_content']
    publishAt_note_id = request.param['publishAt_note_id']
    print('评论id:',comment_id)
    print('评论者id:',comment_publisher_id)
    print('评论时间:',comment_publish_time)
    print('评论内容:',comment_content)
    print('笔记id:',publishAt_note_id)
    yield comment_id,comment_publisher_id,comment_publish_time,comment_content,publishAt_note_id
    print("\ntest finished")

@pytest.fixture()
def initialize_test_follow():
    print("starting test on module:follow")
    yield
    print('test finished')

@pytest.fixture()
def initialize_test_note():
    print("starting test on module:note")
    yield
    print('test finished')

@pytest.fixture()
def initialize_test_support():
    print("starting test on module:support")
    yield
    print('test finished')

@pytest.fixture()
def initialize_test_user():
    print("starting test on module:user")
    yield
    print('test finished')
