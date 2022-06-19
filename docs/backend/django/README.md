[[toc]]

## 简介
- 用python语言写的开源web开发框架，并遵循MVC设计；
- Django的主要目的是简便、快速的开发数据库驱动的网站；
- 它强调代码复用，多个组件可以很方便的以"插件"形式服务于整个框架；
- Django有许多功能强大的第三方插件，你甚至可以很方便的开发出自己的工具包；
- 这使得Django具有很强的可扩展性；
- 它还强调快速开发和DRY(DoNotRepeatYourself)原则。
## 特点
### 重量级框架
对比Flask框架，Django原生提供了众多的功能组件，让开发更简便快速。
1. 提供项目工程管理的自动化脚本工具
2. 数据库ORM支持（对象关系映射，英语：Object Relational Mapping）
3. 模板
4. 表单
5. Admin管理站点
6. 文件管理
7. 认证权限
8. session机制
9. 缓存
### MVT模式
1. 有一种程序设计模式叫MVC，其核心思想是分工、解耦，让不同的代码块之间降低耦合，增强代码的可扩展性和可移植性，实现向后兼容；
	- M全拼为Model，主要封装对数据库层的访问，对数据库中的数据进行增、删、改、查操作；
	- V全拼为View，用于封装结果，生成页面展示的html内容；
	- C全拼为Controller，用于接收请求，处理业务逻辑，与Model和View交互，返回结果。
2. Django的MVT
	- M全拼为Model，与MVC中的M功能相同，负责和数据库交互，进行数据处理；
	- V全拼为View，与MVC中的C功能相同，接收请求，进行业务处理，返回应答；
	- T全拼为Template，与MVC中的V功能相同，负责封装构造要返回的html。

## 项目搭建
### 环境安装
创建虚拟环境（不想创建你随意~）
```shell script
pip3 install virtualenv
virtualenv venv
如果存在多个python解释器，可以选择指定一个Python解释器（比如python3.6）
virtualenv -p python3.6 venv
```
安装Django
```shell script
pip3 install Django
```
Virtualenv相关命令总结：
::: tip 
- workon: 打印所有的虚拟环境；
- mkvirtualenv xxx: 创建 xxx 虚拟环境，可以–python=/usr/bin/python3.6 指定python版本;
- workon xxx: 使用 xxx 虚拟环境;
- deactivate: 退出 xxx 虚拟环境；
- rmvirtualenv xxx: 删除 xxx 虚拟环境。
- lsvirtualenv : 列举所有的环境。
:::
### 创建项目
1. 创建项目
```python
django-admin startproject project
```
1. 项目目录说明
	- 与项目同名的目录，此处为xxx；
	- settings.py 是项目的整体配置文件；
	- urls.py 是项目的URL配置文件；
	- wsgi.py 是项目与WSGI兼容的Web服务器入口；
	- manage.py 是项目管理文件，通过它管理项目。
1. 启动本地服务，django提供了一个纯python编写的轻量级web服务器
```python
python manage.py runserver ip:port
（或者）
python manage.py runserver
可以不写IP和端口，默认IP是127.0.0.1，默认端口为8000
```
### 创建应用
1. 创建（子）应用
```python
python manage.py startapp app
```
1. 子应用目录说明：
	- admin.py 文件跟网站的后台管理站点配置相关。
	- apps.py 文件用于配置当前子应用的相关信息。
	- migrations 目录用于存放数据库迁移历史文件。
	- models.py 文件用户保存数据库模型类。
	- tests.py 文件用于开发测试用例，编写单元测试。
	- views.py 文件用于编写Web应用视图。
1. 注册子应用
注册安装一个子应用的方法，即是将子应用的配置信息文件apps.py中的Config类添加到项目配置文件settings.py中INSTALLED_APPS列表中。

### 创建视图
1. 进入创建的应用模块，在views.py中编写视图
    ```python
    from django.http import HttpResponse
    def index(request):
        """
        index视图
        :param request: 包含了请求信息的请求对象
        :return: 响应对象
        """
        return HttpResponse("hello the world!")
    ```
	说明
	- 视图函数的第一个传入参数必须定义，用于接收Django构造的包含了请求数据的HttpReqeust对象，通常名为request;
	- 视图函数的返回值必须为一个响应对象，不能像Flask一样直接返回一个字符串，可以将要返回的字符串数据放到一个HTTPResponse对象中。
1. 进入创建的应用模块，在urls.py中保存应用路由
```python
from django.conf.urls import url	
from . import views	
# urlpatterns是被django自动识别的路由列表变量
urlpatterns = [
	# 每个路由信息都需要使用url函数来构造
	# url(路径, 视图)
	url(r'^index/$', views.index),
]
```
	URL传递参数
		- 无参数情况
		```python
		(r’^hello/$’, hello)
		def hello(request):
		    return HttpResponse("Hello World")
		```
		- 传递一个参数
		```python
		(r’^plist/(.+)/$’, helloParam）
		def helloParam(request，param):
		    return HttpResponse(param)
		```
		- 传递多个参数
		```python
		(r’^plist/p1(\w+)p2(.+)/$’, helloParams）
		def helloParams(request，param1,param2):
		    return HttpResponse(param1;param2)
		访问http://127.0.0.1:8000/plist/p1chinap22022/
		输出为”china;2022″
		```
	- 从这里可以看出，视图的参数是根据URL的正则式，按顺序匹配并自动赋值的。虽然这样可以实现任意多个参数的传递，但是却不够灵活，URL看起来很混乱，而且由于是正则匹配，有些情况下容易出错
	- **通过传统的”?”传递参数**
		- 例如，http://127.0.0.1:8000/plist/?p1=china&p2=2012，url中‘?’之后表示传递的参数，这里传递了p1和p2两个参数。
		- 通过这样的方式传递参数，就不会出现因为正则匹配错误而导致的问题了。在Django中，此类参数的解析是通过request.GET.get方法获取的。
		- 配置URL及其视图如下：
		```python
		(r’^plist/$’, helloParams1）
		def helloParams(request):
			p1 = request.GET.get('p1')
			p2 = request.GET.get('p2')
			return HttpResponse("p1 = " + p1 + "; p2 = " + p2)
		输出结果为”p1 = china; p2 = 2012″
		```
	- **使用关键字参数而非位置参数**
		- 在 Python 正则表达式中，命名的正则表达式组的语法是 (?P<name>pattern) ，这里 name 是组的名字，而pattern 是匹配的某个模式。
		- 使用无名组
		```python
		urlpatterns = patterns('',
			(r'^articles/(\d{4})/$', views.year_archive),
			(r'^articles/(\d{4})/(\d{2})/$', views.month_archive),
		)
		```
		- 使用命名组
		```python
		urlpatterns = patterns('',
		    (r'^articles/(?P<year>\d{4})/$', views.year_archive),
		    (r'^articles/(?P<year>\d{4})/(?P<month>\d{2})/$', views.month_archive),
		)
		```
		- 如果不带命名组，请求 /articles/2022/06/ 将会等同于这样的函数调用：
	    ```python
		month_archive(request, '2022', '06')
		```
		- 而带命名组，同样的请求就会变成这样的函数调用：
		```python
		month_archive(request, year='2022', month='06')
		```
		- 需要注意的是如果在URLconf中使用命名组，那么命名组和非命名组是不能同时存在于同一个URLconf的模式中的。 如果你这样做，Django不会抛出任何错误，但你可能会发现你的URL并没有像你预想的那样匹配正确。
		- 具体地，以下是URLconf解释器有关正则表达式中命名组和 非命名组所遵循的算法:
			- 如果有任何命名的组，Django会忽略非命名组而直接使用命名组。
			- 否则，Django会把所有非命名组以位置参数的形式传递。
			- 在以上的两种情况，Django同时会以关键字参数的方式传递一些额外参数。
		
1. 在项目总路由project/urls.py中添加子应用的路由数据
```python
from django.conf.urls import url, include
from django.contrib import admin	
urlpatterns = [
	url(r'^admin/', admin.site.urls),  # django默认包含的	
	url(r'^app/', include('app.urls')), 
]
```
- 备注
	- 使用include来将子应用app里的全部路由包含进项目路由中；
	- r'^app/' 决定了app子应用的所有路由都已/app/开头，如我们刚定义的视图index，其最终的完整访问路径为/app/index/；
	- include函数除了可以传递字符串之外，也可以直接传递应用的urls模块。
	```python
	from django.conf.urls import url, include
	from django.contrib import admin
	import users.urls  # 先导入应用的urls模块	
	urlpatterns = [
		url(r'^admin/', admin.site.urls),
		url(r'^users/', include(app.urls)),  # 添加应用的路由
	]
	```
## 项目配置
### 配置文件
1. BASE_DIR
	当前工程的根目录，Django会依此来定位工程内的相关文件，我们也可以使用该参数来构造文件路径
1. DEBUG
	- 调试模式，创建工程后初始值为True，即默认工作在调试模式下
	- Django程序出现异常时，向前端显示详细的错误追踪信息
	- 部署线上运行的Django不要运行在调式模式下，记得修改DEBUG=False
1. 语言与时区
	```python
	LANGUAGE_CODE = 'zh-hans'
	TIME_ZONE = 'Asia/Shanghai'
	```
1. 静态文件
	- 项目中的CSS、图片、js都是静态文件。一般会将静态文件放到一个单独的目录中，以方便管理；
	- 静态文件可以放在项目根目录下，也可以放在应用的目录下，由于有些静态文件在项目中是通用的，所以推荐放在项目的根目录下，方便管理；
	```python
	STATICFILES_DIRS=[] 存放查找静态文件的目录 接收的是list
	STATIC_URL 访问静态文件的URL前缀
	```
	Django 仅在调试模式下（DEBUG=True）能对外提供静态文件；当DEBUG=False工作在生产模式时，Django不再对外提供静态文件，需要是用collectstatic命令来收集静态文件并交由其他静态文件服务器来提供。
### 路由
#### 路由说明
- Django的主要路由信息定义在工程同名目录下的urls.py文件中，该文件是Django解析路由的入口；
- 每个子应用为了保持相对独立，可以在各个子应用中定义属于自己的urls.py来保存该应用的路由，然后用主路由文件包含各应用的子路由数据。
```python
from django.conf.urls import url
from django.contrib import admin
import app.views
urlpatterns = [
	url(r'^admin/', admin.site.urls),
	url(r'^app/index/$', app.views.index)
]
```
#### 路由解析顺序
- Django在接收到一个请求时，从主路由文件中的urlpatterns列表中以由上至下的顺序查找对应路由规则;
- 如果发现规则为include包含，则再进入被包含的urls中的urlpatterns列表由上至下进行查询;
- 值得关注的由上至下的顺序，有可能会使上面的路由屏蔽掉下面的路由，带来非预期结果。
```python
urlpatterns = [
	url(r'^say', views.say),
	url(r'^sayhello', views.sayhello),
]
```
#### 路由命名与reverse反解析（逆向）
1. 在定义路由的时候，可以为路由命名，方便查找特定视图的具体路径信息；
	- 在使用include函数定义路由时，可以使用namespace参数定义路由的命名空间；
        ```python
        url(r'^users/', include('users.urls', namespace='users')),
        ```
        - 此命名空间表示，凡是users.urls中定义的路由，均属于namespace指明的users名下；
        - 命名空间的作用是避免不同应用中的路由使用了相同的名字发生冲突，使用命名空间区别开。
	- 在定义普通路由（非include函数）时，可以使用name参数指明路由的名字；
    ```python
    urlpatterns = [
        url(r'^index/$', views.index, name='index'),
        url(r'^say', views.say, name='say'),
    ]
    ```
2. reverse反解析
	```python
	from django.urls import reverse
	def index(request):
		return HttpResponse("hello the world!")
	def say(request):
		url = reverse('users:index')  # 返回 /users/index/
		print(url)
		return HttpResponse('say')
	```
    对于未指明namespace的，reverse(路由name)；对于指明namespace的，reverse(命名空间namespace:路由name)
