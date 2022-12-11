def get_blogger_fans_add_data():
    blogger_fans_add_data = [{'blogger_id':'test_4','expection':1}]
    return blogger_fans_add_data

def get_fans_follow_add_data():
    fans_follow_add_data = [{'blogger_id':'test_4','expection':1}]
    return fans_follow_add_data

def get_add_follow_data():
    add_follow_data = [{'blogger_id':'blogger1','fans_id':'fans1'}]
    return add_follow_data

def get_blogger_fans_cancel_data():
    blogger_fans_cancel_data = [{'blogger_id':'test_4','expection':0}]
    return blogger_fans_cancel_data

def get_fans_follow_cancel_data():
    fans_follow_cancel_data = [{'blogger_id':'test_4','expection':0}]
    return fans_follow_cancel_data

def get_cancel_follow_data():
    cancel_follow_data = [{'blogger_id':'blogger1','fans_id':'fans1'}]
    return cancel_follow_data

def get_return_user_follow_data():
    return_user_follow_data = [{'fans_id':'test_id','expection':'[<dbUser test_1>, <dbUser test_2>, <dbUser test_3>, <dbUser test_4>, <dbUser test_5>, <dbUser test_6>, <dbUser test_7>, <dbUser test_8>, <dbUser test_9>]'}]
    return return_user_follow_data