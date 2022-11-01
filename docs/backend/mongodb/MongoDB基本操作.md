[[toc]]

## 基本操作
1. 进入mongo控制台
	- mongo
2. 显示所有数据库
	- show dbs
3. 切换数据库
	- use db
4. 显示当前数据库表
	- show tables
5. 查看表
	- db.table.find()
6. 删除表
	- db.table.drop()
7. 增加表
	- db.table.insert()
8. 退出
	- quit()
9. 导出数据
	- mongoexport --db=users --collection=contacts --type=csv --fields=name,address --out=/opt/backups/contacts.csv
10. 导入数据
	- mongoimport --db=users --collection=contacts --file=contacts.json
## 练习
1. show collections
2. use db
3. db.colleciton.find().pretty()
4. db.colleciton.find({"ipAddr" : "114.233.219.40"}).pretty() # 按字段查询
5. db.colleciton.find().count() # 统计总数
6. db.colleciton.find({"ipType" : "IPv6"}).count() # 按字段统计
7. db.colleciton.update({'ipAddr':'114.233.219.40'},{$set:{"timestamp" : 1666002002}})
8. db.colleciton.update({'ipAddr':'114.233.219.40'},{$set:{"attackType" : {"恶意采集" : 3,"恶意扫描" : 900,"恶意扫描" : 900}}})
9. db.colleciton.update({'ipAddr':'114.233.219.40'},{$set:{"tags" : ["xxx"]}})
10. db.colleciton.update({"_id" : ObjectId("6347ed3de516f39e7d59f640")},{$set:{"proxy" : 10}})
11. db.colleciton.update({"_id" : ObjectId("6347ed3de516f39e7d59f640")},{$set:{"tor" : 0}})
12. db.colleciton.update({"_id" : ObjectId("6347ed3de516f39e7d59f640")},{$set:{"idc" : 20}})
13. db.colleciton.update({"_id" : ObjectId("6347ed3de516f39e7d59f640")},{$set:{"tor" : 30}})
14. db.colleciton.update({"_id" : ObjectId("6347ed3de516f39e7d59f640")},{$set:{"baseStation" : 40}})
15. db.colleciton.update({"_id" : ObjectId("6347ed3de516f39e7d59f640")},{$set:{"hacker" : 50}})
16. db.colleciton.update({"_id" : ObjectId("6347ed3de516f39e7d59f640")},{$set:{"recentActivity" : 60}})
17. db.colleciton.find({},{'__typeName':1,'_id':0}) # 显示一个字段的所有值
18. db.colleciton.distinct('__typeName') #字段值去重
19. db.colleciton.deleteMany ({});清空数据
20. db.colleciton.findOne();    查一条记录
21. db.colleciton.find().limit(3).pretty() 
## 官方文档参考
[mongodb官方文档](https://www.mongodb.com/docs/manual/)
[python操作mongodb](https://pymongo.readthedocs.io/en/stable/tutorial.html)