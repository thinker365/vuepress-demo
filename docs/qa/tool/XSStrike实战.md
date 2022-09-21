[[toc]]

## 简介
1. XSStrike一款专门针对 XSS 漏洞扫描的开源工具，是一个跨站点脚本检测套件，配备了四个手写解析器、一个智能负载生成器、一个强大的模糊测试引擎和一个非常快的爬虫。
2. XSStrike不是像所有其他工具一样注入有效载荷并检查它的工作情况，而是使用多个解析器分析响应，然后通过与模糊测试引擎集成的上下文分析来制作保证工作的有效载荷。
3. XSStrike非常有利于自己添加 XSS payload
4. XSS（Cross-site Script，跨站脚本，为了与层叠样式表CSS区分开，危害：盗号、钓鱼欺诈、篡改页面、刷广告流量、内网扫描、网页挂马、挖矿、键盘监听、窃取用户隐私等等）
## 兼容和依赖
- python版本：>=3.4
- 操作系统：Windows，Linux，mac
- 模块依赖：tld、requests、fuzzywuzzy。注意：使用 pip3 而不是 pip 来安装依赖项，pip3 install -r requirements.txt
## 下载项目工程
	[https://github.com/s0md3v/XSStrike.git](https://github.com/s0md3v/XSStrike.git)

## 用法
1. xsstrike.py -h 查看帮助，会自动打开xsstrike.py文件
2. 扫描单个url -u
	- python36 xsstrike.py -u "http://10.11.33.60:8080/contributeVul/vulDetail?id=99324"
	- python36 xsstrike.py -u "http://10.11.33.60:8080/?<body onbeforeprint=alert(4)>" --path 
	- python36 xsstrike.py -u "https://xxx.com/pages/viewpage.action?pageId=77972136"
	- python36 xsstrike.py -u "http://xss.tesla-space.com/level1.php?name=test"
7. 提供POST数据 --data
	- python36 xsstrike.py -u "http://10.11.33.60:8080/contributeVul/vulDetail" --data "id=99324"
8. url路径植入payload --path
	- python36 xsstrike.py -u "http://10.11.33.60:8080/contributeVul/vulDetail/?<body onbeforeprint=alert(4)>" --path 
10. 将POST数据视为JSON --json
	- python36 xsstrike.py -u "http://10.11.33.60:8080/contributeVul/vulDetail " --data "{"id":"99324"} --json"
	- python36 xsstrike.py -u "http://10.11.33.60:8080/contributeVul/vulDetail " --data '{"id":"99324"} --json'  (错误实例)
14. 爬虫  --crawl
	- python36 xsstrike.py -u "https://10.8.250.87/login?redirect=/app/mica/home" --crawl
15. 爬虫深度 -l 默认2
	- python36 xsstrike.py -u "https://xxx.com/pages/viewpage.action?pageId=77972136" --crawl -l 10
17. 从文件中测试/抓取url  --seeds
	- python36 xsstrike.py --seeds urls.txt
19. 来自文件的压力负载 -f
	- python36 xsstrike.py -u "https://xxx.com/pages/viewpage.action?pageId=77972136" -f ./testfile/file.txt
21. 查找隐藏参数  --params
	- python36 xsstrike.py -u "https://xxx.com/pages/viewpage.action?pageId=77972136" --params
23. 线程数 -t 默认值2
	- python36 xsstrike.py -u "https://xxx.com/pages/viewpage.action?pageId=77972136" -t 10 --crawl -l 3
25. 超时设置  --timeout 默认值7s
	- python36 xsstrike.py -u "https://xxx.com/pages/viewpage.action?pageId=77972136" --timeout=4
27. 延迟  -d 默认值0
	- python36 xsstrike.py -u "https://xxx.com/pages/viewpage.action?pageId=77972136" -d 2
29. 提供HTTP标头  --headers 可以使用\n换行
	- python36 xsstrike.py -u "https://xxx.com/pages/viewpage.action?pageId=77972136" --headers "user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36 Edg/93.0.961.52\nx-requested-with:XMLHttpRequest"
31. blind xss  --blind  在core/config.py里的xss payload，可以自定义更多
	- python36 xsstrike.py -u "https://xxx.com/pages/viewpage.action?pageId=77972136" --crawl --blind
33. 有效载荷编码 -e --encode，目前支持base64
	- python36 xsstrike.py -u "https://xxx.com/pages/viewpage.action?pageId=77972136" -e base64
35. 模糊测试 --fuzzer
	- python36 xsstrike.py -u "https://xxx.com/pages/viewpage.action?pageId=77972136" --fuzzer
	- python36 xsstrike.py -u "http://10.11.33.60:8080" --fuzzer  -l 10
39. 日志记录  
	-console-log-level 默认值级别：info
	- python36 xsstrike.py -u "http://10.11.33.60:8080/contributeVul/vulDetail?id=99324" --crawl --console-log-level WARNING
	- python36 xsstrike.py -u "http://10.11.33.60:8080/contributeVul/vulDetail?id=99324" --crawl --console-log-level DEBUG		
	-log-file  默认值：xsstrike.log
	- python36 xsstrike.py -u "https://xxx.com/pages/viewpage.action?pageId=77972136" --file-log-level INFO --log-file output.log
	- 注意：如果未指定 --file-log-level ，则此选项将不起作用
46. 使用代理 --proxy |默认 0.0.0.0:8080，在core/config.py中设置您的代理
	- python36 xsstrike.py -u "http://example.com/search.php?q=query" --proxy
47. 跳过确认提示  --skip
	- XSStrike在发现有效负载时继续扫描而不询问您是否要继续扫描
	- 它也将跳过POC生成
	- python xsstrike.py -u "http://example.com/search.php?q=query" --skip
52. 跳过DOM扫描  --skip-dom，跳过DOM XSS扫描以节省时间
	- python xsstrike.py -u "http://example.com/search.php?q=query" --skip-dom	
53. 更新  --update
	- python xsstrike.py --update
		
## 参考
1. 详细用法参考
	- https://github.com/s0md3v/XSStrike/wiki/Usage
1. payload网站
	- https://portswigger.net/web-security/cross-site-scripting/cheat-sheet
	- http://html5sec.org/
1. 样例
	- python36 xsstrike.py -u "http://181.181.181.84:8800/investigation/caseInfo?value=61e12611061cea00d12f8433" --headers "user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36 Edg/93.0.961.52\nCookie:EGG_SESS_440000=adf8b864c0535bfaee61b17f303ba175; EGG_SESS_440000.sig=2Ctnk6q-EpxVKKvcT-JuV1KAIWli8a4tiZj3buGfy0g"  --crawl --blind -l 10 --file-log-level INFO --log-file output.log

