<template>
  <div id="gateway">
    <el-row>

      <!-- 轮播图 -->
      <el-col span="14" class="block" style="margin:0 20px 20px 0">
        <el-carousel>
          <el-carousel-item>
            <img src="@/assets/image/content/banner1.png" style="width:100%;height:100%" alt="">
          </el-carousel-item>
          <el-carousel-item>
            <img src="@/assets/image/content/banner2.png" style="width:100%;height:100%" alt="">
          </el-carousel-item>
          <el-carousel-item>
            <img src="@/assets/image/content/banner3.png" style="width:100%;height:100%" alt="">
          </el-carousel-item>
        </el-carousel>
      </el-col>

      <!-- 天气 -->
      <el-col span="9" class="block">
        <div id="weather-view-he"></div>
        <!-- <iframe name="weather_inc" src="http://i.tianqi.com/index.php?c=code&id=64" width="540" height="291" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe> -->
        <!-- <iframe allowtransparency="true" frameborder="0" width="140" height="295" scrolling="no" src="//tianqi.2345.com/plugin/widget/index.htm?s=2&z=1&t=1&v=1&d=3&bd=0&k=000000&f=&ltf=009944&htf=cc0000&q=1&e=1&a=1&c=54511&w=140&h=278&align=right"></iframe> -->
      </el-col>
    </el-row>

    <el-row>

      <!-- 流程 -->
      <el-col span="14" class="block" style="margin-right:20px;height:468px;backgroun:#fff">
        <div class="header">
          <div class="left"><img src="@/assets/image/content/home-title1.png" alt="">
            <h4>流程中心</h4>
          </div>
          <span @click="golist">更多></span>
        </div>
        <div class="progresstab">
          <div :class="{'active':tabactive==index}" v-for="(item,index) in tabcontent" :key="index" @click="tabswitch(index)">{{item.label}}</div>
        </div>
        <div class="progrsslist">
          <div class="item" v-for="(item,index) in processlist" :key="index">
            <div class="left" style="width:60%">
              <em>{{index+1}}</em>
              <p @click="handleprocess(item.businessType,Number(item.businessId))" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                <span v-if="item.urgencyStatus==1||item.urgencyStatus==2">【{{item.urgencyStatus|urgencyStatusTransform}}】</span>
                <i style="cursor: pointer;font-style: normal"> {{item.title}}</i>
              </p>
              <el-popover placement="right-start" title="当前步骤未办理人员：" width="200" trigger="click" :content="item.stepUnprocessed">
                <img src="@/assets/image/content/rank.png" alt="" slot="reference">
              </el-popover>
            </div>
            <div class="right">
              <span style="margin-right: 50px;">{{item.createBy}}</span>
              <span>{{item.createTime|timeTrans}}</span>
            </div>
          </div>
        </div>
      </el-col>

      <!-- 会议室使用情况 -->
      <el-col span="9" class="block" style="height:468px;backgroun:#fff">
        <div class="header">
          <div class="left">
            <img src="@/assets/image/content/home-title2.png" alt="">
            <h4>会议室使用情况</h4>
            <!-- <i>12/19 星期四</i> -->
            <i>{{currentTime}}</i>
          </div>
          <span @click="gomeeting">更多></span>
        </div>
        <el-table :data="tableData" border style="width:90%;margin:0 auto 20px">
          <el-table-column prop="name" width="200" label="会议室名称">
          </el-table-column>
          <el-table-column prop="valid" label="状态">
            <template slot-scope="scope">{{ scope.row.valid |　meetingTransform }}</template>
          </el-table-column>
          <el-table-column prop="bookedCount" label="已预约">
          </el-table-column>
        </el-table>

      </el-col>

    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Mutation } from "vuex-class";
