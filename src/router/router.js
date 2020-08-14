import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/public/login.vue'
import Home from '@/page/Home.vue'
import preview from '@/page/process/preview.vue'
import configpreview from '@/page/process/configpreview.vue'
import routerConfig from './index';



Vue.use(Router)

let router = new Router({
	routes: [{
		path: '*',
		component: Login
	},
	{
		path: '/process/preview',
		component: preview
	},


	{
		path: '/process/configpreview',
		component: configpreview
	},
	{
		path: '/home',
		component: Home,
		children: routerConfig
	},
	]
})

//token判断
router.beforeEach((to, from, next) => {
	const token = localStorage.getItem('token');
	if (to.path === '/login') {
		next();
	} else {
		token ? next() : next('/login') 
	} 
});


// router.beforeEach((to, from, next) => {
// 	const token = localStorage.getItem('token');
// 	if (token) {
// 		next()
// 	} else {
// 		// localStorage.setItem("redirceUrl", window.location.href)
// 		next('/login') 
// 	}
// });



export default router
