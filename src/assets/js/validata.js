import helper from '@/assets/js/ajax/helper'




// 两次密码需相同
let validatePass = (rule, value, callback) => {
	console.log(rule, value, callback);
	if (value === '') {
		callback(new Error('请输入密码'));
	} else {
		if (this.userSetPwd.newPassword !== '') {
			this.$refs.userSetPwd.validateField('newPasswordConfirm');
		}
		callback();
	}
};

// 两次密码需相同
let validatePass2 = (rule, value, callback) => {
	if (value === '') {
		callback(new Error('请再次输入密码'));
	} else if (value !== this.userSetPwd.newPassword) {
		callback(new Error('两次输入密码不一致!'));
	} else {
		callback();
	}
};

// 输入乱码
let validateInput = (rule, value, callback) => {
	if (!helper.rules.checkSpecialKey(value)) {
		callback(new Error("不能含有特殊字符！！"));
	} else {
		callback();
	}
}
let isPhone = (rule,value,callback)=>{
	if(value){
		if(!helper.isPhone(value)){
			callback(new Error('请输入正确的手机号'))
		}else{
			callback()
		}
	}else{
		callback()
	}
}

export default {
	validatePass,
	validatePass2,
	validateInput,
	isPhone
}
