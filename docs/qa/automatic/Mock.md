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
        "http://twitter.com/api/1/foobar",
        json={'data': [{'name': 'foo', 'value': 'bar'}]},
        status=200,
    )
    resp = requests.get("http://twitter.com/api/1/foobar")
    # print(resp.json())
    assert resp.json() == {'data': [{'name': 'foo', 'value': 'bar'}]}
    assert resp.status_code == 200

if __name__ == '__main__':
    test_simple()
```
### 使用Flask自己实现
```python
```