import base from './base';//公共
const {pageDataUrl} = base;

export default {
	moduleUrl: 'permission/',//改permission
	api: [{//获取节点树
		name: 'getOrgTree',
		url: 'getOrgTree.do',
		params:{},
		resShowSuccessMsg:false,
	},
	{//获取组织详情
		name: 'selectOrganizationInfo',
		url: 'selectOrganizationInfo.do',
		resShowSuccessMsg:false,
	},
	{//获取权限树
		name: 'getPermissionTree',
		url: 'getPermissionTree.do',
		resShowSuccessMsg:false,
	},
	{//获取角色列表
		name: 'getRoleManagerList',
		url: 'getRoleManagerList.do',
		resShowSuccessMsg:false,
		resDepthFieldUrl: pageDataUrl
	},
	{//获取角色详情
		name: 'getRoleInfoById',
		url: 'getRoleInfoById.do',
		resShowSuccessMsg:false,
	},
	{//新增角色
		name: 'insertRoleInfo',
		url: 'insertRoleInfo.do',
	},
	{//删除角色
		name: 'deleteRoleInfo',
		url: 'deleteRoleInfo.do',
	},
	{//编辑角色
		name: 'updateRoleInfo',
		url: 'updateRoleInfo.do',
	},
	{//权限管理-新增组织
		name: 'insertOrganizationInfo',
		url: 'insertOrganizationInfo.do',
	},
	{//权限管理-删除组织信息
		name: 'deleteOrganizationInfo',
		url: 'deleteOrganizationInfo.do',
	},
	{//权限管理-编辑组织信息
		name: 'updateOrganizationInfo',
		url: 'updateOrganizationInfo.do',
	},
	{//新增编辑角色前，查询权限树
		name: 'listpro',
		url: 'listpro.do',
		resShowSuccessMsg:false,
		params:{}
	},
	{//获取模块下拉框
		name: 'getModuleNames',
		url: 'getModuleNames.do',
		resShowSuccessMsg:false,
	}],
	
	
}