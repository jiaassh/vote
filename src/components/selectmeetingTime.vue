<template>
  <!-- 时间选择 -->
  <el-dialog title="选择会议时间" :visible="selecttimedialogFormVisible" @close="closedialog">

    <el-form :model="meetingtimeform" class="form">
      <el-form-item label="会议室">
        <!-- <el-select v-model="meetingtimeform.meetingRoomId" placeholder="请选择" @change="selectmeeting">
                    <el-option :label="item.name" :value="item.id" v-for="(item,index) in meetingRoomList" :key="index"></el-option>
                </el-select> -->
        <el-row style="display:flex">
          <el-col span="12">
            <el-input v-model="usemeetingList.name" disabled></el-input>
          </el-col>
          <el-col span="12">
            <span style="color:#E73838;margin-left:10px;">最多容纳人数：{{usemeetingList.capactity}}人</span>
          </el-col>
        </el-row>

      </el-form-item>
      <h4>会议室预定情况</h4>
      <div class="selectTime">
        <div class="datatab">
          <div :class="[activeTime==index?'item active':'item']" v-for="(item,index) in usemeetingList.list" :key="index" @click="datatabfn(index,item)">
            <p>{{item.format}}</p>
            <span v-if="activeTime==index"></span>
          </div>
        </div>
        <div class="content">

          <div class="time">
            <div :class="[index==11 ? 'item last' : 'item']" v-for="index in 11" :key="index">{{index+7}}时</div>
          </div>
          <div class="area-content">
            <div class="area">
              <div :class="[index==11?'item last':'item']" v-for="index in 11" :key="index" @mouseover="showsliderfn(index)"></div>
            </div>
            <el-slider id="slider" v-model="sliderValue" :step="step" :show-tooltip="false" @input="sliderChange"></el-slider>
            <div class="applied">
              <div class="item" v-for="(item,index) in usermeeting" :key="index" :style="{ width: item.width+ 'px', left: item.left + 'px' }"></div>
            </div>
          </div>

          <div class="sign">
            <div class="item">
              <div class="gray"></div>
              <span>已申请</span>
            </div>
            <div class="item">
              <div class="red"></div>
              <span>已选择</span>
            </div>
            <div class="item">
              <div class="white"></div>
              <span>可选择</span>
            </div>
          </div>
          <div id="timeinput">
            <el-form-item label="当前选择会议时段" prop="during">
              <el-input v-model="meetingtimeform.during"></el-input>
            </el-form-item>
          </div>

          <p class="tip">
            <span>*</span>可选时段鼠标放置出现箭头，滑动箭头选择需要预定的时段，仅支持选择一个时段</p>
        </div>
      </div>
      <div class="footer">
        <el-button type="danger" @click="submit">提 交</el-button>
        <el-button @click="resetForm('meetingtimeform')">重 置</el-button>
        <el-button @click="closedialog">取 消</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>
<script lang="ts">
import dateFormat from "@/utils/dateFormatClass.ts";
import { Component, Vue, Prop, Watch, Emit } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
@Component({})
export default class selectmeetingTime extends Vue {
  public meetingtimeform: object = {}; //时间选择表单数据
  public activetimestamp: number = 0; //选中日期的时间戳
  public initIndex: number = 0; //可选时段鼠标放置开始时间
  public usemeetingList: object = {}; //下拉框选择的会议室的使用情况列表
  public activeTime: number = 0; // 当前选中的日期
  public usermeeting: Array<object> = []; //已申请
  public step: number = 3; //滑块间隔值
  public sliderValue: number = 0; //滑块值
  public sendValue: object = {}; //选中的时间发送给父组件
  @Emit("selectmeetingfn")
  send(val: any) {}
  @State("meetingRoomList") meetingRoomList: any; //会议室列表
  @State("selecttimedialogFormVisible") selecttimedialogFormVisible!: boolean; //弹框是否显示
  @Mutation("selecttimedialogFormVisiblemu")
  selecttimedialogFormVisiblemu!: any;
  closedialog() {
    //关闭弹框
    this.selecttimedialogFormVisiblemu({ value: false });
  }
  @State("meetingSelectTime") meetingSelectTime: any;
  @Watch("selecttimedialogFormVisible")
  change(newValue: any, oldValue: any) {
    if (newValue) {
      this.usemeetingList = this.meetingSelectTime;
      this.activetimestamp = this.meetingSelectTime.list[
        this.activeTime
      ].timestamp;
      console.log(this.activetimestamp, this.activeTime, "mounted");
      this.appliedTime();
    }
  }
  datatabfn(i, _item) {
    //点击切换日期
    this.activetimestamp = _item.timestamp;
    this.activeTime = i;
    console.log(this.activetimestamp, this.activeTime, "click");
    this.appliedTime();
  }
  appliedTime() {
    //计算left，width 显示已申请的时间
    console.log(this.usemeetingList, "this.usemeetingList");
    let usermeeting = this.usemeetingList.list[this.activeTime]
      .meetingRoomReserves;
    this.$nextTick(() => {
      let areaContentEl = document.querySelector(".area-content");
      let elwidth = areaContentEl.offsetWidth / 10;
      usermeeting.map(item => {
        let applyStartTime = new Date(item.applyStartTime).getHours();
        let applyEndTime = new Date(item.applyEndTime).getHours();
        item.width = elwidth * (applyEndTime - applyStartTime);
        item.left = elwidth * (applyStartTime - 8);
        return item;
      });
      this.usermeeting = usermeeting;
    });
  }

