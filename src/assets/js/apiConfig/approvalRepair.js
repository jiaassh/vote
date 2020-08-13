import base from './base';//
const {pageDataUrl} = base;

export default {
	moduleName:'获取故障地点列表',
	moduleUrl: 'approvalRepair/',
	api: [{   //获取故障地点列表
		name: 'getFaultLocationList',
		url: 'getFaultLocationList',
		resShowSuccessMsg:false,
	},{  //新建维修申请流程
		name:"newApprovalRepair",
		url:"newApprovalRepair",
		// resShowSuccessMsg:false,
	},{   //维修详情
		name:"getDetailOfApprovalRepair",
		url:"getDetailOfApprovalRepair",
		resShowSuccessMsg:false,
	}]
}