<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-09 13:58:54
 * @LastEditTime: 2019-10-12 15:41:16
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="sc-login">
    <div class="sc-top"></div>
    <!-- <img class="sc-logo" src="../../assets/login/sc-logo.png" alt="实验中学" /> -->
    <div class="sc-content">

      <div class="sc-content-right">
        <div class="left">
          <!-- <img class="form-logo" src="../../assets/login/sc-high.png" alt="实验中学" /> -->
          <!-- 密码登录、验证码登录 -->
          <div class="login-tab">
            <div :class="[loginForm.type==0?'login-tab-item-active':'login-tab-item']" @click="ispasswordtab(0)">密码登录</div>
            <div :class="[loginForm.type==1?'login-tab-item-active':'login-tab-item']" @click="ispasswordtab(1)">验证码登录</div>
          </div>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="top" style="box-sizing:border-box">
            <!-- 密码登录 -->
            <el-form-item label="账号" prop="username" v-if="loginForm.type==0">
              <el-input v-model.trim="loginForm.username" name="username" type="text" auto-complete="on" placeholder="请输入用户名" clearable />
            </el-form-item>
            <el-form-item label="密码" prop="password" v-if="loginForm.type==0">
              <el-input clearable v-model="loginForm.password" :type="pwdType" name="password" auto-complete="on" placeholder="请输入密码" @keyup.enter.native="handleLogin" />
            </el-form-item>
            <!-- 验证码登录 -->
            <el-form-item label="手机号" prop="tel" v-if="loginForm.type==1">
              <el-input v-model.trim="loginForm.tel" name="username" type="text" auto-complete="on" placeholder="请输入手机号" clearable />
            </el-form-item>
            <el-form-item label="验证码" prop="code" v-if="loginForm.type==1" id="codeinput">
              <el-input clearable v-model="loginForm.code" name="password" auto-complete="on" placeholder="请输入验证码" @keyup.enter.native="handleLogin" style="width:60%;" />
              <el-button type="danger" @click="getCodeFun" :disabled="disabled">
                <template v-if="sending">获取验证码</template>
                <template v-else>{{second}}秒后重发</template>
              </el-button>
            </el-form-item>

            <el-form-item v-if="loginForm.type==0">
              <div class="rem-pwd" @click="rememberPwd">
                <img class="check-box" v-show="loginForm.remPwd == 0" src="../../assets/login/checkbox.png" alt="">
                <img class="check-box" v-show="loginForm.remPwd == 1" src="../../assets/login/checkedBox.png" alt="">
                <span>记住密码</span>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button :loading="loading" type="danger" style="width:100%;" @click.native.prevent="handleLogin">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- <div class="right">
        </div>-->
      </div>
      <!-- <div class="sc-footer">湖北省武昌实验中学 版权所有</div> -->
    </div>

  </div>
</template>

<script>
const Base64 = require("js-base64").Base64;
import { md5 } from "md5js";
import { validUsername } from "@/utils/validate";
// import { create } from "istanbul-reports";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入正确的密码"));
      } else {
        if (value.length < 6) {
          callback(new Error("密码长度不能少于6位"));
        } else {
          callback();
        }
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      checkPhone: checkPhone,
      sending: true, //是否发送验证码
      disabled: false, //是否禁发验证码
      second: 60, //倒计时间
      loginForm: {
        username: "",
        password: "",
        remPwd: 0,
        type: 0, //登录方式： 0帐号密码登录 1手机号登录
        tel: "",
        code: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入手机号或身份证号" }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePass }
        ],
        tel: [{ required: true, trigger: "blur", validator: checkPhone }],
        code: [{ required: true, trigger: "blur", message: "请输入验证码" }]
      },
      loading: false,
      pwdType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    ispasswordtab(_is) {
      this.loginForm.type = _is;
      this.$refs["loginForm"].resetFields();
    },

    getCodeFun() {
      if (this.loginForm.tel == "") {
        return;
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (!reg.test(this.loginForm.tel)) {
          return;
        }
      }
      //his.sending原为true,请求成功，!this.sending == true，主要是防止有人把disabled属性去掉，多次点击；
      if (!this.sending) return;

      this.$ajax.sms
        .sendCode({
          params: {
            phone: this.loginForm.tel,
            type: 1
          }
        })
        .then(res => {
          if (res.state == 1) {
            this.$message(res.msg);
          } else {
            this.sending = false;
            this.disabled = true;
            this.timeDown();
          }
        });
    },
    timeDown() {
      let result = setInterval(() => {
        --this.second;
        if (this.second < 0) {
          clearInterval(result);
          this.sending = true;
          this.disabled = false;
          this.second = 60;
        }
      }, 1000);
    },
    rememberPwd() {
      this.loginForm.remPwd = this.loginForm.remPwd == 0 ? 1 : 0;
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;

          const { username, password, type, tel, code } = this.loginForm;
          let params = {};
          if (type === 0) {
            params = {
              userName: username.trim(),
              passWord: md5(password, 32),
              type: type
            };
          } else if (type === 1) {
            params = { username: tel.trim(), password: code, type: type };
          }
          this.$ajax.login
            .login({
              params
            })
            .then(res => {
              console.log('ashdajkshd',res)
              if (res.code === 'SUCCESS') {
                localStorage.setItem("token", res.token);
                if (this.loginForm.remPwd == 1) {
                  localStorage.setItem("username", this.loginForm.username);
                  localStorage.setItem(
                    "password",
                    Base64.encode(this.loginForm.password)
                  );
                } else {
                  localStorage.removeItem("username");
                  localStorage.removeItem("password");
                }
                this.$router.push("/index");
              }
              this.loading = false;
            });

          //   this.$store
          //     .dispatch("user/login", this.loginForm)
          //     .then(() => {
          //       if(this.loginForm.remPwd==1){
          //         localStorage.setItem("username",this.loginForm.username);
          //         localStorage.setItem("password",Base64.encode(this.loginForm.password))
          //       }else{
          //         localStorage.removeItem('username');
          //         localStorage.removeItem('password')
          //       }
          //       this.$router.push({ path: "/example/table" });
          //       this.loading = false;
          //     })
          //     .catch(() => {
          //       this.loading = false;
          //     });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  create() {
    if (localStorage.getItem("username")) {
      this.loginForm.username = localStorage.getItem("username");
      this.loginForm.password = Base64.decode(localStorage.getItem("password"));
      this.loginForm.remPwd = 1;
    }
  },
  mounted() {
    if (localStorage.getItem("username")) {
      this.loginForm.username = localStorage.getItem("username");
      this.loginForm.password = Base64.decode(localStorage.getItem("password"));
      this.loginForm.remPwd = 1;
    }
  }
};
</script>

