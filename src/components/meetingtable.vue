<template>
  <div>
    <!-- <h4>会议室申请流程单</h4> -->
    <!-- 选择时间 -->
    <selectmeetingTime @selectmeetingfn="selectmeetingfn"></selectmeetingTime>
    <el-form :model="meeting" :rules="rules" ref="meeting" label-width="100px">
      <table>
        <tr>
          <td class="grey-td">申请人</td>
          <td>{{senderName}}</td>
          <td class="grey-td">申请日期</td>
          <td>{{deliverydate}}</td>
        </tr>
        <tr>
          <td class="grey-td">部门</td>
          <td colspan="3">{{senderPept}}</td>
        </tr>
        <tr>
          <td class="grey-td">
            <span style="color:red;margin:0 5px 0 -11px;">*</span>会议主题</td>
          <td colspan="3">
            <el-form-item v-if="edit" prop="meetingTheme">
              <el-input type="text" placeholder="请输入内容" maxlength="50" show-word-limit v-model="meeting.meetingTheme" @blur="meetingChange">
              </el-input>
            </el-form-item>
            <span v-else>{{meeting.meetingTheme}}</span>
          </td>
        </tr>
        <tr>
          <td class="grey-td">
            <span style="color:red;margin:0 5px 0 -11px;">*</span>会议室</td>
          <td>
            <el-form-item v-if="edit" prop="meetingRoomId">
              <el-select v-model="meeting.meetingRoomId" placeholder="请选择" @change="meetingChange('meeting')">
                <el-option :label="item.name" :value="item.id" v-for="(item,index) in meetingRoomList" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <span v-else>{{meeting.meetingRoomName}}</span>
          </td>
          <td class="grey-td">
            <span style="color:red;margin:0 5px 0 -11px;">*</span>会议类型</td>
          <td>
            <el-form-item v-if="edit" prop="processTypeId">
              <el-select v-model="meeting.processTypeId" placeholder="请选择" @change="meetingChange">
                <el-option :label="item.name" :value="item.id" v-for="(item,index) in processTypeList" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <span v-else>{{meeting.processTypeName}}</span>
          </td>
        </tr>
        <tr>
          <td class="grey-td">
            <span style="color:red;margin:0 5px 0 -11px;">*</span>会议时间</td>
          <td colspan="3">
            <el-form-item v-if="edit" prop="meetingTime">
              <el-input type="text" :disabled="selecttimedialogFormVisibleState" placeholder="请输入内容" v-model="meeting.meetingTime" @focus="selecttimedialogFormVisible">
              </el-input>
            </el-form-item>
            <span v-else>{{meeting.meetingTime}}</span>
          </td>
        </tr>
        <tr>
          <td class="grey-td">
            <span style="color:red;margin:0 5px 0 -11px;">*</span>参加人员</td>
          <td colspan="3">
            <el-form-item v-if="edit" prop="joinUser">
              <el-input :disabled="selectProcessordialogVisible" type="textarea" autosize v-model="meeting.joinUser" placeholder="请选择人员" @focus="selectprocessordialogVisible" @blur="meetingChange"></el-input>
            </el-form-item>
            <span v-else>{{meeting.joinUser}}</span>
          </td>
        </tr>
        <tr>
          <td class="grey-td">备注</td>
          <td colspan="3">
            <el-form-item v-if="edit">
              <el-input maxlength="100" show-word-limit type="textarea" :rows="3" placeholder="请输入内容" v-model="meeting.remark" @blur="meetingChange">
              </el-input>
            </el-form-item>
            <span v-else>{{meeting.remark}}</span>
          </td>
        </tr>
        <tr>
          <td class="grey-td">
            <span style="color:red;margin:0 5px 0 -11px;" v-if="currentLevel==2&&auditorType==1">*</span>审核</td>
          <td colspan="3">
            <el-row style="display:flex;justify-content:space-between" v-if="examineEdit">
              <el-col span="4">
                <el-form-item prop="status">
                  <el-select v-model="meeting.status" aria-placeholder="请选择" :disabled="!(currentLevel==2&&auditorType==1)">
                    <el-option :label="item.label" :value="item.value" v-for="(item,index) in evaluate" :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="19">
                <el-form-item prop="auditRemark">
                  <el-input v-model="meeting.auditRemark" maxlength="50" show-word-limit placeholder="请输入" :disabled="!(currentLevel==2&&auditorType==1)"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <div v-if="isdetail">
              <div>{{meeting.status | auditStatusTran}}</div>
              <!-- <div>{{meeting.status }}</div> -->
              <div>{{meeting.auditRemark}}</div>
            </div>
          </td>
        </tr>

      </table>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";

