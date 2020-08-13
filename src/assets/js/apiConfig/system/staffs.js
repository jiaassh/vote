
import base from '../base';//公共
const {pageDataUrl} = base;

export default {
  moduleUrl:'staff/',
  api:[
    {
      //根据人员id查询人员详情
      name:'getUserInfoById',
      url:'getUserInfoById.do',
    },
  { 
    //导出excel表格
    name:'importExcle',
    url:'importExcle.do'  //excel后端返回的问题
  },
  {
    //人员信息列表
    name:'getUserManagerList',
    url:'getUserManagerList.do',
    resShowSuccessMsg: false , 
    resDepthFieldUrl:pageDataUrl
  },
  {
    //新增系统人员
    name:'insertUserInfo',
    url:'insertUserInfo.do',
  },
  {
    //离职人员
    name: 'leaveOffice',
    url: 'leaveOffice.do'
  },
  {
    //重置密码
    name:'resetPassword',
    url:'resetPassword.do'
  },
  {
    //获取人员详情
    name:'getUserInfoById',
    url:'getUserInfoById.do',
    resShowSuccessMsg: false ,
  },
  {
    //更新人员信息
    name:'updateUserInfo',
    url:'updateUserInfo.do'
  },
  {
    //人员调动
    name:'shiftUserInfo',
    url:'shiftUserInfo.do'
  },
  {
    //更改密码
    name:'updateSysUser',
    url:'updateSysUser.do',
    resShowSuccessMsg: false ,

  }
  ],
}