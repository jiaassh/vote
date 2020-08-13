<template>
  <div class="newprogress-menu">
    <div class="menu-item" @click="changaddshowtype(item.id)" v-for="(item,index) in menuarr" :key="index" v-if="(currentpage == 'processconfig')||(currentpage == 'newprocess'&&item.statu==1)">

      <div :class="[item._type==addshowtypestate?'menu-item-in active' : 'menu-item-in'] " :style="{'background': item.bgcolor}">
        <div class="left">
          <h4 :style="{'color':item.color}">{{item.type}}</h4>
          <h5>{{item.name}}</h5>
        </div>
        <div class="right"><img :src="item.icon" alt /></div>
      </div>
      <div :class="[item._type==addshowtypestate?'menu-checked' : 'menu-checked nochecked'] ">
        <div class="bg">

        </div>
        <img src="@/assets/image/content/cheked.png" alt="">
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Mutation, State } from "vuex-class";

@Component
export default class progressmenu extends Vue {
  @Prop() currentpage: any;

  public menuarr: Array<object> = [
    {
      id: 1,
      type: "公文管理",
      name: "公文传输流程>",
      icon: require("@/assets/image/content/menu1.png"),
      bgcolor:
        "linear-gradient(159deg,rgba(197,173,237,1) 0%,rgba(143,96,224,1) 100%)",
      color: "#573491",
      statu: 0,
      moudle: "DOCUMENT_TRANSMISSION",
      _type: "official"
    },
    {
      id: 2,
      type: "费用相关",
      name: "经费申请流程>",
      icon: require("@/assets/image/content/menu2.png"),
      bgcolor:
        "linear-gradient(165deg,rgba(179,230,246,1) 0%,rgba(83,188,220,1) 100%)",
      color: "#368898",
      statu: 0,
      moudle: "FUND_APPLICATION",
      _type: "funds"
    },
    {
      id: 3,
      type: "报修流程",
      name: "维修申请流程>",
      icon: require("@/assets/image/content/menu3.png"),
      bgcolor:
        "linear-gradient(159deg,rgba(185,239,98,1) 0%,rgba(76,200,110,1) 100%)",
      color: "#368898",
      statu: 0,
      moudle: "REPAIR_APPLICATION",
      _type: "maintenance"
    },
    {
      id: 4,
      type: "需求管理",
      name: "会议室申请流程>",
      icon: require("@/assets/image/content/menu4.png"),
      bgcolor:
        "linear-gradient(162deg,rgba(244,181,168,1) 0%,rgba(225,123,101,1) 100%)",
      color: "#BC5D47",
      statu: 0,
      moudle: "MEETING_APPLICATION",
      _type: "meeting"
    }
  ];
  @State("addshowtype") addshowtypestate: any;
  @Mutation("addshowtype") addshowtype: any;
  @Mutation("processTypeList") processTypeList: any;
  @Mutation("faultLocationList") faultLocationList: any;
  @Mutation("meetingRoomList") meetingRoomList: any;
  @Mutation("documentTitle") documentTitle: any;
  @Mutation("addfunds") addfunds: any;
  @Mutation("maintenance") maintenance: any;
  @Mutation("meeting") meeting: any;

