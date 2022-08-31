[[toc]]

## 安装环境
前置：以Linux平台为例，已安装docker，并启动

1. minikube下载安装
	```
	$ curl -LO https://github.com/kubernetes/minikube/releases/download/v1.13.1/minikube-linux-amd64
	$ sudo install minikube-linux-amd64 /usr/local/bin/minikube
	```
2. kubectl下载安装
	```
	$ curl -LO https://dl.k8s.io/v1.19.2/kubernetes-client-linux-amd64.tar.gz
	$ tar -xvf kubernetes-client-linux-amd64.tar.gz
	$ sudo install kubernetes/client/bin/kubectl /usr/local/bin/kubectl
	```
3. Kubernetes集群安装
	```
	root@knownsec-virtual-machine:/home/knownsec/k8s# minikube start
	😄  minikube v1.13.1 on Ubuntu 20.04
	✨  Automatically selected the docker driver
	🛑  The "docker" driver should not be used with root privileges.
	💡  If you are running minikube within a VM, consider using --driver=none:
	📘    https://minikube.sigs.k8s.io/docs/reference/drivers/none/
	
	❌  Exiting due to DRV_AS_ROOT: The "docker" driver should not be used with root privileges.
	
	root@knownsec-virtual-machine:/home/knownsec/k8s# minikube start --force --driver=docker
	```
4. 检查集群状态
	```
	root@knownsec-virtual-machine:/home/knownsec/k8s# kubectl cluster-info
	Kubernetes master is running at https://172.17.0.4:8443
	KubeDNS is running at https://172.17.0.4:8443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
	
	To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
	```
5. 创建第一个应用
	- 创建文件vim deployment.yaml，格式一定要正确，不然坑死了！！！
		```
		apiVersion: apps/v1
		kind: Deployment
		metadata:
		  name: hello-world
		spec:
		  replicas: 3
		  selector:
		    matchLabels:
		      app: hello-world
		  template:
		    metadata:
		      labels:
		        app: hello-world
		    spec:
		      containers:
		      - name: hello-world
		        image: wilhelmguo/nginx-hello:v1
		        ports:
				- containerPort: 80
		```
	- 发布部署文件到 Kubernetes 集群
		```
		kubectl create -f deployment.yaml --validate=false
		```
	- 查看一下Pod是否被成功启动
		```
		kubectl get pod -o wide
		看到 Kubernetes 帮助我们创建了 3 个 Pod 实例
		```
	- 创建 service.yaml 文件，将服务暴露出去
		```
		apiVersion: v1
		kind: Service
		metadata: 
		  name: hello-world
		spec: 
		  type: NodePort
		  ports: 
		  - port: 80 
		    targetPort: 80
		  selector: 
		    app: hello-world
		```
	- 在 Kubernetes中创建Service
		```
		kubectl create -f service.yaml --validate=false
		```
	- 创建完成后，Kubernetes 会随机帮助我们分配一个外部访问端口
		```
		kubectl get service -o wide
		```
	- 由于我们的集群使用 minikube 安装，要想集群中的服务可以通过外部访问，还需要执行以下命令
		```
		minikube service hello-world
		```
		
6. 
