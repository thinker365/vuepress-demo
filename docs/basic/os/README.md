[[toc]]

## 管道
### 匿名管道
```shell script
netstat -tunlp | grep 9200
```
1. netstat -tulnp 的输出结果作为 grep 9200 这条命令的输入
2. 通信方式单向
### 命名管道
```shell script
ubuntu@ubuntu:~$ mkfifo pipe_name
ubuntu@ubuntu:~$ echo "hello liuly2" > pipe_name 此时会等待
```
新开一个窗口，将内容读出来，上面执行才会停止
```shell script
ubuntu@ubuntu:~$ cat < pipe_name
```
### 优缺点
简单，但效率低下
## 消息队列
解决上面进程数据放在某个内存之后，马上让进程返回。但是处理很大的数据不合适，从一个进程复制到另一个进程比较耗时。
## 共享内存
解决上面复制耗时，我们知道系统加载进程，分配给进程的内存并不是一个物理内存，而是虚拟内存。可以让2个进程各自拿出一部分虚拟内存，然后映射到相同的物理内存，这样2个进程有自己独立的虚拟内存空间，有一部分相同的物理空间。
## 信号量
解决上面共享内存竞争问题，信号量本质是计数器，用来实现进程之间的互斥与同步。比如信号量初始值是1，进程A访问内存时，将信号量设置为0；当进程B进来时，看到信号量不为1，表示有进程在访问该内存，就不会再访问该内存。
```python
import time
import threading

semaphore = threading.BoundedSemaphore(5)  # 每次释放5个线程

def func(n):
    with semaphore:
        time.sleep(1)
        print(F'Thread-{n}')

thread_list = []
for i in range(20):
    t = threading.Thread(target=func, args=(i,))
    thread_list.append(t)
    t.start()

for j in thread_list:
    j.join()

print(F'All Thread Done')
```
## Socket
以上都是在同一个主机进行通信，Socket解决不在同一个主机的进程通信。