[[toc]]

## 基本使用
### 安装
```
pip install pact-python
```
### Consumer
```python
"""
作者: liulinyuan
时间: 2022/10/9/0009 21:54
文件: pact_.py
"""

import atexit
import unittest
import requests

from pact import Consumer, Provider

# 定义一个契约pact，明确消费者与生产者，明确契约文件存放路径
pact = Consumer('Consumer').has_pact_with(Provider('Provider'), pact_dir='.')
# 服务启动
pact.start_service()
# 服务注册
atexit.register(pact.stop_service)


class GetUserInfoContract(unittest.TestCase):
    # 定义契约内容
    def test_get_user(self):
        # 定义期望响应结果
        expected = {
            'name': 'liulinyuan',
            'age': 18,
        }
        # 定义契约实际内容
        (pact
         .given('获取所有用户数据')
         .upon_receiving('获取用户数据请求')
         .with_request('get', '/users')  # 向生产者发送请求
         .will_respond_with(status=200, body=expected)  # 生产者被请求后返回响应，body可以自定义
         )
        # 基于requests向pact发请求，验证契约结果是否正确
        with pact:
            response = requests.get('http://127.0.0.1:5000/users').json()
        self.assertEqual(response, expected)


if __name__ == '__main__':
    user_info = GetUserInfoContract()
    user_info.test_get_user()
```
### Provider
```python
"""
作者: liulinyuan
时间: 2022/10/9/0009 22:09
文件: provider.py
"""

from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/users', methods=['GET'])
def user_info():
    """
    获取用户数据生产者
    :return:
    """
    if request.method == 'GET':
        data = {
            'name': 'liulinyuan',
            'age': 18,
        }
        return jsonify(data)


if __name__ == '__main__':
    app.run()
```

### 参考
1. [官方文档](https://docs.pact.io/implementation_guides/python/readme)
2. [Github](https://github.com/pact-foundation/pact-python/)
3. [Pact中文指南](https://www.mianshigee.com/tutorial/pact-zh/)
### 