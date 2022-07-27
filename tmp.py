"""
作者: liulinyuan
时间: 2022/7/27/0027 22:00
文件: tmp.py
"""


class People:
    """
    python魔术方法
    """

    def __new__(cls, *args, **kwargs):
        """
        创建对象
        :param args:
        :param kwargs:
        """
        print('调用父类的__new__()方法创建对象，开辟内存空间')
        instance = super().__new__(cls)
        print('将创建的地址空间对象返回，交给__init__方法接收')
        return instance

    def __init__(self, name):
        """
        实例化对象
        """
        print('在__new__方法返回的内存空间地址中放置name属性')
        self.name = name

    def __call__(self, *args, **kwargs):
        """
        对象作为函数调用时的逻辑
        :param args:
        :param kwargs:
        :return:
        """
        print(f'__call__方法，接受到的参数：{args, kwargs}')

    def __del__(self):
        """
        删除对象
        :return:
        """
        print('__del__析构方法，删除对象，释放内存空间')

    def __str__(self):
        """
        自定义print(对象名)时的输出内容
        :return:
        """
        return f'对象的name是：{self.name}'


if __name__ == '__main__':
    p = People('thinker365')
    p('a', b=1)
    print(p)

