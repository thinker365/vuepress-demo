[[toc]]

## 策略模式
- 在实际场景中，需求总是越来越多。为了更高效地实现新需求，代码需要兼顾**「可复用性」**和**「可拓展性」**。
- 关于继承与组合，**继承**可复用性高但是可拓展性差；**组合**可拓展性高，可复用性也不差。
- 策略模式以组合为主，它的核心思想是「将独立的模块组合起来」。
- 通常计划赶不上变化，想不到的需求才是常态。尽管一开始是「为了提高可复用性才用了继承结构」，但因为需求千奇百怪，继承结构经常「不能保证新的子类一定能复用父类的方法」。
- 而组合为主的代码能很好地避免这一问题。
1. 继承风格实现的代码
	```python
	class Duck:
		def quack(self):
			print('呱呱叫')

		def swim(self):
			print('会游泳')

		def fly(self):
			print('会飞')

		def display(self):
			raise NotImplementedError

	class MallardDuck(Duck):
		def display(self):
			print('外观是绿头')

	class RedheadDuck(Duck):
		def display(self):
			print('外观是红头')

	class RubberDuck(Duck):
		def quack():
			print('吱吱叫')

		def fly():
			print('不会飞，什么事都不能做')

		def display(self):
			print('外观是橡皮鸭')
	```
2. 组合风格实现的代码
	```python
	class QuackBehavior:
    def quack(self):
        raise NotImplementedError


	class Quack(QuackBehavior):
		def quack(self):
			print('咕咕叫')


	class FlyBehavior:
		def fly(self):
			raise NotImplementedError


	class FlyWithWings(FlyBehavior):
		def fly(self):
			print('用翅膀儿飞')


	class FlyNoWay(FlyBehavior):
		def fly(self):
			print('不会飞，囧')


	class Duck:
		def __init__(self):
			self.flybehavior = None
			self.quackbehavor = None

		def fly_type(self):
			self.flybehavior.fly()

		def quack_type(self):
			self.quackbehavor.quack()

		def swim(self):
			print('会游泳')

		def display(self):
			raise NotImplementedError


	class MiniYellowDuck(Duck):
		def __init__(self):
			self.flybehavior = FlyWithWings()
			self.quackbehavor = Quack()

		def display(self):
			print('小黄鸭')


	class DonaldDuck(Duck):
		def __init__(self):
			self.flybehavior = FlyNoWay()
			self.quackbehavor = Quack()

		def display(self):
			print('唐老鸭')


	if __name__ == '__main__':
		yellow_duck = MiniYellowDuck()
		yellow_duck.display()
	```
## 观察者模式（处理一对多关系）
- 一对多关系中的对象有两部分，「主题（Subject）」 和 「观察者（Observer）」。在一对多关系中，「一个主题会影响所有观察者」。
- 观察者模式通过在对象之间定义一对多的依赖，使得「当一个对象改变状态时，依赖它的对象会收到通知并自动更新」。
- 观察者模式中，主题（Subject）和观察者（Observer）的职责分工很明确。
	- 主题负责存储并更新状态、管理观察者
	- 观察者负责自身的自动更新
- 观察者模式一般被用来处理对象之间的一对多关系。实现观察者模式：
	- 「实现一个主题」，主题有注册、删除等管理观察者的功能，以及通知所有观察者的功能；
	- 「分别实现每个观察者」，每个观察者需要有统一的一个和主题交互的接口，并允许主题调用。
- 观察者模式的优点：
	- 「可拓展性强」。主题可以动态处理观察者；
	- 「主题和观察者之间是松耦合的」。它们依然可以交互，但是不需要太清楚彼此的细节。
```python
import random

class Observer:
    def __init__(self, name):
        self.name = name

    def updata(self, temperature, humidity, pressure):
        print(temperature, humidity, pressure)

    def display(self):
        pass

def get_temperature():
    return random.randint(-10, 50)

def get_humidity():
    return random.randint(100, 1000)

def get_pressure():
    return random.randint(1000, 5000)

class WeatherData:
    def __init__(self):
        self.observers = []
        self.temperature = None
        self.humidity = None
        self.pressure = None

    def register_observer(self, observer: Observer):
        self.observers.append(observer)

    def remove_observer(self, index: int):
        if index >= 0 and index < len(self.observers):
            self.observers.pop(index)

    def notity_observer(self):
        for observer in self.observers:
            observer.updata(self.temperature, self.humidity, self.pressure)

    def weather_changed(self):
        self.temperature = get_temperature()
        self.humidity = get_humidity()
        self.pressure = get_pressure()
        self.notity_observer()

if __name__ == '__main__':
    weather_data = WeatherData()
    weather_data.register_observer(Observer(name='o1'))
    weather_data.register_observer(Observer(name='o2'))
    weather_data.register_observer(Observer(name='o3'))
    weather_data.weather_changed()
```
## 装饰器模式
- 装饰者模式可以「动态地」在被装饰者之前或之后加上自己新定义的功能，而「不需要改动被装饰者代码」，给我们提供了一种有效的解决方案。
- 装饰者模式中有两个要素，「装饰者」和「被装饰者」。装饰者可以在被装饰者的行为之前或之后，加上自己的行为，对原有功能进行拓展。这样，「被装饰者的原始代码和功能并没有受到影响」。
```python
# 饮料
class Beverage:
    def __init__(self):
        pass

    def cost(self):
        return .99


# 装饰器
class Mocha:
    def __init__(self, beverage: Beverage):
        self.beverage = beverage

    def cost(self):
        return .20 + self.beverage.cost()


if __name__ == '__main__':
    b = Beverage()
    b = Mocha(b)
    print(b.cost())
```

