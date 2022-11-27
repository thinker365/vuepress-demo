[[toc]]

## 简介
JaCoCo是一个免费、开源Java代码覆盖率工具
## 代码覆盖率
1. 覆盖率是用来衡量测试代码对功能代码的测试情况，通过统计测试代中对功能代码中行、分支、类等模拟场景数量，来量化说明测试的充分度。代码覆盖率 = 代码的覆盖程度，一种度量方式。
2. 覆盖率简单说：跑了一个测试用例，项目代码中哪些模块、文件、类、方法、行执行了。
3. 其中行覆盖率是最细粒度，其他覆盖率都可从行覆盖情况计算出来。
### 行覆盖
当至少一个指令被指定源码行执行时，该源码行被认为已执行。
### 类覆盖
当一个类至少有一个方法已执行，则该类被认为已执行，包括构造函数和静态初始化方法。
### 方法覆盖
当方法中至少有一个指令被执行，该方法被认为已执行，包括构造函数和静态初始化方法。
### 分支覆盖
if 和 switch 语句算作分支覆盖率，这个指标计算一个方法中的分支总数，并决定已执行和未执行的分支的数量。全部未覆盖：所有分支均未执行，红色标志部分覆盖：部分分支被执行，黄色标志全覆盖：所有分支均已执行，绿色标志
### 指令覆盖
指令覆盖最小单元是 Java 字节码指令，指令覆盖率提供了代码是否被执行的信息，它为执行/未执行代码提供了大量的信息。
### 圈复杂度
在（线性）组合中，计算在一个方法里面所有可能路径的最小数目。可以作为度量单元测试是否完全覆盖所有场景的一个依据。
## 代码覆盖率意义
分析未覆盖部分的代码，反推测试设计是否充分，没有覆盖到的代码是否存在测试设计盲点。
## 覆盖率的误区
代码如下：
```java

if (i > 100)
	j = 10 / i          // 没有除零错误
else
	j = 10 / (i + 2)    // i==-2除零错误
```
覆盖两个分支只需 i == 101 和 i == 1 ，但对于找到 i == -2 没有作用。
```
1. 不要简单的追求高的代码覆盖率
2. 高覆盖测试用例不等于测试用例有用
3. 没覆盖的分支相当于该分支上的任何错误肯定都测不到
```
## JaCoCo原理
JaCoCo 使用插桩的方式来记录覆盖率数据，是通过一个 probe 探针来注入，插桩模式有两种：
### on-the-fly 模式
JVM 中通过-javaagent 参数指定特定的 jar 文件启动 Instrumentation 的代理程序，代理程序在通过 Class Loader 装载一个 class 前判断是否转换修改 class 文件，将统计代码插入 class，测试覆盖率分析可以在 JVM 执行测试代码的过程中完成。
### offline 模式
在测试之前先对文件进行插桩，生成插过桩的 class 或 jar 包，测试插过桩的 class 和 jar 包，生成覆盖率信息到文件，最后统一处理，生成报告。
### on-the-fly 和 offline 对比
on-the-fly 更方便简单，无需提前插桩，无需考虑 classpath 设置问题。
### 不适合使用 on-the-fly 模式
1. 不支持 javaagent
2. 无法设置 JVM 参数
3. 字节码需要被转换成其他虚拟机
4. 动态修改字节码过程和其他 agent 冲突
5. 无法自定义用户加载类
## IDE集成
### 配置Code Coverage
1. 选择 Edit Configurations
2. 选择 Code Coverage，再选择 JaCoCo
3. 选择 Run with Coverage
### 查看报表
Class表示类覆盖率，Method表示方法覆盖率，Line表示行覆盖率
## 命令行执行
1. 下载Jacoco包，解压缩
2. 启动
	```
	java -javaagent:jacocoagent.jar=includes=*,output=tcpserver,port=6300,address=localhost,append=true -jar demo-0.0.1.jar
	#demo-0.0.1.jar为被测项目jar包
	```
3. 测试完毕后，使用cli包dump生成exec文件
	```
	java -jar cli-0.8.7.jar dump --address 127.0.0.1 --port 6300 --destfile jacoco-demo.exec
	# --address 127.0.0.1 --port 6300 指向jacocoagent启动IP和端口
	# jacoco-demo.exec 为生成exec文件名
	```
4. cli包将exec文件生成report报表
	```
	java -jar cli-0.8.7.jar report jacoco-demo.exec --classfiles D:\code\devops\SBD\target\classes --sourcefiles D:\code\devops\SBD\src\main\java --html html-report --xml report.xml --encoding=utf-8
	#--sourcefiles 和 --classfiles 为本地被测项目源码和字节码路径
	```
5. 打开report文件下index.html，查看报告，Cov表示覆盖率；表格列依次是：元素、未覆盖字节码行数、未覆盖的分支数；圈复杂度、行、方法、类
6. 覆盖率标识
	- 条件覆盖：红钻：表示未覆盖；黄钻：表示部分覆盖；绿钻：表示全部覆盖；
	- 行覆盖：全覆盖（绿色），未覆盖（红色），半覆盖（黄色），无视（白色）
## 参考
1. [https://www.jacoco.org/jacoco/](https://www.jacoco.org/jacoco/)