[[toc]]
## celery简介
![](~@img/celery_d369b6a4c4265225.png)
![](~@img/celery_20220828123748.jpg)
1. Celery是一个简单、灵活且可靠的，处理大量消息的分布式系统，专注于实时处理的异步任务队列，同时也支持任务调度
2. Celery的架构由三部分组成，消息中间件（message broker），任务执行单元（worker）和任务执行结果存储（task result store）组成
3. **消息中间件**：Celery本身不提供消息服务，但是可以方便的和第三方提供的消息中间件集成。包括RabbitMQ, Redis等等
4. **任务执行单元**：Worker是Celery提供的任务执行的单元，worker并发的运行在分布式的系统节点中。
5. **任务结果存储**：Task result store用来存储Worker执行的任务的结果，Celery支持以不同方式存储任务的结果，包括[AMQP](https://baike.baidu.com/item/AMQP/8354716), redis等
6. 另外， Celery还支持不同的并发和序列化的手段
	- **并发**：Prefork, Eventlet, gevent, threads/single threaded
	- **序列化**：pickle, json, yaml, msgpack. zlib, bzip2 compression， Cryptographic message signing 等等
## 使用场景
1. celery是一个强大的 分布式任务队列的异步处理框架，它可以让任务的执行完全脱离主程序，甚至可以被分配到其他主机上运行。我们通常使用它来实现异步任务（async task）和定时任务（crontab)。
2. **异步任务**：将耗时操作任务提交给Celery去异步执行，比如发送短信/邮件、消息推送、音视频处理等等
3. **定时任务**：定时执行某件事情，比如每天数据统计
## 优点
1. **Simple(简单)**
	- Celery 使用和维护都非常简单，并且不需要配置文件。
1. **Highly Available（高可用）**
	- woker和client会在网络连接丢失或者失败时，自动进行重试。并且有的brokers 也支持“双主”或者“主从”的方式实现高可用。
1. **Fast（快速）**
	- 单个的Celery进程每分钟可以处理百万级的任务，并且只需要毫秒级的往返延迟（使用 RabbitMQ, librabbitmq, 和优化设置时）
1. **Flexible（灵活）**
	- Celery几乎每个部分都可以扩展使用，自定义池实现、序列化、压缩方案、日志记录、调度器、消费者、生产者、broker传输等等。
