import pytest
import os

if __name__ == "__main__":
    pytest.main(['testcases/test_for_note.py', '-vs','--emoji', '--alluredir', './report/note'])
    os.system('allure serve ./report/note')
