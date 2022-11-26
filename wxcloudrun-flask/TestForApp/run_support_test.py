import pytest
import os

if __name__ == "__main__":
    pytest.main(['testcases/test_for_support.py', '-vs', '--alluredir', './report/support'])
    os.system('allure serve ./report/support')