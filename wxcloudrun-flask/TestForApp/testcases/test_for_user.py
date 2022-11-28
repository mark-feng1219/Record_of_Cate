import pytest
import allure
from wxcloudrun.model import dbUser
from TestForApp.conftest import *
from wxcloudrun.user.user_function import update_user_info
from wxcloudrun.user.user_function import search_id
from wxcloudrun.user.user_function import create_user
from wxcloudrun.user.user_function import return_id_name

update_user_info_data = get_update_user_info_data()
search_id_data = get_search_id_data()
create_user_data = get_create_user_data()
return_id_name_data = get_return_id_name_data()

@allure.feature('test module:user')
@allure.story('test fucntion:update_user_info')
@pytest.mark.parametrize('initialize_test_update_user_info',update_user_info_data,indirect=True)
def test_update_user_info(initialize_test_update_user_info):
    user_id = initialize_test_update_user_info[0]
    head_image_path = initialize_test_update_user_info[1]
    user_name = initialize_test_update_user_info[2]
    user_sex = initialize_test_update_user_info[3]
    user_motto = initialize_test_update_user_info[4]
    #print(user_id,head_image_path,user_name,user_sex,user_motto)
    a = update_user_info(user_id,head_image_path,user_name,user_sex,user_motto)
    assert a == 'update_user_info success'

@allure.feature('test module:user')
@allure.story('test function:search_id')
@pytest.mark.parametrize('initialize_test_search_id',search_id_data,indirect=True)
def test_search_id(initialize_test_search_id):
    user_id = initialize_test_search_id[0]
    user_name = initialize_test_search_id[1]
    #print(user_id,user_name)
    a = search_id(user_id)
    #print(a)
    assert a.user_name == user_name

@allure.feature('test module:user')
@allure.story('test function:create_user')
@pytest.mark.parametrize('initialize_test_create_user',create_user_data,indirect=True)
def test_create_user(initialize_test_create_user):
    user_id = initialize_test_create_user[0]
    user_name = initialize_test_create_user[1]
    head_image_path = initialize_test_create_user[2]
    user_sex = initialize_test_create_user[3]
    likes_num = initialize_test_create_user[4]
    follows_num = initialize_test_create_user[5]
    fans_num = initialize_test_create_user[6]
    user_motto = initialize_test_create_user[7]

    inserted_data = dbUser()
    inserted_data.user_id = user_id
    inserted_data.user_name = user_name
    inserted_data.head_image_path = head_image_path
    inserted_data.user_sex = user_sex
    inserted_data.likes_num = likes_num
    inserted_data.follow_num = follows_num
    inserted_data.fans_num = fans_num
    inserted_data.user_motto = user_motto
    a = create_user(inserted_data)
    assert a == 'login success'

@allure.feature('test module:user')
@allure.story('test function:return_id_name')
@pytest.mark.parametrize('initialize_test_return_id_name',return_id_name_data,indirect=True)
def test_return_id_name(initialize_test_return_id_name):
    user_id = initialize_test_return_id_name[0]
    user_name = initialize_test_return_id_name[1]
    a = return_id_name(user_id)
    assert a == user_name