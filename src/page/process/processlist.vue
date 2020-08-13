<template>
  <div id="demand">
    <!-- 右侧内容 -->
    <div class="column-main wp-100">

      <!-- 搜索区 -->
      <div class="column-search">
        <!-- 折叠面板 -->
        <el-collapse v-model="showSearchIndex" accordion @change="showSearchBox">
          <el-collapse-item name="1">
            <!-- 搜索栏标题 -->
            <template slot="title">
              <div class="column-search-title">查询条件</div>
              <span class="column-search-icon iconfont" :class="{'icon-xingzhuang':showSearchHidden,'icon-xingzhuang1':!showSearchHidden}"></span>
            </template>
            <!-- 搜索栏表单 -->

            <!-- 搜索栏表单 -->
            <div class="column-search-form">
              <el-form ref="searchForm" :model="searchForm" label-width="96px" :inline="true">
                <!-- 每行 -->
                <el-form-item label="标题" prop="title" label-width="125px">
                  <el-input style="width:340px" v-model="searchForm.title" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="流程名称" prop="businessType" label-width="125px">
                  <el-select v-model="searchForm.businessType" placeholder="请选择" class="w-340">
                    <el-option v-for="(item,index) in businessTypeArr" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="接收起始日期" prop="receiveTime" v-if="listpagetype!=='end'&&listpagetype!=='search'" label-width="125px">
                  <el-date-picker :default-time="['00:00:00', '23:59:59']" class="w-340" v-model="searchForm.receiveTime" type="daterange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" :clearable="false" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="创建人" prop="createBy" label-width="125px">
                  <el-input style="width:340px" v-model="searchForm.createBy" placeholder="请输入内容"></el-input>
                </el-form-item>

                <el-form-item label="创建起始日期" prop="createTime" v-if="listpagetype!=='search'" label-width="125px">
                  <el-date-picker :default-time="['00:00:00', '23:59:59']" class="w-340" v-model="searchForm.createTime" type="daterange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" :clearable="false" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="流程状态" prop="statu" v-if="listpagetype=='search'" label-width="125px">
                  <el-select v-model="searchForm.statu" placeholder="请选择" class="w-340">
                    <el-option v-for="(item,index) in statuArr" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="流程紧急程度" prop="urgencyStatus" v-if="listpagetype=='search'" label-width="125px">
                  <el-select v-model="searchForm.urgencyStatus" placeholder="请选择" class="w-340">
                    <el-option v-for="(item,index) in urgencyStatusDic" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <!-- <el-form-item label="附件名称" prop="fileName" v-if="listpagetype=='search'">
                  <el-input v-model="searchForm.fileName" placeholder="请输入内容"></el-input>
                </el-form-item> -->
                <el-form-item label="流程开始日期区间" prop="createTime" v-if="listpagetype=='search'" label-width="125px">
                  <el-date-picker :default-time="['00:00:00', '23:59:59']" class="w-340" v-model="searchForm.createTime" type="daterange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" :clearable="false" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="流程结束日期区间" prop="endTime" v-if="listpagetype=='search'" label-width="125px">
                  <el-date-picker :default-time="['00:00:00', '23:59:59']" class="w-340" v-model="searchForm.endTime" type="daterange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" :clearable="false" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
                <!-- 每行 -->
                <el-row class="column-search-btn">
                  <el-col :offset="1">
                    <el-button type="primary" @click="submitForm('searchForm')">查询</el-button>
                    <el-button @click="resetForm('searchForm')">重置</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="progresstab" v-if="tabcontent.length>0">
      <div :class="{'active':tabactive==index}" v-for="(item,index) in tabcontent" :key="index" @click="tabswitch(index,item)">{{item.label}} ({{item.total}})</div>
    </div>
    <!-- 内容区 -->
    <div class="column-content">

      <div class="column-content-header wp-100">
        <div class="header-title">
          查询结果列表
        </div>

      </div>
      <div class="column-content-table">
        <template>
          <el-table border ref="tableData" v-if="tableData" :data="tableData" tooltip-effect="dark" style="width: 100%">
            <el-table-column label="序号" type="index" width="50" :key="1">

            </el-table-column>
            <el-table-column prop="title" label="标题" width="500" show-overflow-tooltip :key="2">
              <template slot-scope="scope">
                <span style="color:red" v-if="(listpagetype=='wait')&&(scope.row.urgencyStatus==1||scope.row.urgencyStatus==2)">【{{scope.row.urgencyStatus|urgencyStatusTransform}}】</span>
                <a style="text-decoration: underline;color: #4395FF;cursor: pointer;" @click="handleprocess(scope.row.businessType,Number(scope.row.businessId),'title',scope.row)">{{ scope.row.title }}</a>
              </template>
            </el-table-column>
            <el-table-column prop="processName" label="流程紧急程度" align="center" v-if="listpagetype=='search'" :key="3">
              <template slot-scope="scope">{{ scope.row.urgencyStatus|urgencyStatusTransform }}</template>
            </el-table-column>
            <el-table-column prop="processName" label="流程名称" align="center" :key="4">
              <template slot-scope="scope">{{ scope.row.businessType|businessTypeTransform }}</template>
            </el-table-column>
            <el-table-column prop="receiveTime" label="接收时间" align="center" v-if="listpagetype!=='end'&&listpagetype!=='search'" :key="5">
              <template slot-scope="scope">{{ scope.row.receiveTime|timeTrans }}</template>
            </el-table-column>
            <el-table-column prop="nowStep" label="当前步骤" align="center" v-if="listpagetype!=='end'" :key="6">
              <template slot-scope="scope">{{scope.row.statu==1?'流程已结束': scope.row.nowStep }}</template>
            </el-table-column>
            <el-table-column prop="nowStep" label="流程状态" align="center" v-if="listpagetype=='search'" :key="7">
              <template slot-scope="scope">{{ scope.row.statu|statusTran }}</template>
            </el-table-column>
            <el-table-column prop="nowStep" label="抄送人" align="center" v-if="listpagetype=='send'" :key="8">
              <template slot-scope="scope">{{ scope.row.copy }}</template>
            </el-table-column>
            <el-table-column prop="createBy" label="创建人" align="center" :key="9">
              <template slot-scope="scope">{{ scope.row.createBy }}</template>
            </el-table-column>
            <el-table-column prop="postTime" label="创建时间" align="center" :key="10">
              <template slot-scope="scope">{{ scope.row.createTime|timeTrans }}</template>
            </el-table-column>
            <el-table-column label="操作" v-if="listpagetype!=='send'" :key="11">
              <template slot-scope="scope">
                <div>
                  <el-button :disabled="scope.row.statu==1" :type="scope.row.statu==1? 'info' : 'success'" plain size="mini" @click="handleprocess(scope.row.businessType,Number(scope.row.businessId),'button',scope.row)" v-if="listpagetype=='wait'||listpagetype=='search'">办理</el-button>
                  <el-button plain size="mini" :type="tname==scope.row.createBy? 'danger' : 'info'" @click="tableDelete(scope.row)" :disabled="!(tname==scope.row.createBy)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <div class="column-content-page">
        <el-pagination background layout="prev, pager, next" :total="total" @current-change="pageChange" :current-page="searchForm.pageNo">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Mutation } from "vuex-class";
