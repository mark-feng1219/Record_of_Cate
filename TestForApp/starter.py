import pytest
import allure

if __name__ == "__main__":
    pytest.main(['Tests/','-vs','--alluredir','report/result'])
    #在命令行输入allure serve 'report/result'查看测试报告