import selectProcessor from "@/components/selectProcessor.vue";
import selectmeetingTime from "@/components/selectmeetingTime.vue";
@Component({
  components: {
    selectProcessor,
    selectmeetingTime
  }
})
export default class officialtable extends Vue {
  @State("isbaocun") isbaocun: any;
  validatestatus = (rule, value, callback) => {
    //验证审核必填
    console.log(rule, value, callback);
    if (this.currentLevel == 2 && this.auditorType == 1) {
      if (value === "" || value === null) {
        callback(new Error("请选择"));
      } else {
        callback();
      }
    } else {
      callback();
    }
  };
  validateauditRemark = (rule, value, callback) => {
    //验证审核必填
    console.log(rule, value, callback);
    if (this.currentLevel == 2 && this.auditorType == 1) {
      if (value === "" || value === null) {
        callback(new Error("请输入"));
      } else {
        callback();
      }
    } else {
      callback();
    }
  };
  public rules: object = {
    meetingTheme: [
      { required: true, message: "请填写会议主题", trigger: "blur" }
    ],
    meetingRoomId: [
      { required: true, message: "请选择会议室", trigger: "change" }
    ],
    meetingTime: [
      { required: true, message: "请选择会议时间", trigger: "change" }
    ],
    joinUser: [
      { required: true, message: "请选择参加人员", trigger: "change" }
    ],
    status: [{ validator: this.validatestatus, trigger: "change" }],
    auditRemark: [{ validator: this.validateauditRemark, trigger: "blur" }],
    processTypeId: [
      { required: true, message: "请选择会议类型", trigger: "change" }
    ]
  };
  @State("selecttimedialogFormVisible") selecttimedialogFormVisibleState: any;
  @State("issubmit") issubmit: any;
  @Mutation("setisvalid") setisvalid: any;
  @Mutation("setissubmit") setissubmit: any;
  @Watch("issubmit")
  submitchange(newValue: any, oldValue: any) {
    if (newValue) {
      this.$refs["meeting"].validate(valid => {
        this.setisvalid({ value: valid });
        this.setissubmit({ value: false });
      });
    }
  }
  public edit: boolean = true; //申请的表单字段是否可以编辑
  public examineEdit: boolean = false; //审核的表单字段是否显示
  public isdetail: boolean = false; //当前页面是否是详情页面，详情页面审核表单只读
  public evaluate: Array<object> = [
    {
      value: 1,
      label: "拒绝"
    },
    {
      value: 0,
      label: "同意"
    }
  ];
  @Prop() senderName!: string;
  @Prop() senderPept!: string;
  @Prop() deliverydate!: string;
  @Prop() currentLevel!: number;
  @Prop() auditorType!: number;
  @State("joinUser") joinUser: any;
  @State("meeting") meeting: any;
  @State("processTypeList") processTypeList: any;
  @State("meetingRoomList") meetingRoomList: any;
  @State("selectProcessordialogVisible") selectProcessordialogVisible: any;
  @Mutation("fathersonmu") fathersonmu: any;
  @Mutation("meeting") meetingMu: any;
  @Mutation("selectProcessordialogVisiblemu")
  selectProcessordialogVisiblemu: any;

  selectprocessordialogVisible() {
    this.fathersonmu({ value: "meeting" });
    //打开选择人员弹框
    this.selectProcessordialogVisiblemu({ value: true });
  }

  @Mutation("selecttimedialogFormVisiblemu") selecttimedialogFormVisiblemu: any;
  selecttimedialogFormVisible() {
    //打开选择时间弹框
    this.selecttimedialogFormVisiblemu({ value: true });
  }
  selectmeetingfn(val) {
    //获取子组件选择的时间
    const { applyStartTime, applyEndTime, during } = val;
    this.meeting.applyStartTime = applyStartTime;
    this.meeting.applyEndTime = applyEndTime;
    this.$nextTick(() => {
      this.$set(this.meeting, "meetingTime", during);
    });
  }
  @Mutation("setmeetingSelectTime") setmeetingSelectTime: any;
  meetingChange(_type = "") {
    if (_type == "meeting") {
      this.meeting.meetingTime = "";
      let meetingRoomId = this.meeting.meetingRoomId; //选择会议室之后，获取会议室使用情况，传给选择时间组件
      this.$ajax.approvalMetting
        .getMeetingOccupySituationByRoomId({
          params: {
            meetingRoomId
          }
        })
        .then(res => {
          if (res.state == 1000) {
            // this.usemeetingList = res.data;
            // this.appliedTime();
            this.setmeetingSelectTime({ value: res.data });
          }
        });
    }

    // 提交会议室表单填入的值
    if (this.meeting.processTypeId !== "") {
      //新增流程时预览，显示流程类型
      this.processTypeList.map(item => {
        if (item.id == this.meeting.processTypeId) {
          this.meeting.processTypeName = item.name;
        }
      });
    }
    if (this.meeting.meetingRoomId !== "") {
      //新增会议室流程时预览，显示会议室
      this.meetingRoomList.map(item => {
        if (item.id == this.meeting.meetingRoomId) {
          this.meeting.meetingRoomName = item.name;
        }
      });
    }

    this.meetingMu({ value: this.meeting });
  }
  @Watch("joinUser")
  change(newValue: any, oldValue: any): viod {
    const { joinUserid, joinUserName } = newValue;
    this.meeting.joinUser = joinUserName;
  }
  mounted() {
    if (this.$route.path == "/process/newprocess") {
      if (this.$route.query.newpagetype == "new") {
        this.edit = true;
        this.examineEdit = false;
      } else if (this.$route.query.newpagetype == "handle") {
        if (this.$route.query.ispreserve == "true") {
          this.edit = true;
          this.examineEdit = false;
        } else {
          this.edit = false;
          this.examineEdit = true;
        }
      } else if (this.$route.query.newpagetype == "detail") {
        this.edit = false;
        this.examineEdit = false;
        this.isdetail = true;
      }
    } else if (this.$route.path == "/process/preview") {
      this.edit = false;
      this.examineEdit = false;
      this.isdetail = true;
    }
  }
}
</script>


<style lang="scss">
</style>


