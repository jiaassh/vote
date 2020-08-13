import base from "../base";
const {pageDataUrl} = base ;
  export default {
  moduleUrl:'permission/',
  api:[{
    //菜单权限
    name:'getMenupermissionList',
    url:'getMenupermissionList', 
    resShowSuccessMsg: false ,
  },{
    //菜单权限
    name:'getToken',
    url:'getToken', 
    resShowSuccessMsg: false ,
  },{
    //查询组织树
    name:'getOrgTree',
    url:'getOrgTree', 
    resShowSuccessMsg: false ,
  },{
    name:'selectAllOrganizationList',
    url:"selectAllOrganizationList",
    resShowSuccessMsg: false ,
  },
    {
      //角色管理列表
      name:'getRoleManagerList',
      url:'getRoleManagerList.do',
      resShowSuccessMsg: false ,
      resDepthFieldUrl:pageDataUrl
    },
    {
      //新增角色
      name:'insertRoleInfo',
      url:'insertRoleInfo.do'
    },
    {
      //编辑更新角色
      name:'updateRoleInfo',
      url:'updateRoleInfo.do',
    },
    {
      //删除角色
      name:'deleteRoleInfo',
      url:'deleteRoleInfo.do',
    },
    {
      //查看权限树
      name:'findListPro',
      url:'findListPro.do',
      resShowSuccessMsg:false,
      params:{}
    },
    {
      //获取角色详情
      name:'getRoleInfoById',
      url:'getRoleInfoById.do',
      resShowSuccessMsg:false,
    },
    {
      //获取所有模块
      name:'getModuleNames',
      url:'getModuleNames.do',
      resShowSuccessMsg:false,
    },
    {
      name:'insertOrganizationInfo',
      url:'insertOrganizationInfo.do',
      resShowSuccessMsg:false,
    },
    {
      //获取角色信息
      name:'getRoleInfoList',
      url:'getRoleInfoList.do',
      resShowSuccessMsg:false,
    }
  ]
}