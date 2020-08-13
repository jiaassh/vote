// 报警级别
const alarmLevelDisc = [{
	value: 0,
	label: "一般"
}, {
	value: 1,
	label: "重要"
}, {
	value: 2,
	label: "紧急"
}]

// 处理状态
const dealStatusDisc = [{
	value: null,
	label: "待处理"
}, {
	value: 1,
	label: "处理中"
}, {
	value: 2,
	label: "已完成"
}]

export default {
	alarmLevelDisc,
	dealStatusDisc
}