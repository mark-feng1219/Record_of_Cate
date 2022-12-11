import pytest
from TestForApp.data.test_comment_data import *
from TestForApp.data.test_follow_data import *
from TestForApp.data.test_note_data import *
from TestForApp.data.test_support_data import *
from TestForApp.data.test_user_data import *

return_comment_data = get_return_comment_data()
@pytest.fixture(params=return_comment_data)
def initialize_return_comment(request):
    id = request.param['notes_id']
    expection = request.param['expected']
    print("\nstarting test on module:comment")
    print('笔记id:',id)
    print('预期返回值:',expection)
    yield id,expection
    print("\ntest finished")

insert_comment_data = get_insert_comment_data()
@pytest.fixture(params=insert_comment_data)
def initialize_insert_comment(request):
    print("\nstarting test on module:comment")
    comment_id = request.param['comment_id']
    comment_publisher_id = request.param['comment_publisher_id']
    comment_publish_time = request.param['comment_publish_time']
    comment_content = request.param['comment_content']
    publishAt_note_id = request.param['publishAt_note_id']
    print('评论id:',comment_id)
    print('评论者id:',comment_publisher_id)
    print('评论时间:',comment_publish_time)
    print('评论内容:',comment_content)
    print('笔记id:',publishAt_note_id)
    yield comment_id,comment_publisher_id,comment_publish_time,comment_content,publishAt_note_id
    print("\ntest finished")

blogger_fans_add_data = get_blogger_fans_add_data()
@pytest.fixture(params=blogger_fans_add_data)
def initialize_test_blogger_fans_add(request):
    print("\nstarting test on module:follow")
    blogger_id = request.param['blogger_id']
    expection = request.param['expection']
    print('博主id:',blogger_id)
    print('预期值:',expection)
    yield blogger_id,expection
    print('\ntest finished')

fans_follow_add_data = get_fans_follow_add_data()
@pytest.fixture(params=fans_follow_add_data)
def initialize_test_fans_follow_add(request):
    print("\nstarting test on module:follow")
    blogger_id = request.param['blogger_id']
    expection = request.param['expection']
    print('粉丝id:', blogger_id)
    print('预期值:', expection)
    yield blogger_id,expection
    print('\ntest finished')

add_follow_data = get_add_follow_data()
@pytest.fixture(params=add_follow_data)
def initialize_test_add_follow(request):
    print("\nstarting test on module:follow")
    blogger_id = request.param['blogger_id']
    fans_id = request.param['fans_id']
    print('博主id:',blogger_id)
    print('粉丝id:',fans_id)
    yield blogger_id,fans_id
    print('\ntest finished')

blogger_fans_cancel_data = get_blogger_fans_cancel_data()
@pytest.fixture(params=blogger_fans_cancel_data)
def initialize_test_blogger_fans_cancel(request):
    print("\nstarting test on module:follow")
    blogger_id = request.param['blogger_id']
    expection = request.param['expection']
    print('博主id:',blogger_id)
    print('预期值:',expection)
    yield   blogger_id,expection
    print('\ntest finished')

fans_follow_cancel_data = get_fans_follow_cancel_data()
@pytest.fixture(params=fans_follow_cancel_data)
def initialize_test_fans_follow_cancel(request):
    print("\nstarting test on module:follow")
    blogger_id = request.param['blogger_id']
    expection = request.param['expection']
    print('粉丝id:', blogger_id)
    print('预期值:', expection)
    yield blogger_id,expection
    print('\ntest finished')

cancel_follow_data = get_cancel_follow_data()
@pytest.fixture(params=cancel_follow_data)
def initialize_test_cancel_follow(request):
    print("\nstarting test on module:follow")
    blogger_id = request.param['blogger_id']
    fans_id = request.param['fans_id']
    print('博主id:',blogger_id)
    print('粉丝id:',fans_id)
    yield blogger_id,fans_id
    print('\ntest finished')

return_user_follow_data = get_return_user_follow_data()
@pytest.fixture(params=return_user_follow_data)
def initialize_test_return_user_follow(request):
    print("\nstarting test on module:follow")
    fans_id = request.param['fans_id']
    expection = request.param['expection']
    print('粉丝id:',fans_id)
    yield fans_id,expection
    print('\ntest finished')

upload_note_data = get_upload_note_data()
@pytest.fixture(params=upload_note_data)
def initialize_test_upload_note(request):
    print("\nstarting test on module:note")
    note_id = request.param['note_id']
    publisher_id = request.param['publisher_id']
    publish_time = request.param['publish_time']
    content = request.param['content']
    photo_path = request.param['photo_path']
    likes_num = request.param['likes_num']
    title = request.param['title']
    tags = request.param['tags']
    print('插入的笔记id:',note_id)
    print('插入的发布者id:',publisher_id)
    print('插入的发布时间:',publish_time)
    print('插入的笔记内容:',content)
    print('插入的图片路径:',photo_path)
    print('插入的点赞数:',likes_num)
    print('插入的标题:',title)
    print('插入的标签:',tags)
    yield note_id,publisher_id,publish_time,content,photo_path,likes_num,title,tags
    print('\ntest finished')

return_user_note_data = get_return_user_note_data()
@pytest.fixture(params=return_user_note_data)
def initialize_test_return_user_note(request):
    print('\nstart test on module:note')
    note_id = request.param['note_id']
    expection = request.param['expection']
    print('笔记id:',note_id)
    print('预期返回值:',expection)
    yield note_id,expection
    print('\ntest finished')

