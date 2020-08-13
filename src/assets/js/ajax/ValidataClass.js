import helper from './helper'; //工具类

// 验证规则
const checkDataRules = {
	required(val, rule) { //必填
		return (val != '') && (val != null);
	},
	min(val, rule ,params) { //最小
		return val >= rule
	},
	// 最大
	max(val, rule,params) {
		return val <= rule
	},
	// 大小在数组之间
	between(val, rule,params) {
		return val > rule[0] && val < rule[1]
	},
	//回调
	callback(val, custom ,params) {
		return custom(val,params)
	},
	// 是否是url
	url(value) {
		return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
			.test(value)
	},
	/**
	 * 验证日期格式
	 */
	date(value) {
		return !/Invalid|NaN/.test(new Date(value).toString())
	},
	/**
	 * 验证ISO类型的日期格式
	 */
	dateISO(value) {
		return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
	},
	/**
	 * 验证十进制数字
	 */
	number(value) {
		return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
	},
	/**
	 * 验证整数
	 */
	digits(value) {
		return /^\d+$/.test(value)
	},
	/**
	 * 验证身份证号码
	 */
	idcard(value) {
		return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)
	},
	/**
	 * 验证是否包含某个值
	 */
	contains(value, param) {
		return value.indexOf(param) >= 0
	},
	/**
	 * 验证最小长度
	 */
	minlength(value, param) {
		return value.length >= param
	},
	/**
	 * 验证最大长度
	 */
	maxlength(value, param) {
		return value.length <= param
	},
	/**
	 * 验证一个长度范围[min, max]
	 */
	rangelength(value, param) {
		return (value.length >= param[0] && value.length <= param[1])
	},
	// 乱码
	checkSpecialKey(val) {
		const specialKey = "[`~!#$^&*()=|{}':;'\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
		for (let i = 0; i < val.length; i++) {
			if (specialKey.indexOf(val.substr(i, 1)) != -1) {
				return false;
			}
		}
		return true;
	},
	// 是否为表情
	existEmoji(val, rule) {
		const reg =
			/([^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n])|(\s)/g;
		return reg.match(val);
	},
	//只输入数字和字母
	cardNum(val, rule) {
		const reg = /^[0-9a-zA-Z]+$/g;
		return val.match(reg);
	},
	// 
	numString(val, rule) {
		const reg = /^[1-9][0-9]*([.]{1}[0-9]+){0,1}$/g;
		return val.match(reg);
	},
	//电话
	isPhone(val) {
		return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(val)
	},
	//中文长度
	chNum(val) {
		return /^[0-9\u4e00-\u9fa5]+$/.test(val);
	},
	//邮箱
	email(val) {
		return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(val)
	},
	// 身份证
	creditCard(val) {
		const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx])|(^[1−9]\d5\d2((0[1−9])|(10|11|12))(([0−2][1−9])|10|20|30|31)\d2[0−9Xx])/;
		return reg.test(val);
	},
	// 护照
	passPort(val) {
		const reg = /^1[45][0-9]{7}|([P|p|S|s]\d{7})|([S|s|G|g]\d{8})|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8})|([H|h|M|m]\d{8，10})$/;
		return reg.test(val);
	},

	//军官证
	officerCard(val) {
		const reg = /([\u4e00-\u9fa5]{1}(\d{4,8})$)/;
		return reg.test(val);
	}
}

// 验证类
export default class dataValiClass {
	constructor(config,params) {
		this.res = []
		this.rules = checkDataRules;
		this.format = helper.strFormat;
		this.config = config;
		this.params = params;
	}
	/**
	 * resolveRule 分解验证规则
	 * @params [Object] rule 规则
	 * @params [Object] field 字段
	 */
	resolveRule(rule, field) {
		let res = {}

		Object.keys(rule).forEach(key => {
			if (this.rules.hasOwnProperty(key)) {
				const value = this.params[field];
				const message = this.format(rule.message || '', rule[key]);
				const pass = this.rules[key](value, rule[key],this.params);
				
				res = {
					message,
					pass,
					field,
					value
				}
			}
		})
		return res;
	}
	
	//改变验证结果对象结构
	changeResObj(resArr) {
		let obj = {};
		for (let item of resArr) {
			let field = item.field;
			if (!obj[field]) {
				obj[field] = [];
			}
			const {message,pass,value} = item;
			obj[field].push({message,pass,value})
		}
		return obj
	}
	

	// 执行验证
	check() {
		let resArr = [];
		let firstError = {};
		let config = this.config;

		Object.keys(config).forEach(field => {
			config[field].map(rule => {
				const check = this.resolveRule(rule, field);
				if (!check.pass && Object.keys(firstError).length == 0) {
					firstError = check
				}
				resArr.push(check)
			})
		})
		
		return {
			firstError,
			params:this.params,
			checkDetail: this.changeResObj(resArr),
			allRight:resArr.every(item => item.pass == true),
		}
	}

	
}

