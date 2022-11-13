# 项目接口设计规范

### 一、整体项目浏览：(假设用户都是正常人)
![img](https://img-community.csdnimg.cn/images/41e9e9e2e7a449f88312f1c109a49ee8.jpg "#left")

(注：以后形容某个特定页面以坐标来形容，如：(1,10))  

### 二、数据库数据概览：  

1.用户表——user_info(用户id是微信号经过MD5的结果)  

|用户id/食珍录账号| 用户昵称 |head_image_path| 用户性别 | 获赞数 | 关注数 | 粉丝数 |
|:--:| :-----: | :----: |:-:| :----: | :--: | :--: |
| char(20) | char(20) |char(100)| char(5) | int |int| int |
|1|小明|h8kes7m9/head_image/cool.jpg|男|12|5|2|
|2|小华|h8kek6d9/head_image/beautiful.jpg|女|20|6|12|

2.笔记表——note  

|笔记id| 发表用户id | 发表时间 | 内容 | 配图路径 | 点赞数 |
|:--:| :-----: | :----: | :----: | :--: | :--: |
| int | char(20) | DATETIME | text |char(30)| int |

3.评论表——评论设置不可点赞

|评论id|发表用户id|发表时间|内容|
|:-:|:-:|:-:|:--:|
|int|char(20)|DATETIME|text|

4.follow表(全码)  

|博主id|粉丝id|
|:-:|:-:|
|char(20)|char(20)|

5.跟评表(全码)  

|笔记id|评论id|
|:-:|:-:|
|int|int|

6.用户点赞笔记表(全码)——user_support_note(因为要实现帮我点餐(做推荐)需要从用户点赞的笔记中寻找蛛丝马迹)

|笔记id| 用户id |
|:--:| :-----: |
| int | char(20) |

### 三、后端路由  

1.第一条路由：https://127.0.0.1:5000/user  
python代码:  

```python  
def user_login(user_id)
def modify_user_name()
def modify_user_sex()
@app.route("/user", methods=["GET,POST"])
def process(): 
    if opt == "user_login":  # 查
        user_login()
    if opt == "modify_user_name":
        modify_user_name()
    if opt == "modify_user_sex":
        modify_user_sex()
```
需要实现的函数功能表单：
|接口编号| 参数| 函数名称 | 解释 | 实现细节 |
|:--: | :-----: | :----: | :----: | :--: |
|interface_1|opt=user_login&<br>user_id="h8kes7m9"|user_login| 如果用户第一次登录,就将用户的id记录在user表中并返回用户信息;如果不是第一次登录,查询user表并返回用户信息 |空|
|interface_2|opt=modify_user_name&<br>user_id="h8kes7m9"&<br>new_name="枳鱼"|modify_user_name|修改user表的name|空|
|interface_3|opt=modify_user_sex&<br>user_id="h8kes7m9"&<br>new_sex=男|modify_user_sex|修改user表的sex|空|
|interface_4|opt=surf_other&<br>user_id="h8kes7m9"&<br>choice="note/support"|return_other|返回别人的笔记/点赞|空|

2.第二条路由：https://127.0.0.1:5000/note  
python代码:  

```python  
@app.route("/note", methods=["GET,POST"])
```
需要实现的函数功能表单：
|接口编号| 参数| 函数名称 | 解释 | 实现细节 |
|:--: | :-----: | :----: | :----: | :--: |
|interface_5| opt=select_newest | return_newest | 返回所关注的用户中最新的用户动态 | 使用pymysql先查询folllow表得出自己关注的用户,再查询note表得出最新动态|
|interface_6| opt=select_FocusUser_newest&<br>user_id:"h8kes7m9" | return_user_newest | 返回选中的用户最新的用户动态 | 使用pymysql直接查询note表得出最新动态 |
|interface_7|opt=newest_16&<br>user_id="h8kes7m9"|return_newest_16|返回最新的16条笔记,因为不能你一打开推荐,后端就真的返回所有的笔记数据,而应该一点一点返回|空|
|interface_8|opt=next_36&<br>user_id="h8kes7m9"|return_next_36|返回接下来的36条笔记,当用户在“刷推荐”时可能再次触发上拉刷新,需要返回再接下来的36条笔记|空|
|interface_9|opt=select_key_words&<br>key_words="卤肉卷"|return_key_words|返回标签为key_words的笔记|使用pymysql直接查询note表返回所有笔记|
|interface_10|opt=upload_user_note&<br>user_id="h8kes7m9"&<br>note_id="129093893"&<br>image_path="h8kes7m9/129093893/picture_1.jpg"&<br>content="不会还有人没吃过福大学生街的×××吧"|return_user_note|上传用户的笔记| 使用pymysql插入用户笔记于note表中 |
|interface_11|opt=operate_note&<br>note_id="1690324587"&<br>choice="insert/delete"|operate_note|对笔记执行点赞或取消点赞操作|空|

3.第三条路由：https://127.0.0.1:5000/comment  
python代码:  

```python  
@app.route("/comment", methods=["GET,POST"])
```
需要实现的函数功能表单：
|接口编号| 参数| 函数名称 | 解释 |实现细节|
|:--:| :-----: | :----: | :----: |:-:|
|interface_12| opt=select_comment&<br>note_id=168295073 | return_note_comment | 返回对应笔记的所有评论 | 空 |
|interface_13|opt=insert_comment&<br>note_id=168295073&<br>user_id="h8kes7m9"&<br>timestamp="1781213041"| insert_note_comment | 对选定的笔记插入评论 | 空 |

4.第四条路由：https://127.0.0.1:5000/help  
python代码:  

```python  
@app.route("/help", methods=["GET"])
```

需要实现的函数功能表单：
|接口编号| 参数| 函数名称 | 解释 | 实现细节 |
|:--:| :-----: | :----: | :----: |:-:|
|interface_14|opt=help&<br>user_id="h8kes7m9"|return_suggestion|返回给用户点餐的建议|提示：要使用user_support_note和使用Random函数,可以自由发挥|

### 四、前端请求  

1.首页  
(1) 关注模块  

a.默认情况——没有点击任何关注的用户的头像时,返回最新的用户笔记,包括用户头像路径,图像路径,笔记内容  

```JavaScript
wx.request({
    url: 'http://127.0.0.1:5000/note',  //访问失败,不检验域名则成功
    data: {
    "opt":"select_newest"    // 接口编号:interface_5
    },
    header: { 'content-type': 'application/json' },
    success: function(res) {  //接口调用成功的回调函数
    console.log('success') // 收到https服务成功后返回
    console.log(res)
    },
    fail: function() {  //接口调用失败的回调函数
    console.log('failure')  // 发生网络错误等情况触发
    },
    complete: function() {  //接口调用结束的回调函数(调用成功、失败都会执行)
    console.log('complete')  // 成功或者失败后触发
    }
    })
```
b.选择特定用户的情况——点击了一个关注的用户头像,返回TA的最新的用户笔记  

```JavaScript
wx.request({
    url: 'http://127.0.0.1:5000/note',  //访问失败,设置不检验域名则成功
    data: {
    "opt":"select_FocusUser_newest",   // 接口编号:interface_6
    "user_id":"h8kes7m9"
    },
    header: { 'content-type': 'application/json' },
    success: function(res) {  //接口调用成功的回调函数
    console.log('success') // 收到https服务成功后返回
    console.log(res)
    },
    fail: function() {  //接口调用失败的回调函数
    console.log('failure')  // 发生网络错误等情况触发
    },
    complete: function() {  //接口调用结束的回调函数(调用成功、失败都会执行)
    console.log('complete')  // 成功或者失败后触发
    }
    })
```

(2) 推荐模块(暂定为逐步返回全部笔记)——需要使用本地缓存  

a.没有触发上拉刷新时——仅返回最新的16条笔记(有点问题,后续再讨论)
```JavaScript
wx.request({
    url: 'http://127.0.0.1:5000/note',
    data: {
    "opt":"newest_16",   // 接口编号:interface_7
    "user_id":"h8kes7m9"
    },
    header: { 'content-type': 'application/json' },
    success: function(res) {  //接口调用成功的回调函数
    console.log('success') // 收到https服务成功后返回
    console.log(res)
    },
    fail: function() {  //接口调用失败的回调函数
    console.log('failure')  // 发生网络错误等情况触发
    },
    complete: function() {  //接口调用结束的回调函数(调用成功、失败都会执行)
    console.log('complete')  // 成功或者失败后触发
    }
    })
```
b.触发上拉刷新时——返回之后的36条笔记,如果再次触发,再返回36条笔记(有点问题,后续再讨论)
```JavaScript
wx.request({
    url: 'http://127.0.0.1:5000/note',
    data: {
    "opt":"next_36",   // 接口编号:interface_8
    "user_id":"h8kes7m9"
    },
    header: { 'content-type': 'application/json' },
    success: function(res) {  //接口调用成功的回调函数
    console.log('success') // 收到https服务成功后返回
    console.log(res)
    },
    fail: function() {  //接口调用失败的回调函数
    console.log('failure')  // 发生网络错误等情况触发
    },
    complete: function() {  //接口调用结束的回调函数(调用成功、失败都会执行)
    console.log('complete')  // 成功或者失败后触发
    }
    })
```
c.对某条笔记进行点赞/取消点赞  

解释：此时需要把点赞的记录保存在本地缓存中,以便用户查看自己点赞的数据时可以快速呈现,同时要把点赞的记录上传到后端,以便给用户做个性化点餐。
```JavaScript
wx.request({
    url: 'http://127.0.0.1:5000/note',
    data: {
    "opt":"operate_note",   // 接口编号:interface_11
    "note_id":"1690324587",
    "choice":"insert/delete"
    },
    header: { 'content-type': 'application/json' },
    success: function(res) {  //接口调用成功的回调函数
    console.log('success') // 收到https服务成功后返回
    console.log(res)
    },
    fail: function() {  //接口调用失败的回调函数
    console.log('failure')  // 发生网络错误等情况触发
    },
    complete: function() {  //接口调用结束的回调函数(调用成功、失败都会执行)
    console.log('complete')  // 成功或者失败后触发
    }
    })
```

d.点进去笔记——展示笔记以及评论  

解释：调用本地缓存展示该条笔记图片和内容,同时用此笔记的id发送给后端,请求关于此条笔记的所有评论,并展示在页面上
```JavaScript
wx.request({
    url: 'http://127.0.0.1:5000/comment',
    data: {
    "opt":"select_comment",  // 接口编号:interface_12
    "note_id":"168295073"
    },
    header: { 'content-type': 'application/json' },
    success: function(res) {  //接口调用成功的回调函数
    console.log('success')   //收到https服务成功后返回
    console.log(res)
    },
    fail: function() {  //接口调用失败的回调函数
    console.log('failure')  // 发生网络错误等情况触发
    },
    complete: function() {  //接口调用结束的回调函数(调用成功、失败都会执行)
    console.log('complete')  // 成功或者失败后触发
    }
    })
```

e.评论笔记——写评论  

解释:这里的note_id为时间戳(因为我假设不会有人在同一时刻发表评论)

```JavaScript
wx.request({
    url: 'http://127.0.0.1:5000/comment',
    data: {
    "opt":"insert_comment",  // 接口编号:interface_13
    "note_id":"168295073",
    "user_id":"h8kes7m9",
    "timestamp":"1781213041"
    },
    header: { 'content-type': 'application/json' },
    success: function(res) {  //接口调用成功的回调函数
    console.log('success')   //收到https服务成功后返回
    console.log(res)
    },
    fail: function() {  //接口调用失败的回调函数
    console.log('failure')  // 发生网络错误等情况触发
    },
    complete: function() {  //接口调用结束的回调函数(调用成功、失败都会执行)
    console.log('complete')  // 成功或者失败后触发
    }
    })
```

f.点开别人的主页——只能请求后端

解释:点击进入别人的主页,默认是请求笔记,choice为note;当点击点赞时请求的choice为support

```JavaScript
wx.request({
    url: 'http://127.0.0.1:5000/user',
    data: {
    "opt":"surf_other",      // 接口编号:interface_4
    "user_id":"h8kes7m9",
    "choice":"note/support"
    },
    header: { 'content-type': 'application/json' },
    success: function(res) {  //接口调用成功的回调函数
    console.log('success')   //收到https服务成功后返回
    console.log(res)
    },
    fail: function() {  //接口调用失败的回调函数
    console.log('failure')  // 发生网络错误等情况触发
    },
    complete: function() {  //接口调用结束的回调函数(调用成功、失败都会执行)
    console.log('complete')  // 成功或者失败后触发
    }
    })
```

(3) 搜索模块  

解释：输入关键词,敲击回车或点击搜索图标,返回关键词给后端,后端搜索标签为关键词的笔记
```JavaScript
wx.request({
    url: 'http://127.0.0.1:5000/note',
    data: {
    "opt":"select_key_words",      //接口编号:interface_9
    "key_words":"卤肉卷"
    },
    header: { 'content-type': 'application/json' },
    success: function(res) {  //接口调用成功的回调函数
    console.log('success') // 收到https服务成功后返回
    console.log(res)
    },
    fail: function() {  //接口调用失败的回调函数
    console.log('failure')  // 发生网络错误等情况触发
    },
    complete: function() {  //接口调用结束的回调函数(调用成功、失败都会执行)
    console.log('complete')  // 成功或者失败后触发
    }
    })
```

2.帮我点餐  

解释：点击帮我点餐,请求后端返回结果,反复点击,要返回不一样的结果(尽量要是用户“爱吃的”)
```JavaScript
wx.request({
    url: 'http://127.0.0.1:5000/help',  //访问失败,设置不检验域名则成功
    data: {
    "opt":"help",      //接口编号:interface_14
    "user_id":"h8kes7m9"
    },
    header: { 'content-type': 'application/json' },
    success: function(res) {  //接口调用成功的回调函数
    console.log('success')    // 收到https服务成功后返回
    console.log(res)
    },
    fail: function() {               //接口调用失败的回调函数
    console.log('failure')           // 发生网络错误等情况触发
    },
    complete: function() {  //接口调用结束的回调函数（调用成功、失败都会执行）
    console.log('complete')  // 成功或者失败后触发
    }
    })
```

3.笔记(用户自己的)  

注释：这里有一个问题,那就是不能让用户都没有登录的状态居然还能使用本地缓存渲染用户自己的笔记,这里可能需要定义一个全局变量login_state来确保统一。另外,用户在发布笔记和点赞他人的笔记时需要登录。  

(1)笔记——使用本地缓存拉取到页面实现渲染,不用使用后端请求  

a.用户发布笔记——既要上传用户的笔记,又要将用户发布的笔记存到本地缓存之中  

解释:这里的note_id是时间戳,因为我假设不会有人同一时刻发布笔记
```JavaScript
wx.container({笔记图片存到微信云托管对象存储中→记录下图片路径})
wx.request({
    url: 'http://127.0.0.1:5000/note',
    data: {
    "opt":"upload_user_note",     //接口编号:interface_10
    "user_id":"h8kes7m9",
    "note_id":"129093893",
    "image_path":"h8kes7m9/129093893/picture_1.jpg"
    "content":"不会还有人没吃过福大学生街的×××吧"
    },
    header: { 'content-type': 'application/json' },
    success: function(res) {  //接口调用成功的回调函数
    console.log('success') // 收到https服务成功后返回
    console.log(res)
    },
    fail: function() {  //接口调用失败的回调函数
    console.log('failure')  // 发生网络错误等情况触发
    },
    complete: function() {  //接口调用结束的回调函数(调用成功、失败都会执行)
    console.log('complete')  // 成功或者失败后触发
    }
    })
```
(2)点赞——使用本地缓存拉取到页面实现渲染,不用使用后端请求  

4.我的  

(1) 登录界面(未登录)——立即登录  

解释:第一次登录后端会记录用户的id,并返回用户的信息,包括用户的昵称,食珍录账号,获赞数，性别等。不登录时login_state变为false;登录时会使login_state变为true,此时笔记(用户自己的)可以调用本地缓存实现页面渲染,在此之前需要检查用户的笔记缓存是否为空。  

```JavaScript
wx.request({
    url: 'http://127.0.0.1:5000/user',
    data: {
    "opt":"user_login",   //接口编号:interface_1
    "user_id":"h8kes7m9"   // 用户微信号经过MD5码转换再使用substring(8,16)
    },
    header: { 'content-type': 'application/json' },
    success: function(res) {  //接口调用成功的回调函数
    console.log('success') // 收到https服务成功后返回
    console.log(res)
    },
    fail: function() {  //接口调用失败的回调函数
    console.log('failure')  // 发生网络错误等情况触发
    },
    complete: function() {  //接口调用结束的回调函数(调用成功、失败都会执行)
    console.log('complete')  // 成功或者失败后触发
    }
    })
```
(2) 我的界面(已登录)——使用本地缓存  

(3) 编辑资料

a.名称——修改名称  

接口代码:  
```JavaScript
wx.request({
    url: 'http://127.0.0.1:5000/user',
    data: {
    "opt":"modify_user_name",   //接口编号:interface_2
    "user_id":"h8kes7m9"   // 用户微信号经过MD5码转换再使用substring(8,16)
    "new_name":"枳鱼"
    },
    header: { 'content-type': 'application/json' },
    success: function(res) {  //接口调用成功的回调函数
    console.log('success') // 收到https服务成功后返回
    console.log(res)
    },
    fail: function() {  //接口调用失败的回调函数
    console.log('failure')  // 发生网络错误等情况触发
    },
    complete: function() {  //接口调用结束的回调函数(调用成功、失败都会执行)
    console.log('complete')  // 成功或者失败后触发
    }
    })
```

b.性别——修改性别  

接口代码:  
```JavaScript
wx.request({
    url: 'http://127.0.0.1:5000/user',  //访问失败,设置不检验域名则成功
    data: {
    "opt":"modify_user_sex",   //接口编号:interface_3
    "user_id":"h8kes7m9"   // 用户微信号经过MD5码转换再使用substring(8,16)
    "new_sex":"男"
    },
    header: { 'content-type': 'application/json' },
    success: function(res) {  //接口调用成功的回调函数
    console.log('success') // 收到https服务成功后返回
    console.log(res)
    },
    fail: function() {  //接口调用失败的回调函数
    console.log('failure')  // 发生网络错误等情况触发
    },
    complete: function() {  //接口调用结束的回调函数(调用成功、失败都会执行)
    console.log('complete')  // 成功或者失败后触发
    }
    })
```

### 五、附录
1.答你所问：  

(1) 问：微信小程序要怎么上传图片呢？
> 答：微信云托管有两个存储工具,一个是MySQL,用于存储普通的数值型和字符串型数据;一个是对象存储,用来存储图片,视频,Excel文件等。而上传存储图片有两种方式：a.微信小程序上传照片给Flask后端,Flask后端将图片存储在微信云托管的对象存储中。b.微信小程序直接通过代码上传存储到微信云托管的对象存储中。所以这里使用最简单的方式——b方案。  