@Component({})
export default class demand extends Vue {
  public searchForm: any = {
    //查询表单
    pageNo: 1,
    pageSize: 10,
    title: "",
    businessType: "",
    createBy: "",
    receiveTime: [],
    createTime: [],
    urgencyStatus: null,
    fileName: "",
    statu: null,
    endTime: []
  }; //搜索表单
  public tabitem = {}; //当前选中的tab参数
  public tableData: object[] = []; //表格数据
  public total: number = 0; //总数
  public tableDataarr: object[] = [];
  public totalarr: object[] = [];
  public tabcontent: Array<object> = [];
  public urgencyStatusDic: object[] = [
    {
      label: "正常",
      value: 0
    },
    {
      label: "紧急",
      value: 1
    },
    {
      label: "重要",
      value: 2
    }
  ];
  public statuArr = [
    {
      label: "执行中",
      value: 0
    },
    {
      label: "已完成",
      value: 1
    }
  ];
  public businessTypeArr = [
    {
      label: "公文传输流程",
      value: "DOCUMENT_TRANSMISSION"
    },
    {
      label: "经费申请流程",
      value: "FUND_APPLICATION"
    },
    {
      label: "维修申请流程",
      value: "REPAIR_APPLICATION"
    },
    {
      label: "会议室申请流程",
      value: "MEETING_APPLICATION"
    }
  ];

