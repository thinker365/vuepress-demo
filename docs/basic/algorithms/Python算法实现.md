[[toc]]

## 链表
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
    def __init__(self, data=None, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right


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
## 冒泡排序
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
## 快速排序
## 归并排序
## 堆排序
## 二分查找
