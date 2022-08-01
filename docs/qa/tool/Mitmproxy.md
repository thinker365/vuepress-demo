[[toc]]

## 介绍
mitmproxy是Python编写的一款功能完善的代理工具，mitmproxy是一款支持拦截HTTP和HTTPS请求和响应并即时修改它们的交互式中间人代理工具。同时它提供了Python API给开发者编写插件用来自定义对流量进行处理和修改。
mitm为Man-In-The-Middle attack，mitmproxy 即为 中间人攻击代理。
## 准备工作
1. 安装
- 下载二进制文件安装
	- 官网下载：[https://mitmproxy.org/](https://mitmproxy.org/)
	- 执行下载的exe文件安装，安装后，mitmproxy，mitmdump和mitmweb也会添加到环境变量PATH中，可以从命令行调用
	- 执行mitmweb.exe，打开抓包页面
- pip安装
	```
	pip install mitmproxy
	```
2. 检验
	- windows
	```
	mitmdump --version
	ImportError: cannot import name 'soft_unicode' from 'markupsafe'
	pip install markupsafe==2.0.1
	```
	- linux、mac
	```
	mitmproxy --version
	```
## 特征
1. 拦截HTTP和HTTPS请求和响应。
2. 保存HTTP会话并进行分析。
3. 模拟客户端发起请求，模拟服务端返回响应。
4. 利用反向代理将流量转发给指定的服务器。
5. 支持 Mac 和 Linux 上的透明代理。
6. 利用Python对HTTP请求和响应进行实时处理
7. 实时生成用于拦截的 SSL / TLS 证书
...

## Mitmproxy构成（三种功能一致，差别在交互界面）
1. mitmproxy
	- 提供了一个交互式命令行界面，允许交互式检查和修改HTTP流量（不支持windows，支持os和linux）
	- 它支持 SSL/TLS 的拦截代理，具有 HTTP/1、 HTTP/2和 WebSocket 的控制台接口。
	- 它与 mitmdump 的不同之处在于，所有请求都保存在内存中，这意味着它用于获取和操作小型样本，小的数据量。
	```
	mitmproxy -p 8989
	```
	- 然后浏览器设置代理（127.0.0.1，8989），即可看到访问的请求
	- 或者
	- 首先进入它的默认视图，这时候它是没有任何请求进来的
	- 新开一个终端
	```
	curl --proxy http://127.0.0.1:8989 'https://cn.bing.com/search?q=哈哈'
	```
	- 在默认视图即可看到相关请求
1. mitmweb
	- 提供了一个基于浏览器的GUI，它允许交互式检查和修改 HTTP 流量
	```
	mitmweb -p 8989
	```
	- 然后浏览器设置代理（127.0.0.1，8989），即可看到访问的请求
1. mitmdump（重点学习）
	- 提供非交互式终端输出，它提供了类似tcpdump的功能，可查看、记录和以编程方式处理HTTP流量。因此就不用手动截获和分析 http 请求和响应，只需要写好请求和响应的处理逻辑即可。而且可以做请求的流量的录制与回放。
	```
	mitmdump -w d://lyc.txt
	```
	- 设置代理
	- 安装证书：[http://mitm.it/](http://mitm.it/)
## 插件（自定义脚本，强大的地方）
1. 编写一个py文件供 mitmproxy 加载，文件中定义了若干函数，这些函数实现了某些 mitmproxy 提供的事件，mitmproxy 会在某个事件发生时调用对应的函数
2. 编写一个py文件供 mitmproxy 加载，文件定义了变量 addons，addons 是个数组，每个元素是一个类实例，这些类有若干方法，这些方法实现了某些 mitmproxy 提供的事件，mitmproxy 会在某个事件发生时调用对应的方法。这些类，称为一个个的addon。（推荐模式，官方也是这样）
3. 将上面示例代码存为 addons.py，再重新启动 mitmproxy，当浏览器使用代理访问时就能看到数据。
```
mitmweb -s addons.py
```
## 事件
- 事件针对不同生命周期分为 5 类。“生命周期”这里指在哪一个层面看待事件，举例来说，同样是一次 web 请求，我可以理解为“HTTP 请求 -> HTTP 响应”的过程，也可以理解为“TCP 连接 -> TCP 通信 -> TCP 断开”的过程。
- 那么，如果我想拒绝来个某个 IP 的客户端请求，应当注册函数到针对TCP生命周期的tcp_start事件，又或者，我想阻断对某个特定域名的请求时，则应当注册函数到针对 HTTP 声明周期的 http_connect 事件。其他情况同理。
1. HTTP生命周期
2. TCP生命周期
3. WebSocket生命周期
4. 网络连接生命周期
5. 通用生命周期
- 实际使用场景，大多数情况下我们只会用到HTTP生命周期的几个事件。甚至只需要用到 http_connect、request、response 三个事件。
## 官网
1. [https://docs.mitmproxy.org/stable/](https://docs.mitmproxy.org/stable/)
