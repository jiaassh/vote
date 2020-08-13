import commonApi from '@/assets/js/apiConfig/common';

// 点位类型，对应接口文档
let getPointTypes = [];
commonApi.api[0].mockConfig.map(item =>{
	getPointTypes.push(item.value)
})
const [QIANG,QIU,MJ,XGD,WL,DP,GB,TCC] = getPointTypes;
const STATUS_SUCCESS = 1;


// 用于创建模板的回调，根据需求修改模板
function createTemplate(domInfo){
	const {
		id,
		top,
		left,
		width,
		rotate,
		type,
		status,
		name,
	} = domInfo;
	
	let template;
	let templateType;
	let iconfont;
	let statusClass = status == STATUS_SUCCESS ? '#358DFF' : '#FF6661';
	
	let boxStyle = `left:${left}px;top:${top}px;width:${width}px;transform: rotate(${rotate}deg);position:absolute;`
	const dataAttr = `data-left="${left}" data-top="${top}" data-type="${type}" data-rotate="${rotate}" data-id="${id}"`
	
	// 拖拽物
	if(type == WL){
		boxStyle += `background : ${statusClass}`;
		template = 
			`<div style="${boxStyle}" ${dataAttr} class="resizable ui-widget-content" >
				<i class="hander"></i>
				<span class="change-width"></span>
				<div class="change-lashen">
					<div class="change-lashen-wrap d-f__jc-c__ai-c">
						<div class="change-lashen-handle"></div>
					</div>
				</div>
				<div class="change-delete"></div>
				<div class="change-left">
					<div class="change-left-wrap d-f__jc-c__ai-c">
						<div class="change-left-handle"></div>
					</div>
				</div>
				<div class="change-right">
					<div class="change-right-wrap d-f__jc-c__ai-c">
						<div class="change-right-handle"></div>
					</div>
				</div>
				<div class="text" style="background:${statusClass}">${name}</div>
			</div>`;
	}else{
		// 图标类
		switch (type){
			// 枪机
			case QIANG:
				iconfont = status == STATUS_SUCCESS ?  'icon-qjtl1' : 'icon-qjtl2';
				templateType = 1;
				break;
			
			// 球机
			case QIU:
				iconfont = status == STATUS_SUCCESS ?  'icon--qj1' : 'icon-qj2';
				templateType = 1;
				break;
				
			// 门
			case MJ:
				iconfont = status == STATUS_SUCCESS ?  'icon-mj1' : 'icon-mj3';
				templateType = 1;
				break;	
					
			default:
				break;
		}
		const iconStyle = `	width:43px;height:42px;border-radius:40px;background:rgba(255,255,255,1);box-shadow:0px 0px 5px 0px rgba(17,74,212,0.27);`
		
		if(templateType == 1){
			boxStyle += `min-width:80px;`
			template =
				`<div class="resizable" style="${boxStyle}" ${dataAttr}>
					<i class="hander" style="height:40px"></i>
					<div style="${iconStyle}" class="d-f__jc-c__ai-c">
						<div class="iconfont ${iconfont} " style="color: ${statusClass};font-size:22px"></div>
					</div>
					<div class="point-delete"></div>
					<div class="point-text" style="background:${statusClass}">${name}</div>
				</div>`
		}
						
		
	}
	return template
}

export default createTemplate