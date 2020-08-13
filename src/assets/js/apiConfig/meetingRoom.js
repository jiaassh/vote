import base from './base';//
const {pageDataUrl} = base;

export default {
	moduleName:'会议室',
	moduleUrl: 'meetingRoom/',
	api: [{ //获取会议室维护列表
		name: 'getMeetingRoomList',
		url: 'getMeetingRoomList',
		resShowSuccessMsg:false,
		resDepthFieldUrl:pageDataUrl
	},{   //新增会议室
		name: 'addMeetingRoom',
		url: 'addMeetingRoom',
	},{  //更新会议室状态
		name:"updateMeetingRoom",
		url:"updateMeetingRoom"
	},{  //获取会议室使用情况
		name:"getMeetingRoomOccupySituation",
		url:"getMeetingRoomOccupySituation",
		resShowSuccessMsg:false,
	},{   //获取会议室使用情况-门户
		name:"getMeetingRoomOccupySituationOfPortal",
		url:"getMeetingRoomOccupySituationOfPortal",
		resShowSuccessMsg:false,
	}]
}