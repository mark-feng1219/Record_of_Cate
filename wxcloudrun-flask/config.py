import os

# 是否开启debug模式
DEBUG = True

# 读取数据库环境变量
username = os.environ.get('MYSQL_USERNAME', 'test')
password = os.environ.get('MYSQL_PASSWORD', 'test123!')
db_address = os.environ.get('MYSQL_ADDRESS', "sh-cynosdbmysql-grp-fe9hll88.sql.tencentcdb.com:27015")
APPID = "wx9acd048867e8aee8"
SECRET = "1e74f746f419d6233288968cb00b0783"