## 工厂模式
- 关键字：「解耦」
- 介绍工厂模式的时候会连续介绍1个编程习惯和2个设计模式，分别是「简单工厂」设计习惯、「工厂方法模式」和「抽象工厂模式」。
### 简单工厂
```python
class CheesePizza:
    def prepare(self):
        pass

    def bake(self):
        pass

    def cut(self):
        pass

    def box(self):
        pass


class GreekPizza:
    def prepare(self):
        pass

    def bake(self):
        pass

    def cut(self):
        pass

    def box(self):
        pass


def create_pizza(name):
    global pizza
    if name in ['cheese']:
        pizza = CheesePizza()
    elif name in ['greek']:
        pizza = GreekPizza()
    return pizza


class PizzaStore:
    def orderPizza(self, name):
        pizza = create_pizza(name)
        pizza.prepare()
        pizza.bake()
        pizza.cut()
        pizza.box()
        return pizza
```
### 工厂方法模式
```python
class CheesePizza:
    def prepare(self):
        pass

    def bake(self):
        pass

    def cut(self):
        pass

    def box(self):
        pass


class GreekPizza:
    def prepare(self):
        pass

    def bake(self):
        pass

    def cut(self):
        pass

    def box(self):
        pass


class PizzaStore:
    def orderPizza(self, name):
        pizza = self.create_pizza(name)
        pizza.prepare()
        pizza.bake()
        pizza.cut()
        pizza.box()
        return pizza

    def create_pizza(self, name):
        raise NotImplementedError
```
### 抽象工厂模式
```
```
## 单例模式
单例模式的目标是「创建独一无二全局对象」，确保一个类只有唯一实例，并提供一个全局访问点。
### 基于装饰器
```python
class Singleton:
    def __init__(self, cls):
        self._cls = cls
        self.uniqueInstance = None

    def __call__(self, *args, **kwargs):
        if self.uniqueInstance is None:
            self.uniqueInstance = self._cls()
        return self.uniqueInstance


@Singleton
class MyClass:
    def __init__(self):
        pass


if __name__ == "__main__":
    cls1 = MyClass()
    cls2 = MyClass()
    assert id(cls1) == id(cls2)
```
### 多线程异常
```python
class Singleton:
    def __init__(self, cls):
        self._cls = cls
        self.uniqueInstance = None

    def __call__(self, *args, **kwargs):
        if self.uniqueInstance is None:
            self.uniqueInstance = self._cls()
        return self.uniqueInstance


@Singleton
class MyClass:
    def __init__(self):
        import time
        time.sleep(1)


import threading

thread_num = 2
threads = [None] * thread_num
results = [None] * thread_num


def task(index):
    obj = MyClass()
    results[index] = id(obj)


if __name__ == "__main__":
    for i in range(thread_num):
        threads[i] = threading.Thread(target=task, args=(i,))
        threads[i].start()
    print(threads)
    for j in range(thread_num):
        threads[j].join()
    print(results)
    assert results[0] == results[1]
```
### 线程加锁
```python
import threading


class Singleton:
    **_instance_lock = threading.Lock()**

    def __init__(self, cls):
        self._cls = cls
        self.uniqueInstance = None

    def __call__(self, *args, **kwargs):
        **with self._instance_lock:**
            if self.uniqueInstance is None:
                self.uniqueInstance = self._cls()
        return self.uniqueInstance


@Singleton
class MyClass:
    def __init__(self):
        import time
        time.sleep(1)


thread_num = 2
threads = [None] * thread_num
results = [None] * thread_num


def task(index):
    obj = MyClass()
    results[index] = id(obj)


if __name__ == "__main__":
    for i in range(thread_num):
        threads[i] = threading.Thread(target=task, args=(i,))
        threads[i].start()
    print(threads)
    for j in range(thread_num):
        threads[j].join()
    print(results)
    assert results[0] == results[1]
```
### 线程加锁优化
- 我们只有在第一次执行此方法时，才需要进程锁进行同步。也就是说，一但设置好self._instance变量，就不再需要进程锁了，之后的进程锁是一种累赘。而「进程锁同步效率很低，很可能降低程序性能」。
```
import threading


class Singleton:
    _instance_lock = threading.Lock()

    def __init__(self, cls):
        self._cls = cls
        self.uniqueInstance = None

    def __call__(self, *args, **kwargs):
        **if self._instance_lock is None:**
            with self._instance_lock:
                if self.uniqueInstance is None:
                    self.uniqueInstance = self._cls()
        return self.uniqueInstance


@Singleton
class MyClass:
    def __init__(self):
        import time
        time.sleep(1)


thread_num = 2
threads = [None] * thread_num
results = [None] * thread_num


def task(index):
    obj = MyClass()
    results[index] = id(obj)


if __name__ == "__main__":
    for i in range(thread_num):
        threads[i] = threading.Thread(target=task, args=(i,))
        threads[i].start()
    print(threads)
    for j in range(thread_num):
        threads[j].join()
    print(results)
    assert results[0] == results[1]
```