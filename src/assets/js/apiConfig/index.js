import base from './base';//公共

import common from './common';//公共模块
import login from './login';//登录


import operateDetail from "./system/operateDetail"; //系统设置-企业设置
import permission from './system/permission' //系统设置-权限管理-权限配置|角色管理
import staffs from './system/staffs' //系统设置-人员管理
import setting from './setting'

import sms from './sms.js'    //短信/验证码
import approvalDocument from './approvalDocument'  //文公传输流程
import process from './process'    //流程共用接口
import approvalOutlay from './approvalOutlay'   //经费申请流程
import approvalRepair from './approvalRepair'   //维修申请
import approvalConfig from './approvalConfig'   //公共分类
import approvalMetting from './approvalMetting' //会议室
import meetingRoom from './meetingRoom' //会议室维护
import getToken from './getToken'
//mock数据模拟  http://mockjs.com/examples.html
export default {
	base,
	login,
	getToken,
	common,
	permission,
	staffs,
	operateDetail,
	setting,
	sms,
	approvalDocument,
	process,
	approvalOutlay,
	approvalRepair,
	approvalConfig,
	approvalMetting,
	meetingRoom,
}


