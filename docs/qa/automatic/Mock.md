[[toc]]

## 简介
1. Mock：测试过程中不容易构造或者不容易获取的对象，用虚拟对象进行模拟的过程。
2. 提供Mock功能的服务叫作Mock Server
## 分类
1. [Python实现](https://github.com/getsentry/responses)
2. [Java实现](https://github.com/mock-server)
3. 自己实现
## 练习
### Python版的response
前置
```python
pip install responses
```
示例
```python
"""
Author:liulinyuan
file:mock_server.py
datetime:2022/9/8 22:45
"""
import responses
import requests

@responses.activate
def test_simple():
    responses.add(
        responses.GET,
        "http://10.0.128.101:8002/foobar",
        json={'data': [{'name': 'foo', 'value': 'bar'}]},
        status=200,
    )
    resp = requests.get("http://10.0.128.101:8002/foobar")
    print(resp.json())
    assert resp.json() == {'data': [{'name': 'foo', 'value': 'bar'}]}
    assert resp.status_code == 200

if __name__ == '__main__':
    test_simple()
```
### 使用Flask自己实现
前置
```python
pip install flask
```
```python
"""
Author:liulinyuan
file:mock_server_flask.py
datetime:2022/9/9 10:17
"""

from flask import Flask, request, abort

app = Flask(__name__)

@app.route("/", methods=["GET"])
def index():
    return "Hello World"

@app.route("/mock", methods=["GET", "POST"])
def mock():
    """模拟三方服务"""
    if request.method == "GET":
        return "This is a GET request，do nothing"
    elif request.method == "POST":
        try:
            name = request.form.get("name")
            print(name)
            if name == "mock":
                data = {'status': 200, 'message': '添加数据成功', 'response': {'id': '001'}}
            else:
                data = {'status': 400, 'message': '添加数据失败', 'response': {}}
        except:
            data = {'status': 500, 'message': 'server error', 'response': {}}
        return data
    else:
        abort(400)

if __name__ == '__main__':
    app.run()
```
```shell script
curl "http://127.0.0.1:5000/mock"
curl -d name=mock -X POST http://127.0.0.1:5000/mock
curl -d name=liuly2 -X POST http://127.0.0.1:5000/mock
```