import base from './base';//
const {pageDataUrl} = base;

export default {
	moduleName:'会议室申请流程',
	moduleUrl: 'approvalMetting/',
	api: [{//新建会议室流程
		name: 'newApprovalMetting',
		url: 'newApprovalMetting',
		// resShowSuccessMsg:false,
		
	},{//获取会议室列表
		name: 'getMeetingRoomList',
		url: 'getMeetingRoomList.do',
		resShowSuccessMsg:false,
	},{//选择会议时间
		name: 'getMeetingOccupySituationByRoomId',
		url: 'getMeetingOccupySituationByRoomId.do'
	},{//获取会议室申请详情
		name: 'getDetailOfMeetingRoom',
		url: 'getDetailOfMeetingRoom.do',
		resShowSuccessMsg:false,
	},{//检测会议室是否被预定
		name:"checkMettingIsReserve",
		url:"checkMettingIsReserve",
		resShowSuccessMsg:false,
		resShowFailMsg:false
	}]
}