class Array:
    """
    数组的操作
    """

    def __init__(self, capacity):
        self.data = []
        self.capacity = capacity

    def __getitem__(self, index):
        return self.data[index]

    def __setitem__(self, index, value):
        return self.data[index] == value

    def __len__(self):
        return len(self.data)

    def __iter__(self):
        for item in self.data:
            yield item

    def search(self, index):
        """
        查找元素
        :param index:
        :return:
        """
        try:
            return self.data[index]
        except IndexError:
            return -1

    def delete(self, index):
        """
        删除元素，pop默认索引是-1，即默认删除最后一个元素，remove是按值删除
        :param index:
        :return:
        """
        try:
            self.data.pop(index)
            return True
        except IndexError:
            return False

    def insert(self, index, value):
        """
        插入数据
        :param index:
        :param value:
        :return:
        """
        if len(self) >= self.capacity:
            return False
        else:
            return self.data.insert(index, value)

    def traverse(self):
        """
        遍历数组
        :return:
        """
        for item in self:
            print(item)


if __name__ == '__main__':
    array = Array(5)
    array.insert(0, 3)
    array.insert(0, 4)
    array.insert(1, 5)
    array.insert(3, 9)
    array.insert(3, 10)
    assert array.insert(0, 100) is False
    assert len(array) == 5
    assert array.search(1) == 5
    assert array.delete(4) is True
    print(array.traverse())