#### 路径结尾斜线/的说明
- Django中定义路由时，通常以斜线“/”结尾，其好处是用户访问不以斜线“/”结尾的相同路径时，Django会把用户重定向到以斜线“/”结尾的路径上，而不会返回404。
```python
urlpatterns = [
	url(r'^index/$', views.index, name='index'),
]
```
- 用户访问index或者index/网址，均能访问到index视图；
- 虽然路由结尾带/能带来上述好处，但是却违背了HTTP中URL表示资源位置路径的设计理念；
- SO，是否结尾带“/”，你自己看着办咯！
## 请求响应
### 请求Request
1. 利用HTTP协议向服务器传参有几种途径？
	- 提取URL的特定部分，如/weather/beijing/2018，可以在服务器端的路由中用正则表达式截取；
	- 查询字符串（query string)，形如key1=value1&key2=value2；
	- 请求体（body）中发送的数据，比如表单数据、json、xml；
	- 在http报文的头（header）中。
1. URL路径参数
	- 在定义路由URL时，可以使用正则表达式提取参数的方法从URL中获取请求参数，Django会将提取的参数直接传递到视图的传入参数中。
	- 未命名参数按定义顺序传递
	```python
	url(r'^weather/([a-z]+)/(\d{4})/$', views.weather),
	def weather(request, city, year):
	    print('city=%s' % city)
	    print('year=%s' % year)
	    return HttpResponse('OK')
	```
	- 命名参数按名字传递
	```python
	url(r'^weather/(?P<city>[a-z]+)/(?P<year>\d{4})/$', views.weather),
	def weather(request, year, city):
	    print('city=%s' % city)
	    print('year=%s' % year)
	    return HttpResponse('OK')
	```
1. Django中的QueryDict对象
	- 定义在django.http.QueryDict；
	- HttpRequest对象的属性GET、POST都是QueryDict类型的对象；
	- 与python字典不同，QueryDict类型的对象用来处理同一个键带有多个值的情况；
	- 方法get()：根据键获取值
		如果一个键同时拥有多个值将获取最后一个值；如果键不存在则返回None值，可以设置默认值进行后续处理
		```python
		dict.get('键',默认值)
		可简写为
		dict['键']
		```
	- 方法getlist()：根据键获取值，值以列表返回，可以获取指定键的所有值
		如果键不存在则返回空列表[]，可以设置默认值进行后续处理
		```python
		dict.getlist('键',默认值)
		```
1. 查询字符串Query String
	- 获取请求路径中的查询字符串参数（形如?k1=v1&k2=v2），可以通过request.GET属性获取，返回QueryDict对象
	```python
	# /qs/?a=1&b=2&a=3
	def qs(request):
		a = request.GET.get('a')
		b = request.GET.get('b')
		alist = request.GET.getlist('a')
		print(a)  # 3
		print(b)  # 2
		print(alist)  # ['1', '3']
		return HttpResponse('OK')
	```
	- 查询字符串不区分请求方式，即假使客户端进行POST方式的请求，依然可以通过request.GET获取请求中的查询字符串数据。
1. 请求体
	- 请求体数据格式不固定，可以是表单类型字符串，可以是JSON字符串，可以是XML字符串，应区别对待；
	- 可以发送请求体数据的请求方式有POST、PUT、PATCH、DELETE；
	- Django默认开启了CSRF防护，会对上述请求方式进行CSRF防护验证，在测试时可以关闭CSRF防护机制，方法为在settings.py文件中注释掉CSRF中间件。
	- 表单类型 Form Data（application/x-www-form-urlencoded）
		- 前端发送的表单类型的请求体数据，可以通过request.POST属性获取，返回QueryDict对象
		```python
		def get_body(request):
			a = request.POST.get('a')
			b = request.POST.get('b')
			alist = request.POST.getlist('a')
			print(a)
			print(b)
			print(alist)
			return HttpResponse('OK')
		```
		- request.POST只能用来获取POST方式的请求体表单数据
	- 非表单类型 Non-Form Data（application/json）
		- 非表单类型的请求体数据，Django无法自动解析，可以通过request.body属性获取最原始的请求体数据；
		- 自己按照请求体格式（JSON、XML等）进行解析；
		- request.body返回bytes类型。
		```python
		如请求体为JSON数据：{"a": 1, "b": 2}
		import json	
		def get_body_json(request):
			json_str = request.body
			json_str = json_str.decode()  # python3.6 无需执行此步
			req_data = json.loads(json_str)
			print(req_data['a'])
			print(req_data['b'])
			return HttpResponse('OK')
		```
1. 请求头
	- 可以通过request.META属性获取请求头headers中的数据，request.META为字典类型
	- 常见的请求头如：
		- CONTENT_LENGTH – The length of the request body (as a string).
		- CONTENT_TYPE – The MIME type of the request body.
		- HTTP_ACCEPT – Acceptable content types for the response.
		- HTTP_ACCEPT_ENCODING – Acceptable encodings for the response.
		- HTTP_ACCEPT_LANGUAGE – Acceptable languages for the response.
		- HTTP_HOST – The HTTP Host header sent by the client.
		- HTTP_REFERER – The referring page, if any.
		- HTTP_USER_AGENT – The client’s user-agent string.
		- QUERY_STRING – The query string, as a single (unparsed) string.
		- REMOTE_ADDR – The IP address of the client.
		- REMOTE_HOST – The hostname of the client.
		- REMOTE_USER – The user authenticated by the Web server, if any.
		- REQUEST_METHOD – A string such as "GET" or "POST".
		- SERVER_NAME – The hostname of the server.
		- SERVER_PORT – The port of the server (as a string).
	- 具体使用
	```python
	def get_headers(request):
		print(request.META['CONTENT_TYPE'])
		return HttpResponse('OK')
	```
1. 其他常用HttpRequest对象属性
	- method：一个字符串，表示请求使用的HTTP方法，常用值包括：'GET'、'POST'；
	- user：请求的用户对象；
	- path：一个字符串，表示请求的页面的完整路径，不包含域名和参数部分；
	- encoding：一个字符串，表示提交的数据的编码方式；
		- 如果为None则表示使用浏览器的默认设置，一般为utf-8；
		- 这个属性是可写的，可以通过修改它来修改访问表单数据使用的编码，接下来对属性的任何访问将使用新的encoding值；
	- FILES：一个类似于字典的对象，包含所有的上传文件。
	- GET：QueryDict类型对象，类似于字典，包含get请求方式的所有参数。
	- POST：QueryDict类型对象，类似于字典，包含post请求方式的所有参数。
	- COOKIES：一个标准的Python字典，包含所有的cookie，键和值都为字符串。
	- SESSION：一个既可读又可写的类似于字典的对象，表示当前的会话，只有当Django 启用会话的支持时才可用。
	- body： http请求的主体，二进制格式。
	- data：Django中标准的request.POST和request.FILES属性，drf中可以返回请求体的解析内容。
	- query_params：request.query_params等同于request.GET，不过其名字更加容易理解。为了代码更加清晰可读，推荐使用request.query_params ，而不是Django中的request.GET，这样那够让你的代码更加明显的体现出，任何HTTP method类型都可能包含查询参数（query parameters），而不仅仅只是GET请求。
	- parsers：APIView类或者@api_view装饰器将根据视图上设置的parser_classes或settings文件中的DEFAULT_PARSER_CLASSES设置来确保此属性（.parsers）自动设置为 Parser 实例列表。通常不需要关注该属性

### 响应Response
- 视图在接收请求并处理后，必须返回HttpResponse对象或子对象；
- HttpRequest对象由Django创建，HttpResponse对象由开发人员创建。
1. HttpResponse
	- 可以使用django.http.HttpResponse来构造响应对象
	```python
	HttpResponse(content=响应体, content_type=响应体数据类型, status=状态码)
	```
	- 也可通过HttpResponse对象属性来设置响应体、状态码：
	```python
	content：表示返回的内容。
	status_code：返回的HTTP响应状态码。
	```
	- 响应头可以直接将HttpResponse对象当做字典进行响应头键值对的设置
	```python
	response = HttpResponse()
	response['xxx'] = 'Python'  # 自定义响应头xxx, 值为Python
	```
	- 示例：
	```python
	from django.http import HttpResponse
	def demo_view(request):
		return HttpResponse('python', status=400)
		或者
		response = HttpResponse('python')
		response.status_code = 400
		response['xxx'] = 'Python'
		return response
	```
1. HttpResponse子类
	Django提供了一系列HttpResponse的子类，可以快速设置状态码
    - HttpResponseRedirect 301
    - HttpResponsePermanentRedirect 302
    - HttpResponseNotModified 304
    - HttpResponseBadRequest 400
    - HttpResponseNotFound 404
    - HttpResponseForbidden 403
    - HttpResponseNotAllowed 405
    - HttpResponseGone 410
    - HttpResponseServerError 500
1. JsonResponse
	若要返回json数据，可以使用JsonResponse来构造响应对象，作用如下：
    - 帮助我们将数据转换为json字符串
    - 设置响应头Content-Type为 application/json
    ```python
    from django.http import JsonResponse	
    def demo_view(request):
        return JsonResponse({'city': 'chengdu', 'subject': 'python'})
    ```

1. Response
	- drf自己封装的方法，会有一个简单的web接口界面
	- 与普通 HttpResponse 对象不同，您不会使用渲染的内容实例化 Response 对象。相反，您传递的是未渲染的数据，可能包含任何 Python 对象。
	- 由于 Response 类使用的渲染器不能处理复杂的数据类型（比如 Django 的模型实例），所以需要在创建 Response 对象之前将数据序列化为基本的数据类型。
1. 重定向简写redirect
	```python
	from django.shortcuts import redirect
	def demo_view(request):
		return redirect('/index.html')
	```
1. 重定向HttpResponseRedirect
	HttpResponseRedirect对象实现重定向功能，这个类继承自HttpResponse，被定义在django.http模块中，返回的状态码为302
	```python
	from django.http import HttpResponseRedirect
	# 定义重定义向视图，转向首页
	def index(request):
		return HttpResponseRedirect('/login', {'h1': 'hello'})
	```
1. render
	结合一个给定的模板和一个给定的上下文字典, 并返回一个渲染后的HttpResponse对象。
    ```python
	from django.shortcuts import render
	def my_view(request):
		# 视图代码写在这里
		return render(request, "myapp/index.html", {"foo": "bar"})
	```
### Cookie
1. HTTP 协议中的 Cookie 包括 Web Cookie 和浏览器 Cookie，它是服务器发送到 Web 浏览器的一小块数据。服务器发送到浏览器的 Cookie，浏览器会进行存储，并与下一个请求一起发送到服务器。通常，它用于判断两个请求是否来自于同一个浏览器，例如用户保持登录状态。
2. Cookie，有时也用其复数形式Cookies，指某些网站为了辨别用户身份、进行session跟踪而储存在用户本地终端上的数据（通常经过加密）；
3. Cookie是存储在浏览器中的一段纯文本信息，建议不要存储敏感信息如密码，因为电脑上的浏览器可能被其它人使用。
4. Cookie的特点：
	- Cookie以键值对Key-Value形势进行信息的存储；
	- Cookie基于域名安全，不同域名的Cookie是不能互相访问的。
5. Cookie 主要用于下面三个目的
	-  会话管理：登录、购物车、游戏得分或者服务器应该记住的其他内容
	-  个性化：用户偏好、主题或者其他设置
	-  追踪：记录和分析用户行为
6. 有两种类型的 Cookies，一种是 Session Cookies，一种是 Persistent Cookies，如果 Cookie 不包含到期日期，则将其视为会话 Cookie。会话 Cookie 存储在内存中，永远不会写入磁盘，当浏览器关闭时，此后 Cookie 将永久丢失。如果 Cookie 包含有效期 ，则将其视为持久性 Cookie。在到期指定的日期，Cookie 将从磁盘中删除。
7. Cookie的 Secure 和 HttpOnly 标记
	- 安全的 Cookie 需要经过 HTTPS 协议通过加密的方式发送到服务器。即使是安全的，也不应该将敏感信息存储在cookie 中，因为它们本质上是不安全的，并且此标志不能提供真正的保护。
	- HttpOnly 的作用
		- 会话 Cookie 中缺少 HttpOnly 属性会导致攻击者可以通过程序(JS脚本、Applet等)获取到用户的 Cookie 信息，造成用户 Cookie 信息泄露，增加攻击者的跨站脚本攻击威胁。
		- HttpOnly 是微软对 Cookie 做的扩展，该值指定 Cookie 是否可通过客户端脚本访问。
		- 如果在 Cookie 中没有设置 HttpOnly 属性为 true，可能导致 Cookie 被窃取。窃取的 Cookie 可以包含标识站点用户的敏感信息，如 ASP.NET 会话 ID 或 Forms 身份验证票证，攻击者可以重播窃取的 Cookie，以便伪装成用户或获取敏感信息，进行跨站脚本攻击等。
