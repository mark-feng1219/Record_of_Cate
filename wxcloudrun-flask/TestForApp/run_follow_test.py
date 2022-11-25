import pytest
import os

if __name__ == "__main__":
    pytest.main(['testcases/test_for_follow.py', '-vs', '--alluredir', './report/follow'])
    os.system('allure serve ./report/follow')