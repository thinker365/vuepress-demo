[[toc]]

## 概念对比
1. Other DB
databases-->tables-->rows-->columns-->schema
2. Elasticsearch
indices-->types-->documents-->fields-->mapping

## 查询
### match_all
### multi_match
1. query
2. type
3. fields
### match
fields
### bool
1. must
2. filter
	- term
	- terms
	- range
		- gt
		- gte
		- lte
		- lt
3. should
4. must_not
### term/range...
## python API
```
import random
from elasticsearch import Elasticsearch

es = Elasticsearch(hosts='http://10.0.13.221:9200')
ip_fingerprint_doc = {
    "ip": '111.53.136.159',
    "tags": [random.choice(["独立IP", "CDN", "云服务"])],
}
res = es.index(index="ip_fingerprint", id=1, body=ip_fingerprint_doc)
print(res['result'])

res = es.get(index="ip_fingerprint", id=1)
print(res['_source'])

res = es.search(index="ip_fingerprint", body={"query": {"match_all": {}}})
print("Got %d Hits:" % res['hits']['total']['value'])
for hit in res['hits']['hits']:
    print(hit["_source"])

res = es.delete(index="ip_fingerprint", id=1)
print(res['result'])

res = es.delete_by_query(index="ip_fingerprint", body={
    "query": {
        "match": {
            'ip': '23.15.110.127'
        }
    }
})
```
- 参考
- [ES官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
- [Python操作ES](https://elasticsearch-py.readthedocs.io/en/master/#)
