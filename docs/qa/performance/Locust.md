[[toc]]

## 前置
性能测试-（脚本、场景、监控、压测、分析、调优、报告）
## LR、Jmeter、Locust工具差异
以打开百度首页为例，假如一次Hit共发出20个请求（动态资源+静态资源）
LR可以完全模拟出20个请求，Jmeter能打开部分请求，Locust只能打开一个请求
单独压测接口的压力比压测整个页面的压力对服务器的压力大
## 思考
用户体验好，工具得到的性能指标差，为什么？
答：用户的资源下载通道多于工具的请求下载通道
用户体验差，工具得到的性能指标好，为什么？
答：工具仅包括接口响应，用户体验包括页面渲染+接口
## 性能测试本质
用户：线程（Jmeter、LR）、协程（Locust），线程不等于用户，关注TPS，而不是用户数
场景：模拟真实的场景（业务模型），最难
协议：

## 场景设计
@task(3)
weight = 3
wait_time = constant(1)

## 压力环境
网络环境：压力机与服务器之间的带宽（iperf3）
## 参考文档
- [https://cloud.tencent.com/developer/article/1594240](https://cloud.tencent.com/developer/article/1594240)
- [https://docs.locust.io/en/stable/index.html](https://docs.locust.io/en/stable/index.html)