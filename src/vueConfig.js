import defaultConfig from "./config";// 默认配置
import AjaxClass from '@/assets/js/ajax/index';//v3版api
import apiConfig from '@/assets/js/apiConfig/index';//接口配置
import helper from '@/assets/js/ajax/helper';//工具
import vueMountAttribute from './vueMountAttribute';// 给vue添加函数
import format from '@/filters/index'; //全局过滤器
import store from '@/store/index.js'


// 给vue挂载各种方法和初始化配置
export default function vueConfig(Vue, App, router) {

	// 使用vue实例方法
	let config = {
		resSuccessMsg: (msg => { //自动弹出服务器成功信息
			vue.$message({
				message: msg,
				type: 'success'
			});
		}),
		resFailMsg: (msg => {

			if (msg == '登录失效') {
				vue.$messageonly.error(msg)
				vue.$router.push({
					path: "/login"
				})
			} else {
				console.log('00000000000000000')
				// vue.$message.error(msg)
			}


		}),
		// resCatch: (err => {
		// 	if (err.msg) {
		// 		vue.$message.error(err.msg)
		// 	}
		// }),
		// resCatch: (err => {
			
		// 	let _data = err.errorData.response.data
		// 	console.log('---------',_data)
		// 		// return
		// 	if (_data.code == 401) {
		// 		let redirceurl = window.location.href
		// 		localStorage.setItem("redirceUrl", redirceurl)
				
		// 		setTimeout(() => {
		// 			window.location.href = _data.localtion
		// 		}, 50);
		// 	}
		// 	if (err.msg) {
		// 		vue.$message.error(err.msg)
		// 	}
		// }),
	}


	config = Object.assign({}, defaultConfig, config)

	// 挂载全局方法
	Vue.prototype.$ajax = new AjaxClass(apiConfig, config);
	Vue.prototype.$config = config;
	Vue.prototype.$helper = helper;
	Vue.config.productionTip = false;
	//过滤器
	Object.keys(format).forEach(key => {
		Vue.filter(key, format[key]);
	});
	Vue.prototype.format = format

	// 实例化
	let vue = new Vue({
		router,
		store,
		render: h => h(App),
	}).$mount('#app')

	// 将原型和实例进行同步修改
	vueMountAttribute(Vue, vue)
}

