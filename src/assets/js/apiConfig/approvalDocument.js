import base from './base';//
const {pageDataUrl} = base;

export default {
	moduleName:'公文传输',
	moduleUrl: 'approvalDocument/',
	api: [{//新建公文传输流程
		name: 'newApprovalDocument',
		url: 'newApprovalDocument',
		// resShowSuccessMsg:false,
		
	},{//获取公文传输详情
		name: 'getDetailOfApprovalDocument',
		url: 'getDetailOfApprovalDocument.do',
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
	},{//获取会议室列表
		name:'getMeetingRoomList',
		url:'getMeetingRoomList'
	}]
}