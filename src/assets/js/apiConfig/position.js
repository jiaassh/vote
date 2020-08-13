import base from './base';//
const {pageDataUrl} = base;

export default {
	moduleName:'位置',
	moduleUrl: 'cjcc/position/',
	api: [{
		name: 'getDevices',
		url: 'getDevices',
		resShowSuccessMsg:false,
		remark: '获取所有设备',
		mock:false
	},{
		name: 'savePoints',
		url: 'savePoints',
		remark: '保存地图上的点位',
		mock:false
	}]
}