//系统设置
const system = {
	id: 2,
	index: '2',
	name: '系统设置',
	icon: 'icon-xtsz',
	children: [{
		id: 3,
		index: '2-3',
		name: '企业设置',
		url: '/system/operateDetail',
	}, {
		id: 3,
		index: '2-1',
		name: '权限管理',
		url: '/system/authority',
		children: [{
			id: 4,
			index: '2-1-1',
			name: '权限配置',
			url: '/system/authority',
		},
		{
			id: 4,
			index: '2-1-2',
			name: '角色管理',
			url: '/system/role'
		}]
	},
	{
		id: 3,
		index: '2-2',
		name: '人员管理',
		url: '/system/personnel',
	},
	{
		id: 4,
		index: '2-4',
		name: '会议室维护',
		url: '/system/meetingRoom',
	}
	]
}

//流程管理
const process = {
	id: 4,
	index: '4',
	name: '投票管理',
	icon: 'icon-hebingxingzhuang',
	children: [{
		id: 4,
		index: '4-1',
		name: '新增投票',
		url: '/process/newprocess',
		query:{newpagetype:'new'}
	},
	{
		id: 4,
		index: '4-2',
		name: '投票列表',
		url: '/process/processlist',
		query:{listpagetype:'wait'}
	},
	{
		id: 4,
		index: '4-3',
		name: '投票记录',
		url: '/process/processlist',
		query:{listpagetype:"already"}
	},
	{
		id: 4,
		index: '4-4',
		name: '投票统计',
		url: '/process/processlist',
		query:{listpagetype:"end"}
	}
	]
}


const menus = [
	process,
	system,
]




//菜单样式
const menuClass = [{
	parent: 'cell bg-1F2D3D',
	firstChild: 'active',
	lastChild: 'block',
	type: 'active' //选中
}, {
	parent: 'cell',
	firstChild: 'b-r-2',
	lastChild: '',
	type: 'pre' //前一个
}, {
	parent: 'cell offset',
	firstChild: 'b-r-3',
	lastChild: '',
	type: 'next' //后一个
}, {
	parent: 'cell',
	firstChild: '',
	lastChild: '',
	type: 'default' //默认
}, {
	parent: 'cell offset',
	firstChild: '',
	lastChild: '',
	type: 'last' //填充
}]

export default {
	menus,
	menuClass
}
