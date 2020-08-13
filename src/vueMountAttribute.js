//vue挂载属性
export default function vueMountAttribute(Vue,vue){
	const { $ajax,$helper } = vue;
	
	Vue.prototype.$common = {
		// 清除dom
		cleanGloabDropDomList(){
			$(function(){
				$('#box .resizable').each((key, val) => {
					$(val).remove()
				})
			})
			gloabDropDomList = []
		},
		// 设置数据存储
		saveGloabDropDomList(){
			$('.resizable').each((key, val) => {
				let $_this = $(val)
				gloabDropDomList.map(item => {
					if (item.id == parseInt($_this.data('id'))) {
						item.rotate = parseInt($_this.data("rotate"));
						item.top = parseInt($_this.attr("data-top"));
						item.left = parseInt($_this.attr("data-left"));
						item.width = $_this.width();
						item.height = $_this.height();
					}
				})
			});
		},
		// 获取项目列表字典
		getPropertyList(){
			return $ajax.common.myPropertyList().then(res =>{
				return res.success ? $helper.arrToDictionary(res.data,'propertyId','propertyName') : []
			})
		},
	}
}