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
- 官方文档参考
[mongodb官方文档](https://www.mongodb.com/docs/manual/)
[python操作mongodb](https://pymongo.readthedocs.io/en/stable/tutorial.html)