import base from './base';//
const {pageDataUrl} = base;

export default {
	moduleName:'经费维修',
	moduleUrl: 'approvalOutlay/',
	api: [{  //新建经费申请流程
		name: 'newApprovalOutlay',
		url: 'newApprovalOutlay',
		// resShowSuccessMsg:false,
	},{//经费详情
		name: 'getDetailOfApprovalOutlay',
		url: 'getDetailOfApprovalOutlay.do',
		resShowSuccessMsg:false,
	},{//编辑位置
		name: 'editLocation',
		url: 'editLocation.do'
	},{//位置详情
		name: 'locationDetail',
		url: 'locationDetail.do'
	},{//删除位置
		name: 'deleteLocation',
		url: 'deleteLocation.do'
	},]
}