<style scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  max-width: 180px;
  min-width: 180px;
  min-height: 400px;
}

.el-submenu .el-menu-item {
  min-width: 180px !important;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.el-menu-item.is-active {
  background: linear-gradient(
    270deg,
    rgba(231, 17, 43, 0) 0%,
    rgba(231, 56, 56, 0.13) 47%,
    rgba(231, 56, 56, 0.46) 71%,
    rgba(231, 56, 56, 1) 100%
  );
}

.el-menu-vertical li {
  list-style: disc;
}

/* 顶部菜单 */
#header-menu {
  background: #1f2d3d;
  height: 70px !important;
}

.header-menu {
  text-align: right;
  font-size: 12px;
  background-color: #545c64;
  padding: 0 !important;
}

/* header-menu 缩写为h-m */
.h-m-handle {
  background: yellow;
}

.h-logo {
  background: red;
  width: 180px;
  height: 70px;
  float: left;
  color: #fff;
  display: table-cell;
  vertical-align: middle;
  /* background: #358dff; */
}

.h-logo-main {
  width: 100%;
  height: 30px;
}

.h-logo-icon {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.h-logo-icon img {
  width: 64%;
  height: 67%;
}

.h-logo-text {
  float: left;
  height: 70px;
  font-size: 18px;
  font-family: JLinXin;
  line-height: 70px;
  color: rgba(255, 255, 255, 1);
}

.h-m-toggle {
  background: #324057;
  width: 60px;
  height: 70px;
  float: left;
  text-align: center;
  line-height: 70px;
}

.h-m-toggle .iconfont {
  color: #fff;
}

.h-m {
  float: left;
  position: relative;
  height: 70px;
  width: 100%;
}

.h-m div.ul {
  position: absolute;
  bottom: 0;
}

.h-m div.cell-list {
  position: absolute;
  bottom: 0;
}

.h-m div.cell {
  float: left;
  list-style: none;
  width: 130px;
  height: 40px;
  position: relative;
  background: #fff;
}

.h-m div.cell > div {
  height: 40px;
  line-height: 40px;
  color: #fff;
  text-align: center;
  font-size: 16px;
}

.h-m div.cell div:first-child {
  background: #1f2d3d;
}

.h-m div.cell div:last-child {
  width: 0;
  height: 0;
  border-bottom: 36px solid #fff;
  border-right: 20px solid transparent;
  position: absolute;
  right: 4px;
  bottom: 0px;
  float: left;
  display: none;
}

.h-m .cell .active {
  font-weight: bold;
  color: rgba(51, 122, 183, 1) !important;
  background: #fff !important;
  float: left;
  width: 106px;
  border-radius: 5px 5px 0 0;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

/* 3种圆角位置 */
.b-r-1 {
  border-radius: 5px 5px 0 0;
}

.b-r-2 {
  border-radius: 0 0 5px 0px;
}

.b-r-3 {
  border-radius: 0 0 0 5px;
}

.bg-1F2D3D {
  background: #1f2d3d !important;
}

.bg-fff {
  background: #ffffff;
}

.offset {
  position: absolute;
  left: -5px;
}

.w-96 {
  width: 96px;
}

.triangle-bl {
  width: 0;
  height: 0;
  border-bottom: 46px solid #fff;
  border-right: 20px solid transparent;
  position: absolute;
  right: 4px;
  bottom: 0px;
}

.none {
  display: none;
}

.block {
  display: block !important;
}

/* header右侧操作区 */
#header-handle {
  color: #fff;
  height: 70px;
  line-height: 70px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 14px;
}

#header-handle > div {
  float: left;
  height: 70px;
}

#header-handle .h-h-close {
  color: rgba(231, 56, 56, 1);
  margin-right: 15px;
}

#header-handle .head-img {
  margin-left: 30px;
  display: flex;
  align-items: center;
}

#header-handle .head-img img {
  height: 40px;
  width: 40px;
  border-radius: 40px;
  border: 2px solid #fff;
}

