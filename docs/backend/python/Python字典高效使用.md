[[toc]]

## in关键字检查key是否存在
```python
d = {'name': 'linyuan'}
if 'name' in d:
    print(d['name'])
```
## 用get获取字典中的值
```python
d = {'name': 'linyuan'}
print(d.get('name', 'default'))
```
## 用setdefault为字典中不存在的key设置缺省值
```python
data = [
    ("animal", "bear"),
    ("animal", "duck"),
    ("plant", "cactus"),
    ("vehicle", "speed boat"),
    ("vehicle", "school bus")
]

groups = {}
for key, value in data:
    groups.setdefault(key, [].append(value)
print(groups)

setdefault 的作用是：
如果 key 存在于字典中，那么直接返回对应的值，等效于 get 方法
如果 key 不存在字典中，则会用 setdefault 中的第二个参数作为该 key 的值，再返回该值
默认为[]，向列表里面append value
```
## 用defaultdict初始化字典对象
```python
data = [
    ("animal", "bear"),
    ("animal", "duck"),
    ("plant", "cactus"),
    ("vehicle", "speed boat"),
    ("vehicle", "school bus")
]

from collections import defaultdict

groups = defaultdict(list)
for key, value in data:
    groups[key].append(value)
print(groups)

当 key 不存在于字典中时，list 函数将被调用并返回一个空列表赋值给 d[key]
```
## 用fromkeys将列表转换成字典
```python
keys = {'a', 'e', 'i', 'o', 'u'}
value = ['wa']
d = dict.fromkeys(keys, value)
print(d)
```
## 用字典实现switch...case语句
```python
keys = {'a', 'e', 'i', 'o', 'u'}
value = ['wa']
d = dict.fromkeys(keys, value)
print(d)
```
## 用字典实现switch...case语句
```python
data = {
    0: "zero",
    1: "one",
    2: "two",
}
print(data.get(1, "nothing"))
```
## 使用 iteritems 迭代字典中的元素
```python
data = {
    0: "zero",
    1: "one",
    2: "two",
}
for key, value in data.items():
    print(key, value)
```
等价于Python2中的iteritems
## 使用字典推导式
```python
numbers = [1, 2, 3]
d = {number: number * 2 for number in numbers}
print(d)
```