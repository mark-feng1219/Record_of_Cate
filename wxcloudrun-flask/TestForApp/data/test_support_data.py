def get_like_add_1_data():
    like_add_1_data = [{'note_id':'00000000','expection':100}]
    return like_add_1_data

def get_like_delete_1_data():
    like_delete_1_data = [{'note_id':'00000000','expection':99}]
    return like_delete_1_data

def get_user_like_add_data():
    user_like_add_data = [{'user_id':'test_4','expection':1}]
    return user_like_add_data

def get_user_like_cancel_data():
    user_like_cancel_data = [{'user_id':'test_4','expection':0}]
    return user_like_cancel_data

def get_add_support_data():
    add_support_data = [{'note_id':'note0','user_id':'user_0','like_time':'2022-11-21 11:01:37'}]
    return add_support_data

def get_delete_support_data():
    delete_support_data = [{'note_id':'note0','user_id':'user_0'}]
    return delete_support_data

def get_return_like_note_data():
    return_like_note_data = [{'user_id':'test_id','expection':'[<dbNote 00000003>, <dbNote 00000007>, <dbNote 1668432609>, <dbNote test_note_id>, <dbNote 00000005>, <dbNote 00000001>, <dbNote 00000009>]'}]
    return return_like_note_data