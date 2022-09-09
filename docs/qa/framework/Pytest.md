[[toc]]
## 运行参数
### 命令行方式
```shell script
python -m pytest [...]
```
### main()运行
```python
pytest.main([...])
```
pytest 的参数必须放在一个list或者tuple里
### pytest参数
```shell script
pytest --help
```
:::
1. -m：标记
	- pytest提供装饰器@pytest.mark.xxx，xxx表示分组名，类和方法都可以加
	- 运行时，分组可以使用and、or分割
	- pytest -m "m1 and m2"，选中带有m1和m2标记的用例
	- pytest -m "m1 or m2"，选中带有m1或者m2标记的用例
	- pytest -m "m1 and not m2"，选中带有m1标记的用例，不运行m2标记的用例
2. -v：运行时输出详细信息
	- 不使用-v参数，运行时不会显示运行的具体测试用例名称；使用-v参数，会在console里打印出具体哪条测试用例被运行。
3. -q：简化输出信息
4. -k：指定运行用例，按照文件名、类名、方法名来模糊匹配
	- 模糊匹配，可用and，or区分，匹配范围有文件、类、函数
5. -x：出现一条case失败，就退出运行
:::
## 运行指定用例
```shell script
pytest . 执行所有当前文件夹及子文件夹的所有用例
pytest ../tests 执行与当前目录同级的tests目录及子目录的所有用例
pytest test_xx.py 执行test_xx.py文件下的所有用例
pytest test_xx.py::TestXxx 执行test_xx.py文件下TestXxx类的所有用例
pytest test_xx.py::TestXxx::test_xxx 执行test_xx.py文件下TestXxx类下test_xxx用例
```
程序中运行写法：pytest.main([模块.py::类::方法])
## 忽略用例
1. @pytest.mark.skip(reason='暂不执行')，运行时会直接忽略此条用例
2. @pytest.mark.skipif(flag==1,reason="按条件忽略")，当文件中flag!=1时，才会执行该用例
## setUp 和 tearDown
1. module级别
2. class级别
3. method级别
```python
"""
Author:liulinyuan
file:setup_teardown.py
datetime:2022/9/9 21:44
"""

"""
setup_module(module) 和 teardown_module(module) 的写法最好不要改动
当setup_module出错，teardown_module不会被执行
================================================================================
setup_class(cls) 和 teardown_class(cls) 的写法最好不要改动。
setup_class(cls) 和 teardown_class(cls) 必须以 @classmethod 装饰。
setup_class(cls) 出错，teardown_class(cls) 不会被执行。
================================================================================
setup_method(self, method) 和 teardown_method(self, method) 的写法最好不要改动。
setup_method(self, method)用例执行失败时，teardown_method(self, method) 不会被执行。
"""

def setup_module(module):
    print('setup_module')

def teardown_module(module):
    print('teardown_module')

class TestXxx:
    @classmethod
    def setup_class(cls):
        print('setup_class')

    def setup_method(self, method):
        print('setup_method')

    def test_something(self):
        print('test_something')

    def teardown_method(self, method):
        print('teardown_method')

    @classmethod
    def teardown_class(cls):
        print('teardown_class')
```
## pytest.ini
pytest的主配置文件，可破除默认pattern，灵活命名测试文件，位于项目根目录
:::
[pytest]
python_classes = *
python_files= *
python_functions = test*

*表示匹配所有
python_files，表示要匹配的测试文件
python_classes，表示要匹配的测试类
python_functions，表示要匹配的测试方法
pytest底层是使用的时glob库，可以参考[这里](https://docs.python.org/zh-cn/3/library/glob.html)
===========================================
[pytest]
markers = 
    smoke: run smoke test
    sanity: run sanity test

pytest.ini里注册标签，统一管理
用例里面仍需要打标签
===========================================
[pytest]
testpaths=tests

执行pytest时，会自动查询testpaths文件夹，如果没有设置testpaths，则会自动从当前文件夹找起
===========================================
pytest.ini还有更改默认命令行参数、指定pytest最低版本、指定忽略某目录、禁用XPASS等功能，backlog！！！
:::

## 多线程、多进程执行用例
pytest框架中提供可用于分布式执行测试用例的插件：pytest-parallel、pytest-xdist
1. pytest-parallel
	```shell script
	pip install pytest-parallel
	```
	注意，虽然最新的版本为 0.1.1，但在windows系统中需要指定安装 0.0.10 版本，否则使用 pytest-parallel 参数执行用例时会报如下错误。
	:::
	AttributeError: Can't pickle local object 'pytest_addoption.<locals>.label_type.<locals>.a_label_type'
	:::
	```shell script
	pytest --workers 2
	pytest --workers 2 --test-per-worker 3
	```
	- 说明
		- pytest-parallel 同时支持多线程、多进程两种方式执行测试用例
		- --workers n 指定运行的进程数为n，默认为1，windows系统中只能为1
		- --tests-per-worker m 指定运行的线程数为m
		- 若两个参数都指定，则表示启动n个进程，每个进程最多启动m线程执行，总线程数=进程数*线程数
		- windows系统中不支持 --workers 取其他值，即只能为1，mac或linux系统中可取其他值
		- 仅仅支持python3.6版本及以上
2. pytest-xdist
	```shell script
	pip install pytest-xdist
	```
	```shell script
	pytest -n 8
	pytest -n auto
	```
	- 说明：
		- pytest-xdist只支持多进程执行测试用例，不支持多线程执行
		- -n num，如-n 4 表示开启4个cpu进行执行测试用例
		- -n auto，表示使用与CPU内核一样多的进程来并发
		- pytest-xdist支持windows系统使用，同样也支持mac、linux
3. 总结
	- pytest-parallel 支持多线程执行用例，但在windows系统中只支持单个进程执行，即windows中只能--workers=1。
	- pytest-xdist 只支持多进程执行用例，但可以在windows系统中进行参数设置。
	- 推荐使用 pytest-parallel，因为支持多线程执行，且自动化测试项目一般会搭建在mac或linux系统中运行，--workers 可以取别的值。
## 失败重跑
1. 安装模块
	```shell script
	pip install -U pytest-rerunfailures
	```
2. 用法
	```shell script
	pytest test_xxx.py --reruns 2
	```
## 报告
### pytest-html
### allure
1. 安装
```shell script
sudo apt-add-repository ppa:qameta/allure
sudo apt-get update 
sudo apt-get install allure
```
2. 查看版本
```shell script
allure --version
```
3. 指定路径
```shell script
pytest --alluredir=./allure_reports
```
```python
pytest.main(["-m", "smoke", "--alluredir=./allure_reports"])
```
4. 生成报告
```shell script
allure serve allure_reports
```
### pywebreport
1. 安装
	```shell script
	pip install pywebreport
	备注：python版本>=3.7
	```
2. 用法
	```shell script
	pytest -q --report report.html
	可能会ImportError: cannot import name 'soft_unicode' from 'markupsafe'
	pip uninstall markupsafe
	python37 -m pip install markupsafe==2.0.1
	```
3. 参考官网：[这里](https://github.com/yongchin0821/pywebreport)