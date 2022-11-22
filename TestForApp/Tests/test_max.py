import pytest
import allure

@pytest.fixture()
def login(request):
    print('登陆方法')
    print('传入的参数为：' + str(request.param))  # 获取params参数
    yield   # 激活fixture teardown方法
    print('teardown')

@pytest.mark.parametrize('login', [
    ('username1', 'passwd1'),
    ('username2', 'passwd2')
], indirect=True)
def test_cart3(login):
    print('购物车用例3')

