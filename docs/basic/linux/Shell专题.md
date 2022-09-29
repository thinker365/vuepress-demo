[[toc]]

## 基本介绍
### 解释器 
1. #!/bin/bash
### 父子shell
打开终端，即开启一个shell，可以通过ps查看，在当前shell控制台输入bash，进入子shell，exit可退出
## 执行方式
1. bash/sh 脚本的绝对路径或相对路径（不用赋予脚本+x权限）
	```shell script
	sh ./xxx.sh # sh 脚本相对路径
	```
	```shell script
	sh /tmp/shells/xxx.sh # sh 脚本绝对路径
	```
	```shell script
	bash ./xxx.sh # bash 脚本相对路径
	```
	```shell script
	bash /tmp/shells/xxx.sh # bash 脚本绝对路径
	```
2. 输入脚本的绝对路径或相对路径执行脚本（必须具有可执行权限+x）
	```shell script
	/tmp/shells/xxx.sh
	```
3. 在脚本的路径前加上”.”或者source
	```shell script
	. xxx.sh
	```
	```shell script
	source shells/xxx.sh
	```
## 变量
### 系统变量
如$HOME、$PWD、$SHELL、$USER
### 自定义变量
1. 变量名称=变量值，=左右不能有空格，变量名称可以有字母、数字和下划线组成，不能以数字开头，环境变量建议大写，变量值有空格，需单/双引号括起来
2. 撤销使用unset 变量名
3. 静态变量readonly 变量名，这种不能unset
4. 访问变量$变量名、${变量名}
5. export将变量提升为全局环境变量，所有子shell都可以访问
### 特殊变量
1. $n来访问参数，n为数字，$0代表该脚本名称，$1-$9代表第1到到9个参数，十以上的参数需要用大括号包含，如${10}
2. $#获取参数个数，常用于循环，判断参数的个数是否正确以及加强脚本的健壮性
3. 当 $* 和 $@ 不被双引号""包围时，它们之间没有任何区别，都是将接收到的每个参数看做一份数据，彼此之间以空格来分隔；当它们被双引号" "包含时，"$*"会将所有的参数从整体上看做一份数据，"$@"仍然将每个参数都看作一份数据
4. $？最后一次执行的命令的返回状态， 如果这个变量的值为 0， 证明上一个命令正确执行； 如果这个变量的值为非 0（具体是哪个数， 由命令自己来决定） ， 则证明上一个命令执行不正确
5. $$当前Shell进程ID，对于Shell脚本，就是这些脚本所在的进程ID
6. $!后台运行的最后一个进程的ID号
## 字符串
字符串拼接
```shell script
name="articles"
url="http://itsoku.com"
str1=$name$url  #中间不能有空格
str2="$name $url"  #如果被双引号包围，那么中间可以有空格
str3=$name": "$url  #中间可以出现别的字符串
str4="$name: $url"  #这样写也可以
str5="${name}: ${url}/articles"  #这个时候需要给变量名加上大括号
str6='${name}: ${url}/articles' #单引号括包裹起来的不会被替换
```
字符串长度
```shell script
str=abcd
echo ${#str}
```
提取子字符串
```shell script
str=abcd
echo ${str:2:3}
```
查找子字符串
```shell script
str=abcd
echo `expr index "$str" b`
```
## 数组
```shell script
ubuntu@ubuntu:~$ array=(1 2 3 4)
ubuntu@ubuntu:~$ echo ${array[2]}
ubuntu@ubuntu:~$ echo ${#array[@]} # 获取数组长度
ubuntu@ubuntu:~$ echo ${#array[*]} # 获取数组长度
ubuntu@ubuntu:~$ array=(abc def ghi)
ubuntu@ubuntu:~$ echo ${#array[def]} # 获取某个元素长度
```
## 运算符
$((运算式))或$[运算式]
## 条件判断
test condition，[ condition ]注意condition前后要有空格，条件非空即为true， [ test ]返回true， [ ]返回false
### 字符串比较
等号“=”判断相等，用“!=”判断不等，=和!=前后都要有空格
### 整数比较
|语法			|说明						|
| ------------- |:-------------------------:|
|[ $a -eq $b]	|判断a=b（equal）			|
|[ $a -ne $b]	|判断a!=b（not equal）		|
|[ $a -lt $b]	|判断a<b（less than）		|
|[ $a -le $b]	|判断a<=b（less equal）		|
|[ $a -gt $b]	|判断a>b（greater than）	    |
|[ $a -ge $b]	|判断a>=b（greater equal）	|
### 文件权限判断
|语法		|说明						|
| --------- |:-------------------------:|
|[ -r 文件  |判断文件是否有可读权限		|
|[ -w 文件 ]|判断文件是否有可写权限		|
|[ -x 文件 ]|判断文件是否有可执行权限	    |
### 文件类型判断
|语法		|说明								|
| --------- |:---------------------------------:|
|[ -e 文件 ]|判断文件是否存在						|
|[ -f 文件 ]|文件存在并且是一个常规的文件（file）	|
|[ -d 文件 ]|文件存在并且是一个目录（dirctory）		|
### 多条件判断(&&、||)
&& 表示前一条命令执行成功时， 才执行后一条命令， || 表示上一条命令执行失败后， 才执行下一条命令
## 流程控制
### if
单分支
```shell script
if [ 条件判断式 ];then
    程序
fi
```
```shell script
if [ 条件判断式 ]
then
    程序
fi
```
多分支
```shell script
if [ 条件判断式 ]
then
    程序
elif [ 条件判断式 ]
then
    程序
else
    程序
fi
```
[ 条件判断式 ]，中括号和条件判断式之间必须有空格，if后要有空格
### case
```shell script
case $变量名 in
"值 1")
如果变量的值等于值 1， 则执行程序 1
;;
"值 2")
如果变量的值等于值 2， 则执行程序 2
;;
…省略其他分支…
*)
如果变量的值都不是以上的值， 则执行此程序
;;
esac
```
case 行尾必须为单词“in” ， 每一个模式匹配必须以右括号“) ” 结束，双分号“;;” 表示命令序列结束， 相当于 java 中的 break，最后的“*） ” 表示默认模式， 相当于 java 中的 default
### for
```shell script
for (( 初始值;循环控制条件;变量变化 ))
do
    程序
done
```
```shell script
for 变量 in 值1 值2 值3…
do
    程序
done
```
### while
```shell script
while [ 条件判断式 ]
do
    程序
done
```
## read读取控制台输入
read 选项 变量名
|选项	|作用												|
| ----- |:-------------------------------------------------:|
|-p		|指定读取时的提示符									|
|-t		|指定读取值时等待的时间（秒）如果-t不加表示一直等待	    |
## 函数
### 系统函数
1. basename：打印目录或者文件的基本名称
	```shell script
	basename 文件名称 [后缀]
	basename 选项... 文件名称...
	```
	|选项|作用									|
	| - |:-------------------------------------:|
	|-a	|支持多个参数并将每个参数视为一个名称	    |
	|-s	|指定需要剔除的后缀						|
	```shell script
	[root@test001 shells]# basename /root/shells/while.sh 
	while.sh
	[root@test001 shells]# basename /root/shells/while.sh .sh
	while
	[root@test001 shells]# basename -s .sh -a case.sh while.sh 
	case
	while
	```
