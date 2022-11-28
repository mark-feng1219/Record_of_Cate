import pytest
import os

if __name__ == "__main__":
    pytest.main(['testcases/','-vs','--emoji','--alluredir','./report/result'])
    os.system('allure serve ./report/result')