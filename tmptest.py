# # -*- coding:utf-8 -*-
# """
# 作者: shuzan
# 时间: 2022/6/12/0012 21:42
# 文件: tmptest.py
# """
#
#
# # for i in range(10):
# #     print(i)
#
# # a = [x for x in range(10)]
# # print(a)
# # a.remove(9)
# # print(a)
# # a.pop()
# # print(a)
# # a.pop(1)
# # print(a)
# # a.append(3)
# # print(a.count(3))
# # import sys
# # print(sys.path)
# # print(sys.modules)
# # print(sys.meta_path)
#
# # # assert 1 == True
# # import queue
# # print(queue.Queue)
#
# #
# # class LinkedNode:
# #     def __init__(self, data):
# #         self.data = data
# #         self.next = None
# #
# #
# # class Solution:
# #     def reverse_linked_list(self):
# #         pass
# #
# #
# # from collections import deque
# #
# #
# # class Stack:
# #     def __init__(self):
# #         self.items = deque()
# #
# #     def append(self, value):
# #         return self.items.append(value)
# #
# #     def pop(self):
# #         return self.items.pop()
# #
# #     def empty(self):
# #         return len(self.items) == 0
#
#
# class BinaryTreeNode:
#     def __init__(self, data=None, left=None, right=None):
#         self.data = data
#         self.left = left
#         self.right = right
#
#
# class Solution:
#     def pre_order_traversal(self, root):
#         """前序遍历"""
#         if root:
#             result = [root.data]
#             self.pre_order_traversal(root.left)
#             self.pre_order_traversal(root.right)
#             return result
#
#     def middle_order_traversal(self, root):
#         """中序遍历"""
#         if root:
#             self.middle_order_traversal(root.left)
#             result = [root.data]
#             self.middle_order_traversal(root.right)
#             return result
#
#     def post_order_traversal(self, root):
#         """后序遍历"""
#         if root:
#             self.post_order_traversal(root.left)
#             self.post_order_traversal(root.right)
#             result = [root.data]
#             return result
#
#
# if __name__ == '__main__':
#     root = BinaryTreeNode(1)
#     root.left = BinaryTreeNode(2)
#     root.right = BinaryTreeNode(3)
#     root.left.left = BinaryTreeNode(4)
#     root.left.right = BinaryTreeNode(5)
#     root.right.left = BinaryTreeNode(6)
#     root.right.right = BinaryTreeNode(7)
#     s = Solution()
#     print(s.pre_order_traversal(root))
#
# class QuackBehavior:
#     def quack(self):
#         raise NotImplementedError
#
#
# class Quack(QuackBehavior):
#     def quack(self):
#         print('咕咕叫')
#
#
# class FlyBehavior:
#     def fly(self):
#         raise NotImplementedError
#
#
# class FlyWithWings(FlyBehavior):
#     def fly(self):
#         print('用翅膀儿飞')
#
#
# class FlyNoWay(FlyBehavior):
#     def fly(self):
#         print('不会飞，囧')
#
#
# class Duck:
#     def __init__(self):
#         self.flybehavior = None
#         self.quackbehavor = None
#
#     def fly_type(self):
#         self.flybehavior.fly()
#
#     def quack_type(self):
#         self.quackbehavor.quack()
#
#     def swim(self):
#         print('会游泳')
#
#     def display(self):
#         raise NotImplementedError
#
#
# class MiniYellowDuck(Duck):
#     def __init__(self):
#         self.flybehavior = FlyWithWings()
#         self.quackbehavor = Quack()
#
#     def display(self):
#         print('小黄鸭')
#
#
# class DonaldDuck(Duck):
#     def __init__(self):
#         self.flybehavior = FlyNoWay()
#         self.quackbehavor = Quack()
#
#     def display(self):
#         print('唐老鸭')
#
#
# if __name__ == '__main__':
#     yellow_duck = MiniYellowDuck()
#     yellow_duck.display()
#     yellow_duck.fly_type()
# import random
#
#
# class Observer:
#     def __init__(self, name):
#         self.name = name
#
#     def updata(self, temperature, humidity, pressure):
#         print(temperature, humidity, pressure)
#
#     def display(self):
#         pass
#
#
# def get_temperature():
#     return random.randint(-10, 50)
#
#
# def get_humidity():
#     return random.randint(100, 1000)
#
#
# def get_pressure():
#     return random.randint(1000, 5000)
#
#
# class WeatherData:
#     def __init__(self):
#         self.observers = []
#         self.temperature = None
#         self.humidity = None
#         self.pressure = None
#
#     def register_observer(self, observer: Observer):
#         self.observers.append(observer)
#
#     def remove_observer(self, index: int):
#         if index >= 0 and index < len(self.observers):
#             self.observers.pop(index)
#
#     def notity_observer(self):
#         for observer in self.observers:
#             observer.updata(self.temperature, self.humidity, self.pressure)
#
#     def weather_changed(self):
#         self.temperature = get_temperature()
#         self.humidity = get_humidity()
#         self.pressure = get_pressure()
#         self.notity_observer()
#
#
# if __name__ == '__main__':
#     weather_data = WeatherData()
#     weather_data.register_observer(Observer(name='o1'))
#     weather_data.register_observer(Observer(name='o2'))
#     weather_data.register_observer(Observer(name='o3'))
#     weather_data.weather_changed()

