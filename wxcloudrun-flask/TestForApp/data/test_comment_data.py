def get_return_comment_data():
    test_return_data = [{'notes_id':'4245','expected':'[<dbComment 167328323, 3947268>, <dbComment 192127534, 321324>]'},
                    {'notes_id':'test_note_id','expected':'[<dbComment 123133, wx13242>, <dbComment 213284, wx324>, <dbComment 223424132, wx34353>, <dbComment 34235, wx712>, <dbComment 97341232, wx937>]'}]
    return test_return_data

def get_insert_comment_data():
    test_insert_data = [{'comment_id':'comment001','comment_publisher_id':'wx001','comment_publish_time':'2022-11-25 15:03:53','comment_content':'避雷了避雷了','publishAt_note_id':'test_note_1'},
                        {'comment_id':'comment002','comment_publisher_id':'wx002','comment_publish_time':'2022-11-25 15:04:32','comment_content':'我不允许有人不知道这家店','publishAt_note_id':'test_note_2'}]
    return test_insert_data