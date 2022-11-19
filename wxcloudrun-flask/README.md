# wxcloudrun-flask


## 目录结构说明
```
.
├── Dockerfile                  dockerfile
├── venv                        虚拟环境
├── README.md                   README.md文件
├── requirements.txt            依赖包文件
├── config.py                   项目的总配置文件  里面包含数据库 web应用 日志等各种配置
├── run.py                      flask项目管理文件 与项目进行交互的命令行工具集的入口
├── www.py                      蓝图功能，对所有的url进行蓝图功能配置
└── controller                  app目录
    ├── __init__.py             python项目必带  模块化思想
    ├── note                    note笔记管理模块
    ├── user                    user用户管理模块
    ├── comment                 comment评论管理模块
    ├── model.py                数据库对应的模型
    └──  response.py            响应结构构造


```

## 配置mysql账户密码域名

修改 wxcloudrun-flask/.cloudbase/container/debug.json


## 使用注意

如果不是通过微信云托管控制台部署模板代码，而是自行复制/下载模板代码后，手动新建一个服务并部署，需要在「服务设置」中补全以下环境变量，才可正常使用，否则会引发无法连接数据库，进而导致部署失败。

- MYSQL_ADDRESS
- MYSQL_PASSWORD
- MYSQL_USERNAME
  以上三个变量的值请按实际情况填写。如果使用云托管内 MySQL，可以在控制台 MySQL 页面获取相关信息。

## License

[MIT](./LICENSE)
