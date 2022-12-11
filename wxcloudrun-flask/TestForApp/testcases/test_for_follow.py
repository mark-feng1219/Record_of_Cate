import pytest
import allure
from wxcloudrun.model import *
from TestForApp.conftest import *
from wxcloudrun.follow.follow_function import *
from wxcloudrun.user.user_function import search_id

@allure.feature('test module:follow')
@allure.story('test function:blogger_fans_add')
@pytest.mark.run(order=1)
@pytest.mark.parametrize('initialize_test_blogger_fans_add',blogger_fans_add_data,indirect=True)
def test_blogger_fans_add(initialize_test_blogger_fans_add):
    blogger_id = initialize_test_blogger_fans_add[0]
    expection = initialize_test_blogger_fans_add[1]
    blogger_fans_add(blogger_id)
    a = search_id(blogger_id)
    fans_num = a.fans_num
    assert fans_num == expection


@allure.feature('test module:follow')
@allure.story('test function:fans_follow_add')
@pytest.mark.run(order=3)
@pytest.mark.parametrize('initialize_test_fans_follow_add',fans_follow_add_data,indirect=True)
def test_fans_follow_add(initialize_test_fans_follow_add):
    blogger_id = initialize_test_fans_follow_add[0]
    expection = initialize_test_fans_follow_add[1]
    fans_follow_add(blogger_id)
    a = search_id(blogger_id)
    follow_num = a.follow_num
    assert follow_num == expection

@allure.feature('test module:follow')
@allure.story('test function:add_follow')
@pytest.mark.run(order=5)
@pytest.mark.parametrize('initialize_test_add_follow',add_follow_data,indirect=True)
def test_add_follow(initialize_test_add_follow):
    blogger_id = initialize_test_add_follow[0]
    fans_id = initialize_test_add_follow[1]
    inserted_data = dbFollow()
    inserted_data.blogger_id = blogger_id
    inserted_data.fans_id = fans_id
    a = add_follow(inserted_data)
    assert a == True

@allure.feature('test module:follow')
@allure.story('test function:blogger_fans_cancel')
@pytest.mark.run(order=2)
@pytest.mark.parametrize('initialize_test_blogger_fans_cancel',blogger_fans_cancel_data,indirect=True)
def test_blogger_fans_cancel(initialize_test_blogger_fans_cancel):
    blogger_id = initialize_test_blogger_fans_cancel[0]
    expection = initialize_test_blogger_fans_cancel[1]
    blogger_fans_cancel(blogger_id)
    a = search_id(blogger_id)
    fans_num = a.fans_num
    assert fans_num == expection

@allure.feature('test module:follow')
@allure.story('test function:fans_follow_cancel')
@pytest.mark.run(order=4)
@pytest.mark.parametrize('initialize_test_fans_follow_cancel',fans_follow_cancel_data,indirect=True)
def test_fans_follow_cancel(initialize_test_fans_follow_cancel):
    blogger_id = initialize_test_fans_follow_cancel[0]
    expection = initialize_test_fans_follow_cancel[1]
    fans_follow_cancel(blogger_id)
    a = search_id(blogger_id)
    follow_num = a.follow_num
    assert follow_num == expection

@allure.feature('test module:follow')
@allure.story('test function:cancel_follow')
@pytest.mark.run(order=6)
@pytest.mark.parametrize('initialize_test_cancel_follow',cancel_follow_data,indirect=True)
def test_cancel_follow(initialize_test_cancel_follow):
    blogger_id = initialize_test_cancel_follow[0]
    fans_id = initialize_test_cancel_follow[1]
    a = cancel_follow(blogger_id,fans_id)
    assert a == True

@allure.feature('test module:follow')
@allure.story('test function:return_user_follow')
@pytest.mark.parametrize('initialize_test_return_user_follow',return_user_follow_data,indirect=True)
def test_return_user_follow(initialize_test_return_user_follow):
    fans_id = initialize_test_return_user_follow[0]
    expection = initialize_test_return_user_follow[1]
    a = return_user_follow(fans_id)
    a = str(a)
    assert a == expection
