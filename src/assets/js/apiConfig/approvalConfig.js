export default {
	moduleUrl: 'approvalConfig/',
	api: [{//获取人员列表
		name: 'getUserList',
		url: 'getUserList',
		resShowSuccessMsg:false,
	},{ //设置审批流程配置
		name:"setApprovalProcessConfig",
		url:"setApprovalProcessConfig"
	},{  //获取审批流程配置
		name:"getApprovalProcessConfig",
		url:"getApprovalProcessConfig",
		resShowSuccessMsg:false,
	},{//所配置流程是否全部结束（提示语）
		name:"processesIsAllEnded",
		url:"processesIsAllEnded",
		resShowSuccessMsg:false,
	}]
}