<template>
  <div>
    <!-- <h4>经费申请流程单</h4> -->
    <el-form :model="fundsform" :rules="rules" ref="fundsform" label-width="100px">
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
            <el-form-item v-if="edit" prop="requiredDate">
              <el-date-picker v-model="fundsform.requiredDate" type="date" placeholder="选择日期时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="changefundsfn" :picker-options="expireTimeOption">
              </el-date-picker>
            </el-form-item>
            <span v-else>{{fundsform.requiredDate}}</span>
          </td>
        </tr>
        <tr>
          <td class="grey-td">
            <span style="color:red;margin:0 5px 0 -11px;">*</span>申请经费类型</td>
          <td colspan="3">

            <el-form-item v-if="edit" prop="processTypeId">
              <el-select v-model="fundsform.processTypeId" @change="changefundsfn" aria-placeholder="请选择经费类型">
                <el-option :label="item.name" :value="item.id" v-for="(item,index) in processTypeList" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <span v-else>{{fundsform.processTypeName}}</span>

          </td>
        </tr>
        <tr>
          <td class="grey-td">
            <span style="color:red;margin:0 5px 0 -11px;">*</span>申请金额</td>
          <td colspan="3">
            <el-form-item v-if="edit" prop="applyMoney">
              <el-input placeholder="请输入金额" v-model="fundsform.applyMoney" @blur="changefundsfn('applyMoney')">
                <span slot="suffix">元</span>
              </el-input>
            </el-form-item>
            <span v-else>{{fundsform.applyMoney}}元</span>
          </td>
        </tr>
        <tr style="height:100px">
          <td class="grey-td">
            <span style="color:red;margin:0 5px 0 -11px;">*</span>经费用途</td>
          <td colspan="3">
            <el-form-item v-if="edit" prop="purpose">
              <el-input type="textarea" :rows="3" maxlength="100" show-word-limit placeholder="请输入内容" v-model="fundsform.purpose" @blur="changefundsfn">
              </el-input>
            </el-form-item>
            <span v-else>{{fundsform.purpose}}</span>
          </td>

        </tr>

        <tr>
          <td class="grey-td">
            <span v-if="currentLevel==2&&auditorType==1" style="color:red;margin:0 5px 0 -11px;">*</span>分管领导审核</td>
          <td colspan="3">
            <el-row style="display:flex;justify-content:space-between" v-if="examineEdit">
              <el-col span="4">
                <el-form-item prop="leadAudit">
                  <el-select v-model="fundsform.leadAudit" aria-placeholder="请选择" :disabled="!(currentLevel==2&&auditorType==1)">
                    <el-option :label="item.label" :value="item.value" v-for="(item,index) in plan" :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="19">
                <el-form-item prop="leadRemark">
                  <el-input type="textarea" maxlength="50" show-word-limit :rows="3" placeholder="请输入内容" v-model="fundsform.leadRemark" :disabled="!(currentLevel==2&&auditorType==1)">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="isdetail">
              <div>{{fundsform.leadAudit | planTransform}}</div>
              <div>{{fundsform.leadRemark}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="grey-td">
            <span v-if="currentLevel==3&&auditorType==1" style="color:red;margin:0 5px 0 -11px;">*</span>财务校长复核</td>
          <td colspan="3">
            <el-row style="display:flex;justify-content:space-between" v-if="examineEdit">
              <el-col span="4">
                <el-form-item prop="financePrincipalAudit">
                  <el-select v-model="fundsform.financePrincipalAudit" aria-placeholder="请选择" :disabled="!(currentLevel==3&&auditorType==1)">
                    <el-option :label="item.label" :value="item.value" v-for="(item,index) in plan" :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="19">
                <el-form-item prop="financePrincipalRemark">
                  <el-input type="textarea" :rows="3" maxlength="50" show-word-limit placeholder="请输入内容" v-model="fundsform.financePrincipalRemark" :disabled="!(currentLevel==3&&auditorType==1)">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="isdetail">
              <div>{{fundsform.financePrincipalAudit | planTransform}}</div>
              <div>{{fundsform.financePrincipalRemark}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="grey-td">
            <span v-if="currentLevel==4&&auditorType==1" style="color:red;margin:0 5px 0 -11px;">*</span>校长审批</td>
          <td colspan="3">
            <el-row style="display:flex;justify-content:space-between" v-if="examineEdit">
              <el-col span="4">
                <el-form-item prop="principalAudit">
                  <!-- :disabled="!(steps.length==2&&master==1)" -->
                  <el-select v-model="fundsform.principalAudit" aria-placeholder="请选择" :disabled="!(currentLevel==4&&auditorType==1)">
                    <el-option :label="item.label" :value="item.value" v-for="(item,index) in plan" :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="19">
                <el-form-item prop="principalRemark">
                  <el-input type="textarea" :rows="3" maxlength="50" show-word-limit placeholder="请输入内容" v-model="fundsform.principalRemark" :disabled="!(currentLevel==4&&auditorType==1)">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="isdetail">
              <div>{{fundsform.principalAudit | planTransform}}</div>
              <div>{{fundsform.principalRemark}}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="grey-td">
            <span v-if="currentLevel==5&&auditorType==1" style="color:red;margin:0 5px 0 -11px;">*</span>财务归档</td>
          <td colspan="3">
            <el-row style="display:flex;justify-content:space-between" v-if="examineEdit">
              <el-col span="4">
                <el-form-item prop="financeAudit">
                  <el-select v-model="fundsform.financeAudit" aria-placeholder="请选择" :disabled="!(currentLevel==5&&auditorType==1)">
                    <el-option :label="item.label" :value="item.value" v-for="(item,index) in plan" :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="19">
                <el-form-item prop="financeRemark">
                  <el-input type="textarea" :rows="3" maxlength="50" show-word-limit placeholder="请输入内容" v-model="fundsform.financeRemark" :disabled="!(currentLevel==5&&auditorType==1)">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="isdetail">
              <div>{{fundsform.financeAudit | planTransform}}</div>
              <div>{{fundsform.financeRemark}}</div>
            </div>
          </td>
        </tr>

        <tr>
          <td class="grey-td">备注</td>
          <td colspan="3">
            <el-form-item v-if="edit">
              <el-input maxlength="100" show-word-limit type="textarea" :rows="3" placeholder="请输入内容" v-model="fundsform.remark" @blur="changefundsfn">
              </el-input>
            </el-form-item>
            <span v-else>{{fundsform.remark}}</span>
          </td>
        </tr>
      </table>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
interface Fundsform {
  requiredDate: string;
  applyMoney: number;
  purpose: string;
  remark: string;
  processTypeId: number;
}
@Component({})
export default class fundstable extends Vue {
  @State("isbaocun") isbaocun: any;
  expireTimeOption = {
    disabledDate(date) {
      return date.getTime() < new Date().getTime() - 86400000;
    }
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
  public rules: object = {
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
  @State("issubmit") issubmit: any;
  @Mutation("setisvalid") setisvalid: any;
  @Mutation("setissubmit") setissubmit: any;
  @Watch("issubmit")
  submitchange(newValue: any, oldValue: any) {
    if (newValue) {
      this.$refs["fundsform"].validate(valid => {
        this.setisvalid({ value: valid });
        this.setissubmit({ value: false });
      });
    }
  }
  public edit: boolean = true; //申请的表单字段是否可以编辑
  public examineEdit = false; //审核的表单字段是否显示
  public isdetail: boolean = false; //当前页面是否是详情页面，详情页面审核表单只读
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
  public newpagetype: string = "new";
  @Prop() senderName!: string;
  @Prop() senderPept!: string;
  @Prop() deliverydate!: string;
  @Prop() currentLevel!: number;
  @Prop() auditorType!: number;
  @State("processTypeList") processTypeList: any;
  @State("fundsform") fundsform!: Fundsform;
  @Mutation("addfunds") changefundsform: any;
  changefundsfn(_type = "") {
    if (this.fundsform.processTypeId !== "") {
      //新增流程时预览，显示流程类型
      this.processTypeList.map(item => {
        if (item.id == this.fundsform.processTypeId) {
          this.fundsform.processTypeName = item.name;
        }
      });
    }
    console.log(_type, "_type");
    if (_type == "applyMoney") {
      if (parseFloat(this.fundsform.applyMoney)) {
        this.fundsform.applyMoney = parseFloat(
          this.fundsform.applyMoney
        ).toFixed(2);
      } else {
        //   this.fundsform.applyMoney=null;
      }
    }

    this.changefundsform({ value: this.fundsform });
  }
  @Watch("$route")
  change(newValue: string, oldValue: string) {
    this.newpagetype = newValue.query.newpagetype;
  }
  mounted() {
    console.log(this.isbaocun);
    this.newpagetype = this.$route.query.newpagetype;

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
.a {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>


