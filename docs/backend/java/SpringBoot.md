[[toc]]
## 搭建项目
### 环境
1. Java1.8
2. maven3.6
### 创建项目
1. 注意选择springboot2.x版本
2. 更改maven源
### 开发环境热部署
1. 插件：spring-boot-devtools
2. 自动监听classpath下文件变动，触发restart类加载
3. 选择加载，spring.devtools.restart.exclude指定不加载的内容
```java
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-devtools</artifactId>
	<optional>true</optional>
</dependency>
```
```
spring.devtools.restart.enabled=true
spring.devtools.restart.additional-paths=src/main/java
spring.devtools.restart.exclude=src/main/resources/static/**
```

## 异常
### 启动Springboot项目时候报错
```java
java: 无法访问org.springframework.boot.SpringApplication
错误的类文件: /D:/Maven/apache-maven-3.6.3/repository/org/springframework/boot/spring-boot/3.0.0/spring-boot-3.0.0.jar!/org/springframework/boot/SpringApplication.class
类文件具有错误的版本 61.0, 应为 52.0

Java版本1.8，调整了springboot版本，由3.0--》2.7.6
```
### 使用swagger，启动报错
```
spring.mvc.pathmatch.matching-strategy=ant_path_matcher
```
### mybatis JDBC异常，版本不同，驱动不同
```
spring.datasource.driver-class-name=com.mysql.jdbc.Driver MySQL5
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver MySQL8
```
### Cannot determine value type from string
实体添加无参构造器

## 环境
### MySQL
1. ssh ubuntu@175.178.125.91
2. [https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-getting-started.html#docker-starting-mysql-server](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-getting-started.html#docker-starting-mysql-server)
docker run -itd --restart always -p 3306:3306 -e MYSQL_DATABASE="mydb" -e MYSQL_ROOT_PASSWORD="**" -e MYSQL_USER="thinker" -e MYSQL_PASSWORD="**"  mysql
## 备注
1. Mybatis-plus只是对单表查询做了增强，多表查询还是Mybatis
2. 不要同时导入Mybatis-plus和Mybatis，可能存在版本差异问题

## 参考
1. [https://www.yuque.com/atguigu/springboot](https://www.yuque.com/atguigu/springboot)
2. [https://www.bilibili.com/video/BV19K4y1L7MT/?p=4&spm_id_from=pageDriver&vd_source=d948c3ea5db698dfc7eaf6475aee38a0](https://www.bilibili.com/video/BV19K4y1L7MT/?p=4&spm_id_from=pageDriver&vd_source=d948c3ea5db698dfc7eaf6475aee38a0)
3. [https://docs.spring.io/spring-boot/docs/current/reference/html/documentation.html#documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/documentation.html#documentation)
4. [https://mvnrepository.com/](https://mvnrepository.com/)
5. [mybatis-plus](https://baomidou.com/)
6. [https://github.com/baomidou/awesome-mybatis-plus](https://github.com/baomidou/awesome-mybatis-plus)