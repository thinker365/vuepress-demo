[[toc]]

## 概述
### 组件之间共享数据方式
1. 父传子：v-bind属性绑定
2. 子传父：v-on事件绑定
3. 兄弟之间：EventBus
	- $on：接受数据的组件
	- $emit：发送数据的组件
以上共享方式，只适合在小范围内共享；如果需要大范围、频繁的共享数据，以上方式力不从心啦
### Vuex是什么
是实现组件全局状态（数据）管理的一种机制，可以方便的实现组件之间的数据共享
![](~@img/uTools_1656772886169.png)
### Vuex统一管理状态的好处
1. 能够在vuex中集中管理共的数据，易于开发和后期维护
2. 能够高效地实现组件之间的数据共享，提高开发效率
3. 存储在vux中的数据都是响应式的，能够实时保持数据与页面的同步
### 什么样的数据适合存储到vuex中
一般情况，组件之间共享的数据，才存vuex；对于组件私有的数据，存储组件data中即可。当然，都存vuex也可以。
## 基本使用
### 安装
```
npm install vuex --save
```
### 导入
```
import Vuex from 'vuex'
Vue.use(Vuex)
```
### 创建store对象
```
const store = new Vuex.Store({
	//state中存放的就是全局共享的数据
	state:{
		count:0
	}
})
```
### 将store对象挂载到vue实例中
```
new Vue({
	el:'#app',
	render:h=>h(app),
	router,
	store
})
```
## 核心概念
### state
state提供唯一的公共数据源，所有共享的数据都要统一的放在store的state中进行存储
```
const store = new Vuex.Store({
	state:{count:0}
})
```
1. 组件中访问state中数据的第一种方式
	```
	this.$store.state.全局数据名称
	```
	```
	{{this.$store.state.count}}或者{{$store.state.count}}
	```
1. 组件中访问state中数据的第二种方式
	```
	import { mapState } from 'vuex'
	```
	通过mapState函数，将当前组件需要的全局数据，映射为当前组件的computed计算属性
	```
	computed:{
		...mapState(['count'])
	}
	```
	```
	{{count}}
	```
### mutations
- 用于变更store中的数据
- 只能通过mutations变更store数据，不可以直接操作store中的数据
- 以上方式虽然繁琐，但是可以集中监控所有数据的变化
```
const store = new Vuex.Store({
	state:{
		count:0
	},
	mutations:{
		add(state){
			state.count++
		}
	}
})
```
```
methods:{
	handle(){
		//触发mutations的第一种方式
		this.$store.commit('add')
	}
}
```
可以在触发mutations时传递参数
```
const store = new Vuex.Store({
	state:{
		count:0
	},
	mutations:{
		add(state，step){
			state.count+=step
		}
	}
})
```
```
methods:{
	handle(){
		this.$store.commit('add',2)
	}
}
```
触发mutations第二种方式
```
import { mapMutations } from 'vuex'
```
将需要的mutations函数，映射为当前组件的methods方法
```
methods:{
	...mapMutations(['add','addN'])
	clickFunc(){
		this.add()
	}
	clickFunc2(){
		this.addN(3)
	}
}
```
### actions
用于处理异步任务
如果异步操作变更数据，必须通过actions，不能使用mutations；但是在actions中还是要通过触发mutations的方式间接变更数据
```
# 定义actions
const store = new Vuex.Store({
	mutations:{
		add(state){
			state.count++
		}
	},
	actions:{
		addAsync(context){
			setTimeout(()=>{
				context.commit('add')
			},1000)
		}
	}
})
```
```
#触发actions
methods:{
	handle(){
		# 第一种方式
		this.$store.dispatch('addAsync')
	}
}
```
触发actions异步任务携带参数
```
# 定义actions
const store = new Vuex.Store({
	mutations:{
		add(state,step){
			state.count+=step
		}
	},
	actions:{
		addAsync(context,step){
			setTimeout(()=>{
				context.commit('add',step)
			},1000)
		}
	}
})
```
```
#触发actions
methods:{
	handle(){
		# 触发actions携带参数
		this.$store.dispatch('addAsync',5)
	}
}
```
触发actions的第二种方式
```
import { mapActions } from 'vuex'
```
通过导入的mapActions函数，将需要的actions函数，映射为当前组件的methods方法
```
methods:{
	...mapActions(['addAsync','addNAsync'])
}
```
```
使用
@click="addAsync"
@click="addNAsync"
```
### getters
- 用于对store中的数据进行加工处理形成新的数据
- 不会更改原数据，只是一个装饰器的作用
- getters对store中已有的数据加工处理之后形成新的数据，类似vue计算属性
- store中的数据变化，getters中的数据也会跟着变化
```
# 定义getters
const store = new Vuex.Store({
	state:{
		count:0
	},
	getters:{
		showNum:state=>{
			return state.count
		}
	}
})
```
使用getters的第一种方式
```
this.$store.getters.名称(showNum)
```
getters的第二种使用方式
```
import { mapGatters } from 'vuex'
computed:{
	...mapGatters(['showNum'])
}
```