Django
==========================
#### 简介
- 用python语言写的开源web开发框架，并遵循MVC设计；
- Django的主要目的是简便、快速的开发数据库驱动的网站；
- 它强调代码复用，多个组件可以很方便的以"插件"形式服务于整个框架；
- Django有许多功能强大的第三方插件，你甚至可以很方便的开发出自己的工具包；
- 这使得Django具有很强的可扩展性；
- 它还强调快速开发和DRY(DoNotRepeatYourself)原则。
##### 特点
1. 重量级框架
	- 对比Flask框架，Django原生提供了众多的功能组件，让开发更简便快速。
		- 提供项目工程管理的自动化脚本工具
		- 数据库ORM支持（对象关系映射，英语：Object Relational Mapping）
		- 模板
		- 表单
		- Admin管理站点
		- 文件管理
		- 认证权限
		- session机制
		- 缓存
1. MVT模式
	- 有一种程序设计模式叫MVC，其核心思想是分工、解耦，让不同的代码块之间降低耦合，增强代码的可扩展性和可移植性，实现向后兼容；
		- M全拼为Model，主要封装对数据库层的访问，对数据库中的数据进行增、删、改、查操作；
		- V全拼为View，用于封装结果，生成页面展示的html内容；
		- C全拼为Controller，用于接收请求，处理业务逻辑，与Model和View交互，返回结果。
	- Django的MVT
		- M全拼为Model，与MVC中的M功能相同，负责和数据库交互，进行数据处理；
		- V全拼为View，与MVC中的C功能相同，接收请求，进行业务处理，返回应答；
		- T全拼为Template，与MVC中的V功能相同，负责封装构造要返回的html。
#### 项目搭建
##### 环境安装
创建虚拟环境（不想创建你随意~）
```
pip3 install virtualenv
virtualenv venv
如果存在多个python解释器，可以选择指定一个Python解释器（比如python3.6）
virtualenv -p python3.6 venv
```
安装Django
```
pip3 install Django
```
Virtualenv相关命令总结：
```
workon: 打印所有的虚拟环境；
mkvirtualenv xxx: 创建 xxx 虚拟环境，可以–python=/usr/bin/python3.6 指定python版本;
workon xxx: 使用 xxx 虚拟环境;
deactivate: 退出 xxx 虚拟环境；
rmvirtualenv xxx: 删除 xxx 虚拟环境。
lsvirtualenv : 列举所有的环境。
```
##### 创建项目
1. 创建项目
	```
	django-admin startproject project
	```
1. 项目目录说明：
	- 与项目同名的目录，此处为xxx；
	- settings.py 是项目的整体配置文件；
	- urls.py 是项目的URL配置文件；
	- wsgi.py 是项目与WSGI兼容的Web服务器入口；
	- manage.py 是项目管理文件，通过它管理项目。
1. 启动本地服务
	- django提供了一个纯python编写的轻量级web服务器
	```
	python manage.py runserver ip:port
	或者
	python manage.py runserver
	可以不写IP和端口，默认IP是127.0.0.1，默认端口为8000
	```
