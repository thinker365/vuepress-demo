# -*- coding:utf-8 -*-
"""
作者: shuzan
时间: 2022/6/12/0012 21:42
文件: tmptest.py
"""


# for i in range(10):
#     print(i)

# a = [x for x in range(10)]
# print(a)
# a.remove(9)
# print(a)
# a.pop()
# print(a)
# a.pop(1)
# print(a)
# a.append(3)
# print(a.count(3))
# import sys
# print(sys.path)
# print(sys.modules)
# print(sys.meta_path)

# # assert 1 == True
# import queue
# print(queue.Queue)

#
# class LinkedNode:
#     def __init__(self, data):
#         self.data = data
#         self.next = None
#
#
# class Solution:
#     def reverse_linked_list(self):
#         pass
#
#
# from collections import deque
#
#
# class Stack:
#     def __init__(self):
#         self.items = deque()
#
#     def append(self, value):
#         return self.items.append(value)
#
#     def pop(self):
#         return self.items.pop()
#
#     def empty(self):
#         return len(self.items) == 0


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
