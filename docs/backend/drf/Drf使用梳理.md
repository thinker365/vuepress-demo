[[toc]]

## APIView
```python
class XView(APIView):
    def get(self,request,*args,**kwargs):
        #x_list = models.x.objects.first() #单条数据
        #ser = XModelSerializer(instance = x_list,many=False)
        x_list = models.x.objects.all()
        ser = XModelSerializer(instance = x_list,many=True)
        return Response(ser.data)
    def post(self,request,*args,**kwargs):
        ser = XModelSerializer(data=request.data)
        # 自动帮助校验
        if ser.is_valid():
            # models.x.objects.create(**ser.validated_data)
            ser.save() # 自动执行上面的语句
            # 如果需要额外加字段，如下语句
            # ser.save(x_id=1)
            return Response(ser.data)
        return ser.errors
        
    def delete(self,request,*args,**kwargs):
        pass
    ...
```
```python
class XSerializer(serializer.Serializer):
    field1 = serializer.CharField()
    field2 = serializer.CharField()
    field3 = serializer.CharField()
    ...
```

```python
class XModelSerializer(serializer.ModelSerializer):
    class Meta:
        model = models.X
        fields = "__all__"
    ...
```

## 
```python
from rest_framework.generics import CreateAPIView,ListAPIView,RetrieveAPIView,UpdateAPIView,DestroyAPIView,ListCreateAPIView
```

## ListAPIView
```python
#针对单表的简单业务
class XView(CreateAPIView,ListAPIView):
    #def post(self,request,*args,**kwargs):
            #print(110)
            #super(XView, self).post(self,request,*args,**kwargs)
    serializer_class = XModelSerializer
    queryset = models.x.objects.filter(id__gt=4)
    
```

## 用户提交部分字段

```python
class XModelSerializer(serializer.ModelSerializer):
    # 新增字段
    xx = serializer.CHarField(source='id')
    yy = serializer.serializerMethodField()
    class Meta:
        model = models.X
        fields = "__all__"
    def get_yy(self.obj):
        return obj.id

```
```python
# 额外需添加字段
class XView(CreateAPIView,ListAPIView):
    serializer_class = XModelSerializer
    queryset = models.x.objects.filter(id__gt=4)
    def perform_create(self, serializer):
        serializer.save(x_id=f'{uuid.uuid4()}')
    
```
## 为什么使用基于类的视图
1. 代码复用，因为类可以继承，可以拓展，特别是将共用的功能抽象成Minxin类或者基类，避免重复造轮子。
2. DRF推荐基于类的视图（CBV） 
3. DRF提供4中CBV开发模式
	- 基础APIView类（不需要对用户的请求方法判断啦）
	- Mixins类和GenericAPI类混合使用（其实没啥，用下面这种足以）
	- 通用视图generics.*类，比如generics.ListCreateAPIView
	- 视图集ViewSet和ModelViewSet
	
## 一些TIPS
1. 通过图形化页面操作API，请将rest_framework注册到INSTALL_APPS中
2. django本身也有serializers，不只是DRF才有哦
3. REST（表述性状态转移），太容易忘记了有木有，RESTful表示符合这个约束的。三点：资源（url\uri定位资源）、表现层（json\xml表现）、状态转移（http方法）
4. Serializer和ModelSerializer，前者需要手动指定反序列化和序列化字段，后者根据模型自动生成可香了
5. 定义序列化器，只读字段需要注明（read_only=True），如id，creata_data，客户端就不能通过post、put添加修改数据
6. DRF同Django一样，支持FBV（@api_view）和CBV（复用率高，可继承，可扩展）的方式编写视图，
7. DRF统一返回Response，无需指定HttpResponse和JsonResponse
8. DRF登录页面，需将api-auth添加到urlpatterns中，访问api-auth/login

- 参考
- [https://www.bookstack.cn/read/django-rest-framework-api-guide/README.md](https://www.bookstack.cn/read/django-rest-framework-api-guide/README.md)
- [https://juejin.cn/post/6844904185163415566](https://juejin.cn/post/6844904185163415566)