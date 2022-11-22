import os

# 是否开启debug模式
DEBUG = True

# 读取数据库环境变量
username = os.environ.get('MYSQL_USERNAME')
password = os.environ.get('MYSQL_PASSWORD')
db_address = os.environ.get('MYSQL_ADDRESS')
APPID = "wx9acd048867e8aee8"
SECRET = "1e74f746f419d6233288968cb00b0783"
