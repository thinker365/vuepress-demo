[[toc]]
## 下载安装
```shell script
下载：https://www.tenable.com/downloads/nessus
安装：dpkg -i Nessus-8.13.1-debian6_amd64.deb
重启：service nessusd start
```
	
## 初始化（大概几分钟）

- 浏览器访问：https://localhost:8834
- 界面选择：Managed Scanner-》Tenable.sc
- 输入账号密码

## 安装linsence和插件更新包

- 在安装服务器查询challenge值：/opt/nessus/sbin/nessuscli fetch --challenge
- 访问：https://zh-cn.tenable.com/products/nessus/nessus-essentials?tns_redirect=true
    - 系统注册，配置电子邮件
    - 查询activation code，如下：
        ```
        Activating Your Nessus Essentials License
        Your activation code for Nessus Essentials is:
        xxxx-xxxx-xxxx-xxxx-xxxx
        ```
    - 点击邮件内容offline registration instructions链接
    - 页面访问：https://plugins.nessus.org/v2/offline.php
    - 输入challenge值和activation code，提交
    - 页面点击链接下载更新包（如all-2.0.tar.gz），点击nessus.license下载Linsence

## 激活漏洞插件
```shell script
- /opt/nessus/sbin/nessuscli update all-2.0.tar.gz（前提已上传包至服务器，需要等一会儿）
```
以上更新插件会得到一串数字，用于破解，请记住！！！
[info] Copying templates version 202205311353 to /opt/nessus/var/nessus/templates/tmp
[info] Finished copying templates.
[info] Moved new templates with version 202205311353 from plugins dir.
[info] Moved new pendo client with version 21220 from plugins dir.
 * Update successful.  The changes will be automatically processed by Nessus.
```shell script
- /opt/nessus/sbin/nessuscli fetch --register-offline nessus.license
```
Your Activation Code has been registered properly - thank you.
- 完事后，重启
```shell script
service nessusd restart
```
- 访问：https://localhost:8834，等待初始化插件，大概10分钟~
- 可看到nessus初始化完成后，登录系统，license限制只支持16个IP
	
## 破解IP限制

- 先将插件临时保存
```shell script
cp -r /opt/nessus/lib/nessus/plugins /tmp/nessus（文件比较多，需等会）
```
- 创建plugin_feed_info.inc文件，内容如下：
```
//激活漏洞插件这一步获取的那串数字
PLUGIN_SET = 202205311353;
PLUGIN_FEED = "ProfessionalFeed (Direct)";
PLUGIN_FEED_TRANSPORT = "Tenable Network Security Lightning";
```
- 将plugin_feed_info.inc文件分别放在如下2个目录：
    - /opt/nessus/lib/nessus/plugins/
    - /opt/nessus/var/nessus/
    ```shell script
    cp ./plugin_feed_info.inc /opt/nessus/lib/nessus/plugins/
    cp ./plugin_feed_info.inc /opt/nessus/var/nessus/
    ```
- 重启
```shell script
service nessusd restart
```
- 重启以后会发现和之前一样，并且/opt/nessus/lib/nessus/plugins/目录下的插件都不见了！！！莫急莫急~
- 重复再将plugin_feed_info.inc拷贝到目录下：
    - /opt/nessus/lib/nessus/plugins/
    - /opt/nessus/var/nessus/
- 我再重启
```shell script
service nessusd restart
```
- 发现没有IP限制了，鼓掌~

## 完善插件
- 将之前复制的插件文件夹再拷贝回来
- 切记路径：/opt/nessus/lib/nessus/plugins/
```shell script
root@knownsec-virtual-machine:/tmp/nessus# cp -r ./ /opt/nessus/lib/nessus/plugins/plugins
```
- 重启
```shell script
service nessusd restart（要等一会儿）
```
	
## 安装谷歌浏览器

	- 下载安装包：wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
	- 下载依赖包：sudo apt-get install gdebi
	- 安装：gdebi google-chrome-stable_current_amd64.deb

## 安装中文模式

	- 安装中文插件：apt-get install ttf-wqy-microhei ttf-wqy-zenhei xfonts-wqy
	- 配置：dpkg-reconfigure locales
	- 然后空格键选中 en_US.UTF-8、zh_CN.GBK、zh_CN.UTF-8三个模式为*，然后enter
	- 确定后，将zh_CN.UTF-8 选为默认，
	- 配置默认浏览器：update-alternatives --config x-www-browser
	- 最后reboot重启
	
## 总结
	- 如果遇到无法破解还是0~16IP限制，请检查PLUGIN_SET值为前面update all-2.0.tar.gz更新获得的值！
	- 如果遇到无法破解还是0~16IP限制，或者重复执行plugin_feed_info.inc替换重启Nessus即可。
	- Nessus服务每次重启后，会重置plugin_feed_info.inc，将会使nessus/plugins目录下所有插件都被删除，无法扫描

### 参考：[https://www.freebuf.com/articles/web/262914.html]()