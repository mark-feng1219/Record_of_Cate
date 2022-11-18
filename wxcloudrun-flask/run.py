# 创建应用实例
import sys
import www
from wxcloudrun import app


# 启动Flask Web服务
if __name__ == '__main__':

    # app.run(host=sys.argv[1], port=sys.argv[2]) # 服务器运行
    app.run(host='0.0.0.0', port=80)  # 本地运行
#
