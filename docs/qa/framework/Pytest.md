[[toc]]

## 多线程、多进程执行用例
pytest框架中提供可用于分布式执行测试用例的插件：pytest-parallel、pytest-xdist
1. pytest-parallel
	- pytest-parallel 同时支持多线程、多进程两种方式执行测试用例。
	```
	pip install pytest-parallel
	```
	注意，虽然最新的版本为 0.1.1，但在windows系统中需要指定安装 0.0.10 版本，否则使用 pytest-parallel 参数执行用例时会报如下错误。
	```
	AttributeError: Can't pickle local object 'pytest_addoption.<locals>.label_type.<locals>.a_label_type'
	```
	- 参数说明
		-workers=n 指定运行的进程数为 n，默认为1，windows系统中只能为1
		-tests-per-worker=m 指定运行的线程数为 m
		- 若两个参数都指定，则表示启动n个进程，每个进程最多启动m线程执行，总线程数=进程数*线程数
		- windows系统中不支持 --workers 取其他值，即只能为1，mac或linux系统中可取其他值
1. pytest-xdist
	- pytest-xdist 只支持多进程执行测试用例，不支持多线程执行。
	```
	pip install pytest-xdist
	```
	- 参数说明：
		- n= 指定进程数，如 -n=4 表示开启4个cpu进行执行测试用例。
		- pytest-xdist支持windows系统使用，同样也支持mac、linux。
3. 总结
	- pytest-parallel 支持多线程执行用例，但在windows系统中只支持单个进程执行，即windows中只能--workers=1。
	- pytest-xdist 只支持多进程执行用例，但可以在windows系统中进行参数设置。
	- 推荐使用 pytest-parallel，因为支持多线程执行，且自动化测试项目一般会搭建在mac或linux系统中运行，--workers 可以取别的值。