<style lang="scss">
#codeinput .el-form-item__content {
  display: flex;
  justify-content: space-between;
}
#codeinput .el-form-item__content::after,
#codeinput .el-form-item__content::before {
  content: none;
}
.el-form--label-top .el-form-item__label {
  padding: 0;
}
.sc-login .el-form-item__content {
  width: 100%;
}
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.sc-login {
  position: fixed;
  height: 100%;
  width: 100%;
  // min-height: 800px;
  overflow: auto;
  // background-color: $loginBg;
  background: url("../../assets/login/sc-bgc.png") no-repeat;
  background-size: 100% 100%;
  .sc-top {
    width: 100%;
    height: 80px;
    background: rgba(0, 0, 0, 0.3);
  }
  .sc-logo {
    width: 190px;
    height: 270px;
    position: absolute;
    top: 0;
    left: 15%;
  }
  .sc-content {
    // margin-top: 145px;
    position: relative;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-around;
    height: calc(100% - 80px);
    min-height: 800px;
    align-items: center;
    .sc-content-right {
      height: 600px;
      width: 42%;
      min-width: 640px;
      // display: flex;
      // justify-content: space-between;
      background: url("../../assets/login/sc.png") no-repeat;
      background-size: 100% 100%;
      .left {
        margin: 58px 0 90px;
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .login-tab {
          max-width: 100%;
          width: 100%;
          padding: 0 8%;
          box-sizing: border-box;
          display: flex;
          margin-bottom: 20px;
          .login-tab-item {
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 12px 0;
            border-bottom: 2px solid #d8d8d8;
            font-size: 16px;
            font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
            font-weight: bold;
            color: rgba(72, 87, 106, 1);
          }
          .login-tab-item-active {
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 12px 0;
            font-size: 16px;
            font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
            font-weight: bold;
            color: rgba(231, 56, 56, 1);
            border-bottom: 2px solid #e73838;
          }
        }
      }
      .right {
        width: 50%;
        height: 100%;
      }
    }
    .sc-content-left {
      .txt-img {
        width: 600px;
        height: 200px;
      }
      // margin-left: 50px;
    }
    .sc-letter {
      font-size: 80px;
      font-family: "HYa0gj";
      color: rgba(255, 255, 255, 1);
      line-height: 126px;
      letter-spacing: 7px;
    }
    .sc-line {
      width: 307px;
      height: 8px;
      background: #fff;
      border-radius: 2px;
      margin-top: 30px;
    }
  }
  .sc-footer {
    font-size: 14px;
    font-family: "MicrosoftYaHei";
    color: rgba(150, 168, 191, 1);
    line-height: 20px;
    position: absolute;
    bottom: 40px;
    width: 100%;
    text-align: center;
  }
  .form-logo {
    // width: 75%;
    // height: 18%;
    width: 294px;
    height: 63px;
    margin: 0 auto;
    margin-bottom: 35px;
    box-sizing: border-box;
  }
  .login-form {
    // position: absolute;
    // left: 0;
    // right: 0;
    // width: 320px;
    max-width: 100%;
    width: 100%;
    padding: 0 8%;
    // margin: 120px auto;
  }
  .rem-pwd {
    width: 120px;
    line-height: 20px;
  }
  .check-box {
    width: 14px;
    height: 14px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 4px;
    margin-top: -3px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
