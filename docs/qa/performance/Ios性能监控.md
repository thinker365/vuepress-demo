[[toc]]
## 性能指标监控分层概述
### 硬件层
一般包含了 CPU 的使用率、内存使用率、磁盘和网络读写速度等，通过这些指标能够反馈出系统运行的基本情况，以及不同的TPS量级会消耗多少硬件资源。
### 系统层
系统层监控包括连接请求数、拒绝数、丢包率、请求超时等，相对于基础的硬件监控而言，这些指标更能够反映出目前系统存在的瓶颈，从而为根因问题的定位提供有力的线索。
### 链路层
链路层是直接面向架构和代码的，它的监控能够帮助你更加准确地看到代码执行了哪些函数，涉及哪些服务，并且能够较为清晰地看到函数之间的调用耗时，还可以帮助你定位代码存在的问题。
### 业务层
业务层监控本意是帮助你判断用户输入是否合规，代码逻辑是否健壮。对于性能测试而言，业务层的监控可以帮助你发现脚本参数问题以及高并发下业务逻辑运行是否正常等。

## 实操
下面以监控硬件资源为例，介绍通过使用Linux 命令行对服务器进行监控
优点：它具有灵活迅速的特点，通过命令可以最快地输出对应结果
### CPU(central processing unit)
中央处理器，一块超大规模的集成电路，是硬件系统的核心，计算机的运算核心和控制核心；功能主要是解释计算机指令和处理计算机软件中的数据，能完成算术运算、逻辑计算及控制功能。
#### cpu异常
死锁、频繁GC、频繁上下文切换、线程执行报错、计算密集都会导致CPU飙升；通常建议使用率70%以下
#### top 
是我们查看各个进程的资源占用状况最常用的命令，尤其注意负载load和使用率；vmstat也能看系统运行状态，关注的是上下文切换和swap分区的使用情况。
```shell script
top - 13:01:17 up 85 days,  2:45,  2 users,  load average: 0.03, 0.01, 0.00		概况
Tasks: 442 total,   1 running, 441 sleeping,   0 stopped,   0 zombie	进程信息
%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st		CPU状态
MiB Mem :  32104.3 total,    569.9 free,  22476.6 used,   9057.9 buff/cache		内存状态
MiB Swap:    923.3 total,    913.0 free,     10.2 used.   8857.7 avail Mem		交换区状态

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND      以下进程详细信息                                                                                 
 949680 root      20   0   15212   4588   3528 R   0.7   0.0   0:00.24 top                                                                                           
   7693 root      20   0 2392000  59916  36328 S   0.3   0.2 633:00.35 containerd                                                                                    
 949173 root      20   0       0      0      0 I   0.3   0.0   0:00.87 kworker/u32:1-ext4-rsv-conversion                                                             
      1 root      20   0  170876  12900   8132 S   0.0   0.0   4:43.48 systemd  
```
#### load average(一段时间内，CPU正在处理和等待处理的进程数之和的统计信息)
```shell script
load average: 0.07, 0.15, 0.21
```
1. 三个数字都是代表进程队列的长度，从左到右分别表示一分钟、 五分钟和十五分钟的数据，数字越小压力值就越低，数字越大则压力越高
2. 以单核处理器为例
	- 0 表示没有任何车辆需要通过；
	- 从 0 到 1 可以认为很流畅，车辆不需要任何等待就可以通过；
	- 1 表示正好在这个通道可接受范围之内；
	- 超过 1 就已经有车辆在后面排队了。
