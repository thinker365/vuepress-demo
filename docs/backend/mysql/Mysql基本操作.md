[[toc]]

## 环境搭建
```shell script
docker pull mysql
docker run --name mysql-latest -d -e MYSQL_ROOT_PASSWORD=123456 -p 3366:3306 mysql:latest
docker exec -it fe14547071d40968c2b2e95d8caf24d18e17c8f6b0ebd3bbb91524f86bd072f8 bash
mysql -uroot -p123456
mysql> select version();
mysql> create database test;
mysql> use test;
部门表
mysql> CREATE TABLE DEPT (DEPTNO int(2) not null, DNAME VARCHAR(14), LOC VARCHAR(13), primary key (DEPTNO) );
雇员表
mysql> CREATE TABLE EMP (EMPNO int(4) not null,ENAME VARCHAR(10),JOB VARCHAR(9),MGR INT(4),HIREDATE DATE DEFAULT NULL,SAL DOUBLE(7,2),COMM DOUBLE(7,2),primary key (EMPNO),DEPTNO INT(2) );
薪水表
mysql> CREATE TABLE SALGRADE (GRADE INT, LOSAL INT, HISAL INT );
mysql> show tables;
创建用户
mysql> create user 'liuly2'@'%' identified by '123456';

GRANT ALL PRIVILEGES ON *.* To 'root'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION;
```
## 基本概念
### 主键外键
1. 主键
## python操作数据库
参考：[这里](https://pymysql.readthedocs.io/en/latest/index.html)