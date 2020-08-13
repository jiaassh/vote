import base from './base';//
const {pageDataUrl} = base;

export default {
	moduleName:'流程',
	moduleUrl: 'process/',
	api: [{ //获取流程类别列表
		name: 'getProcessTypeList',
		url: 'getProcessTypeList',
		resShowSuccessMsg:false,
		resDepthFieldUrl:pageDataUrl
	},{   //获取故障地点列表
		name: 'getFaultLocationList',
		url: 'getFaultLocationList',
	},{  //提交流程下一步
		name:"postProcess",
		url:"postProcess"
	},{  //获取流程列表
		name:"getBacklogProcessList",
		url:"getBacklogProcessList",
		resShowSuccessMsg:false,
	},{   //删除审批流程
		name:"deleteAprovalById",
		url:"deleteAprovalById"
	},{//结束流程
		name:"endProcess",
		url:"endProcess"
	},{//抄送流程
		name:"copyProcess",
		url:"copyProcess"
	},{  //选择办理人员
		name:"selectProcessorListTree",
		url:"selectProcessorListTree",
		resShowSuccessMsg:false,
	},{//获取用户创建流程权限
		name:"getProcessMenuPermission",
		url:"getProcessMenuPermission",
		resShowSuccessMsg:false,
	},{
		name:"isUnique",
		url:"isUnique",
		resShowSuccessMsg:false,
	}]
}