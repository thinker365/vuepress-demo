[[toc]]
## 查找
### 顺序查找
时间复杂度：O(n)
```python
def sequential_search(array, value):
    for index, item in enumerate(array):
        if item == value:
            return index
    return -1

if __name__ == '__main__':
    array = [1, 2, 3]
    value = 5
    # value = 3
    print(sequential_search(array, value))
```
### 二分查找(列表必须有序)
时间复杂度：O(logn)
```python
def binary_search(array, value):
    left = 0
    right = len(array) - 1
    while left <= right:
        mid = (left + right) // 2
        if array[mid] == value:
            return mid
        elif array[mid] > value:
            right = mid - 1
        else:
            left = mid + 1
    return -1

if __name__ == '__main__':
    array = [item for item in range(1, 10)]
    print(binary_search(array, 6))
    print(binary_search(array, 66))
```
### python内置查找函数index()
```python
array = [item for item in range(1, 10)]
print(array.index(8))
```
## 链表
### 单链表
#### 定义链表
```python
class Node:
    def __init__(self, item):
        self.item = item
        self.next = None
```
#### 创建链表
1. 头插法
```python
def create_node_by_head(array):
    head = Node(array[0])
    for item in array[1:]:
        node = Node(item)
        node.next = head
        head = node
    return head
```
2. 尾插法
```python
def create_node_by_tail(array):
    head = Node(array[0])
    tail = head
    for item in array[1:]:
        node = Node(item)
        tail.next = node
        tail = node
    return head
```
#### 链表遍历
```python
def traverse_linked_list(node):
    while node:
        print(node.item, end='\t')
        node = node.next

if __name__ == '__main__':
    array = [1, 7, 2, 3, 9, 4, 5]
    node = create_node_by_tail(array)
    traverse_linked_list(node)
```
#### 反转链表
```python
def reverse_linked_list(head):
    dummy = ListNode()
    while head:
        tmp = head.next  # 暂存
        head.next = dummy.next
        dummy.next = head
        head = tmp  # 移动
    return dummy.next
```
### 双链表
#### 定义链表
```python
class Node:
    def __init__(self, item):
        self.item = item
        self.next = None
        self.prev = None
```
## 队列（先进先出）
```
from collections import deque


class Queue:
    def __init__(self):
        self.items = deque()

    def append(self, value):
        return self.items.append(value)

    def pop(self):
        return self.items.popleft()

    def empty(self):
        return len(self.items) == 0
```
## 栈（先进后出）
```
from collections import deque


class Stack:
    def __init__(self):
        self.items = deque()

    def append(self, value):
        return self.items.append(value)

    def pop(self):
        return self.items.pop()

    def empty(self):
        return len(self.items) == 0
```
## 字典&集合
## 二叉树
```
class BinaryTreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None


class Solution:
    def pre_order_traversal(self, root):
        """前序遍历"""
        if root:
            result = [root.data]
            self.pre_order_traversal(root.left)
            self.pre_order_traversal(root.right)
            return result

    def middle_order_traversal(self, root):
        """中序遍历"""
        if root:
            self.middle_order_traversal(root.left)
            result = [root.data]
            self.middle_order_traversal(root.right)
            return result

    def post_order_traversal(self, root):
        """后序遍历"""
        if root:
            self.post_order_traversal(root.left)
            self.post_order_traversal(root.right)
            result = [root.data]
            return result


if __name__ == '__main__':
    root = BinaryTreeNode(1)
    root.left = BinaryTreeNode(2)
    root.right = BinaryTreeNode(3)
    root.left.left = BinaryTreeNode(4)
    root.left.right = BinaryTreeNode(5)
    root.right.left = BinaryTreeNode(6)
    root.right.right = BinaryTreeNode(7)
    s = Solution()
    print(s.pre_order_traversal(root))
```
## 堆
## 排序
### 冒泡排序
时间复杂度O(n²)
```python
def bubble_sorted(array):
    """
    :param 输入乱序数组
    :return 已排序数组
    """
    length = len(array)
    for i in range(length - 1):
        flag = False
        for j in range(length - 1 - i):
            if array[j] > array[j + 1]:
                flag = True
                array[j], array[j + 1] = array[j + 1], array[j]
        if not flag:
            break
    return array


if __name__ == '__main__':
    print(bubble_sorted([1, 2, 2, 7, 3, 9, 4, 6, 5]))
```
### 选择排序
不推荐解法
```python
# 缺点，会开辟新空间
def select_sort(array):
    tmp_list = []
    for _ in range(len(array)):
        min_item = min(array)  # O(n)复杂度，也是需要遍历
        tmp_list.append(min_item)
        array.remove(min_item)  # O(n)复杂度，也是需要遍历
    return tmp_list

if __name__ == '__main__':
    array = [1, 7, 2, 3, 9, 4, 5]
    print(select_sort(array))
```
推荐解法
```python
"""
一趟排序记录最小值，放第一个位置
下一趟在无序区选择最小值，放第二个位置
......
"""
def select_sort(array):
    for i in range(len(array) - 1):
        min_index = i
        for j in range(i + 1, len(array)):
            if array[j] < array[min_index]:
                min_index = j
        array[i], array[min_index] = array[min_index], array[i]
    return array

if __name__ == '__main__':
    array = [1, 7, 2, 3, 9, 4, 5]
    print(select_sort(array))
```
### 快速排序
```python
def quick_sorted(array):
    """
    :param 输入乱序数组
    :return 已排序数组
    """
    length = len(array)
    if length < 2:
        return array
    pivot = array.pop()
    greater = []
    lesser = []
    for element in array:
        (greater if element > pivot else lesser).append(element)
    return quick_sorted(lesser) + [pivot] + quick_sorted(greater)


if __name__ == '__main__':
    print(quick_sorted([1, 2, 2, 7, 3, 9, 4, 6, 5]))
    print(quick_sorted([1]))
    print(quick_sorted([1, 2]))
    print(quick_sorted([2, 1]))
```
### 归并排序
```python
def merge_sorted(array):
    def merge(left, right):
        def _merge():
            while left and right:
                yield (left if left[0] < right[0] else right).pop(0)
            yield from left
            yield from right

        return list(_merge())

    if len(array) <= 1:
        return array
    mid = len(array) // 2
    return merge(merge_sorted(array[:mid]), merge_sorted(array[mid:]))
if __name__ == '__main__':
    print(merge_sorted([1, 2, 2, 7, 3, 9, 4, 6, 5]))
```
## 堆排序
