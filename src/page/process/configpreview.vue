<template>
    <div id="configpreview">
        <div class="item" v-if="addshowtype=='official'">
            <h4>公文传输流程单</h4>
            <el-form :model="addofficialform" :rules="rules" ref="addofficialform" label-width="100px">
                <table>
                    <tr>
                        <td class="grey-td">发件人</td>
                        <td>{{senderName}}</td>
                        <td class="grey-td">交办日期</td>
                        <td>{{deliverydate}}</td>
                    </tr>
                    <tr>
                        <td class="grey-td">部门</td>
                        <td>{{senderPept}}</td>
                        <td class="grey-td">
                            <span style="color:red;margin:0 5px 0 -11px;">*</span>计划完成日期</td>
                        <td>
                            <el-form-item prop="completionDate">
                                <el-date-picker v-model="addofficialform.completionDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="officialmutation"></el-date-picker>
                            </el-form-item>

                        </td>
                    </tr>
                    <tr>
                        <td class="grey-td">
                            <span style="color:red;margin:0 5px 0 -11px;">*</span>公文标题</td>
                        <td colspan="3">
                            <el-form-item prop="documentTitle">
                                <el-input type="text" placeholder="请输入内容" maxlength="50" show-word-limit v-model="addofficialform.documentTitle" @blur="officialmutation">
                                </el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr style="height:250px;">
                        <td class="grey-td">
                            <span style="color:red;margin:0 5px 0 -11px;">*</span>公文内容</td>
                        <td colspan="3">
                            <el-form-item prop="documentContent">
                                <el-input type="textarea" :autosize="{ minRows: 15, maxRows: 30}" placeholder="请输入内容" v-model="addofficialform.documentContent" @blur="officialmutation">
                                </el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="grey-td">备注</td>
                        <td colspan="3">
                            <el-form-item>
                                <el-input type="textarea" maxlength="100" show-word-limit :rows="3" placeholder="请输入内容" v-model="addofficialform.documentRemark" @blur="officialmutation">
                                </el-input>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
            </el-form>
        </div>
        <div class="item" v-if="addshowtype=='funds'">

            <h4>经费申请流程单</h4>
            <el-form :model="fundsform" :rules="rulesfunds" ref="fundsform" label-width="100px">
                <table>
                    <tr>
                        <td class="grey-td">申请人</td>
                        <td>{{senderName}}</td>
                        <td class="grey-td">申请日期</td>
                        <td>{{deliverydate}}</td>
                    </tr>
                    <tr>
                        <td class="grey-td">部门</td>
                        <td>{{senderPept}}</td>
                        <td class="grey-td">
                            需求时间</td>
                        <td>
                            <el-form-item prop="requiredDate">
                                <el-date-picker v-model="fundsform.requiredDate" type="date" placeholder="选择日期时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="changefundsfn">
                                </el-date-picker>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="grey-td">
                            <span style="color:red;margin:0 5px 0 -11px;">*</span>申请经费类型</td>
                        <td colspan="3">

                            <el-form-item prop="processTypeId">
                                <el-select v-model="fundsform.processTypeId" @change="changefundsfn" aria-placeholder="请选择经费类型">
                                    <el-option :label="item.name" :value="item.id" v-for="(item,index) in processTypeList" :key="index"></el-option>
                                </el-select>
                            </el-form-item>

                        </td>
                    </tr>
                    <tr>
                        <td class="grey-td">
                            <span style="color:red;margin:0 5px 0 -11px;">*</span>申请金额</td>
                        <td colspan="3">
                            <el-form-item prop="applyMoney">
                                <el-input placeholder="请输入金额" v-model="fundsform.applyMoney" @blur="changefundsfn('applyMoney')">
                                    <span slot="suffix">元</span>
                                </el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr style="height:100px">
                        <td class="grey-td">
                            <span style="color:red;margin:0 5px 0 -11px;">*</span>经费用途</td>
                        <td colspan="3">
                            <el-form-item prop="purpose">
                                <el-input type="textarea" :rows="3" maxlength="100" show-word-limit placeholder="请输入内容" v-model="fundsform.purpose" @blur="changefundsfn">
                                </el-input>
                            </el-form-item>
                        </td>

                    </tr>

                    <tr>
                        <td class="grey-td">
                            <span style="color:red;margin:0 5px 0 -11px;">*</span>分管领导审核</td>
                        <td colspan="3">
                            <el-row style="display:flex;justify-content:space-between">
                                <el-col span="4">
                                    <el-form-item prop="leadAudit">
                                        <el-select v-model="fundsform.leadAudit" aria-placeholder="请选择">
                                            <el-option :label="item.label" :value="item.value" v-for="(item,index) in plan" :key="index"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col span="19">
                                    <el-form-item prop="leadRemark">
                                        <el-input type="textarea" maxlength="50" show-word-limit :rows="3" placeholder="请输入内容" v-model="fundsform.leadRemark">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                        </td>
                    </tr>
                    <tr>
                        <td class="grey-td">
                            <span style="color:red;margin:0 5px 0 -11px;">*</span>财务校长复核</td>
                        <td colspan="3">
                            <el-row style="display:flex;justify-content:space-between">
                                <el-col span="4">
                                    <el-form-item prop="financePrincipalAudit">
                                        <el-select v-model="fundsform.financePrincipalAudit" aria-placeholder="请选择">
                                            <el-option :label="item.label" :value="item.value" v-for="(item,index) in plan" :key="index"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col span="19">
                                    <el-form-item prop="financePrincipalRemark">
                                        <el-input type="textarea" :rows="3" maxlength="50" show-word-limit placeholder="请输入内容" v-model="fundsform.financePrincipalRemark">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                        </td>
                    </tr>
                    <tr>
                        <td class="grey-td">
                            <span style="color:red;margin:0 5px 0 -11px;">*</span>校长审批</td>
                        <td colspan="3">
                            <el-row style="display:flex;justify-content:space-between">
                                <el-col span="4">
                                    <el-form-item prop="principalAudit">
                                        <el-select v-model="fundsform.principalAudit" aria-placeholder="请选择">
                                            <el-option :label="item.label" :value="item.value" v-for="(item,index) in plan" :key="index"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col span="19">
                                    <el-form-item prop="principalRemark">
                                        <el-input type="textarea" :rows="3" maxlength="50" show-word-limit placeholder="请输入内容" v-model="fundsform.principalRemark">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                        </td>
                    </tr>
                    <tr>
                        <td class="grey-td">
                            <span style="color:red;margin:0 5px 0 -11px;">*</span>财务归档</td>
                        <td colspan="3">
                            <el-row style="display:flex;justify-content:space-between">
                                <el-col span="4">
                                    <el-form-item prop="financeAudit">
                                        <el-select v-model="fundsform.financeAudit" aria-placeholder="请选择">
                                            <el-option :label="item.label" :value="item.value" v-for="(item,index) in plan" :key="index"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col span="19">
                                    <el-form-item prop="financeRemark">
                                        <el-input type="textarea" :rows="3" maxlength="50" show-word-limit placeholder="请输入内容" v-model="fundsform.financeRemark">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                        </td>
                    </tr>

                    <tr>
                        <td class="grey-td">备注</td>
                        <td colspan="3">
                            <el-form-item>
                                <el-input maxlength="100" show-word-limit type="textarea" :rows="3" placeholder="请输入内容" v-model="fundsform.remark" @blur="changefundsfn">
                                </el-input>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
            </el-form>

        </div>
        <div class="item" v-if="addshowtype=='maintenance'">
            <h4>维修申请流程单</h4>
            <el-form :model="maintenance" :rules="rulesmaintenance" ref="maintenance" label-width="100px">
                <table>
                    <tr>
                        <td class="grey-td">送修人</td>
                        <td>{{senderName}}</td>
                        <td class="grey-td">申请日期</td>
                        <td>{{deliverydate}}</td>
                    </tr>
                    <tr>
                        <td class="grey-td">部门</td>
                        <td>{{senderPept}}</td>
                        <td class="grey-td">
                            <span style="color:red;margin:0 5px 0 -11px;">*</span>维修类型</td>
                        <td>
                            <el-form-item prop="processTypeId">
                                <el-select v-model="maintenance.processTypeId" placeholder="请选择维修类型" @change="maintenanceChange">
                                    <el-option :label="item.name" :value="item.id" v-for="(item,index) in processTypeList" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="grey-td">
                            <span style="color:red;margin:0 5px 0 -11px;">*</span>故障地点</td>
                        <td colspan="3">
                            <el-row>
                                <el-col span="8">
                                    <el-form-item prop="localtion_name">
                                        <el-select v-model="maintenance.faultCode" placeholder="请选择故障地点" @change="maintenanceChange">
                                            <el-option :label="item.locationName" :value="item.locationName" v-for="(item,index) in faultLocationList" :key="index"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col span="8">
                                    <el-form-item prop="faultTablet">
                                        <el-input placeholder="请输入" v-model="maintenance.faultTablet" @blur="maintenanceChange">
                                            <span slot="suffix">室</span>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-co span="12">
                                    <span>（填写相应门号）</span>
                                </el-co>
                            </el-row>
                        </td>
                    </tr>
                    <tr>
                        <td class="grey-td">
                            <span style="color:red;margin:0 5px 0 -11px;">*</span>故障描述</td>
                        <td colspan="3">
                            <el-form-item prop="faultRemark">
                                <el-input type="textarea" :rows="3" maxlength="100" show-word-limit placeholder="请输入内容" v-model="maintenance.faultRemark" @blur="maintenanceChange">
                                </el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="grey-td">设备名称</td>
                        <td>
                            <el-form-item>
                                <el-input maxlength="50" show-word-limit placeholder="请输入" v-model="maintenance.deviceName" @blur="maintenanceChange">
                                </el-input>
                            </el-form-item>
                        </td>
                        <td class="grey-td">
                            <span style="color:red;margin:0 5px 0 -11px;">*</span>故障时间</td>
                        <td>
                            <el-form-item prop="faultTime">
                                <el-date-picker v-model="maintenance.faultTime" type="date" placeholder="选择日期时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="maintenanceChange">
                                </el-date-picker>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="grey-td">维修人</td>
                        <td>{{maintenance.repairUser}}</td>
                        <td class="grey-td">维修单位</td>
                        <td>{{maintenance.repairOrganization}}</td>
                    </tr>
                    <tr>
                        <td class="grey-td">维修内容</td>
                        <td colspan="3">
                            <el-row style="display:flex;justify-content:space-between">

                                <el-col span="24">
                                    <el-form-item>
                                        <el-input type="textarea" maxlength="100" show-word-limit :rows="3" placeholder="请输入内容" v-model="maintenance.repairContent">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <div>
                                <div>{{maintenance.repairContent}}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="grey-td">备注</td>
                        <td colspan="3">
                            <el-form-item>
                                <el-input maxlength="100" show-word-limit type="textarea" :rows="3" placeholder="请输入内容" v-model="maintenance.remark" @blur="maintenanceChange">
                                </el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="grey-td">
                            <span style="color:red;margin:0 5px 0 -11px;">*</span>申请人评价</td>
                        <td colspan="3">
                            <el-row style="display:flex;justify-content:space-between">
                                <el-col span="4">
                                    <el-form-item prop="applyUserEvaluate">
                                        <el-select v-model="maintenance.applyUserEvaluate" aria-placeholder="请选择">
                                            <el-option :label="item.label" :value="item.value" v-for="(item,index) in evaluate" :key="index"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col span="20"></el-col>
                            </el-row>
                            <div>
                                <div>{{maintenance.applyUserEvaluate | EvaluateTran}}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="grey-td">
                            <span style="color:red;margin:0 5px 0 -11px;">*</span>维修人评价</td>
                        <td colspan="3">
                            <el-row style="display:flex;justify-content:space-between">
                                <el-col span="4">
                                    <el-form-item prop="repairUserEvaluate">
                                        <el-select v-model="maintenance.repairUserEvaluate" aria-placeholder="请选择">
                                            <el-option :label="item.label" :value="item.value" v-for="(item,index) in evaluate" :key="index"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col span="20"></el-col>
                            </el-row>
                            <div>
                                <div>{{maintenance.repairUserEvaluate | EvaluateTran}}</div>
                            </div>
                        </td>
                    </tr>
                </table>
            </el-form>
        </div>
        <div class="item" v-if="addshowtype=='meeting'">
            <h4>会议室申请流程单</h4>
            <!-- 选择时间 -->
            <selectmeetingTime @selectmeetingfn="selectmeetingfn"></selectmeetingTime>
            <el-form :model="meeting" :rules="rulesmeeting" ref="meeting" label-width="100px">
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
                            <el-form-item  prop="meetingTheme">
                                <el-input type="text" placeholder="请输入内容" maxlength="50" show-word-limit v-model="meeting.meetingTheme" @blur="meetingChange">
                                </el-input>
                            </el-form-item>
                            
                        </td>
                    </tr>
                    <tr>
                        <td class="grey-td">
                            <span style="color:red;margin:0 5px 0 -11px;">*</span>会议室</td>
                        <td>
                            <el-form-item  prop="meetingRoomId">
                                <el-select v-model="meeting.meetingRoomId" placeholder="请选择" @change="meetingChange('meeting')">
                                    <el-option :label="item.name" :value="item.id" v-for="(item,index) in meetingRoomList" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td class="grey-td">会议类型</td>
                        <td>
                            <el-form-item >
                                <el-select v-model="meeting.processTypeId" placeholder="请选择" @change="meetingChange">
                                    <el-option :label="item.name" :value="item.id" v-for="(item,index) in processTypeList" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="grey-td">
                            <span style="color:red;margin:0 5px 0 -11px;">*</span>会议时间</td>
                        <td colspan="3">
                            <el-form-item  prop="meetingTime">
                                <el-input type="text" placeholder="请输入内容" v-model="meeting.meetingTime" @focus="selecttimedialogFormVisible">
                                </el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="grey-td">
                            <span style="color:red;margin:0 5px 0 -11px;">*</span>参加人员</td>
                        <td colspan="3">
                            <el-form-item  prop="joinUser">
                                <el-input type="textarea" autosize v-model="meeting.joinUser" placeholder="请选择人员" @focus="selectprocessordialogVisible" @blur="meetingChange"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="grey-td">备注</td>
                        <td colspan="3">
                            <el-form-item >
                                <el-input maxlength="100" show-word-limit type="textarea" :rows="3" placeholder="请输入内容" v-model="meeting.remark" @blur="meetingChange">
                                </el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td class="grey-td">
                            <span style="color:red;margin:0 5px 0 -11px;" >*</span>审核</td>
                        <td colspan="3">
                            <el-row style="display:flex;" >
                                <el-col span="4" style="margin-right:35px;">
                                    <el-form-item prop="status">
                                        <el-select v-model="meeting.status" aria-placeholder="请选择" >
                                            <el-option :label="item.label" :value="item.value" v-for="(item,index) in evaluate" :key="index"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col span="19">
                                    <el-form-item prop="auditRemark">
                                        <el-input v-model="meeting.auditRemark" maxlength="50" show-word-limit placeholder="请输入" ></el-input>
                                    </el-form-item>
                                </el-col>

                            </el-row>
                            
                        </td>
                    </tr>

                </table>
            </el-form>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import dateFormat from "@/utils/dateFormatClass.ts";
