# Python并发编程
[[toc]]
## 并发与并行
- 在解释并发与并行之前，我们必须先明确：单个处理器（一个单核CPU）在某一个时刻只能处理一个线程。
- 并发是指在同一个处理器上通过时间片轮转的方式在多个线程之间频繁切换，由于切换速度极快，所以看似多个线程似乎被同时执行，但实际上每一个时刻都只有一个线程被执行，其他的线程出于阻塞状态。
- 并行是指多个处理器在同一时刻同时处理了多个不同的线程，这才是真正意义的同时被执行。
- 如下图所示，线程A与线程B同在一个CPU内执行，且任一t时刻内，都只有一个线程（A或者B）被执行，所以线程A与线程B是并发执行的。线程C和线程D分别在两个CPU内执行，且在某一个t时刻内同时都在执行，所以线程C和线程D是并行的。
![](~@img/Snipaste_2022-05-20_16-13-08.png)

## 并行与串行
- 并行是指多个任务同时执行，而串行是指多个任务时，各个任务按顺序执行，完成一个之后才能进行下一个。
- 所以，并发与并行是在某一时刻是否都在执行的区别。并行与串行是同时进行或一个结束才进行下一个的区别。
![](~@img/Snipaste_2022-05-20_16-14-10.png)

## 同步与异步
- 同步与异步的概念与消息的通知机制有关：
- 同步是指线程在访问某一资源时，获得了资源的返回结果之后才会执行其他操作，否则主动继续获取这一资源；
- 异步与同步相对，是指线程在访问某一资源时，无论是否取得返回结果，都进行下一步操作；当有了资源返回结果时，系统自会通知线程。
- 用一个比喻来说明：10多前的银行是没有业务取号的，我们去办理业务时，如果有很多人，那就先排队，然后关注着什么时候轮到自己，这就是同步；现在去银行，得先取一张小纸条，上面写着你的业务号，轮到你的时候，银行会喊你，这就是异步。异步机制往往注册一个回调机制,在所等待的事件被触发时由触发机制(银行柜台业务员)通过某种机制(业务办理号码)找到等待该事件的人。

## 阻塞与非阻塞
- 阻塞是与非阻塞都是程序的一种运行状态。
- 线程在等待某个操作完成期间，自身无法继续执行别的操作，则称该线程在该操作上是 阻塞的。
- 线程在等待某个操作完成期间，自身可执行别的操作，则称该线程在该操作上是非阻塞的。
- 继续上面银行办理业务的例子，无论是10多年前的排队办理业务，还是现在的业务号办理业务，如果在我们在等待过程中，什么也不能做，那就是阻塞的；如果在等待过程中，可以做其他事情（看书、玩手游），那就是非阻塞的。
- 同步和异步是个线程处理方式或手段，阻塞和非阻塞是线程的一种状态，两者并不相同也并不冲突。
- 同步、异步与阻塞非阻塞可以产生不同的组合：同步阻塞、同步非阻塞、异步阻塞、异步非阻塞。
- 还是银行办理业务的例子：如果排着队，且只能傻傻的排着队，看着什么时候到自己，那就是同步阻塞；如果排着队还能玩玩手机，偶尔抬头看看什么时候到自己，那就是同步非阻塞。如果是现在的取票按业务号办理业务，拿到号码后就陷入懵逼状态，啥也不能做，直到银行根据业务号通知自己，那就是异步阻塞；如果拿到业务号之后，自己爱干嘛干嘛，那就是异步非阻塞。