##### 创建应用
1. 创建（子）应用
	```
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
	- 注册安装一个子应用的方法，即是将子应用的配置信息文件apps.py中的Config类添加到项目配置文件settings.py中INSTALLED_APPS列表中。

##### 创建视图
1. 创建
	- 进入创建的应用模块，在views.py中编写视图
	```
	from django.http import HttpResponse
	def index(request):
		"""
		index视图
		:param request: 包含了请求信息的请求对象
		:return: 响应对象
		"""
		return HttpResponse("hello the world!")
	```
	- 说明：
	- 视图函数的第一个传入参数必须定义，用于接收Django构造的包含了请求数据的HttpReqeust对象，通常名为request;
	- 视图函数的返回值必须为一个响应对象，不能像Flask一样直接返回一个字符串，可以将要返回的字符串数据放到一个HTTPResponse对象中。
1. 定义路由URL
	- 进入创建的应用模块，在urls.py中保存应用路由
	```
	from django.conf.urls import url	
	from . import views	
	# urlpatterns是被django自动识别的路由列表变量
	urlpatterns = [
	    # 每个路由信息都需要使用url函数来构造
	    # url(路径, 视图)
	    url(r'^index/$', views.index),
	]
	```
1. 在项目总路由project/urls.py中添加子应用的路由数据
	```
	from django.conf.urls import url, include
	from django.contrib import admin	
	urlpatterns = [
	    url(r'^admin/', admin.site.urls),  # django默认包含的	
	    url(r'^app/', include('app.urls')), 
	]
	```
	- 备注：
	- 使用include来将子应用app里的全部路由包含进项目路由中；
	- r'^app/' 决定了app子应用的所有路由都已/app/开头，如我们刚定义的视图index，其最终的完整访问路径为/app/index/；
	- include函数除了可以传递字符串之外，也可以直接传递应用的urls模块。
	```
	from django.conf.urls import url, include
	from django.contrib import admin
	import users.urls  # 先导入应用的urls模块	
	urlpatterns = [
	    url(r'^admin/', admin.site.urls),
	    url(r'^users/', include(app.urls)),  # 添加应用的路由
	]
	```
	
	
	
#### 项目配置
##### 配置文件
1. BASE_DIR
	- 当前工程的根目录，Django会依此来定位工程内的相关文件，我们也可以使用该参数来构造文件路径
1. DEBUG
	- 调试模式，创建工程后初始值为True，即默认工作在调试模式下
	- Django程序出现异常时，向前端显示详细的错误追踪信息
	- 部署线上运行的Django不要运行在调式模式下，记得修改DEBUG=False
1. 语言与时区
	```
	LANGUAGE_CODE = 'zh-hans'
	TIME_ZONE = 'Asia/Shanghai'
	```
1. 静态文件
	- 项目中的CSS、图片、js都是静态文件。一般会将静态文件放到一个单独的目录中，以方便管理；
	- 静态文件可以放在项目根目录下，也可以放在应用的目录下，由于有些静态文件在项目中是通用的，所以推荐放在项目的根目录下，方便管理；
	```
	STATICFILES_DIRS=[] 存放查找静态文件的目录 接收的是list
	STATIC_URL 访问静态文件的URL前缀
	```
	- Django 仅在调试模式下（DEBUG=True）能对外提供静态文件；
	- 当DEBUG=False工作在生产模式时，Django不再对外提供静态文件，需要是用collectstatic命令来收集静态文件并交由其他静态文件服务器来提供。
1. 路由说明
	- Django的主要路由信息定义在工程同名目录下的urls.py文件中，该文件是Django解析路由的入口；
	- 每个子应用为了保持相对独立，可以在各个子应用中定义属于自己的urls.py来保存该应用的路由，然后用主路由文件包含各应用的子路由数据。
	```
	from django.conf.urls import url
	from django.contrib import admin
	import app.views
	urlpatterns = [
		url(r'^admin/', admin.site.urls),
		url(r'^app/index/$', app.views.index)
	]
	```
1. 路由解析顺序
	- Django在接收到一个请求时，从主路由文件中的urlpatterns列表中以由上至下的顺序查找对应路由规则;
	- 如果发现规则为include包含，则再进入被包含的urls中的urlpatterns列表由上至下进行查询;
	- 值得关注的由上至下的顺序，有可能会使上面的路由屏蔽掉下面的路由，带来非预期结果。
	```
	urlpatterns = [
		url(r'^say', views.say),
		url(r'^sayhello', views.sayhello),
	]
	```
1. 路由命名与reverse反解析（逆向）
	- 在定义路由的时候，可以为路由命名，方便查找特定视图的具体路径信息；
		- 在使用include函数定义路由时，可以使用namespace参数定义路由的命名空间；
			```
			url(r'^users/', include('users.urls', namespace='users')),
			```
			- 此命名空间表示，凡是users.urls中定义的路由，均属于namespace指明的users名下；
			- 命名空间的作用是避免不同应用中的路由使用了相同的名字发生冲突，使用命名空间区别开。
		- 在定义普通路由（非include函数）时，可以使用name参数指明路由的名字；
			```
			urlpatterns = [
				url(r'^index/$', views.index, name='index'),
				url(r'^say', views.say, name='say'),
			]
			```
	- reverse反解析
		```
		from django.urls import reverse
		def index(request):
			return HttpResponse("hello the world!")
		def say(request):
			url = reverse('users:index')  # 返回 /users/index/
			print(url)
			return HttpResponse('say')
		```
		- 对于未指明namespace的，reverse(路由name)
		- 对于指明namespace的，reverse(命名空间namespace:路由name)
1. 路径结尾斜线/的说明
	- Django中定义路由时，通常以斜线“/”结尾，其好处是用户访问不以斜线“/”结尾的相同路径时，Django会把用户重定向到以斜线“/”结尾的路径上，而不会返回404。
	```
	urlpatterns = [
		url(r'^index/$', views.index, name='index'),
	]
	```
	- 用户访问index或者index/网址，均能访问到index视图；
	- 虽然路由结尾带/能带来上述好处，但是却违背了HTTP中URL表示资源位置路径的设计理念；
	- SO，是否结尾带“/”，你自己看着办！
#### 请求响应
##### 请求Request
1. 利用HTTP协议向服务器传参有几种途径？
	- 提取URL的特定部分，如/weather/beijing/2018，可以在服务器端的路由中用正则表达式截取；
	- 查询字符串（query string)，形如key1=value1&key2=value2；
	- 请求体（body）中发送的数据，比如表单数据、json、xml；
	- 在http报文的头（header）中。
1. URL路径参数
	- 在定义路由URL时，可以使用正则表达式提取参数的方法从URL中获取请求参数，Django会将提取的参数直接传递到视图的传入参数中。
	- 未命名参数按定义顺序传递
	```
	url(r'^weather/([a-z]+)/(\d{4})/$', views.weather),
	def weather(request, city, year):
	    print('city=%s' % city)
	    print('year=%s' % year)
	    return HttpResponse('OK')
	```
	- 命名参数按名字传递
	```
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
		- 如果一个键同时拥有多个值将获取最后一个值
		- 如果键不存在则返回None值，可以设置默认值进行后续处理
		```
		dict.get('键',默认值)
		可简写为
		dict['键']
		```
	- 方法getlist()：根据键获取值，值以列表返回，可以获取指定键的所有值
		- 如果键不存在则返回空列表[]，可以设置默认值进行后续处理
		```
		dict.getlist('键',默认值)
		```