#header-handle .line {
  margin: 0 30px;
  width: 1px;
  border-left: 1px solid #ccc;
  height: 30px !important;
}

#header-handle .icon-yhsz {
  font-size: 30px;
  color: #549cfe;
}

.rule {
  margin-left: 20px;
}

.el-main {
  background: #f4f7fe;
}

.content {
  margin-top: 10px;
}

.hp-100 {
  height: 100%;
}

.tips {
  font-size: 14px;
  color: rgba(53, 141, 255, 1);
  line-height: 40px;
}

.el-submenu .el-menu-item {
  padding-left: 60px !important;
}

.t-f {
  height: 19px;
  font-size: 14px;
  font-family: "MicrosoftYaHei";
  color: rgba(150, 168, 191, 1);
  line-height: 19px;
}
.change-project {
  cursor: pointer;
}
</style>
<style >
.el-message-box__wrapper .el-message-box__message {
  text-align: center !important;
}
.el-message-box__wrapper .el-message-box__btns {
  text-align: center !important;
}
.el-menu .el-menu-item-group > div,
.el-menu-item-group__title {
  padding: 0 0 0 0px;
}
.title1 {
  position: relative;
  font-size: 14px;
}

.tit-2 {
  display: inline-block;
  margin-left: 8px;
}
</style>

