[[toc]]
## 面试题剖析
1. 常用linux命令
	- 从文件、网络、进程方面回答
	- 常用的数据分析命令（linux三剑客、sort、uniq、head等）
2. 写过哪些脚本
	- 自动化相关
	- 数据分析
## 文件
1. find
	```shell script
	 find $ANDROID_HOME -name "*.jar"
	```
## 网络
1. netstat
## 性能
1. top
## 数据分析
数据：[https://gitee.com/thinker006/data-source.git](https://gitee.com/thinker006/data-source.git)
```
93.180.71.3 - - [17/May/2015:08:05:32 +0000] "GET /downloads/product_1 HTTP/1.1" 304 0 "-" "Debian APT-HTTP/1.3 (0.8.16~exp12ubuntu10.21)"
93.180.71.3 - - [17/May/2015:08:05:23 +0000] "GET /downloads/product_1 HTTP/1.1" 304 0 "-" "Debian APT-HTTP/1.3 (0.8.16~exp12ubuntu10.21)"
80.91.33.133 - - [17/May/2015:08:05:24 +0000] "GET /downloads/product_1 HTTP/1.1" 304 0 "-" "Debian APT-HTTP/1.3 (0.8.16~exp12ubuntu10.17)"
217.168.17.5 - - [17/May/2015:08:05:34 +0000] "GET /downloads/product_1 HTTP/1.1" 200 490 "-" "Debian APT-HTTP/1.3 (0.8.10.3)"
217.168.17.5 - - [17/May/2015:08:05:09 +0000] "GET /downloads/product_2 HTTP/1.1" 200 490 "-" "Debian APT-HTTP/1.3 (0.8.10.3)"
93.180.71.3 - - [17/May/2015:08:05:57 +0000] "GET /downloads/product_1 HTTP/1.1" 304 0 "-" "Debian APT-HTTP/1.3 (0.8.16~exp12ubuntu10.21)"
...

```
1. 首先查看数据大小，数据量大，不推荐使用cat，建议使用less，不需要读取全部内容
2. 数据源从左到右依次为：ip、时间、http请求方法 路径 协议版本 状态码、ua
3. 统计pv，即page view
	```shell script
	wc -l acess.log
	```
4. pv分组，比如按天分组
	```shell script
	$4代表文本的第4列，即时间这一列，默认按空格分隔
	awk '{print $4}' acess.log
	```
	```shell script
	时间包含时分秒，此处只需要表示当天
	substr函数，数字2代表从第 2 个字符开始，数字11代表截取 11 个字符
	awk '{print substr($4,2,11)}' acess.log
	```
	```shell script
	sort按时间排序，uniq -c统计重复的次数
	awk '{print substr($4,2,11)}' acess.log | sort | uniq -c
	```
5. 分析uv，即uniq visit，统计访问人数，使用ip
	```shell script
	wc -l 统计不重复的ip数
	awk '{print substr($4,2,11)}' acess.log | sort | uniq -c | wc -l
	```
6. uv分组分析，命令较复杂，推荐使用bash脚本
	```shell script
	#!/usr/bin/bash
	awk '{print substr($4,2,11)""$1}' acess.log | sort | uniq | awk '{uv[$1]++;next}END{for (ip in uv) print ip uv[ip]}'
	说明：
	文件首部我们使用#!，表示我们将使用后面的/usr/bin/bash执行这个文件。
	第一次awk我们将第 4 列的日期和第 1 列的ip地址拼接在一起。
	下面的sort是把整个文件进行一次字典序排序，相当于先根据日期排序，再根据 IP 排序。
	接下来我们用uniq去重，日期 +IP 相同的行就只保留一个。
	最后的awk我们再根据第 1 列的时间和第 2 列的 IP 进行统计。
	```
