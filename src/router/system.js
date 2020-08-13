export default [
  {
		path: '/system/authority',
		component: () => import('@/page/system/authority.vue'),
		meta:{
			title:'系统设置 / 权限管理 / 权限配置'
		  }
	},
	{
		path: '/system/role',
		component: () => import('@/page/system/authority/role.vue'),
		meta:{
			title:'系统设置 / 权限管理 / 角色管理'
		  }
	},
	{
		//新增编辑角色
		name:'roleEdit',
		path: '/system/roleEdit',
		component: () => import('@/page/system/authority/roleEdit.vue'),
		meta:{
			title:'系统设置 / 权限管理 / 角色管理'
		  }
	},
	//人员管理
	{
		path: 'system/personnel',
		component: () => import('@/page/system/personnel.vue'),
		meta:{
			title:'系统设置 / 人员管理'
		  }
	},
	//企业设置
	{
		path: 'system/operateDetail',
		component: () => import('@/page/system/operateDetail.vue'),
		meta:{
			title:'系统设置  / 企业信息'
		  }
	},
	{  //系统管理/会议室维护/使用详情
		path: 'system/maintenance',
		component: () => import('@/page/system/meeting/maintenance.vue'),
		meta:{
			title:'系统管理  / 会议室维护 /使用详情'
		  }
	},
	{  //系统管理/会议室维护
		path: 'system/meetingRoom',
		component: () => import('@/page/system/meeting/meetingRoom.vue'),
		meta:{
			title:'系统管理  / 会议室维护'
		  }
	},

]
