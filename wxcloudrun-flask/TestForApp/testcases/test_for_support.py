import pytest
import allure
from wxcloudrun.model import *
from TestForApp.conftest import *
from wxcloudrun.support.support_function import *
from wxcloudrun.note.note_function import *
from wxcloudrun.user.user_function import *

@allure.feature('test module:support')
@allure.story('test function:like_add_1')
@pytest.mark.run(order=1)
@pytest.mark.parametrize('initialize_test_like_add_1',like_add_1_data,indirect=True)
def test_like_add_1(initialize_test_like_add_1):
    note_id = initialize_test_like_add_1[0]
    expection = initialize_test_like_add_1[1]
    like_add_1(note_id)
    a = return_note(note_id)
    likes_num = a.likes_num
    assert likes_num == expection

@allure.feature('test module:support')
@allure.story('test function:like_delete_1')
@pytest.mark.parametrize('initialize_test_like_delete_1',like_delete_1_data,indirect=True)
@pytest.mark.run(order=2)
def test_like_delete_1(initialize_test_like_delete_1):
    note_id = initialize_test_like_delete_1[0]
    expection = initialize_test_like_delete_1[1]
    like_delete_1(note_id)
    a = return_note(note_id)
    likes_num = a.likes_num
    assert likes_num == expection

@allure.feature('test module:support')
@allure.story('test function:user_like_add')
@pytest.mark.run(order=3)
@pytest.mark.parametrize('initialize_test_user_like_add',user_like_add_data,indirect=True)
def test_user_like_add(initialize_test_user_like_add):
    user_id = initialize_test_user_like_add[0]
    expection = initialize_test_user_like_add[1]
    user_like_add(user_id)
    a = search_id(user_id)
    likes_num = a.likes_num
    assert likes_num == expection

@allure.feature('test module:support')
@allure.story('test function:user_like_cancel')
@pytest.mark.run(order=4)
@pytest.mark.parametrize('initialize_test_user_like_cancel',user_like_cancel_data,indirect=True)
def test_user_like_cancel(initialize_test_user_like_cancel):
    user_id = initialize_test_user_like_cancel[0]
    expection = initialize_test_user_like_cancel[1]
    user_like_cancel(user_id)
    a = search_id(user_id)
    likes_num = a.likes_num
    assert likes_num == expection

@allure.feature('test module:support')
@allure.story('test function:add_support')
@pytest.mark.run(order=5)
@pytest.mark.parametrize('initialize_test_add_support',add_support_data,indirect=True)
def test_add_support(initialize_test_add_support):
    note_id = initialize_test_add_support[0]
    user_id = initialize_test_add_support[1]
    like_time = initialize_test_add_support[2]
    inserted_data = dbSupport()
    inserted_data.note_id = note_id
    inserted_data.user_id = user_id
    inserted_data.like_time = like_time
    a = add_support(inserted_data)
    assert a == True

@allure.feature('test module:support')
@allure.story('test function:delete_support')
@pytest.mark.run(order=6)
@pytest.mark.parametrize('initialize_test_delete_support',delete_support_data,indirect=True)
def test_delete_support(initialize_test_delete_support):
    note_id = initialize_test_delete_support[0]
    user_id = initialize_test_delete_support[1]
    a = delete_support(note_id,user_id)
    assert a == True

@allure.feature('test module:support')
@allure.story('test function:return_like_note')
@pytest.mark.parametrize('initialize_test_return_like_note',return_like_note_data,indirect=True)
def test_return_like_note(initialize_test_return_like_note):
    user_id = initialize_test_return_like_note[0]
    expection = initialize_test_return_like_note[1]
    a = return_like_note(user_id)
    a = str(a)
    assert a == expection