## 安装
```python
 pip install celery
```
## 执行异步任务
### 基本使用
创建异步任务执行文件celery_task.py
```python
import celery
import time

backend = 'redis://127.0.0.1:6379/1'
broker = 'redis://127.0.0.1:6379/2'

cel = celery.Celery('celery_demo', backend=backend, broker=broker)


@cel.task
def send_email(name):
    print(f'向{name}发送邮件！')
    time.sleep(2)
    print(f'向{name}发送邮件完成！')
    return 'ok'


@cel.task
def send_msg(name):
    print(f'向{name}发送信息！')
    time.sleep(2)
    print(f'向{name}发送信息完成！')
    return 'ok'
```
创建执行任务文件produce_task.py
```python
from celery_task import send_email, send_msg

result1 = send_email.delay('liu')
print(result1.id)

result2 = send_email.delay('lin')
print(result2.id)

result3 = send_msg.delay('yuan')
print(result3.id)

result4 = send_msg.delay('ha')
print(result4.id)
```
命令行启动
```python
celery -A celery_task worker -l INFO
```
创建查看结果文件result.py
```python
from celery.result import AsyncResult
from celery_task import cel

# 参数id需要先拿到任务id
async_result = AsyncResult(id='88901fa8-c318-4ba2-9428-1fb60c003156', app=cel)
if async_result.successful():
    result = async_result.get()
    print(result)
elif async_result.failed():
    print('failed')
elif async_result.status == 'PENDING':
    print('任务等待中')
elif async_result.status == 'RETRY':
    print('任务异常后正在重试')
elif async_result.status == 'STARTED':
    print('任务已经开始被执行')
```
### 多任务时项目结构
```python
celeryPro
	celery_tasks
		__init__.py
		celery.py
		task_01.py # 任务1
		task_02.py # 任务2
	celery_result.py # 任务结果
	produce_task.py # 执行任务
```
```python
文件: celery.py

from celery import Celery

cel = Celery('celery_demo',
             broker='redis://127.0.0.1:6379/1',
             backend='redis://127.0.0.1:6379/2',
             # 包含以下两个任务文件，去相应的py文件中找任务，对多个任务做分类
             include=['celery_tasks.task01','celery_tasks.task02'])
# 时区
cel.conf.timezone = 'Asia/Shanghai'
# 是否使用UTC
cel.conf.enable_utc = False
```
```python
文件: task01.py
import time
from celery_tasks.celery import cel


@cel.task
def send_email(name):
    time.sleep(5)
    return f"完成向{name}发送邮件任务"
```
```python
文件: task02.py

import time
from celery_tasks.celery import cel


@cel.task
def send_msg(name):
    time.sleep(5)
    return f"完成向{name}发送信息任务"
```
```python
文件: produce_task.py

from celery_tasks.task01 import send_email
from celery_tasks.task02 import send_msg

# 立即告知celery去执行test_celery任务，并传入一个参数
result = send_email.delay('liu')
print(result.id)
result = send_msg.delay('lin')
print(result.id)
```
```python
文件: celery_result.py

from celery.result import AsyncResult
from celery_tasks.celery import cel

# Django中可以使用django_celery_results，但是django_celery_results查不到celery_taskmeta表中的数据，只能查询安装了该库以后的任务。以下用法更简洁
async_result = AsyncResult(id="2c25c916-e57c-496e-95c5-fb1c787d11ec", app=cel)

if async_result.successful():
    result = async_result.get()
    print(result)
    # result.forget() # 将结果删除,执行完成，结果不会自动删除
    # async.revoke(terminate=True)  # 无论现在是什么时候，都要终止
    # async.revoke(terminate=False) # 如果任务还没有开始执行呢，那么就可以终止。
elif async_result.failed():
    print('执行失败')
elif async_result.status == 'PENDING':
    print('任务等待中被执行')
elif async_result.status == 'RETRY':
    print('任务异常后正在重试')
elif async_result.status == 'STARTED':
    print('任务已经开始被执行')
```
## 执行定时任务
### 普通模式
```python
file: celery_task.py

import time
from celery_tasks.celery import cel

@cel.task
def send_email(name):
    time.sleep(5)
    return f"完成向{name}发送邮件任务"
```
```python
文件: produce_task.py

from celery_tasks.task01 import send_email
from celery_tasks.task02 import send_msg
from datetime import datetime, timedelta

# 方式一
# v1 = datetime(2022, 5, 25, 21, 18, 0)
# print(v1)
# v2 = datetime.utcfromtimestamp(v1.timestamp())
# print(v2)
# result = send_email.apply_async(args=['lin'], eta=v2)

# 方式二
ctime = datetime.now()
# 默认使用utc时间
utc_time = datetime.utcfromtimestamp(ctime.timestamp())
time_delay = timedelta(seconds=5)
task_time = utc_time + time_delay
print(task_time)
result = send_email.apply_async(args=['lin'], eta=task_time)
print(result.id)
```
```python
celery -A tmp_task worker -l INFO
```
- 然后执行produce_task.py

### 多任务结构
```python
文件: celery.py

from celery import Celery
from celery.schedules import crontab
from datetime import timedelta

cel = Celery('celery_demo',
             broker='redis://127.0.0.1:6379/1',
             backend='redis://127.0.0.1:6379/2',
             # 包含以下两个任务文件，去相应的py文件中找任务，对多个任务做分类
             include=['celery_tasks.task01','celery_tasks.task02'])

# 时区
cel.conf.timezone = 'Asia/Shanghai'
# 是否使用UTC
cel.conf.enable_utc = False

cel.conf.beat_schedule = {
    'add-every-5-seconds': {
        'task': 'celery_tasks.task01.send_email',
        # 'schedule': 1.0,
        # 'schedule': crontab(minute="*/1"),
        'schedule': timedelta(seconds=5),
        'args': ('张三',)
    },
    'add-every-8-seconds': {
        'task': 'celery_tasks.task02.send_msg',
        'schedule': timedelta(seconds=8),
        'args': ('李四',)
    },
}
```
```python
celery -A celery_tasks worker -l INFO
```
```python
celery  -A celery_tasks beat
```
## 在django中使用
结构如下：
```python
├─drfdemo
│  │  asgi.py
│  │  authentication.py
│  │  exceptions.py
│  │  permissions.py
│  │  settings.py
│  │  urls.py
│  │  wsgi.py
│  │  __init__.py
│
├─mycelery
│  │  config.py
│  │  main.py
│  │  settings.py
│  │  __init__.py
│  │
│  ├─email
│  │  │  tasks.py
│  │  │  __init__.py
│  ├─sms
│  │  │  tasks.py
│  │  │  __init__.py
│
├─opt
│  │  admin.py
│  │  apps.py
│  │  models.py
│  │  tests.py
│  │  urls.py
│  │  views.py
│  │  __init__.py
│  │
│  ├─migrations
│  │  │  __init__.py
```
```python
文件: config.py
broker_url = 'redis://127.0.0.1:6379/15'
result_backend = 'redis://127.0.0.1:6379/14'
```
```python
文件: main.py

# 主程序
import os
from celery import Celery

# 创建celery实例对象
app = Celery("celery_demo")

# 把celery和django进行组合，识别和加载django的配置文件
os.environ.setdefault('DJANGO_SETTINGS_MODULE','mycelery.settings')

# 通过app对象加载配置
app.config_from_object("mycelery.config")

# 加载任务
# 参数必须必须是一个列表，里面的每一个任务都是任务的路径名称
# app.autodiscover_tasks(["任务1","任务2"])
app.autodiscover_tasks(["mycelery.sms", 'mycelery.email'])

# 启动Celery的命令
# 强烈建议切换目录到mycelery根目录下启动
# celery -A mycelery.main worker --loglevel=info
```
```python
文件: email/tasks.py
# celery的任务必须写在tasks.py的文件中，别的文件名称不识别!!!
from mycelery.main import app
import time

@app.task  # name表示设置任务的名称，如果不填写，则默认使用函数名做为任务名
def send_sms(mobile):
    """发送短信"""
    print("向手机号%s发送短信成功!" % mobile)
    time.sleep(5)
    return "send_sms OK"

@app.task
def send_sms2(mobile):
    print("向手机号%s发送短信成功!" % mobile)
    time.sleep(5)
    return "send_sms2 OK"
```

