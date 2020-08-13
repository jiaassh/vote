<template>
  <div id="meetingMaintenance">
    <div style="display: flex;
  justify-content: space-between ;align-items: center;margin-bottom:20px;">
      <h4 style="margin:0;color:#48576A">会议室使用情况</h4>
      <el-button type="danger" size="small" plain @click="golastpage">返回</el-button>
    </div>

    <div class="meeting-box">
      <div class="meeting-header">
        <div class="left">
          <div class="top">会议室/时间</div>
        </div>
        <div class="center">
          <div>
            <div class="datatab">
              <div :class="[activeTime==index?'item active':'item']" v-for="(item,index) in usemeetingList" :key="index" @click="datatabfn(index)">
                <p>{{item.format}}</p>
                <span v-if="activeTime==index"></span>
              </div>
            </div>
          </div>
          <div>
            <div class="time">
              <div :class="[index==11 ? 'item last' : 'item']" v-for="index in 11" :key="index">{{index+7}}时</div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="top">
            <div class="item">
              <div class="item-area red">
                <div class="line"></div>
              </div>
              <p>已申请</p>
            </div>
            <div class="item">
              <div class="item-area white">
              </div>
              <p>可选择</p>
            </div>
          </div>
        </div>
      </div>

      <div class="meeting-content">
        <div class="meeting-item" v-for="(item,index) in meetingRooms" :key="index">
          <div class="left">
            <div style="margin:10px;">

              <h5><img src="@/assets/image/content/meeting_icon1.png" alt=""> {{item.name}}</h5>
              <div class="statu">状态：
                <div>

                  <img src="@/assets/image/content/meeting_icon2.png" alt="">
                  <span>{{item.valid|meetingTransform}}</span>
                </div>
              </div>
              <div class="statu">最多容纳人数：
                <span>{{item.maxCapacity}}人</span>
              </div>
            </div>
          </div>
          <div class="center">
            <div class="area-content" ref="areacontent">
              <div class="area">
                <div :class="[index==11?'item last':'item']" v-for="index in 11" :key="index"></div>
              </div>
              <div class="applied">
                <div class="item" v-for="(_item,_i) in item.meetingRoomReserves" :key="_i" :style="{ width: _item.width+ 'px', left: _item.left + 'px' }">
                  <div class="line"></div>
                  <div class="name">{{_item.applyUserName}}</div>

                </div>
              </div>
            </div>
          </div>

          <div class="right"></div>
        </div>
      </div>
    </div>

    <div class="selectTime">

      <div class="content">

      </div>
    </div>

  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class meetingMaintenance extends Vue {
  public meetingRooms: Array<object> = []; //当前选择时间的会议室列表
  public initIndex: number = 0; //可选时段鼠标放置开始时间
  public usemeetingList: Array<object> = []; //会议室的使用情况列表
  public activeTime: number = 0; // 当前选中的日期
  public usermeeting: Array<object> = []; //已申请
  getMeetingRoomOccupySituation() {
    //获取会议室使用情况
    this.$ajax.meetingRoom
      .getMeetingRoomOccupySituation({
        params: {}
      })
      .then(res => {
        if (res.state == 1000) {
          this.usemeetingList = res.data;
          this.appliedTime();
        }
      });
  }
  datatabfn(i) {
    //点击切换日期
    this.activeTime = i;
    this.appliedTime();
  }
  appliedTime() {
    //计算left，width 显示已申请的时间
    let meetingRooms = this.usemeetingList[this.activeTime].meetingRooms; //选中时间的会议室列表
    this.meetingRooms = meetingRooms;
    let areaContentEl = document.querySelector(".time");
    let elwidth = areaContentEl.getBoundingClientRect().width / 10;
    console.log(elwidth, "elwidth");
    meetingRooms.map(item => {
      let usermeeting = item.meetingRoomReserves;
      usermeeting.map(item => {
        let applyStartTime = new Date(item.applyStartTime).getHours();
        let applyEndTime = new Date(item.applyEndTime).getHours();
        item.width = elwidth * (applyEndTime - applyStartTime);
        item.left = elwidth * (applyStartTime - 8);
        return item;
      });
      return usermeeting;
    });
  }
  golastpage() {
    this.$router.go(-1);
  }
  mounted() {
    this.getMeetingRoomOccupySituation();
  }
}
</script>
<style lang="scss">
#meetingMaintenance {
  background: #fff;
  padding: 22px;
  .meeting-box {
    border: 1px solid rgba(209, 219, 229, 1);
    width: 100%;
    .meeting-header {
      width: 100%;
      height: 131px;
      display: flex;
      .left {
        width: 10.6%;
        border-right: 1px solid rgba(209, 219, 229, 1);
        background: rgba(238, 241, 247, 1);
        .top {
          height: 61px;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(72, 87, 106, 1);
          text-align: center;
          line-height: 61px;
        }
      }
      .center {
        width: 72.47%;

        .datatab {
          background: rgba(238, 241, 247, 1);
          $width: 100%;
          $height: 61px;
          height: $height;
          display: flex;
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
              margin: 18px 0 0 0;
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
        .time {
          display: flex;
          justify-content: space-between;
          $width: 93.34%;
          width: $width;
          margin: auto;
          height: 69px;
          line-height: 69px;
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
      }
      .right {
        width: 16.93%;
        .top {
          width: 100%;
          background: rgba(238, 241, 247, 1);
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 61px;
          .item {
            display: flex;
            justify-content: center;
            align-items: center;
            .item-area {
              width: 20px;
              height: 20px;
              margin-right: 10px;
              .line {
                width: 2px;
                height: 20px;
                background: rgba(231, 56, 56, 1);
              }
            }
            .red {
              background: rgba(246, 191, 191, 1);
            }
            .white {
              background: #fff;
              border: 1px solid rgba(175, 190, 205, 1);
            }
            p {
            }
          }
        }
      }
    }

    .meeting-content {
      border-top: 1px solid rgba(211, 221, 230, 1);
      .meeting-item {
        display: flex;
        .left {
          width: 10.6%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          // align-items: center;
          border-right: 1px solid rgba(211, 221, 230, 1);
          border-bottom: 1px solid rgba(211, 221, 230, 1);
          h5 {
            margin: 0;
            font-size: 14px;
            font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
            font-weight: bold;
            color: rgba(72, 87, 106, 1);
            display: flex;
            justify-content: space-between;
            img {
              width: 15px;
              height: 15px;
              margin-right: 5px;
            }
          }
          .statu {
            display: flex;
            justify-content: space-between;
            font-size: 14px;

            font-family: MicrosoftYaHei;
            color: rgba(72, 87, 106, 1);
            margin: 10px 0 0 0;
            img {
              width: 14px;
              height: 14px;
              margin-right: 10px;
            }
            span {
              font-size: 14px;
              font-family: MicrosoftYaHei;
              color: rgba(175, 190, 205, 1);
            }
          }
        }
        .left:last-child{
          border-bottom: 0;
        }
        .center {
          width: 72.47%;
          .area-content {
            position: relative;
            height: 110px;
            width: 93.34%;
            margin: auto;
            .area {
              position: absolute;
              top: 0;
              left: 0;
              $width: 100%;
              width: $width;
              border-bottom: 1px solid #f1f1f1;
              height: 110px;

              display: flex;
              box-sizing: border-box;
              .item {
                width: calc((#{$width}) / 10);
                border-left: 1px solid #D3DDE6;
                cursor: pointer;
              }
              .last {
                // border-left: 2px solid #cfd6d3;
                width: 0px;
              }
            }
            .applied {
              position: absolute;
              bottom: 0;
              left: 0;
              .item {
                position: absolute;
                bottom: 15px;
                height: 80px;
                background: #faeeee;
                display: flex;
                .line {
                  width: 10px;
                  height: 100%;
                  background: rgba(231, 56, 56, 1);
                  position: absolute;
                  top: 0;
                  left: 0;
                }
                .name {
                  width: 90px;
                  height: 42px;
                  background: rgba(225, 91, 91, 1);
                  border-radius: 21px;
                  font-size: 16px;
                  font-family: MicrosoftYaHei;
                  color: rgba(255, 255, 255, 1);
                  text-align: center;
                  line-height: 42px;
                  margin: auto;
                }
              }
            }
          }
        }
        .right {
          width: 16.93%;
        }
      }
    }
  }
}
</style>


