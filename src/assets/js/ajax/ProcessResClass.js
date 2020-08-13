
import helper from './helper'; //工具类
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
	arrIsHasLen,
} = helper;

// 处理结果
export default class ProcessResClass {
	constructor(res,api) {
		this._api = api;
		this._res = res;
		this._data = undefined;//深层数据
		this._stateSuccess = false;
		this._dataTransform = dataTransform;//需追加自定义方法
		this._queue = [
			'resCheckState',
			'resAddFields',
			'resShowMsgCallback',
			'resExecuteBeforeCallBack',
			'resGetDepthData',
			'resSetTransform',
			'resSetDictionary',
			'resExecuteAfterCallBack',
		];
		
		this.init();
		return this._res;
	}
	
	//初始化
	init(){
		Object.keys(this._api).map(item => this[item] = this._api[item]);
		this._queue.map(item => this[item]())
	}

	//弹窗处理
	resShowMsgCallback() {
		const {resMsgField,resShowSuccessMsg,resSuccessMsg,resShowFailMsg,resFailMsg} = this._api;
		const msg = this._res[resMsgField];
		
		if(this._stateSuccess && resShowSuccessMsg){
			resSuccessMsg(msg)
		}
		if(!this._stateSuccess && resShowFailMsg){
			resFailMsg(msg)
		}
	}

	
	//字典转换规则处理
	resSetTransFunction(field,rule,transConfig,data){
		let transData = {};
		const transFunction = this._dataTransform[rule];
		if(transFunction && !(field in transData)) {
			transData = this.resGetTransValue(data[field],transConfig[field][rule],transFunction)
		}
		return transData
	}
	
	// 字典获取转换后的值,如果结果是数组则遍历替换
	resGetTransValue(oldValue,setValue,transFunction){
		return Array.isArray(oldValue) 
			? oldValue.map(item => transFunction(item,setValue)) 
			: transFunction(oldValue, setValue);
	}
	
	// 字典转换
	resSetTransRule(data, transConfig) {
		let transData = {};
	
		Object.keys(transConfig).map(field => {
			Object.keys(transConfig[field]).map(rule => {
				transData[field] = this.resSetTransFunction(field,rule,transConfig,data)
			})
		})
		return transData
	}
	
	//设置字典标志
	resGetTransData(dataObject){
		let transData = this.resSetTransRule(dataObject, this._api[this.resTransformField]);
		Object.keys(transData).map(key => {
			dataObject[key + this.resTransformSuffixField] = transData[key];
		})
		return dataObject;
	}
	
	//记录集获取深层数据
	resGetDepthInfo(depthField){
		return depthField ? objFindDepth(this._res, depthField) : undefined;
	}
	
	//结果根据数据类型执行回调
	resBaseTypeExeCallback(callback){
		let data = this._data;
		if(data){
			if (dataCheckType(data, 'Array')) {
				data.map(item => callback(item))
			}
			if (dataCheckType(data, 'Object')) {
				data = callback(data);
			}
			this._res = objSetDepthValue(this._res,this.resDepthFieldUrl,data) || this._res;
		}
	}
	
	
	// 数据转换执行
	resDataTransform(){
		if (this._api[this.resTransformField]) {
			this.resBaseTypeExeCallback(data => this.resGetTransData(data))
		}
	}
	
	//检查返回数据状态
	resCheckState(){
		if (this.resAutoCheckState && this.cbCheckResState(this._res)) {
			this._stateSuccess = true;
		}
	}
	
	// 给返回数据添加字段
	resAddFields(){
		const {resAddApiAddress,resAddRemark,resAddSuccessField} = this._api
		if(resAddSuccessField){
			this._res[resAddSuccessField] = this._stateSuccess
		}
		if(resAddApiAddress){
			this._res[resAddApiAddress] = this._api[resAddApiAddress]
		}
		if(resAddRemark){
			this._res[resAddRemark] = this._api[resAddRemark] 
		}
	}
	
	// 获取res内部数据
	resGetDepthData(){
		if (this._stateSuccess) {
			this._data = this.resGetDepthInfo(this.resDepthFieldUrl);
		}
	}
	
	//转换预处理
	resSetTransform() {
		if (this._stateSuccess && this.resAutoHandleData) {
			this.resDataTransform()
		}
	}
	
	// 设置字典
	resSetDictionary(){
		if (this._stateSuccess && this._api[this.resDictionaryConfigField]) {
			this.resBaseTypeExeCallback(data => {
				return this.resGetDictionary(data)
			})
		}
	}
	
	
	//获取字典
	resGetDictionary(item){
		const dictionary = this._api[this.resDictionaryConfigField];
		Object.keys(item).map(key => {
			if(dictionary[key]){
				item[key + this.resDictionarySuffixField] = this.resSetDictionaryLabel(dictionary,key,item)
			}
		})
		return item
	}
	
	// 获取字典结果
	resSetDictionaryLabel(dictionary,key,item){
		const field = this._api.resDictionaryValueField;
		const value = item[key];
		let res = dictionary[key].find(it => {
			return it[field] == value
		})
		
		return res || { label:value,value}
	}


	
	// 执行前置回调
	resExecuteBeforeCallBack(){
		this._stateSuccess ? this.resSuccess() : this.resFail()
	}
	
	// 执行后置回调
	resExecuteAfterCallBack() {
		const callback = this.callback;
		if(callback){
			callback(this._res)
		}
	}
	
}

