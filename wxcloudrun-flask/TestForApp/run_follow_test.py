import pytest
import os

if __name__ == "__main__":
    pytest.main(['testcases/test_for_follow.py', '-vs','--emoji', '--alluredir', './report/follow'])
    os.system('allure serve ./report/follow')