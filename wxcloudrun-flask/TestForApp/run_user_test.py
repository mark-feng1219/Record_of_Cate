import pytest
import os
if __name__ == "__main__":
    pytest.main(['testcases/test_for_user.py', '-vs', '--alluredir', './report/user'])
    os.system('allure serve ./report/user')