import { State } from "vuex-class";
@Component({})
export default class configpreview extends Vue {
    public meeting={}
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
  public rulesmeeting: object = {
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
    auditRemark: [{ validator: this.validateauditRemark, trigger: "blur" }]
  };
  public maintenance = {};
  validateapplyUserEvaluate = (rule, value, callback) => {
    //验证审核必填
    if (this.currentLevel == 4 && this.auditorType == 1) {
      if (value === "" || value === null) {
        callback(new Error("请选择"));
      } else {
        callback();
      }
    } else {
      callback();
    }
  };
  validaterepairUserEvaluate = (rule, value, callback) => {
    console.log(rule, value, callback);
    //验证审核必填
    if (this.currentLevel == 5 && this.auditorType == 1) {
      if (value === "" || value === null) {
        callback(new Error("请选择"));
      } else {
        callback();
      }
    } else {
      callback();
    }
  };
  public rulesmaintenance: object = {
    processTypeId: [
      { required: true, message: "请选择维修类型", trigger: "change" }
    ],
    faultCode: [
      { required: true, message: "请选择故障地点", trigger: "change" }
    ],
    faultTablet: [{ required: true, message: "请填写门号", trigger: "blur" }],
    faultRemark: [
      { required: true, message: "请输入故障描述", trigger: "blur" }
    ],
    faultTime: [
      { required: true, message: "请选择故障时间", trigger: "change" }
    ],
    applyUserEvaluate: [
      { validator: this.validateapplyUserEvaluate, trigger: "change" }
    ],
    repairUserEvaluate: [
      { validator: this.validaterepairUserEvaluate, trigger: "change" }
    ]
  };
  public plan: Array<object> = [
    {
      value: 1,
      label: "计划内"
    },
    {
      value: 0,
      label: "计划外"
    }
  ];
  public rules: object = {
    documentTitle: [
      { required: true, message: "请输入公文标题", trigger: "blur" }
    ],
    completionDate: [
      { required: true, message: "请选择计划完成日期", trigger: "change" }
    ],
    documentContent: [
      { required: true, message: "请输入公文内容", trigger: "blur" }
    ]
  };
  validateleadAudit = (rule, value, callback) => {
    //验证审核必填
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
  validateleadRemark = (rule, value, callback) => {
    console.log(rule, value, callback);
    //验证审核必填
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
  validatefinancePrincipalAudit = (rule, value, callback) => {
    //验证审核必填
    if (this.currentLevel == 3 && this.auditorType == 1) {
      if (value === "" || value === null) {
        callback(new Error("请选择"));
      } else {
        callback();
      }
    } else {
      callback();
    }
  };
  validatefinancePrincipalRemark = (rule, value, callback) => {
    //验证审核必填
    if (this.currentLevel == 3 && this.auditorType == 1) {
      if (value === "" || value === null) {
        callback(new Error("请输入"));
      } else {
        callback();
      }
    } else {
      callback();
    }
  };
  validateprincipalAudit = (rule, value, callback) => {
    //验证审核必填
    if (this.currentLevel == 4 && this.auditorType == 1) {
      if (value === "" || value === null) {
        callback(new Error("请选择"));
      } else {
        callback();
      }
    } else {
      callback();
    }
  };
  validateprincipalRemark = (rule, value, callback) => {
    //验证审核必填
    if (this.currentLevel == 4 && this.auditorType == 1) {
      if (value === "" || value === null) {
        callback(new Error("请输入"));
      } else {
        callback();
      }
    } else {
      callback();
    }
  };
  validatefinanceAudit = (rule, value, callback) => {
    //验证审核必填
    if (this.currentLevel == 5 && this.auditorType == 1) {
      if (value === "" || value === null) {
        callback(new Error("请选择"));
      } else {
        callback();
      }
    } else {
      callback();
    }
  };
  validatefinanceRemark = (rule, value, callback) => {
    //验证审核必填
    if (this.currentLevel == 5 && this.auditorType == 1) {
      if (value === "" || value === null) {
        callback(new Error("请输入"));
      } else {
        callback();
      }
    } else {
      callback();
    }
  };

  validateapplyMoney = (rule, value, callback) => {
    //验证审核必填
    var isNum = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
    if (isNum.test(value)) {
      callback();
    } else {
      callback("请输入正数，保留2位小数");
    }
  };
  public rulesfunds: object = {
    processTypeId: [
      { required: true, message: "请选择申请经费类型", trigger: "change" }
    ],
    applyMoney: [
      { required: true, message: "请输入申请金额", trigger: "blur" },
      { validator: this.validateapplyMoney, trigger: "blur" }
    ],
    purpose: [{ required: true, message: "请输入经费用途", trigger: "blur" }],
    leadAudit: [{ validator: this.validateleadAudit, trigger: "change" }],
    leadRemark: [{ validator: this.validateleadRemark, trigger: "blur" }],
    financePrincipalAudit: [
      { validator: this.validatefinancePrincipalAudit, trigger: "change" }
    ],
    financePrincipalRemark: [
      { validator: this.validatefinancePrincipalRemark, trigger: "blur" }
    ],
    principalAudit: [
      { validator: this.validateprincipalAudit, trigger: "change" }
    ],
    principalRemark: [
      { validator: this.validateprincipalRemark, trigger: "blur" }
    ],
    financeAudit: [{ validator: this.validatefinanceAudit, trigger: "change" }],
    financeRemark: [{ validator: this.validatefinanceRemark, trigger: "blur" }]
  };
  public addofficialform: any = {};
  public fundsform: any = {};
  public deliverydate: string = dateFormat("YYYY-mm-dd", new Date());
  public senderName = localStorage.getItem("tname");
  public senderPept = localStorage.getItem("deptName");
  @State("addshowtype") addshowtype: any;
  mounted() {}
}
</script>


<style lang="scss">
#configpreview {
  .item {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;

    table {
      // border: 1px solid #D1DBE5;
      border-spacing: 0;
      border-collapse: collapse;
      tr {
        td {
          border: 1px solid #d1dbe5;
          width: 282px;
          line-height: 40px;
          height: 40px;
          box-sizing: border-box;
          font-size: 14px;
          color: #48576a;
          padding: 10px;
          &.grey-td {
            background-color: #eef1f6;
          }
          .el-form-item {
            margin-bottom: 0px !important;
          }
          .el-form-item__content {
            margin-left: 0px !important;
          }
        }
        td:nth-child(2n-1) {
          width: 282px;
          box-sizing: border-box;
          padding-left: 62px;
          &.remark {
            padding: 20px;
            line-height: 20px;
            text-indent: 2em;
          }
        }
        &.grey-th {
          background-color: #eef1f6;
        }
      }
    }
  }
}
</style>