2. dirname：获取文件的目录名称
	```shell script
	dirname 文件名称
	```
	```shell script
	[root@test001 shells]# dirname /usr/bin/
	/usr
	[root@test001 shells]# dirname /usr/bin/1.sh
	/usr/bin
	[root@test001 shells]# dirname /usr/bin/1.sh /a/b/2.sh
	/usr/bin
	/a/b
	[root@test001 shells]# dirname 1.sh
	.
	```
### 自定义函数
```shell script
[ function ] funname[()]
{
    Action;
    [return int;]
}
```
1. []包裹部分可选
2. 必须在调用函数地方之前， 先声明函数， shell 脚本是逐行运行
3. 函数返回值只能通过\$?系统变量获得，可以显示加return返回，如果不加将以最后一条命令运行结果作为返回值，return 后跟数值 n(0-255)
## 命令替换
$(cmd)和`cmd`的作用是相同的，在执行一条命令时，会先将其中的``或者是$() 中的语句当作命令执行一遍，再将结果加入到原命令中重新执行
```shell script
known@virtual-machine:~/data$ date=`date -d '1 day ago' "+%Y-%m-%d"`
known@virtual-machine:~/data$ echo $date
2022-09-28
known@virtual-machine:~/data$ echo date=`date -d '1 day ago' "+%Y-%m-%d"`
date=2022-09-28
known@virtual-machine:~/data$ echo date=$(date -d '1 day ago' "+%Y-%m-%d")
date=2022-09-28
```
## 正则表达式
grep，sed， awk 等文本处理工具都支持通过正则表达式
### 常规匹配
```shell script
known@virtual-machine:~$ ps -aux | grep update-notifier
```
### 特殊字符
1. ^匹配一行的开头
2. $匹配一行的结尾
3. .匹配一个任意字符
4. *不单独使用，和前一个字符连用，表示匹配前一个字符0次或多次
5. []表示匹配某个范围内的一个字符
	|[6,8]		|匹配6或者8						|
	| --------- |:-----------------------------:|
	|[0-9]		|匹配1个0-9的数字					|
	|[0-9]*		|匹配任意长度的数字字符串			|
	|[a-z]		|匹配1个a-z之间的字符				|
	|[a-z]*		|匹配任意长度的字母字符串			|
	|[a-ce-f]	|匹配a-z或者e-f之间的任意一个字符	|
6. \表示转义，并不会单独使用，由于所有特殊字符都有其特定的匹配模式，当匹配某一特殊字符本身时就要将转义字符和特殊字符连用，来表示特殊字符本身
7. 有些语言中支持正则表达式的扩展语法，如{n,m}等等，对于这种，使用grep匹配的时候，需要添加-E选项
	```shell script
	[root@test001 ~]# echo "ab,cdre" | grep -E "[a-z]{2,3}"
	ab,cdre
	```
## cut命令
cut命令从文件的每一行按照指定的分隔符进行分割，每行会被分成多个列
```shell script
cut [选项] filename
```
|选项	|功能											|
| ----- |:---------------------------------------------:|
|-f		|列号，提取第几列									|
|-d		|分隔符，按照指定分隔符分割行，默认是制表符“\t”		|
|-c		|以字符为单位进行分割								|
-f选项
|语法		|说明													|
| --------- |:-----------------------------------------------------:|
|-f N		|从第1 个开始数的第N 个字节、字符或域						|
|-f N-		|从第N 个开始到所在行结束的所有字符、字节或域				|
|-f N-M		|从第N 个开始到第M 个之间(包括第M 个)的所有字符、字节或域		|
|f -M		|从第1 个开始到第M 个之间(包括第M 个)的所有字符、字节或域		|
|f N,M,…	|取第N、第M个字节、字符或域								|
### 参考
[http://www.itsoku.com/course/17](http://www.itsoku.com/course/17)