## 进程、线程、协程
1. 基本概念
	- 进程是具有一定独立功能的程序关于某个数据集合上的一次运行活动,进程是系统进行资源分配和调度的一个独立单位，是资源（内存）分配的最小单位。每个进程都有自己的独立内存空间，不同进程通过进程间通信来通信。
	- 由于进程比较重量，占据独立的内存，所以上下文进程间的切换开销（栈、寄存器、虚拟内存、文件句柄等）比较大，但相对比较稳定安全。
	- 线程是进程的一个实体,是CPU调度和分派的基本单位,它是比进程更小的能独立运行的基本单位.线程自己基本上不拥有系统资源,只拥有一点在运行中必不可少的资源(如程序计数器,一组寄存器和栈),但是它可与同属一个进程的其他的线程共享进程所拥有的全部资源。
	- 线程间通信主要通过共享内存，上下文切换很快，资源开销较少，但相比进程不够稳定容易丢失数据。
	- 协程是一种用户态的轻量级线程，协程的调度完全由用户控制。协程拥有自己的寄存器上下文和栈。
	- 协程调度切换时，将寄存器上下文和栈保存到其他地方，在切回来的时候，恢复先前保存的寄存器上下文和栈，直接操作栈则基本没有内核切换的开销，可以不加锁的访问全局变量，所以上下文的切换非常快。

1. 进程与线程
	- 线程是指进程内的一个执行单元,也是进程内的可调度实体。线程与进程的区别:
		- 地址空间:线程是进程内的一个执行单元，进程内至少有一个线程，它们共享进程的地址空间，而进程有自己独立的地址空间；
		- 资源拥有:进程是资源分配和拥有的单位,同一个进程内的线程共享进程的资源；
		- 线程是处理器调度的基本单位,但进程不是；
		- 二者均可并发执行
		- 每个独立的线程有一个程序运行的入口、顺序执行序列和程序的出口，但是线程不能够独立执行，必须依存在应用程序中，由应用程序提供多个线程执行控制。

1. 协程多与线程进行比较
	- 一个线程可以多个协程，一个进程也可以单独拥有多个协程，这样python中则能使用多核CPU。
	- 线程进程都是同步机制，而协程则是异步
	- 协程能保留上一次调用时的状态，每次过程重入时，就相当于进入上一次调用的状态。