  changaddshowtype(_id: number) {
    //页面切换新建流程类型数据清空
    this.documentTitle({
      value: {
        //新增公文传输
        completionDate: "",
        documentTitle: "",
        documentContent: "",
        documentRemark: ""
      }
    });
    this.addfunds({
      value: {
        //新增经费申请
        requiredDate: "",
        applyMoney: "",
        purpose: "",
        remark: "",
        processTypeId: "",
        processTypeName: "",

        leadAudit: "",
        leadRemark: "",
        financePrincipalAudit: "",
        financePrincipalRemark: "",
        principalAudit: "",
        principalRemark: "",
        financeAudit: "",
        financeRemark: ""
      }
    });
    this.maintenance({
      value: {
        //新增维修申请
        processTypeId: "",
        processTypeName: "",
        faultCode: "",
        faultTablet: "",
        faultRemark: "",
        deviceName: "",
        faultTime: "",
        remark: "",
        repairContent: "",
        applyUserEvaluate: "",
        repairUserEvaluate: "",
        repairUser: "",
        repairOrganization: ""
      }
    });
    this.meeting({
      value: {
        processTypeId:"",
        meetingTheme: "",
        meetingRoomId: "",
        meetingRoomName: "",
        meetingTypeCode: "",
        meetingStartTime: "",
        meetingEndTime: "",
        joinUser: "",
        auditStatus: "",
        approvalStatus: "",
        status: "",
        meetingTime: "",
        processTypeName: "",
        remark: ""
      }
    });
    let value = "";
    let params = {};
    params.code = "FUND_APPLICATION";
    switch (_id) {
      case 1:
        value = "official";
        break;
      case 2:
        value = "funds";
        params = { code: "FUND_APPLICATION" };
        break;
      case 3:
        value = "maintenance";
        params = { code: "REPAIR_APPLICATION" };
        this.$ajax.approvalRepair
          .getFaultLocationList({
            params: {}
          })
          .then(res => {
            this.faultLocationList({ value: res.data });
          });
        break;
      case 4:
        value = "meeting";
        params = { code: "MEETING_APPLICATION" };
        this.$ajax.approvalMetting
          .getMeetingRoomList({ params: [] })
          .then(res => {
            this.meetingRoomList({ value: res.data });
          });

      default:
        break;
    }
    this.addshowtype({ value });
    if (this.currentpage == "processconfig") {
      params = { ...params, ...{ showAll: 1 } };
    } else if (this.currentpage == "newprocess") {
      params = { ...params, ...{ showAll: 0 } };
    }
    console.log(this.currentpage, "this.currentpage", params);
    this.$ajax.process
      .getProcessTypeList({
        //获取流程类型
        params: params
      })
      .then(res => {
        this.processTypeList({ value: res.data });
      });
  }
  mounted() {
    //如果是流程配置页面，显示公文的流程配置
    if (this.currentpage == "processconfig") {
      this.addshowtype({ value: "official" });
    } else if (this.currentpage == "newprocess") {
      //显示流程配置人员的新建权限
      this.$ajax.process.getProcessMenuPermission({ params: {} }).then(res => {
        if (res.state == 1000) {
          this.menuarr = this.menuarr.map((item, index) => {
            item.statu = res.data[item.moudle];
            return item;
          });
        }
      });
    }
  }
}
</script>
<style lang="scss">
.newprogress-menu {
  width: 100%;
  overflow: hidden;
  padding-bottom: 20px;
  .menu-item {
    width: 20%;
    height: 151px;
    position: relative;
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    .menu-item-in {
      width: 90%;
      height: 126px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      box-shadow: 4px 6px 11px 0px rgba(65, 65, 65, 0.35);
      border-radius: 7px;
      .left {
        margin-left: 7%;

        h4 {
          font-size: 17px;
          margin: 0;
          font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
          font-weight: bold;
          line-height: 26px;
        }
        h5 {
          margin: 29px 0 0 0;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(255, 255, 255, 1);
          line-height: 24px;
        }
      }
      .right {
        margin-right: 14%;
        width: 50px;
        height: 50px;
        background: #fff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 53%;
        }
      }
    }

    .menu-item-in:hover {
      width: 100%;
      height: 151px;
      box-shadow: 5px 7px 13px 0px rgba(65, 65, 65, 0.35);
      border-radius: 8px;
      h4 {
        font-size: 18px;
      }
      h5 {
        font-size: 15px;
      }
      
    }
    .active {
      width: 100%;
      height: 151px;
      box-shadow: 5px 7px 13px 0px rgba(65, 65, 65, 0.35);
      border-radius: 8px;
      .left {
        h4 {
          font-size: 18px;
        }
        h5 {
          font-size: 15px;
        }
      }
    }
    .menu-checked {
      display: block;
      width: 67px;
      height: 67px;
      border-radius: 8px;
      position: absolute;
      bottom: 0;
      right: 0;
      .bg {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 0;
        height: 0;
        border-bottom: 67px solid rgba(255, 255, 255, 0.6);
        border-left: 67px solid transparent;
        
      }
      img{
        width: 20px;
        height: 18px;
        margin: 36px 0 0 42px;
      }
    }
    .nochecked{
      display: none
    }
  }
  .menu-item:hover{
.nochecked{
        display: block;
      }
  }
}
</style>

