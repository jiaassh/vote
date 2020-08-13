// import common from './common'
// const {success,error,pageDataUrl} = common;

// 公共接口
export default {
	pageDataUrl:'data.list',
	moduleUrl: 'cjcc/common/',
	api: [{//获取省
		name: 'province',
		url: 'province.do',
		resShowSuccessMsg:false,
		params:{}
	},{//获取市
		name: 'city',
		url: 'city.do',
		resShowSuccessMsg:false,
		params:{}
	},{//获取区
		name: 'area',
		url: 'area.do',
		resShowSuccessMsg:false,
		params:{}
	},{//获取省市区文本，传入数组
		name: 'pcaDetail',
		url: 'pcaDetail.do',
		resShowSuccessMsg:false,
	}]
}