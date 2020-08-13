<template>
  <div>
    <!-- 内容区 -->
    <div class="column-content">
      <div class="column-content-header wp-100">
        <h4>流程配置</h4>
      </div>
      <progressmenu currentpage="processconfig"></progressmenu>
      <!-- 公文传输流程 -->
      <div class="information" v-if="addshowtype=='official'">
        <h4>基本信息</h4>
        <el-form ref="officialform" :model="officialform" label-width="80px">
          <el-row>
            <el-col span="8">
              <el-form-item label="流程名称">
                <el-input v-model="officialform.name" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              <el-form-item label="流程类别">
                <el-input v-model="officialform.type" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              <el-form-item label="创建人员">
                <!--  <el-select v-model="officialform.approvalConfigs[0].dealerIds" placeholder="请选择人员" multiple collapse-tags>
              <el-option :label="item.name" :value="item.id" v-for="(item,index) in userList" :key="index"></el-option>
            </el-select> -->

                <!-- <el-button type="primary" @click="selectPeopleDialog = true">请选择</el-button> -->
                <el-input v-model="officialform.approvalConfigs[0].dealerName" type="textarea" autosize placeholder="请选择人员" @focus="selectprocessordialogVisible('office')"></el-input>

              </el-form-item>

            </el-col>
            <el-col span="8" style="margin:9px 0 0 12px">
              <span style="font-size:14px;color:rgba(231,56,56,1);"> 可多选</span>
            </el-col>
          </el-row>
          <el-form-item label="会签">
            <el-checkbox v-model='officialform.approvalConfigs[0].countersign' label="此步骤的签办人都必须办理才可以转下一步" name="type1"></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="onSubmit">保存</el-button>
            <el-button type="danger" @click="gopreview">表单预览</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 经费申请流程,维修申请流程,会议室申请流程 -->
      <div class="information" v-else>
        <h4>基本信息</h4>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col span="5">
              <el-form-item label="流程名称">
                <el-input v-model="form.name" disabled></el-input>
              </el-form-item>
            </el-col>

            <el-col span="5">
              <el-form-item label="流程类别">
                <el-input v-model="form.type" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item :label="addshowtype=='funds'? '经费类型' : addshowtype=='maintenance' ?  '维修类型' : ''" v-if="addshowtype!=='meeting'">
            <el-select v-model="form.processTypeId" placeholder="请选择类型" @change="getconfig">
              <el-option :label="item.name" :value="item.id" v-for="(item,index) in processTypeList" :key="index"></el-option>
            </el-select>
          </el-form-item>

          <div style="width:100%;border-top:1px solid #ccc">
            <h4>流程设置</h4>
            <div class="step" v-for="(item,index) in form.approvalConfigs" :key="index">
              <div class="stepnum">第{{item.level}}步</div>
              <div class="bottom">
                <div class="left">
                  <div class="leftimg">
                    <img :src="item.stepicon" alt />
                    <p>{{item.stepname}}</p>
                  </div>
                  <div class="stemp_icon" v-if="form.approvalConfigs.length-1!==index"><img src="@/assets/image/content/stemp_bottom.png" alt=""></div>
                </div>
                <div style="margin-top:20px;display:flex;" v-if="form.approvalCode=='REPAIR_APPLICATION'?index<3:true">
                  <el-form-item :label="index==0 ? '创建人员' : '办理人员'">
                    <el-input type="textarea" autosize v-model="item.dealerName" placeholder="请选择人员" @focus="selectprocessordialogVisible(item)"></el-input>
                    
                  </el-form-item>
                  <span style="font-size:14px;color:rgba(231,56,56,1);margin:12px 0 0 9px;"> 可多选</span>
                </div>
              </div>
            </div>
          </div>
          <el-form-item style="margin-top:20px;">
            <el-button type="danger" @click="onSubmit">保存</el-button>
            <el-button type="danger" @click="gopreview">表单预览</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>
    <selectProcessor @selectPeople="selectPeople" :Selectparams="{businessId: null,businessType: null}" showtype="config" :showchecked="showchecked"></selectProcessor>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import progressmenu from "@/components/progressmenu.vue";
import selectProcessor from "@/components/selectProcessor.vue";

@Component({
  components: {
    progressmenu,
    selectProcessor
  }
})
export default class progressconfig extends Vue {
  public userList: Array<object> = [];

