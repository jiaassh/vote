export default {
	moduleUrl: 'company/',
	api: [{//企业设置-根据运营id查询运营信息
		name: 'selectInfoById',
		url: 'selectInfoById',
		resShowSuccessMsg:false,
	},{//获取组织详情
		name: 'updateOperationInfo',
		url: 'updateOperationInfo',
	}]
}