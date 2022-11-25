import pytest
import os

if __name__=="__main__":
    pytest.main(['testcases/test_for_comment.py','-vs','--alluredir','./report/comment'])
    os.system('allure serve ./report/comment')