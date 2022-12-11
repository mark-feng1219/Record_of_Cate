import pytest
import allure
from wxcloudrun.model import dbComment
from TestForApp.conftest import *
from wxcloudrun.comment.comment_function import return_comment
from wxcloudrun.comment.comment_function import insert_comment

return_comment_data = get_return_comment_data()
insert_comment_data = get_insert_comment_data()

@allure.feature('test module:comment')
@allure.story('test function:return_comment')
@pytest.mark.parametrize('initialize_return_comment',return_comment_data,indirect=True)
def test_return_comment(initialize_return_comment):
    a = initialize_return_comment
    note_id = a[0]
    expection = a[1]
    #print(note_id)
    #print(expection)
    re = return_comment(note_id)
    re = str(re)
    #print(re)
    assert re == expection

@allure.feature('test module:comment')
@allure.story('test function:insert_comment')
@pytest.mark.parametrize('initialize_insert_comment',insert_comment_data,indirect=True)
def test_insert_comment(initialize_insert_comment):
    comment_id = initialize_insert_comment[0]
    comment_publish_id = initialize_insert_comment[1]
    comment_publish_time = initialize_insert_comment[2]
    comment_content = initialize_insert_comment[3]
    publishAt_note_id = initialize_insert_comment[4]
    inserted_data = dbComment()
    inserted_data.comment_id = comment_id
    inserted_data.comment_publisher_id = comment_publish_id
    inserted_data.comment_publish_time = comment_publish_time
    inserted_data.comment_content = comment_content
    inserted_data.publishAt_note_id = publishAt_note_id
    a = insert_comment(inserted_data)
    assert a == 'insert_comment success'