return_note_data = get_return_note_data()
@pytest.fixture(params=return_note_data)
def initialize_test_return_note(request):
    print('\nstart test on module:note')
    note_id = request.param['note_id']
    publisher_id = request.param['publisher_id']
    content = request.param['content']
    print('笔记id:',note_id)
    print('发布者id:',publisher_id)
    print('笔记内容:',content)
    yield note_id,publisher_id,content
    print('\ntest finished')

like_add_1_data = get_like_add_1_data()
@pytest.fixture(params=like_add_1_data)
def initialize_test_like_add_1(request):
    print("\nstarting test on module:support")
    note_id = request.param['note_id']
    expection = request.param['expection']
    print('笔记id:',note_id)
    print('预期值:',expection)
    yield note_id,expection
    print('\ntest finished')

like_delete_1_data = get_like_delete_1_data()
@pytest.fixture(params=like_delete_1_data)
def initialize_test_like_delete_1(request):
    print("\nstarting test on module:support")
    note_id = request.param['note_id']
    expection = request.param['expection']
    print('笔记id:',note_id)
    print('预期值:',expection)
    yield note_id,expection
    print('\ntest finished')

user_like_add_data = get_user_like_add_data()
@pytest.fixture(params=user_like_add_data)
def initialize_test_user_like_add(request):
    print('\nstarting test on module:support')
    user_id = request.param['user_id']
    expection = request.param['expection']
    print('用户id:',user_id)
    print('预期值:',expection)
    yield user_id,expection
    print('\ntest finished')

user_like_cancel_data = get_user_like_cancel_data()
@pytest.fixture(params=user_like_cancel_data)
def initialize_test_user_like_cancel(request):
    print('\nstarting test on module:support')
    user_id = request.param['user_id']
    expection = request.param['expection']
    print('用户id:',user_id)
    print('预期值:',expection)
    yield user_id,expection
    print('\ntest finished')

add_support_data = get_add_support_data()
@pytest.fixture(params=add_support_data)
def initialize_test_add_support(request):
    print("\nstarting test on module:support")
    note_id = request.param['note_id']
    user_id = request.param['user_id']
    like_time = request.param['like_time']
    print('被点赞的笔记id:',note_id)
    print('点赞用户id:',user_id)
    print('点赞时间:',like_time)
    yield note_id,user_id,like_time
    print('\ntest finished')

delete_support_data = get_delete_support_data()
@pytest.fixture(params=delete_support_data)
def initialize_test_delete_support(request):
    print("\nstarting test on module:support")
    note_id = request.param['note_id']
    user_id = request.param['user_id']
    print('笔记id:',note_id)
    print('用户id:',user_id)
    yield note_id,user_id
    print('\ntest finished')

return_like_note_data = get_return_like_note_data()
@pytest.fixture(params=return_like_note_data)
def initialize_test_return_like_note(request):
    print("\nstarting test on module:support")
    user_id = request.param['user_id']
    expection = request.param['expection']
    print('用户id:',user_id)
    print('预期值:',expection)
    yield user_id,expection
    print('\ntest finished')

update_user_info_data = get_update_user_info_data()
@pytest.fixture(params=update_user_info_data)
def initialize_test_update_user_info(request):
    print("\nstarting test on module:user")
    user_id = request.param['user_id']
    head_image_path = request.param['head_image_path']
    user_name = request.param['user_name']
    user_sex = request.param['user_sex']
    user_motto = request.param['user_motto']
    print('用户id:',user_id)
    print('头像路径:',head_image_path)
    print('用户名:',user_name)
    print('用户性别:',user_sex)
    print('个性签名:',user_motto)
    yield user_id,head_image_path,user_name,user_sex,user_motto
    print('\ntest finished')

search_id_data = get_search_id_data()
@pytest.fixture(params=search_id_data)
def initialize_test_search_id(request):
    print("\nstarting test on module:user")
    user_id = request.param['user_id']
    user_name = request.param['user_name']
    print('用户id:',user_id)
    print('用户名:',user_name)
    yield user_id,user_name
    print('\ntest finished')

create_user_data = get_create_user_data()
@pytest.fixture(params=create_user_data)
def initialize_test_create_user(request):
    print("\nstarting test on module:user")
    user_id = request.param['user_id']
    user_name = request.param['user_name']
    head_image_path = request.param['head_image_path']
    user_sex = request.param['user_sex']
    likes_num = request.param['likes_num']
    follows_num = request.param['follows_num']
    fans_num = request.param['fans_num']
    user_motto = request.param['user_motto']
    print('插入的用户id:',user_id)
    print('插入的用户名:',user_name)
    print('插入的头像路径:',head_image_path)
    print('插入的用户性别:',user_sex)
    print('插入的点赞数:',likes_num)
    print('插入的关注数:',follows_num)
    print('插入的粉丝数:',fans_num)
    print('插入的个性签名:',user_motto)
    yield   user_id,user_name,head_image_path,user_sex,likes_num,follows_num,fans_num,user_motto
    print('\ntest finished')

return_id_name_data = get_return_id_name_data()
@pytest.fixture(params=return_id_name_data)
def initialize_test_return_id_name(request):
    print("\nstarting test on module:user")
    user_id = request.param['user_id']
    user_name = request.param['user_name']
    print('用户id:',user_id)
    print('用户名:',user_name)
    yield user_id,user_name
    print('\ntest finished')