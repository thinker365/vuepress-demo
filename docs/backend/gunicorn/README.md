## 部署说明
### Django在生产环境不应该处理静态资源（比如网页、图片等）的请求
1. 在开发阶段，为了是环境搭建容易，让Django处理静态资源的请求。
2. 在生产环境不能这样做，使用Nginx来处理静态资源的请求。
### Django在生产环境不能直接处理HTTP请求
1. Django是 wsgi web application 的框架，它只有一个简单的单线程 wsgi web server。 供调试时使用。性能很低。
2. 在生产环境必须提供 专业的 wsgi web server，比如 uWSGI 或者 Gunicorn。
3. 而且即使有了 uWSGI 或者 Gunicorn，我们最好还要在前面设置 Nginx 。所有的客户请求由它先接受，再进行相应的转发。
4. 为什么要这样？Nginx 在整个后端的最前方， 可以实现 负载均衡、反向代理、请求缓存、响应缓存 、负荷控制等等一系列功能。可以大大的提高整个后端的性能和稳定性。
![](~@img/uTools_1655647990507.png)
## 架构说明
### Nginx
1. Nginx 运行起来是多个进程，接收从客户端（通常是浏览器或者手机APP）发过来的请求。
2. 它会 根据请求的URL 进行判断：
	- 如果请求的 是 静态资源，比如HTML文档、图片等，它直接从配置的路径进行读取，返回内容给客户端。
	- 如果请求的 是 动态数据， 转发给 Gunicorn+Django 进行处理
### Gunicorn/Django
1. Gunicorn 和 Django 是运行在同一个 Python进程里面的。 它们都是用Python代码写的程序。
2. 启动Gunicorn的时候，它会根据配置加载Django的入口模块，这个入口模块里面提供了WSGI接口。
3. 当 Gunicorn 接收到 Nginx 转发的 HTTP请求后，就会调用 Django的 WSGI入口函数，将请求给Django进行处理。
4. Django框架 再根据请求的URL 和 我们项目配置的 URL 路由表，找到我们编写的对应的消息处理函数进行处理。

## 制作发布包
系统包括web前端系统（包括web前端的HTML、css、图片、js业务代码、js库等文件）、后端业务处理系统、数据库系统。
1. 前端发布包
2. 后端发布包
	- settings.py ，配置项DEBUG值为False
	- 数据库改为生产环境的数据库
	- 添加Linux启动shell脚本
		- 生产环境，我们使用 Gunicorn 作为 Django的WSGI前端，首先我们需要创建一个 Gunicorn启动配置文件 ./bysms/gunicorn_conf.py ，内容如下
		```shell script
		# gunicorn/django  服务监听地址、端口
		bind = '127.0.0.1:8000'

		# gunicorn worker 进程个数，建议为： CPU核心个数 * 2 + 1
		workers =  3 

		# gunicorn worker 类型， 使用异步的event类型IO效率比较高
		worker_class =  "gevent"  

		# 日志文件路径
		errorlog = "/home/byhy/gunicorn.log"
		loglevel = "info"

		import sys,os

		cwd = os.getcwd()
		sys.path.append(cwd)
		```
		- 要保证我们的Django后端服务在linux上一个命令就能启动，需要开发一个 Linux 启动shell脚本 ./run.sh
		```shell script
		#!/bin/bash
		DIR="$( cd "$( dirname "$0" )" && pwd )"
		echo $DIR
		
		cd $DIR
		
		# ulimit -n 50000
		nohup gunicorn --config=bysms/gunicorn_conf.py bysms.wsgi &> /dev/null &
		```
		然后，删除 所有app 的 migrations 目录（？？？）
## 安装配置Nginx
### 安装
以ubuntu为例
```shell script
apt install nginx
```
### 配置
文件路径：/etc/nginx/nginx.conf
```ini
user  thinker; # thinker用户运行Nginx进程
worker_processes  2; # 启动两个Nginx worker 进程

events {
    # 每个工作进程 可以同时接收 1024 个连接
    worker_connections  1024; 
}

# 配置 Nginx worker 进程 最大允许 2000个网络连接
worker_rlimit_nofile 2000;

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  30;

    gzip  on;
    
    # 配置 动态服务器（比如Gunicorn/Django）
    # 主要配置 名称（这里是apiserver） 地址和端口    
    upstream apiserver  {

        # maintain a maximum of 20 idle connections to each upstream server
        keepalive 20;

        server 127.0.0.1:8000; # 地址和端口
    }
   
    # 配置 HTTP 服务器信息
    server {
        # 配置网站的域名，这里请改为你申请的域名， 如果没有域名，使用IP地址。
        server_name  www.thinker.com;  

        # 配置访问静态文件的根目录，        
        root /home/thinker/frontend/dist;
        
        # 配置动态数据请求怎么处理
        # 下面这个配置项说明了，当 HTTP 请求 URL以 /api/ 开头，
        # 则转发给 apiserver 服务器进程去处理        
        location /api/      {
            proxy_pass         http://apiserver;
            proxy_set_header   Host $host;
        }
    }

}
```
### 启动
```shell script
systemctl restart nginx
```
### 查看日志
路径 /var/log/nginx/error.log
### 防火墙设置
```shell script
ufw allow 80
```
## 安装Django
```shell script
# 这是先安装pip
apt install python3-pip

# 再安装 Django
pip3 install Django -i https://pypi.douban.com/simple/
```
## 安装Gunicorn
执行下面的命令安装Gunicorn和它依赖的库gevent和greenlet（异步模式需要）
```shell script
pip3 install greenlet -i https://pypi.douban.com/simple/
pip3 install gevent    
pip3 install gunicorn
```
## 安装MySQL，创建数据库和用户
### 安装（略）
### 启动服务
先使用root用户创建数据库thinkerSystem，指定使用utf8的缺省字符编码，执行命令如下
```sql
CREATE DATABASE thinkerSystem CHARACTER SET utf8mb4  COLLATE utf8mb4_unicode_520_ci;
```
再创建thinkerSystem系统用来连接数据库的用户，保证该用户有访问数据库的权限
```sql
CREATE USER 'thinker'@'localhost' IDENTIFIED BY 'thinker';
CREATE USER 'thinker'@'%' IDENTIFIED BY 'thinker';
```
随后输入如下命令，赋予thinker用户所有权限，访问系统所有数据库里面所有的表
```sql
GRANT ALL ON *.* TO 'thinker'@'localhost';
GRANT ALL ON *.* TO 'thinker'@'%';
```
## 安装产品发布包
为了让Django认为你使用的虚拟机的IP地址或者域名是允许使用的， 需要修改settings.py 里面的配置项ALLOWED_HOSTS，加上一个你当前虚拟机的IP，也可以使用 '*' ， 表示所有IP都可以。
```python
ALLOWED_HOSTS = ['*','localhost','127.0.0.1']
```
```
dos2unix run.sh（win上的文件到linux上，格式需要转换，主要是rn-->n）
chmod +x run.sh
```
## 创建数据库
```python
python3 manage.py makemigrations <your_app_label>
python3 manage.py migrate 
```
- 注意， <your_app_label> 需要替换成你的 Django 项目中的 app （只需要写包含了数据库表定义的App）的名字，可以是多个app，中间用空格隔开
- 开始我们要创建数据库的业务管理员账号，进入到manage.py所在目录，执行如下命令，
```python
python3 manage.py createsuperuser
```
## 启动Gunicorn/Django
1. 进入到thinker用户home目录，执行命令 run.sh
2. 执行命令ps -ef | grep python |grep gunicorn_conf |grep -v grep 查看是否启动成功。
