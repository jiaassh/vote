export default class DropClass {
	constructor(config,domInfo) {
		// 合并配置
		this.mergeConfig(config);
		this.mergeDomInfo(domInfo);
		
		this.$dom = undefined;//最后生成的dom元素
		this.html = undefined;//生成的dom模板
		this.resizableDom = this.config.resizableClassName;
		this.box = $(this.config.boxId)
		
		this.init()
		this.refresh = this.bindDrop
	}
	
	// 合并配置
	mergeConfig(config){
		this.defaultConfig = {
			step: 5,
			boxId: '#box',
			hander: '.hander',
			move: 'both',
			resizableClassName: '.resizable',
			randomPosition: false,
			aspectRatio:false,
			maxWidth:700,
			canDragging:true,
			createTemplate(){
				return `<div>default template</div>`
			},
			deletePointCallback(e){
				console.log(e,'delete success');
			},
			pointClickCallback(domInfo,config){
				console.log(domInfo,config,'pointClickCallback');
			}
		}
		
		this.config = Object.assign({},this.defaultConfig,config);
	}
	
	// 合并dom数据
	mergeDomInfo(domInfo){
		this.defaultDomInfo = {
			id: new Date().getTime(),
			name:'null',
			left: 30,
			top: 30,
			width: 100,
			height: null,
			rotate: 0,
			status: 0,
			type:1,//1.拖拽物，2图片
			status:1,//1.正常，2异常，3故障
			statusClass:'#386ff5',//默认蓝色
			canResizable:false,//是否可以拉伸
		}
		this.domInfo = Object.assign({}, this.defaultDomInfo,domInfo);
		this.id = this.domInfo.id;
	}

	// 旋转切换
	changeRotate(target, isLeft) {
		const step = this.config.step;
		let rotate = target.data("rotate")
		let val = isLeft ? rotate += step : rotate -= step;
		target.data("rotate", val).css("transform", "rotate(" + val + "deg)")
	}

	// 添加元素
	init() {
		this.createDropDom()// 创建拖拽dom
		this.createConfig() //创建配置项
		this.bindDrop(); //绑定各种拖拽事件
	}

	// 创建拖拽dom
	createDropDom() {
		this.html = this.config.createTemplate(this.domInfo);
		this.box.append(this.html); //创建并添加拖拽dom模板
		this.$dom = $(this.html);
	}

	// 创建配置
	createConfig() {
		const newConfig = Object.assign({},this.defaultDomInfo, this.domInfo )
		const hasConfig = gloabDropDomList.find(item => {
			return item.id == this.id
		})
		
		this.handleDropList(hasConfig,newConfig);
	}
	
	// 处理全局拖拽列表
	handleDropList(hasConfig,newConfig){
		if(hasConfig){
			gloabDropDomList.map(item => {
				if(item.id == this.id){
					item = newConfig
				}
			})
		}else{
			gloabDropDomList.push(newConfig)
		}
	}

	// 拖拽初始化
	dropInit(target) {
		const {move,randomPosition,hander,aspectRatio,maxWidth,canDragging} = this.config;
		target.dragging({
			move,
			randomPosition,
			hander
		});
		
		target.resizable({
			aspectRatio,
			maxWidth
		});
	}


	// 绑定拖拽事件
	bindDrop() {
		const {canDragging,deletePointCallback,pointClickCallback} = this.config;
		const {canResizable,type} = this.domInfo;
		let that = this;
		
		// 点位删除回调
		function deletePoint(target,id){
			deletePointCallback(id)
			target.remove();// 添加弹窗
			gloabDropDomList.map((item, index) => {
				if (item.id == id) {
					gloabDropDomList.splice(index, 1);
				}
			})
		}
		
		// 如果不使用遍历，会导致拖拽插件失效
		$(this.resizableDom).each(function() {
			let $_this = $(this); //父元素
			let $id = $_this.data('id');
			
			if($id == that.id){
				let $left = $_this.find('.change-left');
				let $right = $_this.find('.change-right');
				let $lashen = $_this.find('.change-lashen');
				let $delWrap = $_this.find('.change-delete');
				let $delPoint = $_this.find('.point-delete');
				
				$_this.off('click').on('click',()=>{
					pointClickCallback(that.domInfo)
				})
				
				if(canDragging){
					that.dropInit($_this)
					// 左
					$left.on('mouseover', () => { $left.show()}).off('click').on('click', () => {
						that.changeRotate($_this, true)
					})
					
					// 右
					$right.on('mouseover', () => { $right.show()}).off('click').on('click', () => {
						that.changeRotate($_this, false)
					})
					
					// 点位删除
					$delPoint.on('click', () => deletePoint($_this,$id))
					$delWrap.on('click', () => deletePoint($_this,$id))
					
					// 用hover方法会有异常
					$_this.off('mouseover').on('mouseover',() => {
						[$left, $right, $lashen, $delWrap, $delPoint].map(item => item.show())
					})
					
					$_this.off('mouseout').on('mouseout',() => {
						[$left, $right, $lashen, $delWrap, $delPoint].map(item => item.hide())
					})
				}	
			}
		});
	}
}
