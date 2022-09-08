[[toc]]

## 简介
1. 跨语言
2. 跨平台
3. 底层扩展强
4. 扩展后支持游戏自动化？
5. 可插入AI插件
6. 支持机械臂？？
7. 社区生态丰富强大
## 基础架构
![](~@img/appium.png)
- 说明：客户端脚本（如python脚本）通过webdriver协议发送HTTP请求到appium server，appium server统一处理后再将请求转发给各平台对应的驱动（如Android的uiautomator2），驱动API调用被测设备执行动作
## 生态工具
### ADB
adb是Android SDK下的一个工具，用来访问Android设备
### Appium Desktop
Appium Desktop内嵌Appium Server和inspector，是一个综合IDE工具
### Appium Server
1. appium真正的核心，和selenium server一样，都是服务，接受客户端请求，执行对应动作。
2. appium server官方提供的安装方法，国内基本安装不上，囧
	- 使用代理
	- 淘宝cnpm（更复杂的测试，存在bug，基本的自动化，单机自动化，没有问题）
3. 注意事项
	- 安装需访问海外服务器，慢
	- 使用root权限安装，权限问题
	- Node版本不宜太低，也不宜太高，推荐Node10
	- 安装appium时需要安装python2，因此需要本地安装，即便官方不支持python2
	- node_module的权限可能会不对，windows还需要依赖的编译工具
	- 系统环境变量PATH下需要设置ADB\Java路径
	- IOS系统还需要解决WDA编译和依赖下载问题
### Appium Client(客户端库)
Python、Java、Ruby、Robot Framework的扩展