## 线程池
当任务量多的时候，首先会想到多线程处理，但并不是线程越多效率就越高，线程越多越消耗资源，另外上下文切换也是很大的开销
### 方式一
```
import time
import random
import multiprocessing

cpu_count = multiprocessing.cpu_count()
from concurrent.futures import ThreadPoolExecutor
from concurrent.futures._base import Future

# 理论上将线程的数量设置为 CPU 核数就是最合适的，这样可以将每个 CPU 核心的性能压榨到极致
# 不过在工程上，线程的数量一般会设置为 CPU 核数 + 1
# 这样在某个线程因为未知原因阻塞时多余的那个线程完全可以顶上
pool = ThreadPoolExecutor(max_workers=cpu_count + 1)

tasks = [f'task_{item}' for item in range(1, 20)]


def handle(task):
    time.sleep(random.randint(1, 5))
    print(f'执行任务：{task}')
    return f'返回{task}结果'


def result(res: Future):
    print(f'result:{res.result()}')


if __name__ == '__main__':
    for task in tasks:
        """
        submit会将所有任务都提交到一个地方
        然后线程池里面的每个线程会来取任务,
        比如:线程池有3个线程,但是有5个任务
        会先取走三个任务,每个线程去处理
        其中一个线程处理完自己的任务之后,会再来提交过的任务区再拿走一个任务
        """
        pool.submit(handle, task)
        # print(type(pool.submit(handle, task)))
        future = pool.submit(handle, task)
        future.add_done_callback(result)
    pool.shutdown()
    print('主程序执行完成')
```
### 方式二
```
pip install threadpool
```
```
此模式未研究，写法不是很清晰
import time
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed

def sayhello(name):
    print("%s say Hello to %s" % (threading.current_thread().getName(), name));
    time.sleep(1)
    return name

name_list =['admin','root','scott','tiger']
start_time = time.time()
with ThreadPoolExecutor(2) as executor: # 创建 ThreadPoolExecutor 
    future_list = [executor.submit(sayhello, name) for name in name_list] # 提交任务

for future in as_completed(future_list):
    result = future.result() # 获取任务结果
    print("%s get result : %s" % (threading.current_thread().getName(), result))

print('%s cost %d second' % (threading.current_thread().getName(), time.time()-start_time))
```
## 进程池
```
import time
import random
import multiprocessing

cpu_count = multiprocessing.cpu_count()
from concurrent.futures import ProcessPoolExecutor
from concurrent.futures._base import Future

pool = ProcessPoolExecutor(max_workers=cpu_count + 1)

tasks = [f'task_{item}' for item in range(1, 20)]


def handle(task):
    time.sleep(random.randint(1, 5))
    print(f'执行任务：{task}')
    return f'返回{task}结果'


def result(res: Future):
    print(f'result:{res.result()}')


if __name__ == '__main__':
    for task in tasks:
        """
        submit会将所有任务都提交到一个地方
        然后进程池里面的每个进程会来取任务,
        比如:进程池有3个进程,但是有5个任务
        会先取走三个任务,每个进程去处理
        其中一个进程处理完自己的任务之后,会再来提交过的任务区再拿走一个任务
        """
        pool.submit(handle, task)
        # print(type(pool.submit(handle, task)))
        future = pool.submit(handle, task)
        future.add_done_callback(result)
    pool.shutdown()
    print('主程序执行完成')
```
## 协程asyncio
### 协程及asyncio基础知识
- 协程(coroutine)也叫微线程，是实现多任务的另一种方式，是比线程更小的执行单元，一般运行在单进程和单线程上。因为它自带CPU的上下文，它可以通过简单的事件循环切换任务，比进程和线程的切换效率更高，这是因为进程和线程的切换由操作系统进行。
- Python实现协程的两个库：asyncio和gevent，asyncio 是从Python3.4引入的标准库，内置了对协程异步IO的支持
- asyncio 的编程模型本质是一个**事件循环**，我们一般先定义一个协程函数, 从 asyncio 模块中获取事件循环loop，然后把需要执行的协程任务(或任务列表)扔到 loop中执行，就实现了异步IO。
### 事件循环
事件循环是asyncio的核心，把一些异步函数注册到事件循环中，事件循环就会循环执行这些函数，当执行某个函数，它处于IO等待时，事件循环会暂停它去执行其他函数，当函数IO恢复时，下次循环到它时会继续执行。
### 创建协程函数方式演进
#### python3.4之前实现方式
通过@asyncio.coroutine 和 yeild from 实现
```python
import asyncio

# 定义协程函数
@asyncio.coroutine
def func():
    print('start')
    yield from asyncio.sleep(1)
    print('end')

if __name__ == '__main__':
    # 获取事件循环
    loop = asyncio.get_event_loop()
    # 执行协程任务
    loop.run_until_complete(func())
    # 关闭事件循环
    loop.close()
```
#### python3.5之后实现方式
```python
import asyncio

async def func():
    print("start")
    await asyncio.sleep(1) #耗时的代码或函数使用await声明，表示碰到等待时挂起，以切换到其它任务
    print("end")

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(func())
    loop.close()
```
#### python3.7之后优化
```python
import asyncio

async def func():
    print("start")
    await asyncio.sleep(1)
    print("end")

if __name__ == '__main__':
    asyncio.run(func())
```
### 创建协程任务方式演进
上面案例，只执行了单个协程任务(函数)，根据协程函数创建协程任务有多种方法，Python 3.7提供asyncio.create_task，如下：
```python
# 方法1：使用ensure_future方法。future代表一个对象，未执行的任务
task1 = asyncio.ensure_future(foo())
task2 = asyncio.ensure_future(bar())

# 方法2：使用loop.create_task方法
loop = asyncio.get_event_loop()
task3 = loop.create_task(foo())
task4 = loop.create_task(bar())

# 使用Python 3.7提供的asyncio.create_task方法
task5 = asyncio.create_task(foo())
task6 = asyncio.create_task(bar())
```
创建多个协程任务列表后，我们还要使用asyncio.wait方法收集协程任务，并交由事件循环处理执行
```python
import asyncio

async def foo():
    print("start-foo")
    await asyncio.sleep(1)
    print("end-foo")

async def main():
    tasks = []
	# 构造多个协程任务
    for _ in range(5):
        tasks.append(asyncio.create_task(foo()))
    await asyncio.wait(tasks)

if __name__ == '__main__':
    asyncio.run(main())
```
收集多个协程任务，Python还提供了新的asyncio.gather方法，它的作用与asyncio.wait方法类似，但更强大。如果列表中传入的不是create_task方法创建的协程任务，它会自动将函数封装成协程任务
```python
import asyncio

async def foo():
    print("start-foo")
    await asyncio.sleep(1)
    print("end-foo")

async def main():
    tasks = []
    for _ in range(5):
        tasks.append(foo())  # 这里并没有由协程函数创建协程任务
    await asyncio.gather(*tasks)  # 注意此处的*号

if __name__ == '__main__':
    asyncio.run(main())
```
### 获取协程任务结果
- 以上可知，gather方法有将函数封装成协程任务的能力，但两者更大的区别在**所有**协程任务执行完毕后对于返回结果的处理
- asyncio.wait 会返回两个值：done 和 pending，done 为已完成的协程任务列表，pending 为超时未完成的协程任务类别，需通过task.result()方法可以获取每个协程任务返回的结果。可以定义函数返回的时机，比如可以是FIRST_COMPLETED(第一个结束的), FIRST_EXCEPTION(第一个出现异常的), ALL_COMPLETED(全部执行完，默认的)
- asyncio.gather 返回的是所有已完成协程任务的 result，不需要再进行调用或其他操作，就可以得到全部结果，如果某一个协程崩溃了，会抛出异常，不会有结果
#### wait
```python
import asyncio

async def foo(index):
    print("start-foo")
    await asyncio.sleep(1)
    print("end-foo")
    return f'foo-{index}'

async def main():
    tasks = []
    for index in range(5):
        tasks.append(asyncio.create_task(foo(index)))
    # 获取任务执行结果
    done, pending = await asyncio.wait(tasks)
    for result in done:
        print(result.result())

if __name__ == '__main__':
    asyncio.run(main())
```
```python
import asyncio

async def foo(index):
    print("start-foo")
    await asyncio.sleep(1)
    print("end-foo")
    print(1 / 0)
    return f'foo-{index}'

async def main():
    tasks = []
    for index in range(5):
        tasks.append(asyncio.create_task(foo(index)))
    # 出现第一个异常的时候就结果，函数整体不会崩溃，只是如果这里想要获取结果的话它是一个异常对象。
    done, pending = await asyncio.wait(tasks, return_when=asyncio.tasks.FIRST_EXCEPTION)
    for result in done:
        print(result.result())

if __name__ == '__main__':
    asyncio.run(main())
```
#### gather
```python
import asyncio

async def foo(index):
    print("start-foo")
    await asyncio.sleep(1)
    print("end-foo")
    return f'foo-{index}'

async def main():
    tasks = []
    for index in range(5):
        tasks.append(foo(index))
    # 获取任务执行结果
    results = await asyncio.gather(*tasks)
    for result in results:
        print(result)

if __name__ == '__main__':
    asyncio.run(main())
```
### asyncio高级用法
#### 给任务添加回调函数
可以给每个协程任务通过add_done_callback方法给单个协程任务添加回调函数
```python
import asyncio

async def foo(index):
    print("start-foo")
    await asyncio.sleep(1)
    print("end-foo")
    return f'foo-{index}'

# 定义回调函数
def callback(future):
    print(f"callback：{future.result()}")

async def main():
    tasks = []
    for index in range(5):
        task = asyncio.create_task(foo(index))
        # 增加回调函数
        task.add_done_callback(callback)
        tasks.append(task)
    await asyncio.wait(tasks)

if __name__ == '__main__':
    asyncio.run(main())
```
#### 设置任务超时
很多协程任务都是很耗时的，当你使用wait方法收集协程任务时，可通过timeout选项设置任务切换前单个任务最大等待时间长度
```python
done, pending = await asyncio.wait(tasks, timeout=10)
```
#### 自省
1. asyncio.current_task: 返回当前运行的Task实例，如果没有正在运行的任务则返回 None。如果 loop 为 None 则会使用 get_running_loop()获取当前事件循环。
2. asyncio.all_tasks: 返回事件循环所运行的未完成的Task对象的集合。