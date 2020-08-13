<template>
    <div>
        <!-- <h4>公文传输流程单</h4> -->
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
                        <el-form-item v-if="edit" prop="completionDate">
                            <el-date-picker v-model="addofficialform.completionDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="officialmutation" :picker-options="expireTimeOption"></el-date-picker>
                        </el-form-item>
                        <span v-else>{{addofficialform.completionDate}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="grey-td">
                        <span style="color:red;margin:0 5px 0 -11px;">*</span>公文标题</td>
                    <td colspan="3">
                        <el-form-item v-if="edit" prop="documentTitle">
                            <el-input type="text" placeholder="请输入内容" maxlength="50" show-word-limit v-model="addofficialform.documentTitle" @blur="officialmutation">
                            </el-input>
                        </el-form-item>
                        <span v-else>{{addofficialform.documentTitle}}</span>
                    </td>
                </tr>
                <tr style="height:250px;">
                    <td class="grey-td">
                        <span style="color:red;margin:0 5px 0 -11px;">*</span>公文内容</td>
                    <td colspan="3">
                        <el-form-item v-if="edit" prop="documentContent">
                            <el-input type="textarea"  :autosize="{ minRows: 15, maxRows: 30}"  placeholder="请输入内容" v-model="addofficialform.documentContent" @blur="officialmutation">
                            </el-input>
                        </el-form-item>
                        <span v-else>{{addofficialform.documentContent}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="grey-td">备注</td>
                    <td colspan="3">
                        <el-form-item v-if="edit">
                            <el-input type="textarea" maxlength="100" show-word-limit :rows="3" placeholder="请输入内容" v-model="addofficialform.documentRemark" @blur="officialmutation">
                            </el-input>
                        </el-form-item>
                        <span v-else>{{addofficialform.documentRemark}}</span>
                    </td>
                </tr>
            </table>
        </el-form>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
@Component({})
export default class officialtable extends Vue {
    expireTimeOption = {
    disabledDate(date) {
      return date.getTime() < new Date().getTime() - 86400000;
    }
  };
    @State("isbaocun") isbaocun: any;
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
  @Prop() senderName!: string;
  @Prop() senderPept!: string;
  @Prop() deliverydate!: string;
  @State("addOfficialform") addofficialform: any;
  @Mutation("documentTitle") documentTitle: any;
  officialmutation() {
    this.documentTitle({ value: this.addofficialform });
  }

  @State("issubmit") issubmit: any;
  @Mutation("setisvalid") setisvalid: any;
  @Mutation("setissubmit") setissubmit: any;
  @Watch("issubmit")
  change(newValue: any, oldValue: any) {
    if (newValue) {
      this.$refs["addofficialform"].validate(valid => {
        this.setisvalid({ value: valid });
        this.setissubmit({ value: false });
      });
    }
  }
  public edit: boolean = true; //是否可以编辑
  mounted() {
    if (this.$route.query.newpagetype == "new"||this.$route.query.ispreserve=='true') {
      //判断当前页面是否是新建页面，新建页面可以输入
      this.edit = true;
    } else {
      this.edit = false;
    }
  }
}
</script>

<style lang="scss">
</style>


