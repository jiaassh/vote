<template>
    <div>
        <!-- <h4>维修申请流程单</h4> -->
        <el-form :model="maintenance" :rules="rules" ref="maintenance" label-width="100px">
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
                        <el-form-item v-if="edit" prop="processTypeId">
                            <el-select v-model="maintenance.processTypeId" placeholder="请选择维修类型" @change="maintenanceChange">
                                <el-option :label="item.name" :value="item.id" v-for="(item,index) in processTypeList" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <span v-else>{{maintenance.processTypeName}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="grey-td">
                        <span style="color:red;margin:0 5px 0 -11px;">*</span>故障地点</td>
                    <td colspan="3">
                        <el-row v-if="edit">
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
                        <span v-else>{{maintenance.faultCode}}, {{maintenance.faultTablet}}室</span>
                    </td>
                </tr>
                <tr>
                    <td class="grey-td">
                        <span style="color:red;margin:0 5px 0 -11px;">*</span>故障描述</td>
                    <td colspan="3">
                        <el-form-item v-if="edit" prop="faultRemark">
                            <el-input type="textarea" :rows="3" maxlength="100" show-word-limit placeholder="请输入内容" v-model="maintenance.faultRemark" @blur="maintenanceChange">
                            </el-input>
                        </el-form-item>
                        <span v-else>{{maintenance.faultRemark}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="grey-td">设备名称</td>
                    <td>
                        <el-form-item v-if="edit">
                            <el-input maxlength="50" show-word-limit placeholder="请输入" v-model="maintenance.deviceName" @blur="maintenanceChange">
                            </el-input>
                        </el-form-item>
                        <span v-else>{{maintenance.deviceName}}</span>
                    </td>
                    <td class="grey-td">
                        <span style="color:red;margin:0 5px 0 -11px;">*</span>故障时间</td>
                    <td>
                        <el-form-item v-if="edit" prop="faultTime">
                            <el-date-picker v-model="maintenance.faultTime" type="date" placeholder="选择日期时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="maintenanceChange" :picker-options="expireTimeOption">
                            </el-date-picker>
                        </el-form-item>
                        <span v-else>{{maintenance.faultTime}}</span>
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
                        <el-row style="display:flex;justify-content:space-between" v-if="examineEdit">

                            <el-col span="24">
                                <el-form-item>
                                    <el-input type="textarea" maxlength="100" show-word-limit :rows="3" placeholder="请输入内容" v-model="maintenance.repairContent" :disabled="!(currentLevel==3&&auditorType==1)">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div v-if="isdetail">
                            <div>{{maintenance.repairContent}}</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="grey-td">备注</td>
                    <td colspan="3">
                        <el-form-item v-if="edit">
                            <el-input maxlength="100" show-word-limit type="textarea" :rows="3" placeholder="请输入内容" v-model="maintenance.remark" @blur="maintenanceChange">
                            </el-input>
                        </el-form-item>
                        <span v-else>{{maintenance.remark}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="grey-td"><span v-if="currentLevel==4&&auditorType==1" style="color:red;margin:0 5px 0 -11px;">*</span>申请人评价</td>
                    <td colspan="3">
                        <el-row style="display:flex;justify-content:space-between" v-if="examineEdit">
                            <el-col span="4">
                                <el-form-item prop="applyUserEvaluate">
                                    <el-select v-model="maintenance.applyUserEvaluate" aria-placeholder="请选择" :disabled="!(currentLevel==4&&auditorType==1)">
                                        <el-option :label="item.label" :value="item.value" v-for="(item,index) in evaluate" :key="index"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col span="20"></el-col>
                        </el-row>
                        <div v-if="isdetail">
                            <div>{{maintenance.applyUserEvaluate | EvaluateTran}}</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="grey-td"><span v-if="currentLevel==5&&auditorType==1" style="color:red;margin:0 5px 0 -11px;">*</span>维修人评价</td>
                    <td colspan="3">
                        <el-row style="display:flex;justify-content:space-between" v-if="examineEdit">
                            <el-col span="4">
                                <el-form-item prop="repairUserEvaluate">
                                    <el-select v-model="maintenance.repairUserEvaluate" aria-placeholder="请选择" :disabled="!(currentLevel==5&&auditorType==1)">
                                        <el-option :label="item.label" :value="item.value" v-for="(item,index) in evaluate" :key="index"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col span="20"></el-col>
                        </el-row>
                        <div v-if="isdetail">
                            <div>{{maintenance.repairUserEvaluate | EvaluateTran}}</div>
                        </div>
                    </td>
                </tr>
            </table>
        </el-form>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop ,Watch} from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
@Component({})
export default class officialtable extends Vue {
    expireTimeOption = {
    disabledDate(date) {
      return date.getTime() < new Date().getTime() - 86400000;
    }
  };
    @State("isbaocun") isbaocun: any;
    validateapplyUserEvaluate = (rule, value, callback) => {
    //验证审核必填
    if (this.currentLevel == 4 && this.auditorType == 1) {
      if (value === ""||value === null) {
        callback(new Error("请选择"));
      } else {
        callback();
      }
    } else {
      callback();
    }
  };
  validaterepairUserEvaluate = (rule, value, callback) => {
      console.log(rule, value, callback)
    //验证审核必填
    if (this.currentLevel == 5 && this.auditorType == 1) {
      if (value === ""||value === null) {
        callback(new Error("请选择"));
      } else {
        callback();
      }
    } else {
      callback();
    }
  };
    public rules: object = {
    processTypeId: [
      { required: true, message: "请选择维修类型", trigger: "change" }
    ],
    faultCode: [
      { required: true, message: "请选择故障地点", trigger: "change" }
    ],
    faultTablet: [
      { required: true, message: "请填写门号", trigger: "blur" }
    ],
    faultRemark: [
      { required: true, message: "请输入故障描述", trigger: "blur" }
    ],
    faultTime: [
      { required: true, message: "请选择故障时间", trigger: "change" }
    ],
    applyUserEvaluate: [{ validator: this.validateapplyUserEvaluate, trigger: "change" }],
    repairUserEvaluate: [{ validator: this.validaterepairUserEvaluate, trigger: "change" }],
  };
  @State("issubmit") issubmit: any;
  @Mutation("setisvalid") setisvalid: any;
  @Mutation("setissubmit") setissubmit: any;
  @Watch("issubmit")
  submitchange(newValue: any, oldValue: any) {
    if (newValue) {
      this.$refs["maintenance"].validate(valid => {
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
      value: 0,
      label: "满意"
    },
    {
      value: 1,
      label: "基本满意"
    },
    {
      value: 2,
      label: "不满意"
    }
  ];
  @Prop() senderName!: string;
  @Prop() senderPept!: string;
  @Prop() deliverydate!: string;
  @Prop() currentLevel!: number;
  @Prop() auditorType!: number;
  @State("maintenance") maintenance: any;
  @State("processTypeList") processTypeList: any;
  @State("faultLocationList") faultLocationList: any;
  @Mutation("maintenance") maintenanceMu: any;
  maintenanceChange() {
      if (this.maintenance.processTypeId !== "") {    //新增流程时预览，显示流程类型
      this.processTypeList.map((item)=>{
         if(item.id==this.maintenance.processTypeId){
             this.maintenance.processTypeName=item.name
         }
      })
    }
    this.maintenanceMu({ value: this.maintenance });
  }
  mounted() {


    if (this.$route.path == "/process/newprocess") {  
      if (this.$route.query.newpagetype == "new") {
        this.edit = true;
        this.examineEdit = false;
      } else if (this.$route.query.newpagetype == "handle") {
        if (this.$route.query.ispreserve=='true') {
          this.edit=true;
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