```python
文件：views.py

from mycelery.email.tasks import send_sms, send_sms2
from datetime import timedelta, datetime

def celery_demo(request):
    send_sms.delay("110")
    send_sms2.delay("119")
    return HttpResponse('ok')

	ctime = datetime.now()
    # 默认用utc时间
    utc_ctime = datetime.utcfromtimestamp(ctime.timestamp())
    time_delay = timedelta(seconds=10)
    task_time = utc_ctime + time_delay
    result = send_sms.apply_async(["911", ], eta=task_time)
    print(result.id)
```
```shell
celery -A mycelery.main worker -l INFO
```
## 注意事项
1. 同时使用异步任务和定时任务，更简单的启动方式：celery -A file worker -b -l info，可同时启动worker和beat
2. celery不能用root用户启动，需要在配置文件添加platforms.C_FORCE_ROOT=True
3. celery在长时间运行后可能出现内存泄露，需要配置CELERYD_TASKS_PER_CHILD = n，表示每个worker执行n个任务杀掉子进程再启动新的子进程
4. celery配置文件建议在django配置文件中配置，参考[https://docs.celeryproject.org/en/stable/userguide/configuration.html#std-setting-result_expires](https://docs.celeryproject.org/en/stable/userguide/configuration.html#std-setting-result_expires)
5. 一个无限期阻塞的任务会使得工作单元无法再做其他事情，建议给任务设置超时时间
6. 使用celery定义任务时，避免在一个任务中调用另一个异步任务，容易造成阻塞
7. 使用@shared_task装饰器能让我们避免对某个项目名对应Celery实例的依赖，使app的可移植性更强
8. 如果你变换了时区timezone，比如从'UTC'变成了'Asia/Shanghai'，需重置周期性任务
9. 要调用self这个参数，定义任务时必须设置bind=True
10. 不同任务交由不同Queue处理，不同的任务所需要的资源和时间不一样的，为了防止一些非常占用资源或耗时的任务阻塞任务队列导致一些简单任务也无法执行
11. 如果你不在意任务的返回结果，可以设置 ignore_result 选项，因为存储结果耗费时间和资源。你还可以可以通过 task_ignore_result 设置全局忽略任务结果
12. 避免启动同步子任务，让一个任务等待另外一个任务的返回结果是很低效的，并且如果工作单元池被耗尽的话这将会导致死锁

- 参考
- [celery官网](https://docs.celeryq.dev/en/stable/)
- [在Django中使用celery](https://docs.celeryq.dev/en/stable/django/first-steps-with-django.html#using-celery-with-django)
- [https://pypi.org/project/celery/](https://pypi.org/project/celery/)
- [https://mp.weixin.qq.com/s/m-lKF_D440bOU9nqszw6Mw](https://mp.weixin.qq.com/s/m-lKF_D440bOU9nqszw6Mw)