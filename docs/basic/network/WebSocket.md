[[toc]]

## 简介
1. HTTP协议是一种无状态、无连接、单向的应用层协议，请求只能由客户端发起，服务端处理。
2. 在这种单向通信模式下，对于服务端变化需要通知客户端的情况，很多处理方式是通过大量频繁的AJAX请求实现长轮询，这种机制效率低下，资源消耗大。
3. WebSocket为解决这种问题而出现，WebSocket允许客户端和服务端全双工通信，任何一方可以通过建立连接将数据发送到另一端。
4. WebSocket只要建立连接，就可以一直保持连接状态。
5. WebSocket协议服务端能主动向客户端推送消息，对实时性要求高的应用非常方便，比如实时通信、实时数据、订阅推送等
## 流程
客户端向服务端发起建立websocket连接的请求，建立连接成功后，客户端和服务端就可以通过TCP传输数据，不需要每次连接都带上重复的头数据，数据传输轻量。
## 示例
### 前置
```python
pip install websockets
```
### 服务端
```python
"""
Author:liulinyuan
file:server.py
datetime:2022/9/8 14:23
"""
import asyncio
import websockets

async def handler(websocket, path):
    data = await websocket.recv()
    reply = f"Data recieved as:  {data}，the path: {path}"
    await websocket.send(reply)

start_server = websockets.serve(handler, 'localhost', 8866)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
```
### 客户端
```python
"""
Author:liulinyuan
file:client.py
datetime:2022/9/8 14:31
"""
import asyncio
import websockets

async def connect():
    async with websockets.connect('ws://localhost:8866') as websocket:
        await websocket.send('hello')
        response = await websocket.recv()
        print(response)

asyncio.get_event_loop().run_until_complete(connect())
```
## Socket与WebSocket区别
1. socket不是协议，是为了方便使用TCP/UDP抽象出来的一层，用于应用层和传输层之间的一组接口
2. 把复杂的TCP/IP协议族隐藏在socket接口后面，对用户来说，就是一个简单的接口，由socket去组织数据，以符合协议规范
3. 两台主机通信，必须通过socket连接
4. OSI7层模型，下3层偏向数据通信，上3层偏向数据处理，中间的传输层是上下的一个桥梁，上3层依赖下层的协议
5. websocket是典型的一个应用层协议
- 参考
- [https://www.piesocket.com/blog/python-websocket](https://www.piesocket.com/blog/python-websocket)