7. 所以理想情况下，希望平均负载值在1以下。如果是1就代表目前没有可用资源了。在实际情况中，很多时候会把理想负载设置在0.7以下，这也是业内的一个“经验值”。
8. 多核 CPU 的话，负载数值/CPU核数在 0~1之间表示正常，理想值也是在0.7以内。
9. 查看CPU核数
```shell script
cat /proc/cpuinfo | grep 'model name' /proc/cpuinfo | wc -l
```
```python
import multiprocessing
print(multiprocessing.cpu_count())
```
#### CPU状态
```shell script
 %Cpu(s):  3.9 us,  1.3 sy,  0.0 ni, 94.6 id,  0.2 wa,  0.0 hi,  0.0 si,  0.0 st
```
1. us(user space) 列显示了用户进程所花费 CPU 时间的百分比。这个数值越高，说明用户进程消耗的 CPU 时间越多，可以用来分析代码中的 CPU 消耗热点。
2. sy(system) 列表示系统进程消耗的 CPU 时间百分比。
3. ni(niced user processes) 列表示改变优先级的进程占用 CPU 的百分比。
4. id(system idle processes) 列表示 CPU 处于空闲状态的时间百分比。
5. wa(wait space) 列显示了 I/O 等待所占用的 CPU 时间的百分比，这里 wa 的参考值为 0.5，如果长期高于这个参考值，需要注意是否存在磁盘瓶颈。可使用iostat、sar进一步分析
6. hi(hardware interrupt) 列表示硬件中断占用 CPU 时间百分比。硬中断由外设硬件发出，如键盘，需要有中断控制器参与，特点是快速执行
7. si(software interrupt) 列表示软件中断占用 CPU 时间百分比。软中断由软件发出中断信号，如网络收发、定时调度，特点是延迟执行
8. st(steal time) 列表示当系统运行在虚拟机中时，当前虚拟机在等待 CPU 为它服务的时间。仅出现在多虚拟机场景，如指标过高，可检查宿主机和其他虚拟机是否异常
#### 交换区状态
1. total交换区总量
2. free空闲交换区总量
3. used已使用交换区总量，如果这个数值在不断变化，说明内核在不断的进行内存和swap数据的交换，这是真正的内存不够了
4. avail Mem缓冲的交换区总量，可用于进程下一次分配的物理内存数量
#### 进程详细信息
1. PID：进程 PID
2. USER：进程所有者的用户名
3. PR：进程调度优先级，值越低优先级越高
4. NI：从用户空间视角的进程优先级（niced值），值越低优先级越高；
5. VIRT：进程使用的虚拟内存（KB），VIRT=SWAP+RES
6. RES：进程使用的（未被换出的）物理内存（KB），RES=CODE+DATA
7. SHR：共享内存大小（KB）
	- S：进程状态
	- D：不可中断的睡眠状态（通常出现在IO阻塞）
	- R：运行态
	- S：睡眠态
	- T：跟踪/停止
	- Z：僵尸态
