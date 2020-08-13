
import HttpRequestClass from './HttpRequestClass'; //请求类
import ProcessResClass from './ProcessResClass';//处理结果类
import helper from './helper'; //工具库
import config from './config';//默认配置
import constant from './constant';//常量

const {SYSTEM_WEB,MINI_PROGRAM} = constant;

const {
	objMap,
	objIsHasKey,
	objFindDepth,
	objSetDepthValue,
	objDeepMerge,
	objSetValueToClassPrivate,
	dataCheckType,
	dataTransform,
	strFormat,
	arrIsCanMap,
} = helper;

//创建api，主要用于合并各种初始化配置
class CreateApiClass {
	constructor(apiConfig,publicConfig = {}) {
		this._api = {}; //最终生成的api，导出直接使用
		this._apiConfig = apiConfig; //接口配置，使用后删除
		this._publicConfig = Object.assign({},config,publicConfig)
		this.init();
		return this._api;
	}

	// 初始化
	init() {
		this.judgeEnvSetConfig();
		this.setApiName();
		this.removeDiscardConfig();
	}
	
	//根据环境设置配置
	judgeEnvSetConfig() {
		// **需添加规则强制判断
		try{
			if(wx){
				this._publicConfig.system = MINI_PROGRAM.SYSTEM;
				this._publicConfig.httpStateField = MINI_PROGRAM.RES_STATE_FIELD;
			}
		}catch(e){
			//TODO handle the exception
		}
	}

	// 处理模块
	handleModule(callback) {
		objMap(this._apiConfig, res => callback(res))
	}

	// 设置api请求名
	setApiName() {
		objMap(this._apiConfig, res => {
			let { key, value } = res;
			this._api[key] = {};
			
			value.api.map(api => {
				api = this.mergeConfig(value, api)
				this._api[key][api.name] = this.createRequest(api)
			})
		})
	}

	// 合并接口url和公共配置
	mergeConfig(module, api) {
		api.address = module.moduleUrl + api.url;
		api.url = this.mergeHttpUrl(module, api)
		
		return Object.assign({},this._publicConfig,api)
	}
	
	// 拼接完整的请求地址
	mergeHttpUrl(module, api) {
		const moduleUrl = module.moduleUrl || '';
		const { query, url, httpUrlSuffix } = api;
		
		if (arrIsCanMap(query)) {
			url = strFormat(url, query)
		}
		if(url === 'doLogin'){
			console.log('process.env',process.env)
			const BASEURL = process.env.VUE_APP_LOGIN_BASE_URL
			return BASEURL + moduleUrl + url
		}else{
			return this._publicConfig.httpServer + moduleUrl + url
		}
		
	}

	// 移除不必要的配置
	removeDiscardConfig() {
		delete this._apiConfig;
	}

	// 创建请求函数
	createRequest(defaultConfig) {
		return newConfig => {
			this._api = objDeepMerge(defaultConfig,newConfig)
			return this.getRequestPromise(this._api)
		}
	}

	// 获取异步请求
	getRequestPromise(api) {
		return new HttpRequestClass(api).then(res => {
			return new ProcessResClass(res, api)
		}).catch(err =>{
			api.resCatch(err);
			return Promise.reject(err);
		})
	}
}

export default CreateApiClass
