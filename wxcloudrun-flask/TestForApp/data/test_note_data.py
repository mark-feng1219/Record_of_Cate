def get_upload_note_data():
    upload_note_data = [{'note_id':'note1','publisher_id':'publisher1','publish_time':'2022-11-20 11:44:52','content':'一定要来！','photo_path':'photo1.jpg','likes_num':12,'title':'title1','tags':'tag1'},
                        {'note_id':'note2','publisher_id':'publisher2','publish_time':'2022-11-21 14:44:52','content':'推荐学生街的这家店！','photo_path':'photo2.jpg','likes_num':14,'title':'title2','tags':'tag2'}]
    return upload_note_data

def get_return_user_note_data():
    return_user_note_data = [{'note_id':'test_1','expection':'[<dbNote test_note_id>, <dbNote 00000004>, <dbNote 00000001>]'}]
    return return_user_note_data

def get_return_note_data():
    return_note_data = [{'note_id':'123456','publisher_id':'test_7','content':'我真帅'}]
    return return_note_data