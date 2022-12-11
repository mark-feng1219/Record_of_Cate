import pytest
import allure
from wxcloudrun.model import dbNote
from TestForApp.conftest import *
from wxcloudrun.note.note_function import upload_note
from wxcloudrun.note.note_function import return_note
from wxcloudrun.note.note_function import return_user_note

upload_note_data = get_upload_note_data()
return_user_note_data = get_return_user_note_data()
return_note_data = get_return_note_data()

@allure.feature('test module:note')
@allure.story('test function:upload_note')
@pytest.mark.parametrize('initialize_test_upload_note',upload_note_data,indirect=True)
def test_upload_note(initialize_test_upload_note):
    note_id = initialize_test_upload_note[0]
    publisher_id = initialize_test_upload_note[1]
    publish_time = initialize_test_upload_note[2]
    content = initialize_test_upload_note[3]
    photo_path = initialize_test_upload_note[4]
    likes_num = initialize_test_upload_note[5]
    title = initialize_test_upload_note[6]
    tags = initialize_test_upload_note[7]

    inserted_data = dbNote()
    inserted_data.note_id = note_id
    inserted_data.publisher_id = publisher_id
    inserted_data.publish_time = publish_time
    inserted_data.content = content
    inserted_data.photo_path = photo_path
    inserted_data.likes_num = likes_num
    inserted_data.title = title
    inserted_data.tag = tags
    #print(inserted_data)
    a = upload_note(inserted_data)
    assert a == 'upload_note success'

@allure.feature('test module:note')
@allure.story('test function:return_user_note')
@pytest.mark.parametrize('initialize_test_return_user_note',return_user_note_data,indirect=True)
def test_return_user_note(initialize_test_return_user_note):
    note_id = initialize_test_return_user_note[0]
    expection = initialize_test_return_user_note[1]
    a = return_user_note(note_id)
    a = str(a)
    assert a == expection

@allure.feature('test module:note')
@allure.story('test function:return_note')
@pytest.mark.parametrize('initialize_test_return_note',return_note_data,indirect=True)
def test_return_note(initialize_test_return_note):
    note_id = initialize_test_return_note[0]
    publisher_id = initialize_test_return_note[1]
    content = initialize_test_return_note[2]
    a = return_note(note_id)
    assert a.publisher_id == publisher_id and a.content == content
