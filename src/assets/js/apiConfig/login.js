import base from './base';


export default {
	moduleName:'登录',
	moduleUrl: 'login/',
	api: [{
			remark: '提交登录,返回jwt',
			name: 'login',
			url: 'doLogin'
		},
		{
			name: 'logout',
			url: 'logout',
			mockConfig:{
			},
			remark: '退出登录',
			resShowSuccessMsg: false,
			mock:false
		},
		{ //我的个人信息
			name: 'myinfo',
			url: 'myinfo',
			resShowSuccessMsg: false,
			mockConfig: {
				nickname:'张三',
				role:1,
				userId:10
			},
			remark: '个人信息',
			mock:false
		}, 
		{  //修改密码
			name:"updatePassword",
			url:"updatePassword"
		},
		{  //修改默认项目
			name:"updateDefaultProperty",
			url:"updateDefaultProperty"
		},
		{	
			//项目权限列表
			name:'permissionInfo',
			url:"permissionInfo.do",
			resShowSuccessMsg: false,
		}
	]
}
