export default {
	moduleName:'公共',
	moduleUrl: 'cjcc/common/',
	api: [{
		name: 'logsExcel',
		url: 'logsExcel.do',
		params:{}
	},{
		remark: '我的项目列表',
		name: 'myPropertyList',
		url: 'myPropertyList',
		resShowSuccessMsg: false,
		params:{},
		mock:false
	}]
}