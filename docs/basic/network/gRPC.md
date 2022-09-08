[[toc]]

## 简介
## protocol buffer语法
```
# grpc_.proto
syntax = "proto3";

//定义方法
service Greeter {
  rpc SayHello(HelloRequest) returns (HelloReply) {}
}

//定义消息类型
message HelloRequest {
  string name = 1;
}

//定义消息类型
message HelloReply {
  string message = 1;
}
```
## 使用工具生成对应语言的源代码
以python为例
### 前置
```python
pip install grpcio
pip install grpcio-tools
```
### 编译proto文件
```shell script
python36 -m grpc_tools.protoc --python_out=. --grpc_python_out=. I. grpc_.proto
生成2个py文件
grpc__pb2.py
grpc__pb2_grpc.py
```
## 编写服务端
```python
"""
Author:liulinyuan
file:grpc_server.py
datetime:2022/9/8 19:41
"""

import time
import grpc
import grpc__pb2
import grpc__pb2_grpc
from concurrent import futures

# 实现proto文件中定义的方法
class MsgServicer(grpc__pb2_grpc.MsgServiceServicer):
    # 实现proto中的rpc调用
    def GetMsg(self, request, context):
        print(f'recv msg:{request.name}')
        return grpc__pb2.MsgResponse(message=f'hello {request.name}')

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=8))
    grpc__pb2_grpc.add_MsgServiceServicer_to_server(MsgServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    try:
        while True:
            time.sleep(60 * 60 * 24)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == '__main__':
    serve()
```
## 编写客户端
```python
import grpc
import grpc__pb2
import grpc__pb2_grpc

def run():
    with grpc.insecure_channel('127.0.0.1:50051') as channel:
        stub = grpc__pb2_grpc.MsgServiceStub(channel)
        response = stub.GetMsg(grpc__pb2.MsgRequest(name='word'))
    print(f'{response}')

if __name__ == '__main__':
    run()
```
- 参考
- [https://www.cnblogs.com/zongfa/p/12218341.html](https://www.cnblogs.com/zongfa/p/12218341.html)
- [https://blog.csdn.net/dream_successor/article/details/107404300](https://blog.csdn.net/dream_successor/article/details/107404300)