import constant from './constant.js'

//默认配置
const config = {
	
	//系统环境
	system:constant.SYSTEM_WEB,
	
	// 开启mock.js模拟数据
	mock:false,
	
	// 公共开关
	requestLoading: true, //是否请求前开启loading
	requestLoadingMsg: '加载中...',//loading文本
	
	// http请求
	
	httpServer: '', //接口地址
	httpUrlSuffix:'.do',//请求url后缀
	httpTimeOut: 10000, //ajax请求超时时间
	httpSuccessCode:200,//http成功状态码
	httpStateField:'status',//http请求状态字段，axios是status，小程序是statusCode
	httpResponseType:'',//responseType数据类型
	httpMethod:'post',//默认http method发送方式
	httpHeader:{},//设置请求头
	
	// res数据
	resAutoHandleData:true,//自动数据预处理
	resAutoCheckState:true,//自动预检状态码
	resShowSuccessMsg:true,//自动显示成功消息
	resShowFailMsg:true,//自动显示错误消息
	resSuccessMsg:(msg => {//自动弹出服务器成功信息
		console.log("resSuccessMsg：",msg)
	}),
	resFailMsg:(msg => {//自动弹出服务器失败信息
		console.log("resFailMsg：",msg)
	}),
	resSuccess:(() =>{ //Success回调
		console.log("success callback");
	}),
	resFail:(() =>{ //Fail回调
		console.log("error callback");
	}),
	resCatch:(() =>{ //Catch回调
		console.log("catch callback");
	}),
	resSuccessCode:0, //api成功状态码
	resAddApiAddress:'address',//给返回的数据中添加字段名称
	resAddRemark:'remark', //显示记录备注
	resAddSuccessField:'success',//会给结果补充一个成功字段
	resDataField: 'data', //表层数据字段名
	resDepthFieldUrl:'data',//深层数据对象路径字符串用"."分割，一般是在有分页或深层数据情况下使用
	resMsgField:'msg',//服务器消息字段
	resMsgText:'成功!',//服务器消息字段
	resStateFields: ['state'], //状态字段字段数组，每1个都会判断是否正确，兼容多种接口
	resTransformField:'transform',//转换字段名称
	resTransformSuffixField: 'Format', //转换字段后缀
	resDictionaryValueField:'value',//对比字典中的字段
	resDictionaryConfigField:'dictionary',//字典字段名称
	resDictionarySuffixField: 'Dic', //转换字段后缀
	
	// token
	tokenAutoSend:true,//自动发送token
	tokenTestValue:'', //测试的token字符串
	tokenSendPostion: 'headers', //发送位置：'header、params'
	tokenSendField: 'token', //如果在头部，则设置请求名称

	// 分页
	pageAutoSend:false,//请求时自动发送分页参数
	pageIndex: 1, //请求页数
	pageSize: 10, //数量
	pageSizeField: 'pageSize',
	pageIndexField: 'pageNo',

	// http错误中文提示文本
	httpThrowText: {
		"400": '请求错误',
		"401": '未授权，请登录',
		"403": '拒绝访问',
		"404": '请求地址出错',
		"408": '请求超时',
		"500": '服务器内部错误',
		"501": '服务未实现',
		"502": '网关错误',
		"503": '服务不可用',
		"504": '网关超时',
		"505": 'HTTP版本不受支持',
		"9000": '登录状态已经失效，请从新登录。',
		"2000": '接口配置错误'
	},

	// 根据状态码返回错误中文文本
	getThrowText(code) {
		let text = '服务器请求错误';
		Object.keys(config.httpThrowText).map(key => {
			if (parseInt(key) === parseInt(code)) {
				text = config.httpThrowText[key]
			}
		})
		return text
	},
	
	
	// 判断res状态码是否正确
	cbCheckResState(res){
		return this.resStateFields.some(item => {
			return res[item] === this.resSuccessCode
		})
	},
	
	// 判断http状态码请求状态码是否正确
	cbIsHttpSuccess(code){
		return code == this.httpSuccessCode;
	}
}

export default config