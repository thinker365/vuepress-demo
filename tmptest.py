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

# from functools import wraps
#
# # 避免每次send激活生成器
# def coroutine(func):
#     @wraps(func)
#     def primer(*args, **kwargs):
#         gen = func(*args, **kwargs)
#         next(gen)
#         return gen
#
#     return primer
#
# l1 = [1, 2]
# l2 = [3, 4]
# l3 = (5, 6)
# print(l1 + l2 + l3)
# l1.extend(l2)
# print(l1)
# import itertools
#
# x = itertools.chain(range(4), [1, 2], [3, 4], (6, 7))
# print(list(x))
#
# x = [{"a": 1}, {"a": 2}, {"a": 3}]
# xx = itertools.groupby(x, lambda y: y['a'] <= 2)
# for flag, group in xx:
#     print(flag, list(group))
#
# x = itertools.permutations(range(3), 2)
# print(list(x))
#
# x = itertools.combinations(range(3), 2)
# print(list(x))
#
# x = itertools.combinations_with_replacement(range(3), 2)
# print(list(x))
#
# x = itertools.compress(range(3), (True, True))
# print(list(x))
#
# x = itertools.count(start=10, step=2)
# print(list(itertools.islice(x, 0, 20, 10)))
#
# print(list(map(lambda x, y: x + y, range(5), range(5))))
#
# print(list(map(lambda x: x , [1, 2, 3])))

#
# from websocket import WebSocket
#
# ws = WebSocket('ws://echo.websocket.org')
# print('send')
# ws.send('hello')
# result = ws.recv()
# print('return-->', result)

# class Node:
#     def __init__(self, data, next_node=None):
#         self.data = data
#         self.next_node = next_node
#
#
# class SingleLinkedList:
#     def __init__(self):
#         self.head = None
#
#     def find_by_value(self, value):
#         p = self.head
#         while p and p.data != value:
#             p = p.next_node
#         return p
from requests import head

#
#
# def sequential_search(array, value):
#     for index, item in enumerate(array):
#         if item == value:
#             return index
#     return -1
#
#
# def binary_search(array, value):
#     left = 0
#     right = len(array) - 1
#     while left <= right:
#         mid = (left + right) // 2
#         if array[mid] == value:
#             return mid
#         elif array[mid] > value:
#             right = mid - 1
#         else:
#             left = mid + 1
#     return -1


# # 缺点，会开辟新空间
# def select_sort(array):
#     tmp_list = []
#     for _ in range(len(array)):
#         min_item = min(array)  # 非O(1)复杂度，也是需要遍历
#         tmp_list.append(min_item)
#         array.remove(min_item)  # 非O(1)复杂度，也是需要遍历
#     return tmp_list

# def select_sort(array):
#     for i in range(len(array) - 1):
#         min_index = i
#         for j in range(i + 1, len(array)):
#             if array[j] < array[min_index]:
#                 min_index = j
#         array[i], array[min_index] = array[min_index], array[i]
#     return array
#
#
# class Node:
#     def __init__(self, item):
#         self.item = item
#         self.next = None
#         self.prev = None
#
#
# def create_node_by_head(array):
#     head = Node(array[0])
#     for item in array[1:]:
#         node = Node(item)
#         node.next = head
#         head = node
#     return head
#
#

#
#

#
#
# def insert_node(item):
#     node = Node(item)
#     node.next = node.next.next
#     return node
#
#
# class BinaryTreeNode:
#     def __init__(self, data):
#         self.data = data
#         self.left = None
#         self.right = None
#
# def reverse_linked_list():
#     dummy = Node()
#
#
#
#
# if __name__ == '__main__':
#     array = [1, 7, 2, 3, 9, 4, 5]
#     node = create_node_by_tail(array)
#     traverse_linked_list(node)


# class ListNode:
#     def __init__(self, data=0, next=None):
#         self.data = data
#         self.next = next


# def create_node_by_tail(array):
#     head = ListNode(array[0])
#     tail = head
#     for item in array[1:]:
#         node = ListNode(item)
#         tail.next = node
#         tail = node
#     return head
#
#
# # 通过定义假头和新链表
# def reverse_linked_list(head):
#     dummy = ListNode()
#     while head:
#         tmp = head.next  # 暂存
#         head.next = dummy.next
#         dummy.next = head
#         head = tmp  # 移动
#     return dummy.next
#
#
# def traverse_linked_list(node):
#     while node:
#         print(node.data, end='\t')
#         node = node.next
#
#
# if __name__ == '__main__':
#     head = create_node_by_tail([item for item in range(10)])
#     node = reverse_linked_list(head)
#     traverse_linked_list(node)

#
# a = [item for item in range(100)]
# import sys
# for item in a:
#     c = item
#     print(sys.getrefcount(c))

# def multipliers():
#     return [lambda x: i * x for i in range(4)]
#
#
# print(multipliers())
import time
start = time.time()
array = [item for item in range(20000)]
print(list([ele for ele in range(len(array))][index:index+3] for index in range(0, len(array), 3)))
end = time.time()
print(end-start)

