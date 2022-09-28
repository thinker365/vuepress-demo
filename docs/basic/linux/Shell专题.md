[[toc]]

## 格式
1. #!/bin/bash开头(指定解析器)
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
## 父子shell
打开终端，即开启一个shell，可以通过ps查看，在当前shell控制台输入bash，进入子shell，exit可退出
## 变量
### 系统变量
如$HOME、$PWD、$SHELL、$USER
### 自定义变量
1. 变量名称=变量值，=左右不能有空格，变量名称可以有字母、数字和下划线组成，不能以数字开头，环境变量建议大写，变量值有空格，需单/双引号括起来
2. 撤销使用unset 变量名
3. 静态变量readonly 变量名，这种不能unset
4. 访问变量$变量名、$(变量名)
5. export将变量提升为全局环境变量，所有子shell都可以访问
### 特殊变量
1. $n来访问参数，n为数字，$0代表该脚本名称，$1-$9代表第1到到9个参数，十以上的参数需要用大括号包含，如${10}
2. $#获取参数个数，常用于循环，判断参数的个数是否正确以及加强脚本的健壮性
3. 当 $* 和 $@ 不被双引号""包围时，它们之间没有任何区别，都是将接收到的每个参数看做一份数据，彼此之间以空格来分隔；当它们被双引号" "包含时，"$*"会将所有的参数从整体上看做一份数据，"$@"仍然将每个参数都看作一份数据
4. $？最后一次执行的命令的返回状态， 如果这个变量的值为 0， 证明上一个命令正确执行； 如果这个变量的值为非 0（具体是哪个数， 由命令自己来决定） ， 则证明上一个命令执行不正确
5. $$当前Shell进程ID，对于Shell脚本，就是这些脚本所在的进程ID
## 字符串拼接
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
## 参考
[http://www.itsoku.com/course/17](http://www.itsoku.com/course/17)