  sliderChange() {
    //拖动滑块，表单显示当前选择会议时段
    let date = dateFormat("YYYY-mm-dd", new Date(this.activetimestamp * 1000));
    let start = this.initIndex + 7;
    let end = start + this.sliderValue / this.step;
    start = start < 10 ? "0" + start : start;
    end = end < 10 ? "0" + end : end;
    this.sendValue.during = date + " " + start + ":00-" + end + ":00";
    this.sendValue.applyStartTime = date + " " + start + ":00:00";
    this.sendValue.applyEndTime = date + " " + end + ":00:00";
    this.meetingtimeform.during = this.sendValue.during;
  }
  showsliderfn(i: number): void {
    this.initIndex = i;
    //可选时段鼠标放置出现滑块
    this.sliderValue = 0;
    let sliderEl = document.querySelector("#slider"); //获取滑块元素
    let areaContentEl = document.querySelector(".area-content");
    sliderEl.style.left = areaContentEl.offsetWidth / 10 * (i - 1) + "px";
    sliderEl.style.width =
      areaContentEl.offsetWidth - parseInt(sliderEl.style.left) + "px";
    this.step = 100 / (11 - i);
  }
  submit() {
    var applyStartTimestemps = Date.parse(
      new Date(this.sendValue.applyStartTime)
    );
    var applyEndTimestemps = Date.parse(new Date(this.sendValue.applyEndTime));
    var timestamp = Date.parse(new Date());
    if (applyStartTimestemps < timestamp || applyEndTimestemps < timestamp) {
      this.$message("不能选择当前时间之前的时间段");
    } else {
      this.$ajax.approvalMetting
        .checkMettingIsReserve({
          params: {
            meetingRoomId: this.usemeetingList.meetingRoomId,
            applyStartTime: this.sendValue.applyStartTime,
            applyEndTime: this.sendValue.applyEndTime
          }
        })
        .then(res => {
          if (res.state == 1000) {
            this.send(this.sendValue);
            this.selecttimedialogFormVisiblemu({ value: false });
          } else {
            this.$message("该时间段已被预定,请重新选择");
          }
        });
    }
  }
  resetForm(formName) {
    this.initIndex = 0;
    this.sliderValue = 0;
    this.step = 0;
    this.$set(this.meetingtimeform, "during", "");
  }
}
</script>
<style lang="scss">
.form {
  width: 75.5%;
  margin: auto;
  h4 {
    text-align: center;
    color: #48576a;
    font-size: 20px;
  }
  .selectTime {
    border: 1px solid rgba(209, 219, 229, 1);
    .datatab {
      $width: 100%;
      $height: 50px;
      height: $height;
      width: $width;
      display: flex;
      background: rgba(250, 250, 250, 1);

      .item {
        width: $width/7;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        color: rgba(74, 74, 74, 1);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        p {
          margin: 12px 0 0 0;
        }
        span {
          width: 32px;
          height: 3px;
          background: rgba(231, 56, 56, 1);
        }
      }
      .active {
        color: #e73838;
      }
    }
    .content {
      width: 92%;
      margin: 42px auto 0;
      .time {
        display: flex;
        justify-content: space-between;
        $width: 100%;
        width: $width;
        .item {
          width: calc((#{$width}-32px) / 10);
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(74, 74, 74, 1);
        }
        .last {
          width: 32px;
        }
      }

      .area-content {
        position: relative;
        height: 150px;
        margin-top: 18px;
        width: 100%;

        .area {
          position: absolute;
          top: 0;
          left: 0;
          $width: 100%;
          width: $width;
          border-bottom: 1px solid #f1f1f1;
          height: 150px;

          display: flex;
          box-sizing: border-box;
          .item {
            width: calc((#{$width}) / 10);
            border-left: 2px solid #cfd6d3;
            cursor: pointer;
          }
          .last {
            border-left: 2px solid #cfd6d3;
            width: 0px;
          }
        }
        #slider {
          position: absolute;
          bottom: 0;
          left: 0;
          $height: 80px;
          height: $height;
          .el-slider__runway {
            height: $height;
            margin: 0;
            background: rgba(228, 221, 237, 0);
            .el-slider__bar {
              height: 80px;
              background-color: #ff6265;
            }
            .el-slider__button-wrapper {
              height: 34px;
              width: 34px;
              top: 23px;
              .el-slider__button {
                width: 16px;
                height: 16px;
                border: 2px solid #ff6265;
              }
            }
          }
        }
        .applied {
          position: absolute;
          bottom: 0;
          left: 0;
          .item {
            position: absolute;
            bottom: 0;
            height: 80px;
            background: #ebebeb;
          }
        }
      }

      .sign {
        width: 100%;
        margin-top: 38px;
        margin-bottom: 24px;
        display: flex;
        justify-content: space-around;
        .item {
          display: flex;
          align-items: center;
          justify-content: center;
          div {
            width: 19px;
            height: 19px;
            margin-right: 6px;
          }
          .gray {
            background: rgba(235, 235, 235, 1);
            border: 1px solid #ebebeb;
          }
          .red {
            background: rgba(255, 98, 101, 0.8);
            border: 1px solid rgba(255, 98, 101, 1);
          }
          .white {
            background: #fff;
            border: 1px solid rgba(142, 142, 147, 1);
          }
          span {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(74, 74, 74, 1);
          }
        }
      }
      #timeinput {
        .el-form-item {
          display: flex;
          justify-content: center;
        }
      }
      .tip {
        text-align: center;
        span {
          color: #e73838;
        }
      }
    }
  }
  .footer {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>