  public tabactive: number = 0; //
  public listpagetype: string = ""; //判断是哪个页面（代办事宜，已办事宜，办结事宜，抄送流程，流程查询）
  defaultDate() {
    console.log("时间");
    //获取新的时间(2019.4.12）
    let date = new Date();
    //获取当前时间的年份转为字符串
    let year = date.getFullYear().toString(); //'2019'
    //获取月份，由于月份从0开始，此处要加1，判断是否小于10，如果是在字符串前面拼接'0'
    let month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1).toString()
        : (date.getMonth() + 1).toString(); //'04'
    //获取天，判断是否小于10，如果是在字符串前面拼接'0'
    let da =
      date.getDate() < 10
        ? "0" + date.getDate().toString()
        : date.getDate().toString(); //'12'
    //字符串拼接，开始时间，结束时间
    let end = year + "-" + month + "-" + da + " 23:59:59"; //当天'2019-04-12'
    let beg = year + "-" + month + "-01 00:00:00"; //当月第一天'2019-04-01'
    console.log(end, beg);
    switch (this.listpagetype) {
      case "wait":
        this.searchForm.receiveTime = [beg, end];
        this.searchForm.createTime = [beg, end];
        this.searchForm.endTime = [];
        break;
      case "already":
        this.searchForm.receiveTime = [beg, end];
        this.searchForm.createTime = [beg, end];
        this.searchForm.endTime = [];
        break;
      case "end":
        this.searchForm.receiveTime = [];
        this.searchForm.createTime = [beg, end];
        this.searchForm.endTime = [];
        break;
      case "send":
        this.searchForm.receiveTime = [beg, end];
        this.searchForm.createTime = [beg, end];
        this.searchForm.endTime = [];
        break;
      case "search":
        this.searchForm.receiveTime = [];
        this.searchForm.createTime = [beg, end];
        this.searchForm.endTime = [beg, end];
        break;
      default:
        break;
    }
  }
  @Mutation("addshowtype") addshowtype: any;
  handleprocess(_type: string, businessId: any, _typeclick: string,_item): void {
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
    if (_typeclick == "button") {
      this.$router.push({
        path: "/process/newprocess",
        query: {
          newpagetype: "handle",
          businessId: businessId,
          listpagetype: this.listpagetype,
          ispreserve:(_item.level==1)&&(_item.createBy==localStorage.getItem("tname")) ? 'true' : 'false'
        }
      });
    } else {
      if (this.listpagetype == "wait") {
        //如果是待办页面，点击标题进入办理页面
        this.$router.push({
          path: "/process/newprocess",
          query: {
            newpagetype: "handle",
            businessId: businessId,
            listpagetype: this.listpagetype,
            ispreserve:(_item.level==1)&&(_item.createBy==localStorage.getItem("tname")) ? 'true' : 'false'
          }
        });
      } else {
        this.$router.push({
          path: "/process/newprocess",
          query: {
            newpagetype: "detail",
            businessId: businessId,
            listpagetype: this.listpagetype
          }
        });
      }
    }
  }
  // 表格删除
  tableDelete(row) {
    this.$confirm(
      "请注意一旦选择了删除，被删除流程的所有数据都被删除，无法恢复！您确定删除这条工作流程吗？"
    )
      .then(_ => {
        this.$ajax.process
          .deleteAprovalById({
            params: {
              businessId: row.businessId,
              businessType: row.businessType
            }
          })
          .then(res => {
            this.getTableData();
          });
        done();
      })
      .catch(_ => {});
  }
  @Watch("$route")
  onChangeValue(newValue: string, oldValue: string) {
    this.searchForm.endTime = [];
    this.tabactive = 0;
    this.resetForm("searchForm");

    //判断是哪个页面（代办事宜，已办事宜，办结事宜，抄送流程，流程查询）
    this.listpagetype = newValue.query.listpagetype
      ? newValue.query.listpagetype
      : "";
    this.defaultDate();
    this.getTableData();
  }
  tabswitch(_index: number, _item: object): void {
    //点击切换tab
    this.tabactive = _index;
    this.tabitem = _item;
    this.searchForm.pageNo = 1;
    this.getTable();
  }
  searchTab() {
    //不同的页面tab显示的不同
    switch (this.listpagetype) {
      case "wait":
        return [
          {
            label: "全部",
            dataType: 1,
            aduitStatus: "",
            auditorType: null
          },
          {
            label: "未读",
            aduitStatus: "NOT_VIEWED",
            auditorType: null,
            dataType: 1
          },
          {
            label: "我主办的",
            auditorType: 1,
            dataType: 1,
            aduitStatus: ""
          },
          {
            label: "我经办的",
            auditorType: 2,
            aduitStatus: "",
            dataType: 1
          }
        ];
      case "already":
        return [
          {
            label: "全部",
            dataType: 2,
            auditorType: null,
            aduitStatus: ""
          },
          {
            label: "我主办的",
            auditorType: 1,
            aduitStatus: "",
            dataType: 2
          },
          {
            label: "我经办的",
            auditorType: 2,
            aduitStatus: "",
            dataType: 2
          }
        ];
      case "end":
        return [
          {
            label: "全部",
            dataType: 3,
            auditorType: null,
            aduitStatus: ""
          },
          {
            label: "我主办的",
            auditorType: 1,
            dataType: 3,
            aduitStatus: ""
          },
          {
            label: "我经办的",
            auditorType: 2,
            dataType: 3,
            aduitStatus: ""
          }
        ];
      case "send":
        return [
          {
            label: "全部",
            dataType: 4,
            auditorType: null,
            aduitStatus: ""
          },
          {
            label: "已查看",
            aduitStatus: "VIEWED",
            dataType: 4,
            auditorType: null
          },
          {
            label: "未查看",
            aduitStatus: "NOT_VIEWED",
            dataType: 4,
            auditorType: null
          }
        ];
      case "search":
        return [
          {
            label: "全部",
            dataType: 5,
            auditorType: null,
            aduitStatus: ""
          }
        ];
      default:
        break;
    }
  }

  async getTableData() {
    //页面打开，加载tab总数,获取表格数据
    let tabarr = this.searchTab();
    this.tabitem = tabarr[this.tabactive];
    let tabcontent = [];
    let tableDataarr = [];
    let totalarr = [];
    for (const item of tabarr) {
      let params = { ...this.searchForm, ...item };
      params.showUnprocessed = null;
      await this.$ajax.process
        .getBacklogProcessList({
          params
        })
        .then(res => {
          if (res.state === 1000) {
            tabcontent.push({
              ...item,
              total: res.data.ProcessListModel.total
            });
            this.tabcontent = tabcontent;
            tableDataarr.push(res.data.ProcessListModel.list);
            totalarr.push(res.data.ProcessListModel.total);
            this.tableDataarr = tableDataarr;
            this.totalarr = totalarr;
            this.tableData = this.tableDataarr[this.tabactive];
            this.total = this.totalarr[this.tabactive];
          }
        });
    }
  }
  getTable() {
    console.log("查询");
    //点击切换tab，页码 获取表格数据
    this.$ajax.process
      .getBacklogProcessList({
        params: { ...this.searchForm, ...this.tabitem, showUnprocessed: null }
      })
      .then(res => {
        if (res.state === 1000) {
          this.tableData = res.data.ProcessListModel.list;
          this.total = res.data.ProcessListModel.total;
        }
      });
  }
  public tname: string = "";
  mounted() {
    this.tname = localStorage.getItem("tname");
    this.listpagetype = this.$route.query.listpagetype;
    this.defaultDate();
    this.getTableData();
  }
  data() {
    return {
      showSearchIndex: "1", //折叠面板下标
      showSearchHidden: false, //折叠面板

      publicForm: {
        // 公共表单：增删改共用
        areaName: "",
        areaNum: "",
        longitude: "",
        latitude: "",
        status: 0
      },
      publicFormConfig: {
        //公共表单状态配置
        dialog: false,
        handleType: "add",
        disabled: false
      }
    };
  }

  // 折叠面板
  showSearchBox() {
    this.showSearchHidden = !this.showSearchHidden;
  }
  // 提交表单
  submitForm(formName) {
    this.searchForm.pageNo = 1;
    if (!formName) {
      return;
    }
    this.$refs[formName].validate(valid => {
      if (valid) {
        formName == "searchForm"
          ? this.getTableData()
          : this.publicFormSetHandleType();
      }
    });
  }

  // 重置表单
  resetForm(formName) {
    if (this.$refs[formName]) {
      this.$refs[formName].resetFields();
      console.log(this.searchForm, "this.searchForm");
      this.searchForm.fileName = "";
      this.searchForm.createTime = [];
      this.searchForm.endTime = [];
      this.searchForm.receiveTime = [];
      this.searchForm.urgencyStatus = null;
    }
  }
  // 公共表单设置操作方式
  publicFormSetHandleType() {
    switch (this.publicFormConfig.handleType) {
      case "add":
        this.publicFormAdd();
        break;
      case "edit":
        this.publicFormEdit();
        break;
      default:
        this.getTableData();
        break;
    }
  }
  // 分页切换
  pageChange(page) {
    this.searchForm.pageNo = page;
    this.getTable();
  }
  //设置发送参数
  setSendParams(formName, config = {}) {
    this[formName] = this.$helper.totimesearch(this[formName], config);
  }
  // 获取表格数据
}
</script>


<style lang="scss">
#demand {
  .el-select {
    width: 100%;
  }

  .tips {
    font-size: 14px;
    height: 40px;
    color: rgba(53, 141, 255, 1);
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  /* 排序操作按钮 */
  .sort-handle {
    width: 26px;
    height: 26px;
  }

  .sort-top,
  .sort-bottom {
    width: 26px;
    height: 26px;
    text-align: center;
    line-height: 26px;
    border-radius: 4px;
  }

  .sort-handle-box {
    display: flex;
  }

  .sort-top {
    color: #409eff;
    background: rgba(210, 233, 254, 1);
  }

  .sort-bottom {
    color: #23af24;
    background: rgba(199, 241, 196, 1);
    margin-left: 10px;
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
    margin-top: 20px;
    display: flex;

    div {
      padding: 0 40px;
      height: $height;
      line-height: $height;
      text-align: center;
      cursor: pointer;
    }
    div.active {
      color: #e73838;
      background: #fff;
    }
  }
}
</style>