1. %CPU：进程占用 CPU 时间比例
2. %MEM：进程占用的物理内存比例
3. TIME+：进程占用 CPU 的时间总量（1/100秒），而非进程的存活时间。所以可能存在 TIME+大于程序运行时间，也可能小于程序运行时间，这两没有必然的关系。
4. COMMAND：运行进程使用的命令
### 说明
1. CPU时间即反映CPU全速工作时完成该进程所花费的时间
2. RES列，显示的就是进程实际占用的物理内存
3. 凡是用于完成操作系统的各种功能的进程就是系统进程
4. 用户进程就是所有由你启动的进程
5. 出现进程CPU使用率超过100%的情况，这个和CPU核数有关系，数值是每个核上该进程消耗CPU之和
6. 关于nice，参考[https://linux.9iphp.com/](https://linux.9iphp.com/)和[https://www.linuxcool.com/](https://www.linuxcool.com/)
7. 在已经输入 top 的情况下再输入数字 1，可以查看 CPU 的核数和每个核的运行状态
```shell script
%Cpu0 : 3.0 us, 1.7 sy, 0.0 ni, 95.3 id, 0.0 wa, 0.0 hi, 0.0 si, 0.0 st
%Cpu1 : 2.4 us, 1.0 sy, 0.0 ni, 96.6 id, 0.0 wa, 0.0 hi, 0.0 si, 0.0 st
```
看 CPU 的使用率时，只看 us 这个数值，是不准确的。除了用户进程，还有其他系统进程会占用 CPU，所以实际 CPU 的使用率可以用 100 减去空闲值（id）去计算。
#### 定位消耗资源过多的进程（案例）
1. top找到消耗cpu高的进程id（pid），如果知道进程name，直接ps -ef | grep pname
2. top -Hp pid，单独监控该进程，查看该进程下所有的线程
3. 查找消耗cpu高的线程nid，将线程nid转换为16进制(printf '0x%x\n' nid)
4. 通过进程号查看进程堆栈信息，使用线程号定位指定线程 jstack pid | grep nid -C10 --color；或者dump到本地分析 jstack pid > log.txt
5. [社区高效工具](https://github.com/oldratlee/useful-scripts/blob/dev-2.x/docs/java.md#-show-busy-java-threads)
#### 快捷操作
1. 1 ：可以监控每个逻辑 CPU 的状况
2. b ：打开关闭加亮效果，在打开加亮的效果之后，我们可以按x键实现列的加亮效果
3. P：以CPU的使用资源排序显示
4. M：以内存的使用资源排序显示
5. N：以pid排序显示
6. T：由进程使用的时间累计排序显示
7. S：切换到累计模式
8. k：给某一个 pid 一个信号。可以用来杀死进程
9. r：给某个 pid 重新定制一个 nice 值（即优先级）
10. d：可以更改刷新时间（默认3秒）
11. s：改变两次刷新之间的延迟时间（单位为s）
12. i：可以只显示状态为R的进程
13. c：可以显示进程的完整的命令（COMMAND列）
14. shift + >：可以依次按照  PID、USER、PR····· 来进行排序。
15. shift + <：可以依次按照 COMMAND、TIME+、%MEM····· 来进行排序
16. o/O：可以自定义显示哪些列
17. f/F：从当前显示中添加或者删除项目
18. l：切换显示平均负载和启动时间信息
19. m：切换显示内存信息
20. t：切换显示进程和CPU状态信息
21. W：将当前设置写入~/.toprc文件中
22. q：退出 top（用ctrl+c也可以退出 top）
top -s以安全模式启动top界面，可以防止在 top 界面对进程进行修改操作
### 内存
#### free
空闲的、未使用的，关注剩余内存的大小（free）
```shell script
[root@JD ~]# free -m
		 total    used    free   shared  buff/cache  available
Mem:      7822    5917     302     373     1602        1195
Swap:       0       0       0
```
1. total总的物理内存
2. used已使用的物理内存（包括过去使用过，现在可以重复利用的内存，因此Linux上free内存会越来越少）
3. free空闲的物理内存
4. 为什么 free 值很低却未必代表内存达到瓶颈呢？这和 Linux 内核机制有关系，简单来说，内存空间会开辟 buffer 和 cache 缓冲区，对于物理内存来说，这都属于被使用过的内存。而应用需要内存时，如果没有可用的 free 内存，内核就会从缓冲区回收内存以满足要求，当 free 值很低的时候，如上代码中的 available 就能体现出缓冲区可用内存的大小，这个指标可以比较真实地反映出内存是否达到使用上限。
### 磁盘
#### iostat
```shell script
[root@JD ~]# iostat -x
Linux 3.10.0-514.el7.x86_64 (JD)    01/18/2021   _x86_64_    (2 CPU)
avg-cpu: %user %nice %system %iowait %steal %idle
		 5.24  0.00  1.57    0.07    0.00   93.12
Device:   rrqm/s wrqm/s  r/s   w/s   rkB/s  wkB/s  avgrq-sz avgqu-sz await  r_await w_await svctm %util
vda       0.00   0.29    0.57  5.30  20.50  630.14 221.82   0.07     11.53  59.83   6.36    1.18  0.69
```
1. iostat是sysstat的一部分，所以要安装sysstat。
2. idle 代表磁盘空闲百分比；
3. util 接近 100%，表示磁盘产生的 I/O 请求太多，I/O 系统已经满负荷在工作，该磁盘可能存在瓶颈；
4. svctm 代表平均每次设备 I/O 操作的服务时间 (毫秒)。
5. 组合看这些指标，如果 idle 长期在 50% 以下，util 值在 50% 以上以及 svctm 高于 10ms，说明磁盘可能存在一定的问题。
#### iotop
1. iotop 这个命令并不是 linux 原生，需安装。
2. 输入iotop，就能清楚地看到哪些进程在消耗磁盘资源。
```shell script
6448  be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % ifrit-agent
14647 be/4 root        0.00 B/s    7.70 K/s  0.00 %  0.00 % java -Dserver.port=9080
```
#### iftop（if-->interface，可与ifconfig联想）
可以查看占用 I/O 最多的进程
### 网络
#### netstat
netstat 能提供 TCP 和 UDP 的连接状态等统计信息，可以简单判断网络是否存在堵塞。
```shell script
[root@JD ~]# netstat
Active Internet connections (w/o servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      1 JD:49190                169.254.169.250:http    FIN_WAIT1
tcp        0      0 JD:39444                169.254.169.254:http    TIME_WAIT
tcp        0      0 JD:us-srv               worker-18.:sentinel-ent ESTABLISHED
```
1. Proto：协议名（可以 TCP 协议或者 UDP 协议）。
2. recv-Q：网络接收队列还有多少请求在排队。
3. send-Q：网络发送队列有多少请求在排队。
4. recv-Q 和 send-Q 如果长期不为 0，很可能存在网络拥堵，这个是判断网络瓶颈的重要依据。
5. Foreign Address：与本机端口通信的外部socket。
6. State：TCP 的连接状态。
#### iotop
可以看到占用网络流量最高的进程
#### ss（Socket Statistics）
当前机器上的网络连接汇总
### 通用
#### lsof（lists openfiles）
可以查看当前进程所关联的所有资源
#### sysctl
可以查看当前系统内核的配置参数
#### dmesg
可以显示系统级别的一些信息
### 说明
同时监控以上4个资源，可以使用vmstat、dstat（需安装）、nmon（需安装）
## 工具监控
### netdata
#### 简介
1. Netdata的分布式实时监视代理以零配置的方式，从系统、硬件、容器和应用程序收集数千个指标，它可以运行在所有的物理或虚拟服务器、容器、云和IoT设备上，可以在大多数Linux发行版（Ubuntu，Debian，CentOS等），容器平台（Kubernetes集群，Docker）和许多其他操作系统（FreeBSD，macOS）上安装，不需要sudo权限。
2. Netdata由系统管理员，DevOps工程师和开发人员设计，旨在收集所有内容，可视化监控指标，解决复杂的性能问题。
3. [查看更多](https://learn.netdata.cloud/docs/overview/why-netdata)
#### [官网](https://learn.netdata.cloud/docs/)