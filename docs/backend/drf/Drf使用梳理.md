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