8. Cookie 的作用域
	- Domain 和 Path 标识定义了 Cookie 的作用域：即 Cookie 应该发送给哪些 URL。
	- Domain 标识指定了哪些主机可以接受 Cookie。如果不指定，默认为当前主机(不包含子域名）。如果指定了Domain，则一般包含子域名。
	- 例如，如果设置 Domain=mozilla.org，则 Cookie 也包含在子域名中（如developer.mozilla.org）。
	- 例如，设置 Path=/docs，则以下地址都会匹配：
		-  /docs
		-  /docs/Web/
1. 设置Cookie
	可以通过HttpResponse对象中的set_cookie方法来设置cookie
	```python
	HttpResponse.set_cookie(cookie名, value=cookie值, max_age=cookie有效期)
	```
	max_age 单位为秒，默认为None；如果是临时cookie，可将max_age设置为None。
1. 读取Cookie
	- 可以通过HttpRequest对象的COOKIES属性来读取本次请求携带的cookie值；
	- request.COOKIES为字典类型。
### Session
1. Session 是什么
	客户端请求服务端，服务端会为这次请求开辟一块内存空间，这个对象便是 Session 对象，存储结构为 ConcurrentHashMap。Session 弥补了 HTTP 无状态特性，服务器可以利用 Session 存储客户端在同一个会话期间的一些操作记录。
1. Session 如何判断是否是同一会话
	- 服务器第一次接收到请求时，开辟了一块 Session 空间（创建了Session对象），同时生成一个 sessionId ，并通过响应头的 Set-Cookie：JSESSIONID=XXXXXXX 命令，向客户端发送要求设置 Cookie 的响应；客户端收到响应后，在本机客户端设置了一个 JSESSIONID=XXXXXXX 的 Cookie 信息，该 Cookie 的过期时间为浏览器会话结束。
	- 接下来客户端每次向同一个网站发送请求时，请求头都会带上该 Cookie 信息（包含 sessionId ）， 然后，服务器通过读取请求头中的 Cookie 信息，获取名称为 JSESSIONID 的值，得到此次请求的 sessionId。
1. Session 的作用
	- Session 的作用就是它在 Web服务器上保持用户的状态信息供在任何时间从任何设备上的页面进行访问。因为浏览器不需要存储任何这种信息，所以可以使用任何浏览器，即使是像 Pad 或手机这样的浏览器设备。
	- 保持会话状态!
1. Session 的缺点
	Session 机制有个缺点，比如 A 服务器存储了 Session，就是做了负载均衡后，假如一段时间内 A 的访问量激增，会转发到 B 进行访问，但是 B 服务器并没有存储 A 的 Session，会导致 Session 的失效。
1. Session的特点
	- 存储敏感、重要的信息
	- 支持更多字节
	- 以键值对进行存储的
	- 依赖于cookie。存储Session时，键与Cookie中的sessionid相同，值是开发人员设置的键值对信息，进行了base64编码，过期时间由开发人员设置。
	- 有过期时间，如果不指定，默认两周就会过期
	- 存储在服务器端
1. 禁用 Cookies，如何使用 Session ？
	- Q:用户禁止cookie后，服务器的sessionId还会发给用户么？
	- A:会：服务器仍会将sessionId以cookie的方式发送给浏览器，但是，浏览器不再保存这个cookie(即sessionId)了。
	- Q:如何设置才能在每个url后加上sessionId的值？
	- A:重写url，每个url后面自动加上PHPSESSID的值，然后正常使用session就可以了。
	- Q:session的生命周期中特别注意的？
	- A:只要活动就不会过期：session是一个只要活动就不会过期的东西，只要开启cookie，每一次会话，session_id都不会改变
		
1. Session配置和存储
	- 启用Session，Django项目默认启用Session，可以在settings.py文件中查看
    ```python
    MIDDLEWARE = [
        ...
        'django.contrib.sessions.middleware.SessionMiddleware',
        ...
    ]
    ```
    - 如需禁用session，将上图中的session中间件注释掉即可
	- 存储方式
	- 在settings.py文件中，可以设置session数据的存储方式，可以保存在数据库、本地缓存等
	- **数据库**
    - 存储在数据库中，如下设置可以写，也可以不写，这是默认存储方式。
    ```python
    SESSION_ENGINE='django.contrib.sessions.backends.db'
    ```
    - 如果存储在数据库中，需要在项INSTALLED_APPS中安装Session应用。
    ```python
    INSTALLED_APPS = [
            ...
            'django.contrib.sessions'
            ...
    ]
    ```
    - 迁移后会在数据库中创建出存储Session的表，数据库中的表为：django_session，由表结构可知，操作Session包括三个数据：键，值，过期时间。
    ![](~@img/uTools_1654268762377.png)
	- **本地缓存**
    - 存储在本机内存中，如果丢失则不能找回，比数据库的方式读写更快。
    ```python
    SESSION_ENGINE='django.contrib.sessions.backends.cache'
    ```
	- **混合存储**
    - 优先从本机内存中存取，如果没有则从数据库中存取
    ```python
    SESSION_ENGINE=`django.contrib.sessions.backends.cached_db`
    ```
	- **Redis**
        - 在redis中保存session，需要引入第三方扩展，我们可以使用django-redis来解决
        ```python
        pip install django-redis
        ```
        - 配置
        ```python
        CACHES = {
            "default": {
                "BACKEND": "django_redis.cache.RedisCache",
                "LOCATION": "redis://127.0.0.1:6379/1",
                "OPTIONS": {
                    "CLIENT_CLASS": "django_redis.client.DefaultClient",
                }
            }
        }
        SESSION_ENGINE = "django.contrib.sessions.backends.cache"
        SESSION_CACHE_ALIAS = "default"
        ```
        - 如果redis的ip地址不是本地回环127.0.0.1，而是其他地址，访问Django时，可能出现Redis连接错误；
        - 需修改redis的配置文件，添加特定ip地址。
            - 打开redis的配置文件
            - sudo vim /etc/redis/redis.conf
            - 如要添加10.8.250.79地址，bind 127.0.0.1 10.8.250.79
            - sudo service redis-server restart
1. 设置session
通过HttpRequest对象的session属性进行会话的读写操作。
```python
request.session['键']=值
	
views.py文件，创建视图set_session
def set_session(request):
    '''设置session'''
    request.session['username'] = 'smart'
    request.session['age'] = 18
    # request.session.set_expiry(5)
    return HttpResponse('设置session')
```
根据键读取值
```python
request.session.get('键',默认值)
views.py文件，修改get_session视图如下：
def get_session(request):
	'''获取session'''
	username = request.session['username']
	age = request.session['age']
	return HttpResponse(username+':'+str(age))
```
清除所有session，在存储中删除值部分
```python
request.session.clear()

views.py文件，修改clear_session视图如下
def clear_session(request):
    '''清除session信息'''
    request.session.clear()
    return HttpResponse('清除成功')
```
清除session数据，在存储中删除session的整条数据
```python
request.session.flush()
# 清除所有Session
def clear_session(request):
    '''清除所有session信息'''
    request.session.flush()
    return HttpResponse('清除成功')
```
删除session中的指定键及值，在存储中只删除某个键及对应的值
```python
del request.session['键']
```
设置session的有效期
```python
request.session.set_expiry(value)
```
- 如果value是一个整数，session将在value秒没有活动后过期；
- 如果value为0，那么用户session的Cookie将在用户的浏览器关闭时过期；
- 如果value为None，那么session有效期将采用系统默认值，默认为两周，可以通过在settings.py中设置SESSION_COOKIE_AGE来设置全局默认值。
### Session共享
1. 基于Nginx的ip_hash负载均衡
	这个方案实现最为简单，Session保存在后端服务器的内存中，只要hash属性是均匀的，多台web服务器的负载就是均衡的，安全性高，缺点：用户浏览器的IP地址hash以后满足单调性。会可能造成资源的分配不均衡，负载均衡就达不到到目的。有的服务器负载过重，有的服务器负载过轻，显然没有充分利用资源。
2. 基于数据库的Session共享
	首选当然是大名鼎鼎的Mysql数据库，并且建议使用内存表Heap，提高session操作的读写效率。这个方案的实用性比较强，相信大家普遍在使用，它的缺点在于session的并发读写能力取决于Mysql数据库的性能，同时需要自己实现session淘汰逻辑，以便定时从数据表中更新、删除 session记录，当并发过高时容易出现表锁，虽然我们可以选择行级锁的表引擎，但不得不否认使用数据库存储Session还是有些杀鸡用牛刀的架势。
3. 将信息放到cookie放在客户端
	- session存在服务器端，会对服务器产生压力。如果将信息保存到cookie中，减轻了服务器的压力，同时每个客户端的压力也很小。因为只保存自己的信息。这种方式在实际的开发中广泛的采用。
	- 缺点：cookie可以被禁用，cookie要随着浏览器传递，增大了传输的内容，cookie大小有限制。
4. 基于Redis做缓存session的统一缓存
	其实就是把每次用户的请求的时候生成的sessionID给放到Redis的服务器上。然后在基于Redis的特性进行设置一个失效时间的机制，这样就能保证用户在我们设置的Redis中的session失效时间内，都不需要进行再次登录。

### Cookie和Session的作用
HTTP 协议是一种无状态协议，即每次服务端接收到客户端的请求时，都是一个全新的请求，服务器并不知道客户端的历史请求记录；Session 和 Cookie 的主要目的就是为了弥补 HTTP的无状态特性。
## 类视图与中间件
### 类视图
#### 引入
1. 以函数的方式定义的视图称为函数视图，函数视图便于理解；
2. 但是遇到一个视图对应的路径提供了多种不同HTTP请求方式的支持时，便需要在一个函数中编写不同的业务逻辑，代码可读性与复用性都不佳。
```python
 def register(request):
	"""处理注册"""
	# 获取请求方法，判断是GET/POST请求
	if request.method == 'GET':
		# 处理GET请求，返回注册页面
		return render(request, 'register.html')
	else:
		# 处理POST请求，实现注册逻辑
		return HttpResponse('这里实现注册逻辑')
```
3. 使用类视图可以将视图对应的不同请求方式以类中的不同方法来区别定义
```python
from django.views.generic import View
class RegisterView(View):
	"""类视图：处理注册"""
	def get(self, request):
		"""处理GET请求，返回注册页面"""
		return render(request, 'register.html')
	def post(self, request):
		"""处理POST请求，实现注册逻辑"""
		return HttpResponse('这里实现注册逻辑')
```
4. 好处
	- 代码可读性好
	- 类视图相对于函数视图有更高的复用性， 如果其他地方需要用到某个类视图的某个特定逻辑，直接继承该类视图即可
#### 使用
1. 定义类视图需要继承自Django提供的父类View；
2. 可使用from django.views.generic import View或者from django.views.generic.base import View 导入，如上所示；
3. 配置路由时，使用类视图的as_view()方法来添加。
```python
urlpatterns = [
	# 视图函数：注册
	# url(r'^register/$', views.register, name='register'),
	# 类视图：注册
	url(r'^register/$', views.RegisterView.as_view(), name='register'),
]
```
#### 原理
```python
 @classonlymethod
def as_view(cls, **initkwargs):
    """
    Main entry point for a request-response process.
    """
    ...省略代码...
    def view(request, *args, **kwargs):
        self = cls(**initkwargs)
        if hasattr(self, 'get') and not hasattr(self, 'head'):
            self.head = self.get
        self.request = request
        self.args = args
        self.kwargs = kwargs
        # 调用dispatch方法，按照不同请求方式调用不同请求方法
        return self.dispatch(request, *args, **kwargs)
    ...省略代码...
    # 返回真正的函数视图
    return view
def dispatch(self, request, *args, **kwargs):
    # Try to dispatch to the right method; if a method doesn't exist,
    # defer to the error handler. Also defer to the error handler if the
    # request method isn't on the approved list.
    if request.method.lower() in self.http_method_names:
        handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
    else:
        handler = self.http_method_not_allowed
    return handler(request, *args, **kwargs)
```
- 调用流程 as_view-->view-->dispatch
::: tip
### **反射**
它可以把字符串映射成变量或方法然后可以去执行调用、修改等操作，它有四个重要的方法：
1. getattr 获取指定字符串名称的对象属性
2. setattr 为对象设置一个属性
3. hasattr 判断对象是否有对应的对象（字符串）
4. delattr 删除对象的属性
- attr是属性英文的前几个字母，属性指的是类中类变量、实例变量和方法。但是要注意不能是私有的，如果你的变量是以“_”开头，那将无法获取。
- getattr()函数的使用方法：接收2个参数，前面是一个类或者模块，后面是一个字符串！
### 反射作用
考虑有这么一个场景：需要根据用户输入url的不同，调用不同的函数，实现不同的操作，也就是一个WEB框架的url路由功能。路由功能是web框架里的核心功能之一，例如Django的urls。
```python
import commons 

def run():
    inp = input("请输入您想访问页面的url：  ").strip()
    func = getattr(commons, inp)
    func() 

if __name__ == '__main__':
    run()
```
### 应用场景
1. View类的dispatch通过接收到的请求方法变为小写从而使用反射得到类中的相对应方法（参考上面原理模块的代码）
2. settings配置中心和中间件使用反射
```
import importlib

# 获取到settings文件的路径
self.SETTINGS_MODULE = settings_module

# 通过importlib.import_module获取到settings文件对象
mod = importlib.import_module(self.SETTINGS_MODULE) 


# 循环获取到settings文件对象里面的属性
for setting in dir(mod):
    # 得到大写的属性名
    if setting.isupper():
    	# 得到属性值比如中间件等其他配置属性
    	setting_value = getattr(mod, setting)
```
:::
#### 使用装饰器
为了理解方便，先来定义一个为函数视图准备的装饰器（在设计装饰器时基本都以函数视图作为考虑的被装饰对象），及一个要被装饰的类视图。
```python
def my_decorator(func):
	def wrapper(request, *args, **kwargs):
		print('自定义装饰器被调用了')
		print('请求路径%s' % request.path)
		return func(request, *args, **kwargs)
	return wrapper
class DemoView(View):
	def get(self, request):
		print('get方法')
		return HttpResponse('ok')
	def post(self, request):
		print('post方法')
		return HttpResponse('ok')
```
1. 在URL配置中装饰
    ```python
    urlpatterns = [
        url(r'^demo/$', my_decorate(DemoView.as_view()))
    ]
    ```
    - 此种方式最简单，但因装饰行为被放置到了url配置中，单看视图的时候无法知道此视图还被添加了装饰器，不利于代码的完整性，不建议使用。
    - 此种方式会为类视图中的所有请求方法都加上装饰器行为（因为是在视图入口处，分发请求方式前）。
2. 在类视图中装饰
	- 在类视图中使用为函数视图准备的装饰器时，不能直接添加装饰器，需要使用method_decorator将其转换为适用于类视图方法的装饰器。
	- method_decorator装饰器使用name参数指明被装饰的方法
	```python
	# 为全部请求方法添加装饰器
	@method_decorator(my_decorator, name='dispatch')
	class DemoView(View):
		def get(self, request):
			print('get方法')
			return HttpResponse('ok')
		def post(self, request):
			print('post方法')
			return HttpResponse('ok')
	# 为特定请求方法添加装饰器
	@method_decorator(my_decorator, name='get')
	class DemoView(View):
		def get(self, request):
			print('get方法')
			return HttpResponse('ok')
		def post(self, request):
			print('post方法')
			return HttpResponse('ok')
	```
3. 如果需要为类视图的多个方法添加装饰器，但又不是所有的方法（为所有方法添加装饰器参考上面例子），可以直接在需要添加装饰器的方法上使用method_decorator
	```python
	from django.utils.decorators import method_decorator
	# 为特定请求方法添加装饰器
	class DemoView(View):
		@method_decorator(my_decorator)  # 为get方法添加了装饰器
		def get(self, request):
			print('get方法')
			return HttpResponse('ok')
		@method_decorator(my_decorator)  # 为post方法添加了装饰器
		def post(self, request):
			print('post方法')
			return HttpResponse('ok')
		def put(self, request):  # 没有为put方法添加装饰器
			print('put方法')
			return HttpResponse('ok')
	```
#### 类视图Mixin扩展类
使用面向对象多继承的特性，可以通过定义父类（作为扩展类），在父类中定义想要向类视图补充的方法，类视图继承这些扩展父类，便可实现代码复用。定义的扩展父类名称通常以Mixin结尾
```python
class MyDecoratorMixin(object):
	@classmethod
	def as_view(cls, *args, **kwargs):
		view = super().as_view(*args, **kwargs)
		view = my_decorator(view)
		return view
class DemoView(MyDecoratorMixin, View):
	def get(self, request):
		print('get方法')
		return HttpResponse('ok')
	def post(self, request):
		print('post方法')
		return HttpResponse('ok')
```
```python
class ListModelMixin(object):
	"""
	list扩展类
	"""
	def list(self, request, *args, **kwargs):
		...	
class CreateModelMixin(object):
	"""
	create扩展类
	"""
	def create(self, request, *args, **kwargs):
		...
class BooksView(CreateModelMixin, ListModelMixin, View):
	"""
	同时继承两个扩展类，复用list和create方法
	"""
	def get(self, request):
		self.list(request)
		...
	def post(self, request):
		self.create(request)
		...
```
### 中间件
1. Django中的中间件是一个轻量级、底层的插件系统，可以介入Django的请求和响应处理过程，修改Django的输入或输出
2. 中间件的设计为开发者提供了一种无侵入式的开发方式，增强了Django框架的健壮性。
3. 我们可以使用中间件，在Django处理视图的不同阶段对输入或输出进行干预。
4. 中间件的定义方法
	- 定义一个中间件工厂函数，然后返回一个可以被调用的中间件。
	- 中间件工厂函数需要接收一个可以调用的get_response对象。
	- 返回的中间件也是一个可以被调用的对象，并且像视图一样需要接收一个request对象参数，返回一个response对象。
	```python
	def simple_middleware(get_response):
		# 此处编写的代码仅在Django第一次配置和初始化的时候执行一次。
		def middleware(request):
			# 此处编写的代码会在每个请求处理视图前被调用。
			response = get_response(request)
			# 此处编写的代码会在每个请求处理视图之后被调用。
			return response
		return middleware
	```
例如，在users应用中新建一个middleware.py文件
```python
def my_middleware(get_response):
	print('init 被调用')
	def middleware(request):
		print('before request 被调用')
		response = get_response(request)
		print('after response 被调用')
		return response
	return middleware
```
定义好中间件后，需要在settings.py 文件中添加注册中间件
```python
MIDDLEWARE = [
	'django.middleware.security.SecurityMiddleware',
	'django.contrib.sessions.middleware.SessionMiddleware',
	'django.middleware.common.CommonMiddleware',
	'django.middleware.csrf.CsrfViewMiddleware',
	'django.contrib.auth.middleware.AuthenticationMiddleware',
	'django.contrib.messages.middleware.MessageMiddleware',
	'django.middleware.clickjacking.XFrameOptionsMiddleware',
	'users.middleware.my_middleware',  # 添加中间件
]
```
定义一个视图进行测试
```python
def demo_view(request):
	print('view 视图被调用')
	return HttpResponse('OK')
```
- 备注：Django运行在调试模式下，中间件init部分有可能被调用两次
- 多个中间件的执行顺序
	- 在请求视图被处理前，中间件由上至下依次执行
	- 在请求视图被处理后，中间件由下至上依次执行
- 定义两个中间件
```python
def my_middleware(get_response):
	print('init 被调用')
	def middleware(request):
		print('before request 被调用')
		response = get_response(request)
		print('after response 被调用')
		return response
	return middleware

def my_middleware2(get_response):
	print('init2 被调用')
	def middleware(request):
		print('before request 2 被调用')
		response = get_response(request)
		print('after response 2 被调用')
		return response
	return middleware
```
注册添加两个中间件
```python
MIDDLEWARE = [
	'django.middleware.security.SecurityMiddleware',
	'django.contrib.sessions.middleware.SessionMiddleware',
	'django.middleware.common.CommonMiddleware',
	'django.middleware.csrf.CsrfViewMiddleware',
	'django.contrib.auth.middleware.AuthenticationMiddleware',
	'django.contrib.messages.middleware.MessageMiddleware',
	'django.middleware.clickjacking.XFrameOptionsMiddleware',
	'users.middleware.my_middleware',  # 添加
	'users.middleware.my_middleware2',  # 添加
]
```
执行结果
```python
init2 被调用
init 被调用
before request 被调用
before request 2 被调用
view 视图被调用
after response 2 被调用
after response 被调用
```
## 模板
### Django自带模板
1. 配置
	- 在工程中创建模板目录templates
	- 在settings.py配置文件中修改TEMPLATES配置项的DIRS值
	```python
	TEMPLATES = [
		{
			'BACKEND': 'django.template.backends.django.DjangoTemplates',
			'DIRS': [os.path.join(BASE_DIR, 'templates')],  # 此处修改
			'APP_DIRS': True,
			'OPTIONS': {
				'context_processors': [
					'django.template.context_processors.debug',
					'django.template.context_processors.request',
					'django.contrib.auth.context_processors.auth',
					'django.contrib.messages.context_processors.messages',
				],
			},
		},
	]
	```
1. 定义模板
	- 在templates目录中新建一个模板文件，如index.html
	```python
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Title</title>
	</head>
	<body>
		<h1>{{ city }}</h1>
	</body>
	</html>
	```
1. 模板渲染
	- Django提供了一个函数render实现模板渲染
	- render(request对象, 模板文件路径, 模板数据字典)
	```python
	from django.shortcuts import render
	def index(request):
		context={'city': '北京'}
		return render(request,'index.html',context)
	```
1. 模板语法
	- 模板变量
		- 变量名必须由字母、数字、下划线（不能以下划线开头）和点组成。
		- 语法：{{变量}}
		- 模板变量可以使python的内建类型，也可以是对象
		```python
		def index(request):
			context = {
				'city': '北京',
				'adict': {
					'name': '西游记',
					'author': '吴承恩'
				},
				'alist': [1, 2, 3, 4, 5]
			}
			return render(request, 'index.html', context)
		```
		```python
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>Title</title>
		</head>
		<body>
			<h1>{{ city }}</h1>
			<h1>{{ adict }}</h1>
			<h1>{{ adict.name }}</h1>  注意字典的取值方法
			<h1>{{ alist }}</h1>  
			<h1>{{ alist.0 }}</h1>  注意列表的取值方法
		</body>
		</html>
		```
	- 模板语句
		- for循环
		```python
		{% for item in 列表 %}
		循环逻辑
		{{forloop.counter}}表示当前是第几次循环，从1开始
		{%empty%} 列表为空或不存在时执行此逻辑
		{% endfor %}
		```
		- if条件
		```python
		{% if ... %}
		逻辑1
		{% elif ... %}
		逻辑2
		{% else %}
		逻辑3
		{% endif %}
		```
		- 比较运算符如：==、!=、<、>、<=、>=
		- 布尔运算符如：and、or、not
		- 运算符左右两侧不能紧挨变量或常量，必须有空格
		```python
		{% if a == 1 %}  # 正确
		{% if a==1 %}  # 错误
		```
1. 过滤器
	- 使用管道符号|来应用过滤器，用于进行计算、转换操作，可以使用在变量、标签中。
	- 如果过滤器需要参数，则使用冒号:传递参数。
	```
	变量|过滤器:参数
	```
	- 列举几个自带过滤器
		- safe，禁用转义，告诉模板这个变量是安全的，可以解释执行
		- length，长度，返回字符串包含字符的个数，或列表、元组、字典的元素个数。
		- default，默认值，如果变量不存在时则返回默认值。
		```
		data|default:'默认值'
		```
		- date，日期，用于对日期类型的值进行字符串格式化，常用的格式化字符如下
			- Y表示年，格式为4位，y表示两位的年。
			- m表示月，格式为01,02,12等。
			- d表示日, 格式为01,02等。
			- j表示日，格式为1,2等。
			- H表示时，24进制，h表示12进制的时。
			- i表示分，为0-59。
			- s表示秒，为0-59。
			```
			value|date:"Y年m月j日  H时i分s秒"
			```
	- template提供的内置过滤器，不够用，不灵活，就可以自己定义一个过滤器
		- 在自己的app里建一个templatetags包，在包里创建一个后面要在HTML文件引用的py文件，
		- 在py文件中，先导入from django import template ，
		```python
		  实例化对象register = template.Library()
		  创建一个template能认识的函数
		  对创建的每一个过滤器，都要用加上装饰器
		  
		  #导入包
		  from django import template
		  #实例化注册对象
		  register = template.Library()
		  #使用装饰器自定义过滤器
		  @register.filter
		  def func(x):
			return x*x
		```
		- 在HTML文件中引用
			- load templatetags
			- 使用过滤器
		- 注意点: templatetags文件夹 要在各自的应用内创建
1. 模板继承
	- 模板继承和类的继承含义是一样的，主要是为了提高代码重用，减轻开发人员的工作量
	- **父模板**
		- 如果发现在多个模板中某些内容相同，那就应该把这段内容定义到父模板中。
		- 标签block：用于在父模板中预留区域，留给子模板填充差异性的内容，名字不能相同。 
		- 为了更好的可读性，建议给endblock标签写上名字，这个名字与对应的block名字相同。
		- 父模板中也可以使用上下文中传递过来的数据。
		```
		{% block 名称 %}
		预留区域，可以编写默认内容，也可以没有默认内容
		{% endblock  名称 %}
		```
	- **子模板**
		- 标签extends：继承，写在子模板文件的第一行
		```
		{% extends "父模板路径"%}
		```
		- 子模版不用填充父模版中的所有预留区域，如果子模版没有填充，则使用父模版定义的默认值。
		- 填充父模板中指定名称的预留区域。
		```
		{% block 名称 %}
		实际填充内容
		{{ block.super }}用于获取父模板中block的内容
		{% endblock 名称 %}
		```
1. 注释
	- 单行注释语法
	```
	{#...#}
	```
	- 多行注释使用comment标签
	```
	{% comment %}
	...
	{% endcomment %}
	```
### Jinja模板
1. Django中使用jinja2模板
	- jinja2介绍
		- 是 Python 下一个被广泛应用的模板引擎，是由Python实现的模板语言
		- 他的设计思想来源于 Django 的模板引擎，并扩展了其语法和一系列强大的功能，尤其是Flask框架内置的模板语言
		- 由于django默认模板引擎功能不齐全,速度慢，所以我们也可以在Django中使用jinja2, jinja2宣称比django默认模板引擎快10-20倍。
	- 安装jinja2模块
	```python
	pip install jinja2
	```
	- Django配置jinja2
	```python
	在项目文件中创建 jinja2_env.py 文件
	from jinja2 import Environment
	def environment(**options):
		env = Environment(**options)
		return env
	```
	- 在settings.py文件
	```python
	TEMPLATES = [
		{
			'BACKEND': 'django.template.backends.jinja2.Jinja2',#修改1
			'DIRS': [os.path.join(BASE_DIR, 'templates')],
			'APP_DIRS':True,
			'OPTIONS':{
				'environment': 'jinja2_env.environment',# 修改2
				'context_processors':[
					'django.template.context_processors.debug',
					'django.template.context_processors.request',
					'django.contrib.auth.context_processors.auth',
					'django.contrib.messages.context_processors.messages',
				],
			},
		},
	]
	```
	- jinja2模板的使用绝大多数和Django自带模板一样
		- for循环有差异
		```
		loop.index 当前循环迭代次数（从1开始）
		loop.index() 当前循环迭代次数（从0开始）
		loop.reindex 到循环结束需要迭代次数（从1开始）
		loop.reindex（） 到循环结束需要迭代次数（从0开始）
		loop.first 如果是第一次迭代，为True
		loop.last 如果是最后一次迭代，为True
		loop.length 序列中的项目数
		loop.cycle 在一串序列期间取值的辅助函数
		```
	- jinja2自定义过滤器
	```python
	from jinja2 import Environment
	def environment(**options):
	    env = Environment(**options)
	    # 2.将自定义的过滤器添加到 环境中
	    env.filters['do_listreverse'] = do_listreverse
	    return env
	# 1.自定义过滤器
	def do_listreverse(li):
	    if li == "B":
	        return "哈哈"
	```
1. CSRF攻击
	- CSRF全拼为Cross Site Request Forgery，译为跨站请求伪造。
	- CSRF指攻击者盗用了你的身份，以你的名义发送恶意请求。
	- 防止 CSRF 攻击
		- 在客户端向后端请求界面数据的时候，后端会往响应中的 cookie 中设置 csrf_token 的值
		- 在 Form 表单中添加一个隐藏的的字段，值也是 csrf_token
		- 在用户点击提交的时候，会带上这两个值向后台发起请求
		- 后端接受到请求，以会以下几件事件：
			- 从 cookie中取出 csrf_token
			- 从 表单数据中取出来隐藏的 csrf_token 的值
			- 进行对比
		- 如果比较之后两值一样，那么代表是正常的请求，如果没取到或者比较不一样，代表不是正常的请求，不执行下一步操作
## 数据库
### ORM框架
- O是object，也就类对象的意思，R是relation，翻译成中文是关系，也就是关系数据库中数据表的意思，M是mapping，是映射的意思。在ORM框架中，它帮我们把类和数据表进行了一个映射，可以让我们通过类和类对象就能操作它所对应的表格中的数据。ORM框架还有一个功能，它可以根据我们设计的类自动帮我们生成数据库中的表格，省去了我们自己建表的过程。
- django中内嵌了ORM框架，不需要直接面向数据库编程，而是定义模型类，通过模型类和对象完成数据表的增删改查操作。
- 使用django进行数据库开发的步骤如下：
	- 配置数据库连接信息
	- 在models.py中定义模型类
	- 迁移
	- 通过类和对象完成数据增删改查操作
### 配置
- 在settings.py中保存了数据库的连接配置信息，Django默认初始配置使用sqlite数据库
- 使用MySQL数据库首先需要安装驱动程序
```python
pip install PyMySQL
```
在Django的工程同名子目录的__init__.py文件中添加如下语句
```python
from pymysql import install_as_MySQLdb
install_as_MySQLdb()
作用是让Django的ORM能以mysqldb的方式来调用PyMySQ
```
修改DATABASES配置信息
```python
DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.mysql',
		'HOST': '127.0.0.1',  # 数据库主机
		'PORT': 3306,  # 数据库端口
		'USER': 'root',  # 数据库用户名
		'PASSWORD': 'mysql',  # 数据库用户密码
		'NAME': 'django_demo'  # 数据库名字
	}
}
```
在MySQL中创建数据库
```python
create database django_demo default charset=utf8;
```
### 定义模型类
- 模型类被定义在"应用/models.py"文件中。
- 模型类必须继承自Model类，位于包django.db.models中。
```python
创建应用booktest，在models.py 文件中定义模型类

from django.db import models
#定义图书模型类BookInfo
class BookInfo(models.Model):
	btitle = models.CharField(max_length=20, verbose_name='名称')
	bpub_date = models.DateField(verbose_name='发布日期')
	bread = models.IntegerField(default=0, verbose_name='阅读量')
	bcomment = models.IntegerField(default=0, verbose_name='评论量')
	is_delete = models.BooleanField(default=False, verbose_name='逻辑删除')
	class Meta:
		db_table = 'tb_books'  # 指明数据库表名
		verbose_name = '图书'  # 在admin站点中显示的名称
		verbose_name_plural = verbose_name  # 显示的复数名称
	def __str__(self):
		"""定义每个数据对象的显示信息"""
		return self.btitle
#定义英雄模型类HeroInfo
class HeroInfo(models.Model):
	GENDER_CHOICES = (
		(0, 'female'),
		(1, 'male')
	)
	hname = models.CharField(max_length=20, verbose_name='名称') 
	hgender = models.SmallIntegerField(choices=GENDER_CHOICES, default=0, verbose_name='性别')  
	hcomment = models.CharField(max_length=200, null=True, verbose_name='描述信息') 
	hbook = models.ForeignKey(BookInfo, on_delete=models.CASCADE, verbose_name='图书')
	is_delete = models.BooleanField(default=False, verbose_name='逻辑删除')
	class Meta:
		db_table = 'tb_heros'
		verbose_name = '英雄'
		verbose_name_plural = verbose_name
	def __str__(self):
		return self.hname
```
- 数据库表名
	- 模型类如果未指明表名，Django默认以 小写app应用名_小写模型类名 为数据库表名。
	- 可通过db_table 指明数据库表名。
- 关于主键
	- django会为表创建自动增长的主键列，每个模型只能有一个主键列，如果使用选项设置某属性为主键列后django不会再创建自动增长的主键列。
	- 默认创建的主键列属性为id，可以使用pk代替，pk全拼为primary key。
- 属性命名限制
	- 不能是python的保留关键字。
	- 不允许使用连续的下划线，这是由django的查询方式决定的。
	- 定义属性时需要指定字段类型，通过字段类型的参数指定选项，语法如下：
	```
	属性=models.字段类型(选项)
	```
- 字段类型
	- AutoField：自动增长的IntegerField，通常不用指定，不指定时Django会自动创建属性名为id的自动增长属性
	- BooleanField：布尔字段，值为True或False
	- NullBooleanField：支持Null、True、False三种值
	- CharField：字符串，参数max_length表示最大字符个数
	- TextField：大文本字段，一般超过4000个字符时使用
	- IntegerField：整数，主键，它同AutoField一样，唯一的差别就是不自增
	- SmallIntegerField：小整数时一般会用到
	- DecimalField：十进制浮点数， 参数max_digits表示总位数， 参数decimal_places表示小数位数
	- FloatField：浮点数
	- DateField：日期， 参数auto_now表示每次保存对象时，自动设置该字段为当前时间，用于"最后一次修改"的时间戳，它总是使用当前日期，默认为False； 参数auto_now_add表示当对象第一次被创建时自动设置当前时间，用于创建的时间戳，它总是使用当前日期，默认为False; 参数auto_now_add和auto_now是相互排斥的，组合将会发生错误
	- TimeField：时间，参数同DateField
	- DateTimeField：日期时间，参数同DateField
	- FileField：上传文件字段
	- ImageField：继承于FileField，对上传的内容进行校验，确保是有效的图片
	- ForeignKey：关系属性用法，建立一对多关系，**ForeignKey('self', null=True, blank=True) 可以指向自己（不李姐，待研究）**
- 选项
	- null：如果为True，表示允许为空，默认值是False											
	- blank：如果为True，则该字段允许为空白，默认值是False										
	- db_column：字段的名称，如果未指定，则使用属性的名称											
	- db_index：若值为True, 则在表中会为此字段创建索引，默认值是False								
	- default：默认																				
	- primary_key：若为True，则该字段会成为模型的主键字段，默认值是False，一般作为AutoField的选项使用	
	- unique：如果为True, 这个字段在表中必须有唯一值，默认值是False
	- verbose_name：用于指定名称
	- choices：配置字段的choices后，在admin页面上就可以看到对应的选项展示，choice显示中文可以使用 "get_字段名_display()"
	- **null是数据库范畴的概念，blank是表单验证范畴的**
	- **当修改模型类之后，如果影响表结构，则必须重新做迁移，选项中default和blank不影响表结构**
- 外键
	- 在设置外键时，需要通过on_delete选项指明主表删除数据时，对于外键引用表数据如何处理，在django.db.models中包含了可选常量：
	- CASCADE 级联，删除主表数据时连通一起删除外键表中数据
	- PROTECT 保护，通过抛出ProtectedError异常，来阻止删除主表中被外键应用的数据
	- SET_NULL 设置为NULL，仅在该字段null=True允许为null时可用
	- SET_DEFAULT 设置为默认值，仅在该字段设置了默认值时可用
	- SET() 设置为特定值或者调用特定方法，如
	```python
	from django.conf import settings
	from django.contrib.auth import get_user_model
	from django.db import models
	
	def get_sentinel_user():
		return get_user_model().objects.get_or_create(username='deleted')[0]
	
	class MyModel(models.Model):
		user = models.ForeignKey(
			settings.AUTH_USER_MODEL,
			on_delete=models.SET(get_sentinel_user),
		)
	```
	DO_NOTHING 不做任何操作，如果数据库前置指明级联性，此选项会抛出IntegrityError异常
### 迁移
生成迁移文件
```python
python manage.py makemigrations
```
同步到数据库中
```python
python manage.py migrate
```
### 添加测试数据
```sql
insert into tb_books(btitle,bpub_date,bread,bcomment,is_delete) values
('射雕英雄传','1980-5-1',12,34,0),
('天龙八部','1986-7-24',36,40,0),
('笑傲江湖','1995-12-24',20,80,0),
('雪山飞狐','1987-11-11',58,24,0);
```
```sql
insert into tb_heros(hname,hgender,hbook_id,hcomment,is_delete) values
('郭靖',1,1,'降龙十八掌',0),
('黄蓉',0,1,'打狗棍法',0),
('黄药师',1,1,'弹指神通',0),
('欧阳锋',1,1,'蛤蟆功',0),
('梅超风',0,1,'九阴白骨爪',0),
('乔峰',1,2,'降龙十八掌',0),
('段誉',1,2,'六脉神剑',0),
('虚竹',1,2,'天山六阳掌',0),
('王语嫣',0,2,'神仙姐姐',0),
('令狐冲',1,3,'独孤九剑',0),
('任盈盈',0,3,'弹琴',0),
('岳不群',1,3,'华山剑法',0),
('东方不败',0,3,'葵花宝典',0),
('胡斐',1,4,'胡家刀法',0),
('苗若兰',0,4,'黄衣',0),
('程灵素',0,4,'医术',0),
('袁紫衣',0,4,'六合拳',0);
```
### 演示工具使用
- Django的manage工具提供了shell命令，帮助我们配置好当前工程的运行环境（如连接好数据库等），以便可以直接在终端中执行测试python语句
- 通过如下命令进入shell
```python
python manage.py shell
```
导入两个模型类，以便后续使用
```python
from booktest.models import BookInfo, HeroInfo
```
### 查看MySQL数据库日志
查看mysql数据库日志可以查看对数据库的操作记录。 mysql日志文件默认没有产生，需要做如下配置
```shell
sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
将general_log_file和general_log两处注释取消
sudo service mysql restart
tail -f /var/log/mysql/mysql.log
```
### 数据库操作
#### 增加(2种方式)
1. save
    ```python
    from datetime import date
    book = BookInfo(
        btitle='西游记',
        bpub_date=date(1988,1,1),
        bread=10,
        bcomment=10
    )
    book.save()
    hero = HeroInfo(
        hname='孙悟空',
        hgender=0,
        hbook=book
    )
    hero.save()
    hero2 = HeroInfo(
        hname='猪八戒',
        hgender=0,
        hbook_id=book.id
    )
    hero2.save()
    ```
1. create
    ```python
    HeroInfo.objects.create(
        hname='沙悟净',
        hgender=0,
        hbook=book
    )
    ```
1. 批量增加
    ```python
    object_list = [
        models.UserInfo(name='Alex',age=18),
        models.UserInfo(name='sss',age=20),
        ...
        
    ]
    models.UserInfo.objects.bulk_create(object_list,10) # 每次10个批量添加
    ```
#### 删除(2种方式)
1. 模型类对象delete
    ```python
    hero = HeroInfo.objects.get(id=13)
    hero.delete()
    ```
1. 模型类.objects.filter().delete()
    ```python
    HeroInfo.objects.filter(id=14).delete()
    ```
#### 修改(2种方式)
1. save
    ```python
    修改模型类对象的属性，然后执行save()方法
    
    hero = HeroInfo.objects.get(hname='猪八戒')
    hero.hname = '猪悟能'
    hero.save()
    ```
1. update
    ```python
    使用模型类.objects.filter().update()，会返回受影响的行数
    
    HeroInfo.objects.filter(hname='沙悟净').update(hname='沙僧')
    ```
    - update_or_create()方法
    - 如果数据库内没有该数据则新增，如果有则更新。
    - 该方法的参数必须为一些用于查询的指定字段（这里是username），以及需要新增或者更新的defaults字典。
    - 而其返回值，则是一个查询对象和是否新建对象布尔值的二元元组。
    ```python
    def add_to_new_assets_zone(self):
        defaults = {
            'data': json.dumps(self.data),
            'username': self.data.get('username'),
            'password': self.data.get('password'),
        }
    models.UserProfile.objects.update_or_create(username='xiaohong', defaults=defaults)
    ```
#### 查询
##### 基本查询
- get 查询单一结果，如果查到多条数据，则抛异常MultipleObjectsReturned；如果不存在会抛出模型类.DoesNotExist异常。
- all 查询多个结果。
- count 查询结果数量。
```python
 BookInfo.objects.all()
<QuerySet [<BookInfo: 射雕英雄传>, <BookInfo: 天龙八部>, <BookInfo: 笑傲江湖>, <BookInfo: 雪山飞狐>, <BookInfo: 西游记>]>
book = BookInfo.objects.get(btitle='西游记')
book.id
BookInfo.objects.get(id=3)
BookInfo.objects.get(pk=3)
BookInfo.objects.get(id=100) #报错，没那么多数据		
BookInfo.objects.count()
```
##### 过滤查询
- filter 过滤满足条件的所有数据，查不到返回None
- exclude 排除掉符合条件剩下的结果
- get 过滤单一结果
- 对于过滤条件的使用，上述三个方法相同，故仅以filter进行讲解
```
语法：
属性名称__比较运算符=值
# 属性名称和比较运算符间使用两个下划线，所以属性名不能包括多个下划线
```
- 相等
	- exact：表示判等
	```python
	BookInfo.objects.filter(id__exact=1)
	可简写为：
	BookInfo.objects.filter(id=1)
	```
##### 模糊查询
contains：是否包含，如果要包含%无需转义，直接写即可
```python
查询书名包含'传'的图书。

BookInfo.objects.filter(btitle__contains='传')
```
startswith、endswith：以指定值开头或结尾
```python
查询书名以'部'结尾的图书

BookInfo.objects.filter(btitle__endswith='部')
```
以上运算符都区分大小写，在这些运算符前加上i表示不区分大小写，如iexact、icontains、istartswith、iendswith
##### 空查询
isnull：是否为null
```python
查询书名不为空的图书。

BookInfo.objects.filter(btitle__isnull=False)
```
##### 范围查询
in：是否包含在范围内。
```python
例：查询编号为1或3或5的图书
BookInfo.objects.filter(id__in=[1, 3, 5])
```
##### 比较查询
- gt 大于 (greater then)
- gte 大于等于 (greater then equal)
- lt 小于 (less then)
- lte 小于等于 (less then equal)
```python
查询编号大于3的图书

BookInfo.objects.filter(id__gt=3)
```
不等于的运算符，使用exclude()过滤器
```python
查询编号不等于3的图书

BookInfo.objects.exclude(id=3)
```
##### 日期查询
year、month、day、week_day、hour、minute、second：对日期时间类型的属性进行运算
```python
查询1980年发表的图书。
BookInfo.objects.filter(bpub_date__year=1980)
查询1980年1月1日后发表的图书。
BookInfo.objects.filter(bpub_date__gt=date(19	90, 1, 1))
```
##### F对象
之前的查询都是对象的属性与常量值比较，**两个属性怎么比较**呢？ 答：使用F对象，被定义在django.db.models中。
```python
语法如下：
F(属性名)
```
```python
查询阅读量大于等于评论量的图书。
from django.db.models import F
BookInfo.objects.filter(bread__gte=F('bcomment'))
```
```python
可以在F对象上使用算数运算。
例：查询阅读量大于2倍评论量的图书。
BookInfo.objects.filter(bread__gt=F('bcomment') * 2)
```
##### Q对象
多个过滤器逐个调用表示逻辑与关系，同sql语句中where部分的and关键字
```python
查询阅读量大于20，并且编号小于3的图书。
BookInfo.objects.filter(bread__gt=20,id__lt=3)
或
BookInfo.objects.filter(bread__gt=20).filter(id__lt=3)
```
如果需要实现逻辑或or的查询，需要使用Q()对象结合|运算符，Q对象被义在django.db.models
```python
语法如下：
Q(属性名__运算符=值)
```
```python
查询阅读量大于20的图书，改写为Q对象如下。
from django.db.models import Q
BookInfo.objects.filter(Q(bread__gt=20))
```
Q对象可以使用&、|连接，&表示逻辑与，|表示逻辑或。
```python
查询阅读量大于20，或编号小于3的图书，只能使用Q对象实现
BookInfo.objects.filter(Q(bread__gt=20) | Q(pk__lt=3))
```
Q对象前可以使用~操作符，表示非not。
```python
查询编号不等于3的图书。
BookInfo.objects.filter(~Q(pk=3))
```
##### 聚合函数
使用aggregate()过滤器调用聚合函数。聚合函数包括：Avg 平均，Count 数量，Max 最大，Min 最小，Sum 求和，被定义在django.db.models中
```python
查询图书的总阅读量。
from django.db.models import Sum
BookInfo.objects.aggregate(Sum('bread'))
注意aggregate的返回值是一个字典类型，格式如下：
{'属性名__聚合类小写':值}
如:{'bread__sum':3}

使用count时一般不使用aggregate()过滤器
查询图书总数。
BookInfo.objects.count()
注意count函数的返回值是一个数字。
```
##### 排序
```python
使用order_by对结果进行排序

BookInfo.objects.all().order_by('bread')  # 升序
BookInfo.objects.all().order_by('-bread')  # 降序
```
##### **模型类关系（李姐不深刻）**
- 一对多关系(ForeignKey) ，将字段定义在多的一端
- 多对多关系(ManyToManyField)，将字段定义在任意一端
- 一对一关系(OneToOneField)，将字段定义在任意一端
- 自关联，自关联是一种特殊的一对多（把关联属性指向了自己），案例：显示多级地区
```python
models.py

class AreaInfo(models.Model):
	'''地区模型类'''
	# 地区名称
	atitle = models.CharField(max_length=20)
	# 关系属性，代表当前地区的父级地区,主键指向自己，允许为空
	aParent = models.ForeignKey('self', null=True, blank=True)
```
```python
views.py

from booktest.models import AreaInfo
def areas(request):
	'''获取广州市的上级地区和下级地图'''
	# 1.获取广州市信息
	area = AreaInfo.objects.get(atitle='广州市')
	# 2.查询广州市的上级地区
	parent = area.aParent
	# 3.查询广州市的下级地区
	children = area.areainfo_set.all()
```
##### 关联查询
由一到多的访问语法
```python
方法一：
一类的对象.多类名小写_set.all()
b = BookInfo.objects.get(id=1)
b.heroinfo_set.all()
```
```python
方法二：
多类名.objects.filter(关联属性__一类属性名__条件名)
models.Article.objects.filter(user__username='admin')
```
由多到一的访问语法
```python
方法一：
多类的对象.主键
h = HeroInfo.objects.get(id=1)
h.hbook
```
```python
方法二：
一类名.objects.filter(多类名小写__多类属性名)
models.UserProfile.objects.filter(article__title='啦啦啦我是3')
```
访问一对应的模型类关联对象的id语法
```python
多对应的模型类对象.关联类属性_id
h = HeroInfo.objects.get(id=1)
h.hbook_id
```
- 通过模型类实现关联查询时，要查哪个表中的数据，就需要通过哪个类来查；
- 写关联查询条件的时候，如果类中没有关系属性，条件需要些对应类的名，如果类中有关系属性，直接写关系属性。
##### 关联过滤查询
由多模型类条件查询一模型类数据:
```python
语法如下：
关联模型类名小写__属性名__条件运算符=值
```
注意：如果没有"__运算符"部分，表示等于。
```python
例：查询图书，要求图书英雄为"孙悟空"
BookInfo.objects.filter(heroinfo__hname='孙悟空')
查询图书，要求图书中英雄的描述包含"八"
BookInfo.objects.filter(heroinfo__hcomment__contains='八')
```
由一模型类条件查询多模型类数据:
```python
语法如下：
一模型类关联属性名__一模型类属性名__条件运算符=值
```
注意：如果没有"__运算符"部分，表示等于。
```python
例：查询书名为“天龙八部”的所有英雄。
HeroInfo.objects.filter(hbook__btitle='天龙八部')
查询图书阅读量大于30的所有英雄
HeroInfo.objects.filter(hbook__bread__gt=30)
```
#### 查询集 QuerySet
1. 概念
	- Django的ORM中存在查询集的概念。
	- 查询集，也称查询结果集、QuerySet，表示从数据库中获取的对象集合。
	- 当调用如下过滤器方法时，Django会返回查询集（而不是简单的列表）：
		- all()：返回所有数据。
		- filter()：返回满足条件的数据。
		- exclude()：返回满足条件之外的数据。
		- order_by()：对结果进行排序。
	- 对查询集可以再次调用过滤器进行过滤，如
	```python
	BookInfo.objects.filter(bread__gt=30).order_by('bpub_date')
	```
	- 也就意味着查询集可以含有零个、一个或多个过滤器。过滤器基于所给的参数限制查询的结果。
	- 从SQL的角度讲，查询集与select语句等价，过滤器像where、limit、order by子句。
	- 判断某一个查询集中是否有数据：
	- exists()：判断查询集中是否有数据，如果有则返回True，没有则返回False。
1. 两大特性
	- 惰性执行
    创建查询集不会访问数据库，直到调用数据时，才会访问数据库，调用数据的情况包括迭代、序列化、与if合用
    ```
    例如，当执行如下语句时，并未进行数据库查询，只是创建了一个查询集qs
    qs = BookInfo.objects.all()
    继续执行遍历迭代操作后，才真正的进行了数据库的查询
    for book in qs:
        print(book.btitle)
    ```
	- 缓存
	使用同一个查询集，第一次使用时会发生数据库的查询，然后Django会把结果缓存下来，再次使用这个查询集时会使用缓存的数据，减少了数据库的查询次数。
    ```
    情况一：如下是两个查询集，无法重用缓存，每次查询都会与数据库进行一次交互，增加了数据库的负载。
    from booktest.models import BookInfo
    [book.id for book in BookInfo.objects.all()]
    [book.id for book in BookInfo.objects.all()]
    ```
    ```
    情况二：经过存储后，可以重用查询集，第二次使用缓存中的数据。
    
    qs=BookInfo.objects.all()
    [book.id for book in qs]
    [book.id for book in qs]
    ```
1. 限制查询集
	- 可以对查询集进行取下标或切片操作，等同于sql中的limit和offset子句。
	- 注意：不支持负数索引。
	- 对查询集进行切片后返回一个新的查询集，不会立即执行查询。
	- 如果获取一个对象，直接使用[0]，等同于[0:1].get()，但是如果没有数据，[0]引发IndexError异常，[0:1].get()如果没有数据引发DoesNotExist异常。
	```python
	示例：获取第1、2项，运行查看。
	qs = BookInfo.objects.all()[0:2]
	```
#### 管理器Manager
- 管理器是Django的模型进行数据库操作的接口，Django应用的每个模型类都拥有至少一个管理器。
- 我们在通过模型类的objects属性提供的方法操作数据库时，即是在使用一个管理器对象objects。当没有为模型类定义管理器时，Django会为每一个模型类生成一个名为objects的管理器，它是models.Manager类的对象。
- 我们可以自定义管理器，继承自models.Manager，并应用到我们的模型类上。
- 注意：一旦为模型类指明自定义的过滤器后，Django不再生成默认管理对象objects。
- 自定义管理器类主要用于两种情况：
	- 修改原始查询集，重写all()方法
    ```python
    打开booktest/models.py文件，定义类BookInfoManager
    
    #图书管理器
    class BookInfoManager(models.Manager):
        def all(self):
            #默认查询未删除的图书信息
            #调用父类的成员语法为：super().方法名
            return super().filter(is_delete=False)
    ```
    ```python
    在模型类BookInfo中定义管理器
    
    class BookInfo(models.Model):
        ...
        books = BookInfoManager()
    ```
    ```
    使用方法
    
    BookInfo.books.all()
    ```
	在管理器类中补充定义新的方法
    ```python
    打开booktest/models.py文件，定义方法create。
    class BookInfoManager(models.Manager):
        #创建模型类，接收参数为属性赋值
        def create_book(self, title, pub_date):
            #创建模型类对象self.model可以获得模型类
            book = self.model()
            book.btitle = title
            book.bpub_date = pub_date
            book.bread=0
            book.bcommet=0
            book.is_delete = False
            # 将数据插入进数据表
            book.save()
            return book
    ```
    ```
    为模型类BookInfo定义管理器books语法如下
    class BookInfo(models.Model):
          ...
        books = BookInfoManager()
    ```
    ```
    调用语法如下：
    book=BookInfo.books.create_book("abc",date(1980,1,1))
    ```
#### 元信息
在模型类中定义类Meta，用于设置元信息，如使用db_table自定义表的名字
```python
class BookInfo(models.Model):
    ...
    class Meta:
		db_table='bookinfo' #指定BookInfo生成的数据表名为bookinfo
```
#### 事务
- Django中对于数据库的事务，默认每执行一句数据库操作，便会自动提交。我们需要在保存订单中自己控制数据库事务的执行流程。
- 在Django中可以通过django.db.transaction模块提供的atomic来定义一个事务
##### 悲观锁
如Nginx的重复转发或者客户端的连续点击，造成了同样的接口在极短时间内被调用两次，数据库中出现了重复记录。
```python
from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View
from django.db import transaction
from 应用名.models import 模型类名
# 类视图 (并发，悲观锁)
class MyView(View):
    @transaction.atomic
    def post(self, request):
        # select * from 表名 where id=1 for update;  
        # for update 就表示锁,只有获取到锁才会执行查询,否则阻塞等待。
        obj = 模型类名.objects.select_for_update().get(id=1)
        # 等事务提交后，会自动释放锁。
        return HttpResponse('ok')

    from django.db import IntegrityError, transaction
    # 这个例子中，即使generate_relationships()中的代码打破了数据完整性约束，你仍然可以在add_children()中执行数据库操作，并且create_parent()产生的更改也有效。需要注意的是，在调用handle_exception()之前，generate_relationships()中的修改就已经被安全的回滚了。因此，如果有需要，你照样可以在异常处理函数中操作数据库。
    @transaction.atomic
    def post(self, request):
        create_parent()
        try:
            with transaction.atomic():
                generate_relationships()
        except IntegrityError:
            handle_exception()
        add_children()
        # 此方法事务管理代码
        进入最外层atomic代码块时开启一个事务；
        进入内部atomic代码块时创建保存点；
        退出内部atomic时释放或回滚事务；注意如果有嵌套，内层的事务也是不会提交的，可以释放（正常结束）或者回滚
        退出最外层atomic代码块时提交或者回滚事务；
```
##### 乐观锁
- 乐观锁其实并不是真的上锁。而是通过SQL的where子句中的条件是否满足来判断是否满足更新条件来更新数据库，通过受影响行数判断是否更新成功，如果更新失败可以再次进行尝试，如果多次尝试失败就返回更新失败的结果。
- 使用乐观锁时，必须设置数据库的隔离级别是Read Committed(读取已提交内容，可以读到其他线程已提交的数据)。如果隔离级别是Repeatable Read(可重复读，读到的数据都是开启事务时刻的数据，即使其他线程提交更新数据，该线程读取的数据也是之前读到的数据)，乐观锁如果第一次尝试失败，那么不管尝试多少次都会失败。 (Mysql数据库的默认隔离级别是Repeatable Read，需要修改成Read Committed)。
```python
from django.shortcuts import render
from django.http import JsonResponse
from django.views.generic import View
from django.db import transaction
from 应用名.models import GoodsSKU

# 类视图 (并发，乐观锁)
class MyView(View):
    @transaction.atomic
    def post(self, request):
        '''订单创建'''
        count = 3   # 订购3件商品
        # 设置事务保存点
        s1 = transaction.savepoint()
        # 乐观锁，最多尝试5次
        for i in range(5):
            # 查询商品的信息(库存)
            try:
                sku = GoodsSKU.objects.get(id=1)
            except:
                # 商品不存在
                transaction.savepoint_rollback(s1)
                return JsonResponse({'res': 1, 'errmsg': '商品不存在'})
            # 判断商品的库存
            if count > sku.stock:
                transaction.savepoint_rollback(s1)
                return JsonResponse({'res': 2, 'errmsg': '商品库存不足'})
            # 更新商品的库存和销量
            orgin_stock = sku.stock   # 原库存 (数据库隔离级别必须是Read Committed；如果是Repeatable Read,那么多次尝试读取的原库存都是一样的,读不到其他线程提交更新后的数据。)
            new_stock = orgin_stock - count   # 更新后的库存
            new_sales = sku.sales + count   # 更新后的销量
            # update 商品表 set stock=new_stock, sales=new_sales where id=1 and stock = orgin_stock
            # 通过where子句中的条件判断库存是否进行了修改。(并发，乐观锁)
            # 返回受影响的行数
            res = GoodsSKU.objects.filter(id=1, stock=orgin_stock).update(stock=new_stock, sales=new_sales)
            if res == 0:  # 如果修改失败
                if i == 4:
                    # 如果尝试5次都失败
                    transaction.savepoint_rollback(s1)
                    return JsonResponse({'res': 3, 'errmsg': '下单失败'})
                continue  # 再次尝试
            # 否则更新成功
            # 跳出尝试循环
            break
        # 提交事务
        transaction.savepoint_commit(s1)
        # 返回应答
        return JsonResponse({'res': 4, 'message': '创建成功'})
在Django中，还提供了保存点的支持，可以在事务中创建保存点来记录数据的特定状态，数据库出现错误时，可以恢复到数据保存点的状态
from django.db import transaction
# 创建保存点
save_id = transaction.savepoint()  
# 回滚到保存点
transaction.savepoint_rollback(save_id)
# 提交从保存点到当前状态的所有数据库事务操作
transaction.savepoint_commit(save_id)
```
##### 总结
在并发比较少时建议使用乐观锁，减少加锁、释放锁的开销。在并发比较高的时候，建议使用悲观锁。如果乐观锁多次尝试的代价比较大，也建议使用悲观锁。
## ASGI
### Web应用程序和web服务器
1. Web应用程序（Web）是一种能完成web业务逻辑，能让用户基于web浏览器访问的应用程序，它可以是一个实现http请求和响应功能的函数或者类，也可以是Django、Flask、sanic等这样的web框架，当然也可以是其他语言的web程序或web框架。
1. Web服务器（Web Server）是一种运行于网站后台（物理服务器）的软件。Web服务器主要用于提供网页浏览或文件下载服务，它可以向浏览器等Web客户端提供html网页文档，也可以提供其他类型的可展示文档，让客户端用户浏览；还可以提供数据文件下载等。目前世界上最主流的Web服务器有 Nginx 、Apache、IIS、tomcat。
2. Web服务器和Web应用程序的区别
	- Web应用程序主要是完成web应用的业务逻辑的处理，Web服务器则主要是应对外部请求的接收、响应和转发。
    - web服务器启动运行，web应用程序才能被用户访问到。
    - django框架中，我们之所以只有一个web应用程序就跑起来了，是因为我们在终端执行了一个命令，python manage.py runserver。这个命令启动了django框架中内置提供的测试web服务器。
### 网关接口
网关接口（Gateway Interface，GI）就是一种为了实现加载动态脚本而运行在Web服务器和Web应用程序中的通信接口，也可以理解为一份协议/规范。只有Web服务器和Web应用程序都实现了网关接口规范以后，双方的通信才能顺利完成。常见的网关接口协议：CGI，FastCGI，WSGI，ASGI。
![](~@img/uTools_1655646272034.png)
1. CGI（Common Gateway Inteface）通用网关接口，是外部应用程序与Web服务器之间的接口标准。FastCGI: CGI的一个扩展， 提升了性能，废除了 CGI fork-and-execute （来一个请求 fork 一个新进程处理，处理完再把进程 kill 掉）的工作方式，转而使用一种长生存期的方法，减少了进程消耗，提升了性能。这里 FastCGI 就应用于前端 server（nginx）与后端 server（uWSGI）的通信中，制定规范等等，让前后端服务器可以顺利理解双方都在说什么（当然 uWSGI 本身并不用 FastCGI, 它有另外的协议）
2. WSGI（Python Web Server GateWay Interface），它是用在python web框架编写的应用程序与后端服务器之间的规范（如Django和uWSGI之间），让你写的应用程序可以与后端服务器顺利通信。WSGI就是一种统一规范， 所有使用WSGI的服务器都可以运行使用WSGI规范的web框架。
3. WSGI和ASGI，都是基于Python设计的网关接口（Gateway Interface，GI）。
4. Web服务器网关接口（Python Web Server Gateway Interface，WSGI），是Python为了解决Web服务器端与客户端之间的通信基于CGI标准而设计的。实现了WSGI协议的web服务器有：uWSGI、uvicorn、gunicorn。
### 为什么有ASGI的出现
如果我们对WSGI非常满意的话，为什么还要提出ASGI呢？如果仔细检查网络请求的整个处理流程，那么答案就非常明显了。您可以查看 在Django中网络请求如何工作的动画。请注意，在数据库查询之后且响应发送之前，框架是如何等待的。这就是同步处理的缺点。其实网络服务器根本不应该去等待I/O活动。换言之，它应该切换为处理其他请求，并在较慢的活动完成时能得到通知。因此基于异步事件的架构是解决多种并发问题的正确方法
### ASGI的使用
A指的是Async，异步的意思。
|协议，规范	|支持的请求协议（常见，未列全）	    |同步/异步	|支持的框架											  |
| --------- |:-----------------------------:| ---------:|----------------------------------------------------:|
|CGI		|HTTP							|			|CGI程序												  |
|WSGI		|HTTP							|同步		|django3.0以前，Flask1.0								  |
|ASGI		|HTTP，HTTP2，WebSocket等		|同步/异步	|FastAPI，Quart，Sanic，Tornado，django3.0以后，flask2.0|

### 
## admin站点
### 使用Admin站点
- 假设我们要设计一个新闻网站，我们需要编写展示给用户的页面，网页上展示的新闻信息是从哪里来的呢？是从数据库中查找到新闻的信息，然后把它展示在页面上。但是我们的网站上的新闻每天都要更新，这就意味着对数据库的增、删、改、查操作，那么我们需要每天写sql语句操作数据库吗? 如果这样的话，是不是非常繁琐，所以我们可以设计一个页面，通过对这个页面的操作来实现对新闻数据库的增删改查操作。那么问题来了，老板说我们需要在建立一个新网站，是不是还要设计一个页面来实现对新网站数据库的增删改查操作，但是这样的页面具有一个很大的重复性，那有没有一种方法能够让我们很快的生成管理数据库表的页面呢？有，那就是我们接下来要给大家讲的Django的后台管理。Django能够根据定义的模型类自动地生成管理页面。
- 管理界面本地化
```python
在settings.py中设置语言和时区
LANGUAGE_CODE = 'zh-hans' # 使用中国语言
TIME_ZONE = 'Asia/Shanghai' # 使用中国上海时间
```
创建管理员
```python
创建管理员的命令如下，按提示输入用户名、邮箱、密码。
python manage.py createsuperuser
打开浏览器，在地址栏中输入如下地址后回车。
http://127.0.0.1:8000/admin/
输入前面创建的用户名、密码完成登录。
如果想要修改密码可以执行
python manage.py changepassword 用户名
```
- App应用配置
    - 在每个应用目录中都包含了apps.py文件，用于保存该应用的相关信息。
    - 在创建应用时，Django会向apps.py文件中写入一个该应用的配置类，如
    ```python
    from django.apps import AppConfig
    class BooktestConfig(AppConfig):
        name = 'booktest'
    ```
    - 我们将此类添加到工程settings.py中的INSTALLED_APPS列表中，表明注册安装具备此配置属性的应用
        - AppConfig.name 属性表示这个配置类是加载到哪个应用的，每个配置类必须包含此属性，默认自动生成。
        - AppConfig.verbose_name 属性用于设置该应用的直观可读的名字，此名字在Django提供的Admin管理站点中会显示，如
        ```python
        from django.apps import AppConfig
        
        class BooktestConfig(AppConfig):
            name = 'booktest'
            verbose_name = '图书管理'
        ```
- 注册模型类
    登录后台管理后，默认没有我们创建的应用中定义的模型类，需要在自己应用中的admin.py文件中注册，才可以在后台管理中看到，并进行增删改查操作。
    ```python
    打开booktest/admin.py文件，编写如下代码：
    
    from django.contrib import admin
    from booktest.models import BookInfo,HeroInfo
    admin.site.register(BookInfo)
    admin.site.register(HeroInfo)
    ```
- 调整站点信息
    - admin.site.site_header 设置网站页头
    - admin.site.site_title 设置页面标题
    - admin.site.index_title 设置首页标语
    ```python
    在booktest/admin.py文件中添加一下信息
    from django.contrib import admin
    admin.site.site_header = '传智书城'
    admin.site.site_title = '传智书城MIS'
    admin.site.index_title = '欢迎使用传智书城MIS'
    ```
### 调整列表页展示
- 调整列表页和编辑页必须先---定义与使用Admin管理类
- Django提供的Admin站点的展示效果可以通过自定义ModelAdmin类来进行控制
```python
定义管理类需要继承自admin.ModelAdmin类，如下

from django.contrib import admin

class BookInfoAdmin(admin.ModelAdmin):
pass
```
```python
使用管理类有两种方式：
注册参数
admin.site.register(BookInfo,BookInfoAdmin)
装饰器
@admin.register(BookInfo)
class BookInfoAdmin(admin.ModelAdmin):
pass
```
列表中的列显示哪些字段
```python
属性如下：
list_display=[模型字段1,模型字段2,...]
打开booktest/admin.py文件，修改BookInfoAdmin类如下：
class BookInfoAdmin(admin.ModelAdmin):
...
list_display = ['id','btitle']
```
页大小
```python
每页中显示多少条数据，默认为每页显示100条数据，属性如下：
list_per_page=100
打开booktest/admin.py文件，修改AreaAdmin类如下：
class BookInfoAdmin(admin.ModelAdmin):
list_per_page = 2
```

- "操作选项"的位置
- 顶部显示的属性，设置为True在顶部显示，设置为False不在顶部显示，默认为True。
```python
actions_on_top=True
```
底部显示的属性，设置为True在底部显示，设置为False不在底部显示，默认为False。
```python
actions_on_bottom=False
```
```python
打开booktest/admin.py文件，修改BookInfoAdmin类如下：

class BookInfoAdmin(admin.ModelAdmin):
    ...
    actions_on_top = True
    actions_on_bottom = True
```

- 右侧栏过滤器
- 属性如下，只能接收字段，会将对应字段的值列出来，用于快速过滤。一般用于有重复值的字段。
```python
list_filter=[]
打开booktest/admin.py文件，修改HeroInfoAdmin类如下：
class HeroInfoAdmin(admin.ModelAdmin):
    ...
    list_filter = ['hbook', 'hgender']
```

- 搜索框
- 属性如下，用于对指定字段的值进行搜索，支持模糊查询。列表类型，表示在这些字段上进行搜索。
- search_fields=[]
```python
打开booktest/admin.py文件，修改HeroInfoAdmin类如下：
class HeroInfoAdmin(admin.ModelAdmin):
    ...
    search_fields = ['hname']
```

- 将方法作为列
- 列可以是模型字段，还可以是模型方法，要求方法有返回值。
- 通过设置short_description属性，可以设置在admin站点中显示的列名
```python
打开booktest/models.py文件，修改BookInfo类如下：

class BookInfo(models.Model):
    ...
    def pub_date(self):
        return self.bpub_date.strftime('%Y年%m月%d日')

    pub_date.short_description = '发布日期'  # 设置方法字段在admin中显示的标题
```
```python
打开booktest/admin.py文件，修改BookInfoAdmin类如下：

class BookInfoAdmin(admin.ModelAdmin):
    ...
    list_display = ['id','atitle','pub_date']
```
方法列是不能排序的，如果需要排序需要为方法指定排序依据。
```python
admin_order_field=模型类字段
打开booktest/models.py文件，修改BookInfo类如下：
class BookInfo(models.Model):
    ...
    def pub_date(self):
        return self.bpub_date.strftime('%Y年%m月%d日')
    pub_date.short_description = '发布日期'
    pub_date.admin_order_field = 'bpub_date'
```

- 关联对象
- 无法直接访问关联对象的属性或方法，可以在模型类中封装方法，访问关联对象的成员
```python
打开booktest/models.py文件，修改HeroInfo类如下：

class HeroInfo(models.Model):
    ...
    def read(self):
        return self.hbook.bread

    read.short_description = '图书阅读量'
```
```python
打开booktest/admin.py文件，修改HeroInfoAdmin类如下：

class HeroInfoAdmin(admin.ModelAdmin):
    ...
    list_display = ['id', 'hname', 'hbook', 'read']
```
### 调整编辑页展示
显示字段
```
属性如下：
fields=[]

打开booktest/admin.py文件，修改BookInfoAdmin类如下：
class BookInfoAdmin(admin.ModelAdmin):
    ...
    fields = ['btitle', 'bpub_date']
```

分组显示
```
属性如下：
fieldsets=(
    ('组1标题',{'fields':('字段1','字段2')}),
    ('组2标题',{'fields':('字段3','字段4')}),
)
```
```
打开booktest/admin.py文件，修改BookInfoAdmin类如下：
class BookInfoAdmin(admin.ModelAdmin):
    ...
    # fields = ['btitle', 'bpub_date']
    fieldsets = (
        ('基本', {'fields': ['btitle', 'bpub_date']}),
        ('高级', {
            'fields': ['bread', 'bcomment'],
            'classes': ('collapse',)  # 是否折叠显示
        })
    )
说明：fields与fieldsets两者选一使用。
```

- 关联对象
- 在一对多的关系中，可以在一端的编辑页面中编辑多端的对象，嵌入多端对象的方式包括表格、块两种。
    - 类型InlineModelAdmin：表示在模型的编辑页面嵌入关联模型的编辑。
    - 子类TabularInline：以表格的形式嵌入。
    - 子类StackedInline：以块的形式嵌入。
```
打开booktest/admin.py文件，创建HeroInfoStackInline类。

class HeroInfoStackInline(admin.StackedInline):
    model = HeroInfo  # 要编辑的对象
    extra = 1  # 附加编辑的数量
```
```
打开booktest/admin.py文件，修改BookInfoAdmin类如下：

class BookInfoAdmin(admin.ModelAdmin):
    ...
    inlines = [HeroInfoStackInline]
```
可以用表格的形式嵌入。
```
打开booktest/admin.py文件，创建HeroInfoTabularInline类。

class HeroInfoTabularInline(admin.TabularInline):
    model = HeroInfo
    extra = 1
```
```
打开booktest/admin.py文件，修改BookInfoAdmin类如下：

class BookInfoAdmin(admin.ModelAdmin):
    ...
    inlines = [HeroInfoTabularInline]
```
### 上传图片
- Django有提供文件系统支持，在Admin站点中可以轻松上传图片。
- 使用Admin站点保存图片，需要安装Python的图片操作包
```
pip install Pillow
```
- 配置
    - 默认情况下，Django会将上传的图片保存在本地服务器上，需要配置保存的路径。
    - 我们可以将上传的文件保存在静态文件目录中，如我们之前设置的static_files目录中在settings.py 文件中添加如下上传保存目录信息
    ```
    MEDIA_ROOT=os.path.join(BASE_DIR,"static_files/media")
    ```
- 为模型类添加ImageField字段
    ```
    我们为之前的BookInfo模型类添加一个ImageFiled
    
    class BookInfo(models.Model):
        ...
        image = models.ImageField(upload_to='booktest', verbose_name='图片', null=True)
    ```
    ```
    upload_to 选项指明该字段的图片保存在MEDIA_ROOT目录中的哪个子目录
    进行数据库迁移操作
    
    python manage.py makemigrations
    python manage.py migrate
    ```
- 使用Admin站点上传图片
进入Admin站点的图书管理页面，选择一个图书，能发现多出来一个上传图片的字段