@Component
export default class index extends Vue {
  public processList: Array<object> = []; //列表
  public processlist: Array<object> = [];
  public visible: boolean = false; //流程中心未办理人员弹框是否显示
  public tabcontent: Array<object> = [
    {
      label: "待办"
    },
    {
      label: "已办"
    },
    {
      label: "办结"
    },
    {
      label: "抄送"
    }
  ];
  public tabactive: number = 0; //当前选中的tab
  public tableData: Array<object> = []; //会议室
  @Mutation("addshowtype") addshowtype: any;
  public listpagetype: string = ""; //判断是哪个页面（代办事宜，已办事宜，办结事宜，抄送流程，流程查询）
  handleprocess(_type: string, businessId: any): void {
    let value = "";
    switch (_type) { //判断显示那种类型的流程表格
      case "DOCUMENT_TRANSMISSION":
        value = "official";
        break;
      case "FUND_APPLICATION":
        value = "funds";
        break;
      case "REPAIR_APPLICATION":
        value = "maintenance";
        break;
      case "MEETING_APPLICATION":
        value = "meeting";
        break;
      default:
        break;
    }
    this.addshowtype({ value });

    //判断进入的页面是办理还是详情

    if (this.tabactive == 0) {
      //如果是待办页面，点击标题进入办理页面
      this.$router.push({
        path: "/process/newprocess",
        query: { newpagetype: "handle", businessId: businessId }
      });
    } else {
      this.$router.push({
        path: "/process/newprocess",
        query: { newpagetype: "detail", businessId: businessId }
      });
    }
  }
  tabswitch(i) {
    //点击tab切换
    this.tabactive = i;
    this.processlist = this.processList[this.tabactive];
  }
  async getprocesslist() {
    //获取流程中心列表
    let processList: Array<object> = [];
    for (let i = 1; i < 5; i++) {
      await this.$ajax.process
        .getBacklogProcessList({
          params: {
            pageSize: 8,
            pageNo: 1,
            dataType: i,
            showUnprocessed: 1,
            auditorType: null
          }
        })
        .then(res => {
          if (res.state == 1000) {
            processList.push(res.data.ProcessListModel.list);
            this.processList = processList;
            this.processlist = this.processList[this.tabactive];
          }
        });
    }
  }
  golist() {
    //点击更多
    let query = {};
    switch (this.tabactive) {
      case 0:
        query = { listpagetype: "wait" };
        break;
      case 1:
        query = { listpagetype: "already" };
        break;
      case 2:
        query = { listpagetype: "end" };
        break;
      case 3:
        query = { listpagetype: "send" };
        break;
      default:
        break;
    }
    this.$router.push({
      path: "/process/processlist",
      query
    });
  }
  getMeetingRoom() {
    //获取会议室使用情况
    this.$ajax.meetingRoom
      .getMeetingRoomOccupySituationOfPortal({
        params: {}
      })
      .then(res => {
        if (res.state == 1000) {
          this.tableData = res.data;
        }
      });
  }
  gomeeting() {
    //点击更多打开系统设置中会议室维护的会议室使用情况表单
    this.$router.push({
      path: "/system/maintenance"
    });
  }
  public currentTime: string = ""; //会议室使用情况显示当前时间
  mounted() {
    this.getprocesslist();
    this.getMeetingRoom();
    this.showtime();
    this.getweather()
  }
  getweather(){
    window.WIDGET = {ID: 'ilNjWbd9rS'};
    (function (d) {
      var cs = d.createElement('link')
      cs.rel = 'stylesheet'
      cs.href = 'https://apip.weatherdt.com/view/static/css/tqw_widget_view.css?v=0101'
      var s = d.createElement('script')
      s.src = 'https://apip.weatherdt.com/view/static/js/tqw_widget_view.js?v=0101'
      var sn = d.getElementsByTagName('script')[0]
      sn.parentNode.insertBefore(cs, sn)
      sn.parentNode.insertBefore(s, sn)
    })(document)
  }
  showtime() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var week = new Array(
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六"
    )[date.getDay()];
    this.currentTime = month + "/" + day + " " + week;
  }
}
</script>
<style>
#weather .inner {
  background: #fff !important;
}
#weather .content {
  color: #48576a !important;
}
</style>

<style lang="scss">
#weather-view-he{
  width: 100%!important;
  border: 0.1em solid #fff!important;
}
#gateway {
  .block {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 6px 0px rgba(180, 202, 255, 0.3);
    border-radius: 5px;
  }
  .header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      margin-left: 20px;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
      h4 {
        font-size: 18px;
        font-family: MicrosoftYaHei;
        color: rgba(72, 87, 106, 1);
        line-height: 24px;
      }
      i {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(72, 87, 106, 1);
        line-height: 19px;
        font-style: normal;
        margin-left: 34px;
      }
    }
    span {
      margin-right: 17px;
      font-size: 14px;
      color: rgba(208, 2, 27, 1);
      cursor: pointer;
    }
  }
  .progresstab {
    width: 100%;
    $height: 60px;
    height: $height;
    border: 1px solid rgba(209, 219, 229, 1);
    background: rgba(238, 241, 246, 1);
    font-size: 16px;
    font-family: MicrosoftYaHei;
    color: rgba(72, 87, 106, 1);
    display: flex;
    box-sizing: border-box;

    div {
      height: $height;
      line-height: $height;
      text-align: center;
      cursor: pointer;
	  width: 122px;
    }
    div.active {
      color: #e73838;
      background: #fff;
    }
  }
  .progrsslist {
    margin: 5px 0 0 20px;
    .item {
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
      .left {
        display: flex;
        align-items: center;
        em {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(72, 87, 106, 1);
          line-height: 19px;
          font-style: normal;
        }
        p {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #48576a;
          line-height: 19px;
          margin: 0 10px 0 20px;
          span {
            color: #e73838;
          }
        }
        p:hover{
          color: red;
          text-decoration: underline;
        }
        img {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
      }
      .right {
        span {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(72, 87, 106, 1);
          line-height: 19px;
          margin-right: 17px;
        }
      }
    }
  }
}
</style>