1. 查询字符串Query String
	- 获取请求路径中的查询字符串参数（形如?k1=v1&k2=v2），可以通过request.GET属性获取，返回QueryDict对象
	```
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
	- 表单类型 Form Data
		- 前端发送的表单类型的请求体数据，可以通过request.POST属性获取，返回QueryDict对象
		```
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
	- 非表单类型 Non-Form Data
		- 非表单类型的请求体数据，Django无法自动解析，可以通过request.body属性获取最原始的请求体数据；
		- 自己按照请求体格式（JSON、XML等）进行解析；
		- request.body返回bytes类型。
		```
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
	- 可以通过request.META属性获取请求头headers中的数据，request.META为字典类型；
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
	```
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

##### 响应Response
- 视图在接收请求并处理后，必须返回HttpResponse对象或子对象；
- HttpRequest对象由Django创建，HttpResponse对象由开发人员创建。
1. HttpResponse
	- 可以使用django.http.HttpResponse来构造响应对象
	```
	HttpResponse(content=响应体, content_type=响应体数据类型, status=状态码)
	```
	- 也可通过HttpResponse对象属性来设置响应体、状态码：
	```
	content：表示返回的内容。
	status_code：返回的HTTP响应状态码。
	```
	- 响应头可以直接将HttpResponse对象当做字典进行响应头键值对的设置
	```
	response = HttpResponse()
	response['xxx'] = 'Python'  # 自定义响应头xxx, 值为Python
	```
	- 示例：
	```
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
	- Django提供了一系列HttpResponse的子类，可以快速设置状态码
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
	- 若要返回json数据，可以使用JsonResponse来构造响应对象，作用如下：
		- 帮助我们将数据转换为json字符串
		- 设置响应头Content-Type为 application/json
		```
		from django.http import JsonResponse	
		def demo_view(request):
			return JsonResponse({'city': 'chengdu', 'subject': 'python'})
		```
1. redirect重定向
	```
	from django.shortcuts import redirect
	def demo_view(request):
		return redirect('/index.html')
	```
##### Cookie
- Cookie，有时也用其复数形式Cookies，指某些网站为了辨别用户身份、进行session跟踪而储存在用户本地终端上的数据（通常经过加密）；
- Cookie是存储在浏览器中的一段纯文本信息，建议不要存储敏感信息如密码，因为电脑上的浏览器可能被其它人使用。
- Cookie的特点：
	- Cookie以键值对Key-Value形势进行信息的存储；
	- Cookie基于域名安全，不同域名的Cookie是不能互相访问的。
1. 设置Cookie
	- 可以通过HttpResponse对象中的set_cookie方法来设置cookie
	```
	HttpResponse.set_cookie(cookie名, value=cookie值, max_age=cookie有效期)
	```
	- max_age 单位为秒，默认为None；如果是临时cookie，可将max_age设置为None。
1. 读取Cookie
	- 可以通过HttpRequest对象的COOKIES属性来读取本次请求携带的cookie值；
	- request.COOKIES为字典类型。
##### Session
- Session:在计算机中，尤其是在网络应用中，称为“会话控制”。Session 对象存储特定用户会话所需的属性及配置信息。这样，当用户在应用程序的 Web 页之间跳转时，存储在 Session 对象中的变量将不会丢失，而是在整个用户会话中一直存在下去。当用户请求来自应用程序的 Web 页时，如果该用户还没有会话，则 Web 服务器将自动创建一个 Session 对象。当会话过期或被放弃后，服务器将终止该会话。Session 对象最常见的一个用法就是存储用户的首选项。
1. Session 的作用
	- Session 的作用就是它在 Web服务器上保持用户的状态信息供在任何时间从任何设备上的页面进行访问。因为浏览器不需要存储任何这种信息，所以可以使用任何浏览器，即使是像 Pad 或手机这样的浏览器设备。
	- 保持会话状态!
1. Session的特点
	- 依赖cookies
	- 存储敏感、重要的信息
	- 支持更多字节
	- Session共享问题
1. Session配置和存储
	- 启用Session
		- Django项目默认启用Session，可以在settings.py文件中查看
		```
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
			```
			SESSION_ENGINE='django.contrib.sessions.backends.db'
			```
			- 如果存储在数据库中，需要在项INSTALLED_APPS中安装Session应用。
			```
			INSTALLED_APPS = [
					...
					'django.contrib.sessions'
					...
			]
			```
			数据库中的表为：django_session，由表结构可知，操作Session包括三个数据：键，值，过期时间。
		- **本地缓存**
			- 存储在本机内存中，如果丢失则不能找回，比数据库的方式读写更快。
			```
			SESSION_ENGINE='django.contrib.sessions.backends.cache'
			```
		- **混合存储**
			- 优先从本机内存中存取，如果没有则从数据库中存取
			```
			SESSION_ENGINE='django.contrib.sessions.backends.cached_db'
			```
		- **Redis**
			- 在redis中保存session，需要引入第三方扩展，我们可以使用django-redis来解决
			- 安装
				```
				pip install django-redis
				```
				- 配置
				```
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
1. Session操作
- 通过HttpRequest对象的session属性进行会话的读写操作。
	-  以键值对的格式写session
	```
	request.session['键']=值
	```
	- 根据键读取值
	```
	request.session.get('键',默认值)
	```
	- 清除所有session，在存储中删除值部分
	```
	request.session.clear()
	```
	- 清除session数据，在存储中删除session的整条数据
	```
	request.session.flush()
	```
	- 删除session中的指定键及值，在存储中只删除某个键及对应的值
	```
	del request.session['键']
	```
	- 设置session的有效期
	```
	request.session.set_expiry(value)
	```
	- 如果value是一个整数，session将在value秒没有活动后过期；
	- 如果value为0，那么用户session的Cookie将在用户的浏览器关闭时过期；
	- 如果value为None，那么session有效期将采用系统默认值，默认为两周，可以通过在settings.py中设置SESSION_COOKIE_AGE来设置全局默认值。
#### 类视图与中间件
#### 模板
#### 数据库
#### admin站点