# class Student:
#     @property
#     def birth(self):
#         return self._birth
#
#     @birth.setter
#     def birth(self, value):
#         if value < 1990:
#             print("你不是90后吗")
#             self._birth = None
#         else:
#             self._birth = value
#
#     @property
#     def age(self):
#         return 2022 - self._birth
#
#
# if __name__ == '__main__':
#     quanquan = Student()
#     quanquan.birth = 1999
#     print(quanquan.age)


# from progress.bar import Bar
#
# bar = Bar('Processing', max=20)
# for i in range(20):
#     # Do some work
#     print(i)
#     bar.next()
# bar.finish()


# array = [6, 1, 2, 3, 4, 2, 2, 3, 1, 4, 4, 4, 5]
# print(max(set(array), key=array.count))

# print(.99)


# # 饮料
# class Beverage:
#     def __init__(self):
#         pass
#
#     def cost(self):
#         return .99
#
#
# # 装饰器
# class Mocha:
#     def __init__(self, beverage: Beverage):
#         self.beverage = beverage
#
#     def cost(self):
#         return .20 + self.beverage.cost()
#
#
# if __name__ == '__main__':
#     b = Beverage()
#     b = Mocha(b)
#     print(b.cost())

# class CheesePizza:
#     def prepare(self):
#         pass
#
#     def bake(self):
#         pass
#
#     def cut(self):
#         pass
#
#     def box(self):
#         pass
#
#
# class GreekPizza:
#     def prepare(self):
#         pass
#
#     def bake(self):
#         pass
#
#     def cut(self):
#         pass
#
#     def box(self):
#         pass
#
#
# class PizzaStore:
#     def orderPizza(self, name):
#         pizza = self.create_pizza(name)
#         pizza.prepare()
#         pizza.bake()
#         pizza.cut()
#         pizza.box()
#         return pizza
#
#     def create_pizza(self, name):
#         raise NotImplementedError
#
#
# class NYPizzaStore(PizzaStore):
#     def __init__(self, ingredientFactory):
#         self.ingredientFactory = ingredientFactory
#
#     def create_pizza(self, name):
#         if name in ['cheese']:
#             pizza = NYCheesePizza(self.ingredientFactory)
#         elif name in ['greek']:
#             pizza = NYGreekPizza(self.ingredientFactory)
#         return pizza

# import threading
#
#
# class Singleton:
#     _instance_lock = threading.Lock()
#
#     def __init__(self, cls):
#         self._cls = cls
#         self.uniqueInstance = None
#
#     def __call__(self, *args, **kwargs):
#         if self._instance_lock is None:
#             with self._instance_lock:
#                 if self.uniqueInstance is None:
#                     self.uniqueInstance = self._cls()
#         return self.uniqueInstance
#
#
# @Singleton
# class MyClass:
#     def __init__(self):
#         import time
#         time.sleep(1)
#
#
# thread_num = 2
# threads = [None] * thread_num
# results = [None] * thread_num
#
#
# def task(index):
#     obj = MyClass()
#     results[index] = id(obj)
#
#
# if __name__ == "__main__":
#     for i in range(thread_num):
#         threads[i] = threading.Thread(target=task, args=(i,))
#         threads[i].start()
#     print(threads)
#     for j in range(thread_num):
#         threads[j].join()
#     print(results)
#     assert results[0] == results[1]

#
# doubled_list = map(lambda x: x * 2, [item for item in range(10)])
# print(list(doubled_list))
# from functools import reduce
# summation = reduce(lambda x, y: x + y, [item for item in range(10)])
# print(summation)

# print(list(range(10)))
# print(list(filter(bool, list(range(10)))))


# results = [(i, j) for i in range(10) for j in range(i)]
# print(results)
#
#
# results = []
# for i in range(10):
#     print('i==>', i)
#     for j in range(i):
#         print(j)
#         results.append((i, j))


# from itertools import accumulate
#
# a = [3, 4, 6, 2, 1, 9, 0, 7, 5, 8]
# resutls = list(accumulate(a, max))
# print(resutls)


# BaseException

# try:
#     pass  # 可能异常的代码
# except (KeyError, ImportError, ...) as e:  # 可以捕获多个异常
#     pass  # 异常处理代码
# else:
#     pass  # 异常没发生时候的处理逻辑
# finally:
#     pass  # 无论异常是否发生，都会处理的逻辑，如资源的关闭、释放


# class MyException(Exception):
#     pass
#
#
# try:
#     raise MyException('自定义异常执行')
# except Exception as e:
#     print(e)

#
# n = [0]
# print(n[0] + 1)


# import dis
#
#
# def func():
#     l = []
#     l[0] = 1
#
#
# print(dis.dis(func))

from functools import wraps

# 避免每次send激活生成器
def coroutine(func):
    @wraps(func)
    def primer(*args, **kwargs):
        gen = func(*args, **kwargs)
        next(gen)
        return gen

    return primer
