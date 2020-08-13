<template>
  <div id="preview" ref="preview">
    <h4 v-if="addshowtype=='official'" class="titleTxstAlign">公文传输流程单</h4>
    <officialtable :senderName="addform.senderName" :senderPept="addform.senderPept" :deliverydate="deliverydate" v-if="addshowtype=='official'"></officialtable>
    <h4 v-if="addshowtype=='funds'" class="titleTxstAlign">经费申请流程单</h4>
    <fundstable :senderName="addform.senderName" :senderPept="addform.senderPept" :deliverydate="deliverydate" :currentLevel='addform.currentLevel' :auditorType="addform.auditorType" v-if="addshowtype=='funds'"></fundstable>
    <h4 v-if="addshowtype=='maintenance'" class="titleTxstAlign">维修申请流程单</h4>
    <maintenancetable :senderName="addform.senderName" :senderPept="addform.senderPept" :deliverydate="deliverydate" :currentLevel='addform.currentLevel' :auditorType="addform.auditorType" v-if="addshowtype=='maintenance'"></maintenancetable>
    <h4 v-if="addshowtype=='meeting'" class="titleTxstAlign">会议室申请流程单</h4>
    <meetingtable :senderName="addform.senderName" :senderPept="addform.senderPept" :deliverydate="deliverydate" :currentLevel='addform.currentLevel' :auditorType="addform.auditorType" v-if="addshowtype=='meeting'"></meetingtable>
    <div class="no-print">
      <el-button type="primary" style="margin:20px auto 0" @click="print">打印</el-button>
    </div>

  </div>
</template>
<script lang="ts">
import officialtable from "@/components/officialtable.vue";
import fundstable from "@/components/fundstable.vue";
import maintenancetable from "@/components/maintenancetable.vue";
import meetingtable from "@/components/meetingtable.vue";
import { Component, Vue } from "vue-property-decorator";
import dateFormat from "@/utils/dateFormatClass.ts";
import { State } from "vuex-class";

@Component({
  components: {
    officialtable,
    fundstable,
    maintenancetable,
    meetingtable
  }
})
export default class preview extends Vue {
  public addform: object = {};
  public deliverydate: string = dateFormat("YYYY-mm-dd", new Date());
  @State("addshowtype") addshowtype: any;
  mounted() {
    console.table(this.$route.query);
    this.addform = this.$route.query;
  }
  print() {
    this.$print(this.$refs.preview); // 使用
  }
}
</script>
<style lang="scss">
#preview {
  margin: 100px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  h4 {
    text-align: center;
  }
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
        padding-left: 62px;
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
</style>


