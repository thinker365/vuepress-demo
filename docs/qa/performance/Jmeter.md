[[toc]]
## 官方文档
1. [https://jmeter.apache.org/index.html](https://jmeter.apache.org/index.html)
## BeanShell
1. [https://github.com/beanshell/beanshell/wiki](https://github.com/beanshell/beanshell/wiki)
	```java
	import org.json.JSONObject;
	String res = prev.getResponseDataAsString();
	JSONObject jsonstr = new JSONObject(res);
	String msg = jsonstr.getString("msg");
	vars.put("beanshell_msg",msg);
	```
	```java
	import java.util.HashMap;
	HashMap hm = new HashMap();
	hm.put("key","value");
	return hm.get("key");

	log.info("log info level");
	log.debug("log debug level");
	log.error("log error level");

	log.info("code is  "+prev.getResponseCode());
	log.info("response is "+prev.getResponseDataAsString());
	log.info("content_type  "+prev.getContentType());
	log.info("header "+prev.getRequestHeaders());
	```

## 插件
1. [https://jmeter-plugins.org/wiki/Start/](https://jmeter-plugins.org/wiki/Start/)