<template>
  <div class="hp-100">
    <el-container class="hp-100">
      <el-header class="header-menu" id="header-menu">
        <!-- 菜单左侧 -->
        <div class="h-m-handle">
          <div class="fl">
            <div class="h-logo" :style="`width:${!isCollapse?'180px':'64px'}`">
              <div class="h-logo-main">
                <div class="h-logo-icon">
                  <img v-if="!isCollapse" :src="logoUrl" alt width="180px" height="70px" />
                  <img v-else :src="menuurl" alt width="64px" height="70px">
                </div>
              </div>
            </div>
            <div class="h-m-toggle" @click="showMenu()">
              <i class="iconfont" :class="{'icon-qh2' : isCollapse,'icon-qh' : !isCollapse}"></i>
            </div>
          </div>

          <div class="fl" style="width: calc(100% - 250px);">
            <el-row>
              <!-- 菜单中部  3级菜单 -->
              <el-col :span="11">
                <div class="h-m">
                  <div class="cell-list">
                    <div :key="key" v-for="(item,key) in menu" :class="item.className.parent" @click="toggleMenu(key,item)">
                      <div :class="item.className.firstChild">{{item.name}}</div>
                      <div :class="item.className.lastChild"></div>
                    </div>
                    <!-- 装饰圆角，勿删 -->
                    <div class="cell offset" v-if="menu.length>0">
                      <div :class="{'b-r-3' : menuActiveIndex == menu.length-1}"></div>
                      <div></div>
                    </div>
                    <!-- 装饰圆角，勿删 -->
                  </div>
                </div>
              </el-col>

              <!-- 菜单右侧 操作栏 -->
              <el-col :span="13">
                <div id="header-handle">
                  <div>
                    <!-- <el-select
                                                v-model="userInfo.defaultPropertyId"
                                                placeholder="请选择"
                                                @change="changeProperty"
                                                
                                        >
                                            <el-option
                                                    v-for="item in myPropertyList"
                                                    :key="item.propertyId"
                                                    :label="item.propertyName"
                                                    :value="item.propertyId"
                                            ></el-option>
                                        </el-select> -->
                  </div>
                  <div class="head-img">
                    <img src="@/assets/image/public/head.png" alt v-if="!userUrl" />
                    <img :src="userUrl" alt="" v-else>
                  </div>
                  <div class="rule">{{userInfo.tname}}</div>
                  <div class="line"></div>
                  <div>
                    <i @click="openSetWindow()" class="iconfont icon-yhsz" style="font-size: 30px;"></i>
                  </div>
                  <div class="line"></div>
                  <div class="h-h-close">
                    <i @click="loginOut()" class="iconfont icon-tc" style="font-size: 30px;"></i>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-header>

      <el-container>
        <el-menu :default-active="actIndex" background-color="#324057" text-color="#A0A7B0" active-text-color="#fff" class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :collapse-transition="false" unique-opened>
          <el-menu-item index="1" @click="gohome">
            <i class="iconfont icon-sy"></i>
            <span slot="title" class="mgl-10">个人门户</span>
          </el-menu-item>
          
          <el-submenu :key="item$parent.index" :index="item$parent.index" v-for="(item$parent,index) in menus">
            <template slot="title">
              <i class="iconfont" :class="item$parent.icon"></i>
              <span slot="title" class="mgl-10">{{item$parent.name}}</span>
            </template>

            <el-menu-item-group v-if="item$parent.children && item$parent.children.length > 0">
              <el-menu-item @click.native="gotoPage(item$parent,item$Child)" :key="item$Child.index" :index="item$Child.index" v-for="(item$Child,indexC) in item$parent.children">

                <li>{{item$Child.name}}</li>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="10" @click.native="gotoIAM()">
            <i class="iconfont icon-sy"></i>
            <span slot="title" class="mgl-10">资产管理</span>
          </el-menu-item>
        </el-menu>

        <el-main>
          <!-- position -->
          <!-- <el-breadcrumb separator="/">
                        <el-breadcrumb-item :key="item" v-for="item in position">{{item}}</el-breadcrumb-item>
                    </el-breadcrumb> -->
          <div class="title1" v-if='title'>
            <span class="tit-2">{{title}}</span>

          </div>
          <!-- 内容区 -->
          <div class="content">
            <router-view @updateProject="updateProject"></router-view>
          </div>
          <div>
          </div>

        </el-main>

      </el-container>
    </el-container>

    <!-- 密码设置 -->
    <el-dialog title="用户设置" :visible.sync="dialog.userSetPwd" width="60%" :close-on-click-modal='false' :show-close='false'>
      <el-form ref="userSetPwd" :model="userSetPwd" label-width="120px">
        <div class="dialog-title">用户信息</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="系统账号">
              <el-input v-model="userSetPwd.username" :value="userSetPwd.username" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input v-model="userSetPwd.tname" :value="userSetPwd.tname" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--                <div class="dialog-title">-->
        <!--                    <el-checkbox v-model="checkedUpdateGym">默认设置</el-checkbox>-->
        <!--                </div>-->
        <!--                <el-row>-->
        <!--                    <el-col :span="8">-->
        <!--                        <el-form-item label="默认项目" prop="defaultPropertyId">-->
        <!--                            <el-select-->
        <!--                                    v-model="userSetPwd.defaultPropertyId"-->
        <!--                                    :disabled="!checkedUpdateGym"-->
        <!--                                    placeholder="请选择"-->
        <!--                                    style="width: 100%;"-->
        <!--                            >-->
        <!--                                <el-option-->
        <!--                                        v-for="item in myPropertyList"-->
        <!--                                        :key="item.propertyId"-->
        <!--                                        :label="item.propertyName"-->
        <!--                                        :value="item.propertyId"-->
        <!--                                ></el-option>-->
        <!--                            </el-select>-->
        <!--                        </el-form-item>-->
        <!--                    </el-col>-->
        <!--                    <el-col :span="8">-->
        <!--                        <div class="tips">（设置用户登陆后显示默认项目的数据）</div>-->
        <!--                    </el-col>-->
        <!--                </el-row>-->
        <div class="dialog-title">
          <el-checkbox v-model="checkedUpdatePwd">修改密码</el-checkbox>
        </div>
        <el-row>
          <el-col :span="8">
            <el-form-item :rules="checkedUpdatePwd ? [{
							required: true,
							message: '请输入旧密码',
							trigger: 'blur'
						}] : []" label="旧密码" prop="oldPwd">
              <el-input v-model="userSetPwd.oldPwd" :disabled="!checkedUpdatePwd" show-password clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :rules="checkedUpdatePwd ? [{
							required: true,
							message: '请输入新密码',
							trigger: 'blur'
						},{
							validator: validatePass,
							trigger: 'blur'
						},{
							validator: validateInput,
							trigger: 'blur',
						}] : []" label="新密码" prop="newPwd">
              <el-input v-model="userSetPwd.newPwd" :disabled="!checkedUpdatePwd" show-password clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <div class="tips">（6~12位字符，可含有数字、字母、下划线‘_’任意组合，不能使用中文、空格、非法字符）</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :rules="checkedUpdatePwd ? [{
							required: true,
							message: '请输入确认密码',
							trigger: 'blur'
						},{
							validator: validatePass2,
							trigger: 'blur'
						},{ 
							validator: validateInput,
							trigger: 'blur' ,
						}] : []" label="确认密码" prop="newPwds">
              <el-input v-model="userSetPwd.newPwds" :disabled="!checkedUpdatePwd" clearable show-password></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="dialog-handle-btngroup">
              <el-button :disabled="!checkedUpdatePwd && !checkedUpdateGym" type="primary" @click="submitForm('userSetPwd')">保存
              </el-button>
              <el-button @click="resetForm('userSetPwd')">重置</el-button>
              <el-button @click="cloaseSetWindow()">取消</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!--/ 密码设置  -->
  </div>
