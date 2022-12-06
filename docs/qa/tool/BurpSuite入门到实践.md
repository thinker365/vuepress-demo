[[toc]]
## 下载
### 注册机
https://github.com/lzskyline/BurpSuitePro-2.1/blob/master/burp-keygen-scz.jar
### 启动器
https://github.com/lzskyline/BurpSuitePro-2.1/blob/master/burp-loader-x-Ai.jar
### BurpSuite
1. Intel版本：https://portswigger.net/burp/releases/download?product=pro&version=2022.3.9&type=MacOsx
2. M1版本：https://portswigger-cdn.net/burp/releases/download?product=pro&version=2022.3.9&type=MacOsArm64
## 破解
1. 将启动器burp-loader-x-Ai.jar移动到BurpSuite安装路径下的(Applications/Burp Suite Professional.app/Contents/Resources/app/)app目录
2. 注册机放那个路径无所谓，建议也放一个文件夹，方便管理
3. 编辑vmoptions.txt文件(Applications/Burp Suite Professional.app/Contents/vmoptions.txt)，末尾追加两行内
```
-noverify
-javaagent:burp-loader-x-Ai.jar
```
4. 运行注册机jar文件，java  -jar  burp-keygen-scz.jar，注册机上会显示license
![](～@img/WechatIMG21.png)
5. 打开BurpSuite软件，复制上面生成的license到app，点击next
![](～@img/WechatIMG22.png)
6. 在下一界面选择manual activation，进行手工注册，点击next
![](～@img/WechatIMG23.png)
7. app页面上出现了request，把request的内容粘贴到注册机中，会在注册机中生成response
![](～@img/WechatIMG24.png)
![](～@img/WechatIMG25.png)
8. 把注册机中的response，粘贴回app的页面，然后点击 next
![](～@img/WechatIMG26.png)
9. 提示注册成功
![](～@img/WechatIMG27.png)

## 参考
1. [https://t0data.gitbooks.io/burpsuite/content/chapter1.html](https://t0data.gitbooks.io/burpsuite/content/chapter1.html)