  public form: object = {}; //经费申请，维修申请，会议室申请表单数据
  @State("addshowtype") addshowtype: any;
  @State("processTypeList") processTypeList: any;
  @Watch("processTypeList")
  processTypeListchange(newValue: any, oldValue: any) {
    //页面打开，默认显示第一个类型
    if (this.addshowtype == "funds" || this.addshowtype == "maintenance") {
      this.form.processTypeId = newValue[0].id;
      this.getconfig();
    }
  }
  @Mutation("addshowtype") addShowtype: any;
  @Mutation("selectProcessordialogVisiblemu")
  selectProcessordialogVisiblemu: any;
  @Mutation("fathersonmu") fathersonmu: any;
  public selectPeopleType: any = ""; //点击了哪个输入框，显示弹框
  public showchecked = []; //选择人员回显
  selectprocessordialogVisible(_type) {
    if (_type == "office") {
      //将人员传给子组件选择人员弹框，回显选中的人员
      this.showchecked = this.officialform.approvalConfigs[0].dealerIds.split(
        ","
      )
        ? this.officialform.approvalConfigs[0].dealerIds.split(",")
        : [];
    } else {
      this.showchecked = _type.dealerIds ? _type.dealerIds.split(",") : [];
      console.log(_type.dealerIds);
    }

    this.selectPeopleType = _type;
    this.selectProcessordialogVisiblemu({ value: true }); //打开选择人员弹框
    this.fathersonmu({ value: "config" });
  }
  selectPeople(val) {
    //获取子组件选择的人员
    console.log(val, "子组件传值");
    const { joinUserid, joinUserName } = val;
    if (this.selectPeopleType == "office") {
      this.officialform.approvalConfigs[0].dealerIds = joinUserid;
      this.officialform.approvalConfigs[0].dealerName = joinUserName;
      console.log(
        this.officialform.approvalConfigs[0].dealerName,
        "this.officialform.approvalConfigs[0].dealerName"
      );
    } else {
      console.log(this.selectPeopleType, "item");
      this.selectPeopleType.dealerIds = joinUserid;
      this.selectPeopleType.dealerName = joinUserName;
      console.log(
        this.selectPeopleType.dealerName,
        "this.selectPeopleType.dealerName"
      );
    }
  }
  public officialform: object = {
    //公文传输流程表单数据
    name: "公文传输流程",
    type: "公文管理",
    approvalCode: "DOCUMENT_TRANSMISSION",
    processTypeId: 1,
    approvalConfigs: [
      {
        dealerIds: "",
        dealerName: "",
        countersign: false
      }
    ]
  };
  @Watch("addshowtype")
  change(newValue: string, oldValue: string) {
    this.getApprovalProcessConfig();
    //监听是那种流程配置（公文传输，经费申请，维修申请，会议室申请）
    switch (newValue) {
      case "funds":
        this.form = {
          name: "经费申请流程",
          type: "费用相关",
          approvalCode: "FUND_APPLICATION",
          processTypeId: null, //流程类别id
          approvalConfigs: [
            {
              level: 1,
              stepname: "发出申请",
              stepicon: require("@/assets/image/content/f1.png"),
              dealerIds: "",
              dealerName: ""
            },
            {
              level: 2,
              stepname: "分管领导审核",
              stepicon: require("@/assets/image/content/f2.png"),
              dealerIds: "",
              dealerName: ""
            },
            {
              level: 3,
              stepname: "财务校长复核",
              stepicon: require("@/assets/image/content/f3.png"),
              dealerIds: "",
              dealerName: ""
            },
            {
              level: 4,
              stepname: "校长审批",
              stepicon: require("@/assets/image/content/f2.png"),
              dealerIds: "",
              dealerName: ""
            },
            {
              level: 5,
              stepname: "财务归档",
              stepicon: require("@/assets/image/content/f5.png"),
              dealerIds: "",
              dealerName: ""
            }
          ]
        };
        break;
      case "maintenance":
        this.form = {
          name: "维修申请流程",
          type: "报修流程",
          approvalCode: "REPAIR_APPLICATION",
          processTypeId: null, //流程类别id
          approvalConfigs: [
            {
              level: 1,
              stepname: "维修申请",
              stepicon: require("@/assets/image/content/f1.png"),
              dealerIds: "",
              dealerName: ""
            },
            {
              level: 2,
              stepname: "分管领导分派",
              stepicon: require("@/assets/image/content/m2.png"),
              dealerIds: "",
              dealerName: ""
            },
            {
              level: 3,
              stepname: "维修人负责维修",
              stepicon: require("@/assets/image/content/m2.png"),
              dealerIds: "",
              dealerName: ""
            },
            {
              level: 4,
              stepname: "申请人评价",
              stepicon: require("@/assets/image/content/m3.png")
            },
            {
              level: 5,
              stepname: "维修人评价",
              stepicon: require("@/assets/image/content/m3.png")
            }
          ]
        };
        break;
      case "meeting":
        this.form = {
          name: "会议室申请流程",
          type: "需求管理",
          approvalCode: "MEETING_APPLICATION",
          processTypeId: 1, //流程类别id
          approvalConfigs: [
            {
              level: 1,
              stepname: "发出申请",
              stepicon: require("@/assets/image/content/f1.png"),
              dealerIds: "",
              dealerName: ""
            },
            {
              level: 2,
              stepname: "管理员审核",
              stepicon: require("@/assets/image/content/m2.png"),
              dealerIds: "",
              dealerName: ""
            }
          ]
        };
        break;
      default:
        break;
    }
  }
  processparams(_params) {
    //处理请求参数
    let params = JSON.parse(JSON.stringify(_params));
    params.approvalConfigs.map(item => {
      if (this.addshowtype == "official") {
        if (item.countersign) {
          item.countersign = 1;
        } else {
          item.countersign = 0;
        }
      }
    });
    return params;
  }
  onSubmit() {
    //点击保存
    let isendparams = { processTypeId: null, approvalCode: null }; //修改流程配置没有判断是否有未完成的流程
    let params;
    if (this.addshowtype == "official") {
      params = this.processparams(this.officialform);
      isendparams.processTypeId = this.officialform.processTypeId;
      isendparams.approvalCode = "DOCUMENT_TRANSMISSION";
    } else {
      params = this.processparams(this.form);

      isendparams.processTypeId = this.form.processTypeId;
      if (this.addshowtype == "funds") {
        isendparams.approvalCode = "FUND_APPLICATION";
      } else if (this.addshowtype == "maintenance") {
        isendparams.approvalCode = "REPAIR_APPLICATION";
      } else if (this.addshowtype == "meeting") {
        isendparams.approvalCode = "MEETING_APPLICATION";
      }
    }

    this.$ajax.approvalConfig
      .processesIsAllEnded({ params: isendparams })
      .then(res => {
        if (res.state == 1000) {
          if (res.data == 1) {
            this.$confirm(
              "尚有流程未结束，修改设置会影响执行中的流程!您确定保存修改吗？",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
              }
            )
              .then(() => {
                this.$ajax.approvalConfig
                  .setApprovalProcessConfig({ params })
                  .then(res => {});
              })
              .catch(() => {});
          } else if (res.data == 0) {
            this.$ajax.approvalConfig
              .setApprovalProcessConfig({ params })
              .then(res => {});
          }
        }
      });
  }
  mounted() {
    this.addShowtype({ value: "official" });
    this.getApprovalProcessConfig();
  }
  getconfig() {
    //下拉框选择类型，显示流程配置人员
    this.getApprovalProcessConfig(this.form.processTypeId);
  }
  getApprovalProcessConfig(_id: any) {
    //获取流程列表配置
    let params = {};
    switch (this.addshowtype) {
      case "official":
        params.approvalCode = "DOCUMENT_TRANSMISSION";
        params.processTypeId = 1;
        break;
      case "funds":
        params.approvalCode = "FUND_APPLICATION";
        params.processTypeId = _id;
        break;
      case "maintenance":
        params.approvalCode = "REPAIR_APPLICATION";
        params.processTypeId = _id;
        break;
      case "meeting":
        params.approvalCode = "MEETING_APPLICATION";
        params.processTypeId = 1;
        break;
      default:
        break;
    }

    this.$ajax.approvalConfig
      .getApprovalProcessConfig({
        params
      })
      .then(res => {
        if (res.state == 1000) {
          if (this.addshowtype == "official") {
            this.officialform.approvalConfigs = this.officialform.approvalConfigs.map(
              (item, index) => {
                console.log(item, "item");

                if (res.data.length == 0) {
                  item.dealerIds = "";
                  item.dealerName = "";
                } else {
                  console.log(item.countersign, "item.countersign");
                  if (res.data[index].countersign == 1) {
                    res.data[index].countersign = true;
                  } else {
                    res.data[index].countersign = false;
                  }
                  item = { ...item, ...res.data[index] };
                }
                return item;
              }
            );
          } else {
            this.form.approvalConfigs = this.form.approvalConfigs.map(
              (item, index) => {
                if (res.data.length == 0) {
                  item.dealerIds = "";
                  item.dealerName = "";
                } else {
                  item = { ...item, ...res.data[index] };
                }

                return item;
              }
            );
          }
        }
      });
  }
  gopreview() {
    //表单预览
    this.$router.push({
      path: "/process/configpreview"
    });
  }
}
</script>
<style lang="scss">
.information {
  width: 100%;
  border-top: 1px solid #ccc;
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #606266 !important;
  }
  .step {
    .stepnum {
      height: 40px;
      background: rgba(238, 241, 246, 1);
      border-radius: 2px 2px 0px 0px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(51, 51, 51, 1);
      line-height: 40px;
      padding-left: 60px;
    }
    .bottom {
      display: flex;

      .left {
        width: 160px;
        margin-right: 84px;
        .leftimg {
          width: 160px;
          height: 150px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(175, 190, 205, 1);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          img {
            width: 55px;
          }
          p {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(51, 51, 51, 1);
            line-height: 19px;
          }
        }
        .stemp_icon {
          width: 100%;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 20px;
          }
        }
      }
    }
  }
}
</style>