</template>


<script>
import md5 from "js-md5";
import homeConfig from "./homeConfig";
import helper from "@/assets/js/ajax/helper";
import validata from "@/assets/js/validata.js";
const { menus, menuClass } = homeConfig;

export default {
  data() {
    // 两次密码需相同
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6 || value.length > 12) {
        callback(new Error("密码长度为6-12位!"));
      } else {
        if (this.userSetPwd.newPwd !== "") {
          this.$refs.userSetPwd.validateField("newPwds");
        }
        callback();
      }
    };

    // 两次密码需相同
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userSetPwd.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    // 输入乱码
    let validateInput = (rule, value, callback) => {
      if (this.checks(value)) {
        callback(new Error("不能含有特殊字符！！"));
      } else {
        callback();
      }
    };

    return {
      title: localStorage.getItem("title") ? localStorage.getItem("title") : "",
      checkedUpdateGym: true,
      checkedUpdatePwd: false,
      isCollapse: true,
      activeIndex: "1",
      activeIndex2: "1",
      menuClass, //菜单类名列表
      menuActiveIndex: 0, //菜单选择键位
      value: "",
      menu: [], //3级菜单
      menus,
      position: [], //页面定位
      rules: {
        //验证规则
        oldPwd: [
          {
            required: true,
            message: "请输入旧密码",
            trigger: "blur"
          }
        ],
        newPwd: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur"
          },
          {
            validator: validatePass,
            trigger: "blur"
          },
          {
            validator: validateInput,
            trigger: "blur"
          }
        ],
        newPwds: [
          {
            required: true,
            message: "请输入确认密码",
            trigger: "blur"
          },
          {
            validator: validatePass2,
            trigger: "blur"
          },
          {
            validator: validateInput,
            trigger: "blur"
          }
        ]
      },
      dialog: {
        //窗体控制
        userSetPwd: false
      },
      validatePass,
      validateInput,
      validatePass2,
      userSetPwd: {
        newPwd: null,
        oldPwd: null,
        newPwds: null
      }, //用户设置密码
      userInfo: {
        defaultPropertyId: null
      }, //用户信息详情
      // myPropertyList: [], //项目列表
      operate: {}, //当前运营信息
      logoUrl: require("@/assets/image/public/logo.png"),
      menuurl: require("@/assets/image/exp-logo-mini.png"),
      userUrl: null,
      actIndex: "1-1-4",
      deptId: null, //获取权限的组织ID
      perList: [], //一级列表
      perListT: [] //二级
    };
  },
  // computed: {
  //   title() {
  //     let tle = this.$route.meta.title;
  //     return tle;
  //   }
  //   // buttonOptControl(){
  //   //     return this.$store.state.buttonOptControl
  //   // }
  //   // actIndex(){
  //   //     let path=this.$route.path
  //   //     if(path=='/index'){
  //   //         return '1'
  //   //     }
  //   // }
  // },
  watch: {
    $route: {
      handler: function(newVal, oldVal) {
        if (newVal.path == "/process/processlist") {
          switch (newVal.query.listpagetype) {
            case "wait":
              this.title = "工作流程 / 待办事宜";
              this.actIndex = "4-2";
              localStorage.setItem("actIndex", this.actIndex);
              break;
            case "already":
              this.title = "工作流程 / 已办事宜";
              this.actIndex = "4-3";
              localStorage.setItem("actIndex", this.actIndex);
              break;
            case "end":
              this.title = "工作流程 / 办结事宜";
              this.actIndex = "4-4";
              localStorage.setItem("actIndex", this.actIndex);
              break;
            case "send":
              this.title = "工作流程 / 抄送流程";
              this.actIndex = "4-5";
              localStorage.setItem("actIndex", this.actIndex);
              break;
            case "search":
              this.title = "工作流程 / 流程查询";
              break;
            default:
              break;
          }
        } else if (newVal.path == "/process/newprocess") {
          switch (newVal.query.listpagetype) {
            case "wait":
              this.title = "工作流程 / 待办事宜";

              break;
            case "already":
              this.title = "工作流程 / 已办事宜";

              break;
            case "end":
              this.title = "工作流程 / 办结事宜";

              break;
            case "send":
              this.title = "工作流程 / 抄送流程";
              break;
            case "search":
              this.title = "工作流程 / 流程查询";
              break;
            default:
              this.title = "工作流程 / 新建流程";
              break;
          }
        } else {
          if (newVal.path == "/system/maintenance") {
            this.actIndex = "2-4";
            localStorage.setItem("actIndex", this.actIndex);
          } else if (newVal.path == "/index") {
            this.actIndex = "1";
            localStorage.setItem("actIndex", this.actIndex);
          }
          this.title = newVal.meta.title;
        }
        localStorage.setItem("title", this.title);
      },
      // 深度观察监听
      deep: true
    }
  },

  mounted() {
    // this.showMenu();
    // this.getactIndex();
    // this.setMenuInit();
    // this.getUserInfo();
    // // this.getMyPropertyList();
    // this.operateDetail();
    this.getToken()
    console.log(this.$ajax)
  },

  methods: {
    getToken(){
      this.$ajax.getToken
        .getToken({
          params: {
            type: 0,
            userName:'youlong2',
            passWord:md5('123456')
          }
        })
        .then(res => {
          if (res.state === 1000) {
            this.operate = res.data;
            if (this.operate.url) {
              this.logoUrl = this.operate.url;
              this.menuurl = this.operate.menuurl;
            }
          }
        });
    },
    gotoIAM() {
      window.open("http://106.55.248.219:9999/amsweb/#/home");
    },
    getactIndex() {
      //菜单默认选中
      if (this.$route.path == "/index") {
        this.actIndex = "1";
      } else {
        this.actIndex = localStorage.getItem("actIndex");
      }
    },
    // 获取项目数据
    operateDetail() {
      this.$ajax.operateDetail
        .selectInfoById({
          params: {
            id: 1
          }
        })
        .then(res => {
          if (res.state === 1000) {
            this.operate = res.data;
            if (this.operate.url) {
              this.logoUrl = this.operate.url;
              this.menuurl = this.operate.menuurl;
            }
          }
        });
    },
    updateProject(e) {
      // this.getMyPropertyList();
    },
    goGrouphome() {
      // this.$router.push({ path: "/count" });
    },
    /**验证输入框是否非法字符  是非法字符 则返回true**/
    checks(newName) {
      // var regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
      //     regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
      var regCn = /^\w+$/;
      if (!regCn.test(newName)) {
        return true;
      }
      return false;
    },
    //进入首页
    gohome() {
      this.$router.push({ path: "/index" });
    },
    // 获取项目列表
    // getMyPropertyList() {
    //     this.$ajax.common.myPropertyList().then(res => {
    //         if (res.success) {
    //             this.myPropertyList = res.data;
    //         }
    //     });
    // },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          switch (formName) {
            case "userSetPwd":
              this.sendUpdateUserInfo();
              break;
            default:
              break;
          }
        } else {
          console.log("valid fail");
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 发送修改的用户信息
    sendUpdateUserInfo() {
      const { newPwd, oldPwd, defaultPropertyId, newPwds } = this.userSetPwd;
      if (this.checkedUpdateGym && !this.checkedUpdatePwd) {
        // this.updateproperty(defaultPropertyId);
      } else if (!this.checkedUpdateGym && this.checkedUpdatePwd) {
        this.userSetPwd.newPwd = md5(newPwd);
        this.userSetPwd.oldPwd = md5(oldPwd);
        this.userSetPwd.newPwds = md5(newPwds);
        this.updatePwd();
      } else if (this.checkedUpdateGym && this.checkedUpdatePwd) {
        // this.updateproperty(defaultPropertyId);
        this.userSetPwd.newPwd = md5(newPwd);
        this.userSetPwd.oldPwd = md5(oldPwd);
        this.userSetPwd.newPwds = md5(newPwds);
        this.updatePwd();
      }
    },
    // 修改密码
    updatePwd() {
      let that = this;
      this.$ajax.staffs
        .updateSysUser({
          params: this.userSetPwd
        })
        .then(res => {
          if (res.state === 1000) {
            localStorage.removeItem("token");
            that.$message({
              type: "error",
              message: "您已成功修改密码，请重新登录"
            });
            that.$router.push("/login");

            // this.getUserInfo();
            // this.cloaseSetWindow();
          } else {
            this.resetForm("userSetPwd");
          }
        });
    },
    // 修改项目
    updateproperty(defaultPropertyId) {
      this.$ajax.login
        .updateDefaultProperty({
          params: {
            defaultPropertyId
          }
        })
        .then(res => {
          // this.getUserInfo();
          // this.cloaseSetWindow();
        });
    },
    // 获取用户信息
    // getUserInfo() {
    //     let that=this
    //     this.$ajax.login.myinfo().then(res => {

    //         if(res.state!=1000){
    //             localStorage.removeItem("token");
    //             this.$router.push("/login");
    //             that.$message.error(res.msg)
    //             return
    //         }
    //         let data = res.data;
    //         if (data) {
    //             this.userInfo = data;
    //             this.userSetPwd = data;
    //             let defaultPropertyId;
    //             if (data.defaultPropertyId) {
    //                 defaultPropertyId = data.defaultPropertyId;
    //             }
    //             if(data.url){
    //                 this.userUrl=data.url
    //             }
    //             this.deptId=data.deptid
    //             this.getPermissionInfo(this.deptId)
    //             localStorage.setItem("defaultPropertyID", defaultPropertyId);
    //         }
    //     });
    // },
    getUserInfo() {
      let that = this;
      this.$ajax.staffs.getUserInfoById({ params: {} }).then(res => {
        if (res.state != 1000) {
          localStorage.removeItem("token");
          this.$router.push("/login");
          that.$message.error(res.msg);
          return;
        }
        localStorage.setItem("tname", res.data.tname);
        localStorage.setItem("deptName", res.data.deptName);
        let data = res.data;
        if (data) {
          this.userInfo = data;
          this.userSetPwd = data;
          let defaultPropertyId;
          if (data.defaultPropertyId) {
            defaultPropertyId = data.defaultPropertyId;
          }
          if (data.url) {
            this.userUrl = data.url;
          }
          this.deptId = data.deptid;

          localStorage.setItem("defaultPropertyID", defaultPropertyId);
        }
      });
      this.getPermissionInfo();
    },

    // 获取所有项目
    async getGymNameList() {
      this.gymList = await this.$common.getGymList();
    },
    //获取权限列表
    getPermissionInfo() {
      this.$ajax.permission
        .getMenupermissionList({
          params: {propertyId:1}
        })
        .then(res => {
          if (res.state === 1000) {
            if (res.data) {
              let arr = JSON.parse(JSON.stringify(res.data));
              this.getList(arr);
            }
          }
        });
    },
    getList(val) {
      let arr1 = [];
      let arr2 = [];
      val.forEach(item => {
        let obj = item;
        if (item.level === 1) {
          console.log(item)
          if(item.children){
          item.children.forEach(item => {
            // if (item.children.length > 0) {
            arr1.push(obj.description);
            arr2.push(item.description);
            // item.children.forEach(item => {
            //   arr3.push(item.icon);
            // });
            // }
          });
          }
        }
      });

      this.perList = arr1;
      this.perListT = arr2;
      // for (let key in this.$store.state.buttonOptControl) {
      //   if (arr3.indexOf(key) != -1) {
      //     this.$store.commit("setButtonOptControl", key);
      //   }
      // }
    },
    isShowIt(val, valList) {
      let flag = false;
      if (valList.indexOf(val) >= 0) {
        return (flag = true);
      }
    },

    // 打开设置窗口
    openSetWindow() {
      this.dialog.userSetPwd = true;
    },
    // 关闭设置窗口
    cloaseSetWindow() {
      this.resetForm("userSetPwd");
      this.dialog.userSetPwd = false;
    },
    // 页面跳转和1、2、3级菜单处理
    gotoPage(menuLv1, menuLv2) {
      this.menu = [];
      // this.position = ["首页", menuLv2.name];
      this.position.push(this.$route.meta.title);
      let menuLv3 = menuLv2.children || null;
      let path = menuLv2.url;

      if (menuLv3 && menuLv3.length > 0) {
        this.menu = menuLv3;
        // this.position.push(menuLv3[0].name);
        this.setMenuInit();
        path = menuLv3[0].url;
      }
      localStorage.setItem("actIndex", menuLv2.index);
      this.$router.push({
        path,
        query: menuLv2.query ? menuLv2.query : ""
      });
    },
    //菜单折叠显示
    showMenu() {
      this.isCollapse = !this.isCollapse;
    },
    // 菜单切换路由
    toggleMenu(index, item) {
      this.position[this.position.length - 1] = item.name;

      this.$router.push({
        path: item.url
      });

      this.changeMenuStyle(index, item);
    },
    // 菜单切换样式
    changeMenuStyle(index, item) {
      this.menuActiveIndex = index;
      const menuLen = this.menu.length;
      let preKey = index > 0 ? index - 1 : 0;
      let nextKey = index + 1 >= menuLen ? menuLen - 1 : index + 1;
      let queue = {
        pre: preKey,
        next: nextKey,
        active: index
      };

      this.menu.map((val, key) => {
        let type = "default";
        Object.keys(queue).map(item => {
          if (key == queue[item]) {
            type = item;
          }
        });
        val.className = this.getClass(type);
        this.$set(this.menu, key, val);
      });
    },
    // 菜单初始化
    setMenuInit() {
      this.menu.map((val, key) => {
        val.className = this.getClass(["active", "next"][key]);
      });
    },
    // 获取样式
    getClass(type = "default") {
      return this.menuClass.find(item => {
        return item.type == type;
      });
    },
    // 菜单打开
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    // 菜单关闭
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    // 菜单选择
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    // 退出登录
    loginOut() {
      let _this = this;

      function out() {
        localStorage.removeItem("token");
        // _this.$router.push("/login");
        window.location.href='http://106.55.248.219:9999/platform/#/login'
      }
      // this.$confirm('确定退出登录吗？', {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning"
      // }).then(()=> {
      //     this.$ajax.login
      //         .logout()
      //         .then(res => {
      //             out();
      //         })
      //         .catch(res => {
      //             out();
      //         });
      //     done();
      // });
      this.$confirm("确定退出系统？")
        .then(_ => {
          this.$ajax.login
            .logout()
            .then(res => {
              out();
            })
            .catch(res => {
              out();
            });
          done();
        })
        .catch(_ => {});
    }
    // 切换项目
  }
};
</script>
