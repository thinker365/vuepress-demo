[[toc]]

## Numpy
### 简介
Numpy是python语言的一个扩展程序库，支持大量的维度数组与矩阵运算，针对数组运算提供大量的数学函数库。是一个运行速度非常快的数学库，主要用于数组计算。
### 优势
1. 对于同样数值计算任务，使用numpy比直接使用python代码便捷
2. numpy中的数组存储效率和输入输出性能均远远优于python中等价的基本数据结构
3. numpy大部分代码是C语言写的，其底层算法在设计时就有着优异的性能，使numpy比纯python代码高效得多
### 安装
```python
pip install numpy
```
### Ndarray对象介绍
numpy最重要的一个特点是其N维数组对象ndarray，它是一系列同类型数据的集合
### 数组的基本使用
1. numpy数据类型
2. 数据类型对象dtype
3. 创建数据类型对象
```python
dt = np.dtype(np.int32)
print(dt)
print(type(dt))

dt = np.dtype('i4')
print(dt)
print(type(dt))

student = np.dtype([('name', 'S20'), ('age', 'i4'), ('marks', 'f4')])
print(student)
print(type(student))
```
4. 创建ndarray数组对象
numpy默认ndarray的所有元素类型是相同的，如果传入的元素包含不同的类型，则统一为同一类型，优先级str>float>int，比如出现了str和int类型的数据，均转为str类型
```python
import numpy as np

# 创建一维数组
array1 = np.array([1, 2, 3, 4])
print(array1)
print(type(array1))

# 按类型优先级转换
array2 = np.array([1, 2, 3, 4.0])
print(array2)

# 创建多维数组
array3 = np.array(
    [[1, 2, 3],
     [4, 5, 6],
     [7, 8, 9]]
)
print(array3)

# 最小维度
array4 = np.array([1, 2, 3], ndmin=2)
print(array4)

# dtype参数
array5 = np.array([1, 2, 3], dtype=float)
print(array5)

# dtype参数
array6 = np.array([1, 2, 3], dtype='f')
print(array6)

# 结构化数据类型
student = np.dtype([('name', 'S20'), ('age', 'i4'), ('marks', 'f4')])
array7 = np.array([('liulinyuan', 18, 99)], dtype=student)
print(array7)
```
```python
import numpy as np

array1 = np.asarray([1, 2, 3])
print(array1)

array2 = np.asarray((1, 2, 3))
print(array2)

array3 = np.asarray([(1, 2, 3), (4, 5)], dtype=object)
print(array3)

array4 = np.asarray([1, 2, 3], dtype=float)
print(array4)

array5 = np.asarray([1, 2, 3], dtype='f')
print(array5)
```
```python
import numpy as np

array1 = np.empty([3, 2], dtype=int)
print(array1)
```
```python
import numpy as np

array1 = np.zeros(5, dtype=float)
print(array1)

array2 = np.zeros([3, 2], dtype=int)
print(array2)

array3 = np.zeros([3, 2], dtype=[('x', 'i4'), ('y', 'f')])
print(array3)
```
```python
import numpy as np

array1 = np.ones([3, 2], dtype=float)
print(array1)
```
```python
import numpy as np

array1 = np.full([3, 2], fill_value=666, dtype=float)
print(array1)
``` 
```python
import numpy as np

array1 = np.eye(10, dtype=float)
print(array1)
```
```python
import numpy as np

array1 = np.arange(1, 11, 1, dtype=int)
print(array1)
```
```python
import numpy as np

str1 = b'liulinyuan is a awesome man'
array1 = np.frombuffer(str1, dtype='S3', count=5, offset=3)
print(array1)
```
```python
import numpy as np

a = [1, 2, 3, 4]
array1 = np.fromiter(a, dtype='f')
print(array1)
```
```python
import numpy as np

array1 = np.linspace(1, 100, 10, dtype=int)
print(array1)

array2 = np.logspace(1, 100, 10, dtype=int,base=2)
print(array2)
```
5. 
### 
## Pandas
## Matplotlib
## Scipy
## 参考
1. [B站Numpy](https://www.bilibili.com/video/BV1DV4y1E73X/?p=6&spm_id_from=pageDriver&vd_source=d948c3ea5db698dfc7eaf6475aee38a0)