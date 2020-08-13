<template>
  <div id="progress">
    <!-- 内容区 -->

    <!-- 新建流程目录 -->
    <div class="column-content" v-if="addshowtype=='menu'">
      <div class="column-content-header wp-100">
        <div class="header-title">
          新建流程
        </div>
      </div>
      <progressmenu currentpage="newprocess"></progressmenu>
    </div>

    <!-- 新建流程 -->
    <div class="column-content" v-else>
      <el-form ref="addform" :model="addform" label-width="80px" :rules="rules">
        <!-- 顶部按钮 -->
        <div class="topbtn">
          <div v-if="newpagetype=='detail'">
            <el-button type="primary" @click="submit('copy')">抄送</el-button>
            <el-button type="primary" @click="gopreview">预览</el-button>
            <el-button type="primary" @click="printDeal">打印</el-button>
          </div>
          <div v-else>
            <el-button type="success" @click="submit('commit')">提交</el-button>
            <!-- v-if="!(newpagetype=='new'&&addshowtype=='maintenance')" -->
            <el-button type="danger" @click="submit('preserve')">保存</el-button>
            <el-button type="primary" @click="gopreview">预览</el-button>
            <el-button type="danger" @click="submit('end')" v-if="addform.moduleCode=='DOCUMENT_TRANSMISSION'&&addform.auditorType==1&&newpagetype=='handle'">结束</el-button>
            <el-button @click="defaultshowtype">取消</el-button>
          </div>

        </div>

        <!-- 办理流程 -->
        <div style="width: 100%;border-bottom: 1px solid #d1dbe5">
          <h4>办理流程</h4>
          <el-row>
            <el-col span="8">
              <el-form-item label="标题" prop="title">
                <!-- :disabled="(newpagetype=='detail')||((newpagetype=='handle')&&(!isbaocun))" -->
                <el-input placeholder="请输入" v-model="addform.title" :disabled="(newpagetype=='detail')||((newpagetype=='handle')&&(ispreserve!=='true'))" maxlength="50" show-word-limit></el-input>
              </el-form-item>
            </el-col>
            <el-col span="16">
              <el-form-item label="流程紧急程度" class="widthlabel" prop="urgencyStatus">
                <el-select v-model="addform.urgencyStatus" :disabled="(newpagetype=='detail')||((newpagetype=='handle')&&(ispreserve!=='true'))">
                  <el-option :label="item.label" :value="item.value" v-for="(item,index) in urgencyStatus" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 流程申请单 -->
        <div style="width: 100%;border-bottom: 1px solid #d1dbe5;padding-bottom:20px" class="application">
          <div id="printBox">
            <h4 v-if="addshowtype=='official'" class="titleTxstAlign">公文传输流程单</h4>
            <officialtable :senderName="addform.senderName" :senderPept="addform.senderPept" :deliverydate="deliverydate" v-if="addshowtype=='official'"></officialtable>
            <h4 v-if="addshowtype=='funds'" class="titleTxstAlign">经费申请流程单</h4>
            <fundstable :senderName="addform.senderName" :senderPept="addform.senderPept" :deliverydate="deliverydate" :currentLevel='addform.currentLevel' :auditorType="addform.auditorType" v-if="addshowtype=='funds'"></fundstable>
            <h4 v-if="addshowtype=='maintenance'" class="titleTxstAlign">维修申请流程单</h4>
            <maintenancetable :senderName="addform.senderName" :senderPept="addform.senderPept" :deliverydate="deliverydate" :currentLevel='addform.currentLevel' :auditorType="addform.auditorType" v-if="addshowtype=='maintenance'"></maintenancetable>
            <h4 v-if="addshowtype=='meeting'" class="titleTxstAlign">会议室申请流程单</h4>
            <meetingtable :senderName="addform.senderName" :senderPept="addform.senderPept" :deliverydate="deliverydate" :currentLevel='addform.currentLevel' :auditorType="addform.auditorType" v-if="addshowtype=='meeting'"></meetingtable>
          </div>
        </div>
        <!-- 签办反馈 -->
        <div style="width: 100%;border-bottom: 1px solid #d1dbe5">
          <h4>签办反馈</h4>
          <el-form-item prop="content" style="margin-left:-80px;!important;max-width:1209px;">
            <!-- <el-col :span="24"> -->
            <!-- <quill-editor :disabled="newpagetype=='detail'" v-model="addform.feedback" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)">
              </quill-editor> -->
            <el-input type="textarea" maxlength="200" show-word-limit :autosize="{ minRows: 10, maxRows: 15}" placeholder="请输入" :disabled="newpagetype=='detail'" v-model="addform.feedback">
            </el-input>
            <!-- </el-col> -->
          </el-form-item>
          <el-form-item style="margin-left:-80px;!important">
            <el-col span="6">
              <el-upload class="upload-demo" :before-upload="beforeAvatarUpload" :action="uploadImgApi" :on-preview="handlePreview" :on-remove="handleRemove" multiple :on-exceed="handleExceed" :file-list="fileList" :on-success="handleAvatarSuccess" :disabled="newpagetype=='detail'">
                <el-button size="small" type="danger" :disabled="newpagetype=='detail'">上传附件</el-button>
              </el-upload>
            </el-col>
          </el-form-item>
        </div>
      </el-form>

      <!-- 流程图 -->
      <div>

        <h4>流程图</h4>

        <div class="step">

          <!-- <div class="stepcontent"> -->

          <div class="item" v-for="(item,index) in addform.steps" :key="index">
            <div class="left">
              <div class="top">{{addshowtype=='official'? item.step:item.levelchines}}</div>
              <div class="img"><img src="@/assets/image/content/f1.png" alt />
                <p>{{addshowtype=='official'?item.name:item.leveldec}}</p>
              </div>
            </div>
            <div class="right" v-if="index!==addform.steps.length-1"><img src="@/assets/image/content/haircut.png" style="width:20px;height:20px" alt /></div>
          </div>
        </div>

        <!-- </div> -->

        <el-table :data="addform.approvalAuditors" :span-method="objectSpanMethod" border style="width: 100%;font-size:14px;" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
          <el-table-column prop="level" label="步骤" width="65">
            <template slot-scope="scope">第{{ scope.row.level|toChinesNum }}步</template>
          </el-table-column>
          <el-table-column prop="name" label="节点" v-if="this.addshowtype!=='official'">
            <template slot-scope="scope">
              {{ scope.row.leveldec }}
            </template>
          </el-table-column>
          <el-table-column prop="tname" label="办理人员" width="170">
            <template slot-scope="scope">
              <div style="display: flex;justify-content: center;align-content: center;">
                <img src="@/assets/image/content/master.png" alt="" style="width:20px;margin-right:10px;" v-if="scope.row.auditorType==1">
                <span>{{ scope.row.tname }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="aduitStatus" label="状态" width="122">
            <template slot-scope="scope">
              <p style="color:red">{{ scope.row.aduitStatus|aduitStatusTransform }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="creatTime" label="接收时间">
            <template slot-scope="scope">{{ scope.row.creatTime|timeTrans }}</template>
          </el-table-column>
          <el-table-column prop="postTime" label="提交时间">
            <template slot-scope="scope">{{ scope.row.postTime|timeTrans }}</template>
          </el-table-column>
          <el-table-column prop="address" label="用时">
            <template slot-scope="scope">{{ scope.row.consume }}</template>
          </el-table-column>
          <el-table-column prop="feedback" label="签办反馈">
            <template slot-scope="scope">
              <p v-html="scope.row.feedback"></p>
            </template>
          </el-table-column>
          <el-table-column prop="files" label="上传附件">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.files" :key="index">
                <a :href="item.url" :download="item.name" style="color:red">{{item.name}}</a>
              </div>
            </template>
          </el-table-column>
        </el-table>

      </div>

      <el-dialog title="办理详情" :visible.sync="dialogFormVisible">
        <div style="width:100%;border-bottom:1px solid #ccc;margin-bottom:20px;" v-if="!iscopyshow">
          <div class="dialog_step">
            <h4>正向流转节点</h4>
            <img v-if="isendshow||this.addform.nextLeveldec=='结束流程'" src="@/assets/image/content/end.jpg" style="width:30px;height:30px;" alt="">
            <div v-else>{{this.addform.currentLevel+1}}</div>
            <p>{{isendshow?'结束流程':this.addform.nextLeveldec}}</p>
          </div>
        </div>
        <el-form :model="postProcess" ref="postProcess" :rules="postProcessrules">
          <!-- 在新建流程时，能指定下一主办人，办理人，抄送人     在办理流程时，只有主办人才可以指定下一主办人，办理人，抄送人  在点击结束流程或抄送流程，只能指定抄送人 -->
          <el-row v-if="newpagetype=='new' ? true:addform.auditorType==1&&!isendshow&&!iscopyshow&&!(addform.moduleCode=='FUND_APPLICATION'&&addform.currentLevel==5)&&!(addform.moduleCode=='REPAIR_APPLICATION'&&addform.currentLevel==5)&&!(addform.moduleCode=='MEETING_APPLICATION'&&addform.currentLevel==2)">
            <el-col span="12">
              <el-form-item prop="mastername" label="指定主办人" :label-width="formLabelWidth">
                <el-input v-if="(addform.moduleCode=='REPAIR_APPLICATION'&&(addform.currentLevel==3||addform.currentLevel==4))||isUniquestatu==1" v-model="postProcess.mastername" placeholder="请选择主办人" disabled></el-input>
                <el-input v-else type="textarea" :disabled="selectProcessordialogVisible" autosize v-model="postProcess.mastername" placeholder="请选择主办人" @focus="selectprocessordialogVisible('master')"></el-input>

              </el-form-item>
            </el-col>
            <el-col span="12" style="margin-top:15px">
              <span style="margin-left:10px;"> </span>
            </el-col>
          </el-row>
          <el-row v-if="newpagetype=='new' ? true:addform.auditorType==1&&!isendshow&&!iscopyshow&&!(addform.moduleCode=='FUND_APPLICATION'&&addform.currentLevel==5)&&!(addform.moduleCode=='REPAIR_APPLICATION'&&addform.currentLevel==5)&&!(addform.moduleCode=='MEETING_APPLICATION'&&addform.currentLevel==2)">
            <el-col span="12">
              <el-form-item prop="dealername" label="所有办理人" :label-width="formLabelWidth">
                <el-input v-model="postProcess.dealername" :disabled="selectProcessordialogVisible" type="textarea" autosize placeholder="请选择办理人" @focus="selectprocessordialogVisible('dealer')"></el-input>

              </el-form-item>

            </el-col>
            <el-col span="12" style="margin-top:15px">
              <span style="margin-left:10px;"> (可多选)</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">

              <el-form-item prop="copyname" label="被抄送人" :label-width="formLabelWidth">
                <el-input type="textarea" :disabled="selectProcessordialogVisible" autosize v-model="postProcess.copyname" placeholder="请选择被抄送人" @focus="selectprocessordialogVisible('copy')"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12" style="margin-top:15px">
              <span style="margin-left:10px;"> (可多选)</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="3">
              <el-form-item label="短信提醒" :label-width="formLabelWidth">

              </el-form-item>
            </el-col>
            <el-col span="4" v-if="newpagetype=='new' ? true:addform.auditorType==1&&!isendshow&&!iscopyshow&&!(addform.moduleCode=='FUND_APPLICATION'&&addform.currentLevel==5)&&!(addform.moduleCode=='REPAIR_APPLICATION'&&addform.currentLevel==5)&&!(addform.moduleCode=='MEETING_APPLICATION'&&addform.currentLevel==2)">
              <el-form-item prop="callMaster">
                <el-checkbox v-model="postProcess.callMaster">提醒主办人</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col span="5" v-if="newpagetype=='new' ? true:addform.auditorType==1&&!isendshow&&!iscopyshow&&!(addform.moduleCode=='FUND_APPLICATION'&&addform.currentLevel==5)&&!(addform.moduleCode=='REPAIR_APPLICATION'&&addform.currentLevel==5)&&!(addform.moduleCode=='MEETING_APPLICATION'&&addform.currentLevel==2)">
              <el-form-item prop="callDealer">
                <el-checkbox v-model="postProcess.callDealer">提醒所有办理人 </el-checkbox>
              </el-form-item>
            </el-col>
            <el-col span="4">
              <el-form-item prop="callCopy">
                <el-checkbox v-model="postProcess.callCopy">提醒被抄送人</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="processNext">提 交</el-button>
          <el-button @click="resetForm('postProcess')">重 置</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>

      <selectProcessor @selectPeople="selectPeople" :Selectparams="postProcessinfo"></selectProcessor>

    </div>
  </div>
</template>

<script lang="ts">
//调用编辑器
import { quillEditor, Quill } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
Quill.register("modules/ImageExtend", ImageExtend);

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image"],
  ["clean"] // remove formatting button
];

import { Component, Vue, Watch } from "vue-property-decorator";

import progressmenu from "@/components/progressmenu.vue";

import officialtable from "@/components/officialtable.vue";
import fundstable from "@/components/fundstable.vue";
import maintenancetable from "@/components/maintenancetable.vue";
import meetingtable from "@/components/meetingtable.vue";

import { State, Mutation } from "vuex-class";
import dateFormat from "@/utils/dateFormatClass.ts";
import selectProcessor from "@/components/selectProcessor.vue";

interface Addform {
  //新增传输流程
  title: string;
  urgencyStatus: number | string;
  files: Array<object>;
  feedback: string;
  senderName: string | null;
  senderPept: string | null;
}
interface urgencyStatusitem {
  value: number;
  label: string;
}

@Component({
  components: {
    quillEditor,
    progressmenu,
    officialtable,
    fundstable,
    maintenancetable,
    meetingtable,
    selectProcessor
  }
})
export default class newprogress extends Vue {
  public rules: object = {
    title: [{ required: true, message: "请输入标题", trigger: "blur" }],
    urgencyStatus: [
      { required: true, message: "请选择流程紧急程度", trigger: "change" }
    ]
  };
  public postProcessrules: object = {
    mastername: [
      { required: true, message: "请选择主办理人", trigger: "change" }
    ]
  };
  public defaultProps: objcet = {
    children: "children",
    label: "label"
  }; //多选组件配置
  public selectPeopleDialog: boolean = false; //人员选择弹框
  public deptInfo: Array<object> = []; //选择人员树

  public newpagetype: string = "new"; //当前页面是哪一个页面（新建，办理，详情）
  public isendshow: boolean = false; //显示的弹框是结束弹框还是下一步弹框
  public iscopyshow: boolean = false; //显示的弹框是否是抄送弹框
  public deliverydate: string = dateFormat("YYYY-mm-dd", new Date());
  public addform: Addform = {
    title: "",
    urgencyStatus: "",
    files: [],
    feedback: "",
    senderName: "",
    senderPept: ""
  };
  public deptInfo: array = []; //人员树列表

  public urgencyStatus: Array<urgencyStatusitem> = [
    {
      value: 0,
      label: "正常"
    },
    {
      value: 1,
      label: "紧急"
    },
    {
      value: 2,
      label: "重要"
    }
  ];
  public userList: Array<object> = []; //办理人列表
  public postProcess: object = {
    callMaster: false,
    callDealer: false,
    callCopy: false,
    master: null,
    mastername: "",
    dealer: "",
    dealername: "",
    copy: "",
    copyname: ""
  }; // 提交流程下一步表单数据
  public postProcessinfo: object = {
    businessId: null,
    businessType: null
  }; //业务id业务类型审核人id

  @State("addshowtype") addshowtype: any;
  @State("addOfficialform") addofficialform: any;
  @State("fundsform") fundsform: any;
  @State("maintenance") maintenance: any;
  @State("meeting") meeting: any;
  @Mutation("setjoinUser") setjoinUser: any;
  @Mutation("addshowtype") changeaddshowtype: any;
  @Mutation("documentTitle") documentTitle: any;
  @Mutation("addfunds") addfunds: any;
  @Mutation("maintenance") Maintenance: any;
  @Mutation("meeting") Meeting: any;
  @Mutation("selectProcessordialogVisiblemu")
  selectProcessordialogVisiblemu: any;
  @State("fatherson") fatherson: any;
  @Mutation("fathersonmu") fathersonmu: any;
  @Mutation("setissubmit") setissubmit: any;
  @State("isvalid") isvalid: any;
  @State("selectProcessordialogVisible") selectProcessordialogVisible: any;
  public selectPeopleType: string = ""; //选择人员的类型，（主办人，办理人，抄送人）
  selectprocessordialogVisible(_type: string) {
    //打开选择人员弹框
    this.selectPeopleType = _type;
    this.selectProcessordialogVisiblemu({ value: true });
    this.fathersonmu({ value: _type });
  }
  selectPeople(val) {
    //获取子组件选择的人员
    if (this.fatherson == "meeting") {
      this.setjoinUser({ value: val });
    } else {
      const { joinUserid, joinUserName } = val;

      switch (this.selectPeopleType) {
        case "master":
          this.postProcess.master = parseInt(joinUserid);
          this.postProcess.mastername = joinUserName;
          break;
        case "dealer":
          this.postProcess.dealer = joinUserid;
          this.postProcess.dealername = joinUserName;
          break;
        case "copy":
          this.postProcess.copy = joinUserid;
          this.postProcess.copyname = joinUserName;
          break;
        default:
          break;
      }
    }
  }
  beforeUpload(file) {
    // let fileObj = {
    //   name: file.name,
    //   size: file.size,
    //   status: "开始上传",
    //   process: 0,
    //   id: file.uid
    // };
    if (file.size > 5 * 1024 * 1024) {
      console.log("上传文件过大", file.size);
      return false; //必须返回false
    }
    // this.fileList.push(fileObj);
  }
  download(_url: string) {
    //点击流程图表格附件下载
    window.open(_url);
  }
  resetForm(formName) {
    //重置
    this.$refs[formName].resetFields();
  }
  @Watch("dialogFormVisible")
  dialogchange(newValue: any, oldValue: any) {
    //监听提交弹框关闭，清空结束抄送状态
    if (!newValue) {
      this.isendshow = false;
      this.iscopyshow = false;
    }
  }
  processingParameters(_type) {
    //处理参数
    switch (this.addshowtype) {
      case "official":
        this.addform = {
          ...this.addform,
          ...this.addofficialform,
          isEnd: null,
          inputType: _type
        };
        if (this.newpagetype == "new") {
          this.addform.documentId = this.postProcessinfo.businessId;
        }
        break;
      case "funds":
        this.fundsform.applyMoney = Number(this.fundsform.applyMoney);
        this.addform = {
          ...this.addform,
          ...this.fundsform,
          inputType: _type
        };
        if (this.newpagetype == "new") {
          this.addform.outlayId = this.postProcessinfo.businessId;
        }
        break;
      case "maintenance":
        this.addform = {
          ...this.addform,
          ...this.maintenance,
          inputType: _type
        };
        if (this.newpagetype == "new") {
          this.addform.repairId = this.postProcessinfo.businessId;
        }
        break;
      case "meeting":
        this.addform = {
          ...this.addform,
          ...this.meeting,
          inputType: _type
        };
        if (this.newpagetype == "new") {
          this.addform.roomApplyId = this.postProcessinfo.businessId;
        }
        break;
      default:
        break;
    }
    delete this.addform.steps;
    return this.addform;
  }
  public isclick: boolean = true;
  @Mutation("setisvalid") setisvalid: any;
  submit(_type: string): viod {
    // if (this.isclick) {
    //   this.isclick = false;
    this.setissubmit({ value: true });
    this.$nextTick(() => {
      this.$refs.addform.validate(valid => {
        console.log(this.isvalid, 2222);
        if (valid && this.isvalid) {
          console.log(valid, this.isvalid, "===============");
          this.setisvalid({ value: false });
          //点击提交
          if (_type == "end" || _type == "copy") {
            switch (this.addshowtype) {
              case "official":
                this.submitnext(
                  _type,
                  { businessId: this.addform.documentId },
                  {
                    businessType: "DOCUMENT_TRANSMISSION"
                  }
                );
                break;
              case "funds":
                this.submitnext(
                  _type,
                  { businessId: this.addform.outlayId },
                  {
                    businessType: "FUND_APPLICATION"
                  }
                );
                break;
              case "maintenance":
                this.submitnext(
                  _type,
                  { businessId: this.addform.repairId },
                  {
                    businessType: "REPAIR_APPLICATION"
                  }
                );
                break;
              case "meeting":
                this.submitnext(
                  _type,
                  { businessId: this.addform.roomApplyId },
                  {
                    businessType: "MEETING_APPLICATION"
                  }
                );
                break;
              default:
                break;
            }
          } else {
            let params = this.processingParameters(_type);
            switch (this.addshowtype) {
              case "official":
                this.$ajax.approvalDocument
                  .newApprovalDocument({
                    params
                  })
                  .then(res => {
                    if (res.state == 1000) {
                      this.submitnext(_type, res.data, {
                        businessType: "DOCUMENT_TRANSMISSION"
                      });
                    }
                  });
                break;
              case "funds":
                this.$ajax.approvalOutlay
                  .newApprovalOutlay({
                    params
                  })
                  .then(res => {
                    if (res.state == 1000) {
                      this.submitnext(_type, res.data, {
                        businessType: "FUND_APPLICATION"
                      });
                    }
                  });
                break;
              case "maintenance":
                this.$ajax.approvalRepair
                  .newApprovalRepair({
                    params
                  })
                  .then(res => {
                    if (res.state == 1000) {
                      this.submitnext(_type, res.data, {
                        businessType: "REPAIR_APPLICATION"
                      });
                    }
                  });
                break;
              case "meeting":
                this.$ajax.approvalMetting
                  .newApprovalMetting({
                    params
                  })
                  .then(res => {
                    if (res.state == 1000) {
                      this.submitnext(_type, res.data, {
                        businessType: "MEETING_APPLICATION"
                      });
                    }
                  });
                break;
              default:
                break;
            }
          }
        } else {
          // this.isclick = true;
          return false;
        }
      });
    });
    // }
  }
  submitnext(_type: string, _data: object = {}, moudule: object = {}) {
    // this.isclick = true;
    this.addform.files = null; //新增成功之后，清空上传的文件
    let params = { ..._data, ...moudule };
    this.postProcessinfo = params;
    if (_type == "commit" || _type == "end" || _type == "copy") {
      this.postProcess = {
        //清弹框数据
        callMaster: false,
        callDealer: false,
        callCopy: false,
        master: null,
        mastername: "",
        dealer: "",
        dealername: "",
        copy: "",
        copyname: ""
      };
      this.autoshowname();
      this.isUnique();

      // if (!(this.newpagetype == "new" && this.addshowtype == "maintenance")) {
      //   //新增维修申请，点击提交，直接跳转到已办页面，不用弹框
      //   this.dialogFormVisible = true; //显示弹框
      // } else {
      //   this.$router.push({
      //     path: "/process/processlist",
      //     query: { listpagetype: "already" }
      //   });
      // }

      if (
        (this.newpagetype == "new" && this.addshowtype == "maintenance") ||
        (this.newpagetype == "handle" &&
          this.addshowtype == "maintenance" &&
          this.addform.currentLevel == 1)
      ) {
        this.$router.push({
          path: "/process/processlist",
          query: { listpagetype: "already" }
        });
      } else {
        this.dialogFormVisible = true; //显示弹框
      }

      if (_type == "end") {
        //结束抄送弹框显示内容不同
        this.isendshow = true;
      } else if (_type == "copy") {
        this.iscopyshow = true;
      }
    }
  }
  public isUniquestatu = null;
  isUnique() {
    //判断，如果主办人只有一个就直接显示，不用选择人员
    if (
      this.newpagetype == "new"
        ? true
        : this.addform.auditorType == 1 &&
          !this.isendshow &&
          !this.iscopyshow &&
          !(
            this.addform.moduleCode == "FUND_APPLICATION" &&
            this.addform.currentLevel == 5
          ) &&
          !(
            this.addform.moduleCode == "REPAIR_APPLICATION" &&
            this.addform.currentLevel == 5
          ) &&
          !(
            this.addform.moduleCode == "MEETING_APPLICATION" &&
            this.addform.currentLevel == 2
          )
    ) {
      this.$ajax.process
        .isUnique({
          params: this.postProcessinfo
        })
        .then(res => {
          if (res.data.auto == 1) {
            this.isUniquestatu = res.data.auto;
            this.postProcess.mastername = res.data.name;
            this.postProcess.master = res.data.id;
          }
        });
    }
  }
  autoshowname() {
    //维修申请第二步，提交主办人=维修申请人，不可修改；维修申请第三步，提交主办人=维修主办人，不可修改
    if (this.addform.moduleCode == "REPAIR_APPLICATION") {
      if (this.addform.currentLevel == 3) {
        this.addform.approvalAuditors.map(item => {
          if (item.auditorType == 1 && item.level == 1) {
            this.postProcess.mastername = item.tname;
            this.postProcess.master = item.auditorId;
          }
        });
      } else if (this.addform.currentLevel == 4) {
        this.addform.approvalAuditors.map(item => {
          if (item.auditorType == 1 && item.level == 3) {
            this.postProcess.mastername = item.tname;
            this.postProcess.master = item.auditorId;
          }
        });
      }
    }
  }
  processNext() {
    this.$refs.postProcess.validate(valid => {
      if (valid) {
        //点击弹框里的提交按钮
        if (this.isendshow) {
          //结束流程
          this.processdialoge("endProcess");
        } else if (this.iscopyshow) {
          this.processdialoge("copyProcess");
        } else {
          //流程下一步
          this.processdialoge("postProcess");
        }
      } else {
        return false;
      }
    });
  }

  processdialoge(_type: string) {
    //点击办理人弹框的提交按钮
    let params = {};
    params = { ...this.postProcess, ...this.postProcessinfo };
    //弹框不显示主办人，办理人，清空主办人，办理人数据
    if (
      this.newpagetype == "new"
        ? true
        : this.addform.auditorType == 1 &&
          !this.isendshow &&
          !this.iscopyshow &&
          !(
            this.addform.moduleCode == "FUND_APPLICATION" &&
            this.addform.currentLevel == 5
          ) &&
          !(
            this.addform.moduleCode == "REPAIR_APPLICATION" &&
            this.addform.currentLevel == 5
          ) &&
          !(
            this.addform.moduleCode == "MEETING_APPLICATION" &&
            this.addform.currentLevel == 2
          )
    ) {
    } else {
      params = {
        ...this.postProcess,
        ...this.postProcessinfo,
        ...{
          callMaster: false,
          callDealer: false,
          master: null,
          mastername: "",
          dealer: "",
          dealername: ""
        }
      };
    }

    this.$ajax.process[_type]({
      params: params
    }).then(res => {
      if (res.state == 1000) {
        this.postProcess = {
          //清空数据
          callMaster: false,
          callDealer: false,
          callCopy: false,
          master: null,
          mastername: "",
          dealer: "",
          dealername: "",
          copy: "",
          copyname: ""
        };
        if (this.isendshow) {
          //如果点击的是结束按钮，进入办结页面
          this.$router.push({
            path: "/process/processlist",
            query: { listpagetype: "end" }
          });
        }
        this.dialogFormVisible = false; //关闭弹框

        if (this.newpagetype == "new") {
          //在新建页面提交下一步办理人之后，显示菜单
          this.changeaddshowtype({ value: "menu" });
        } else {
          this.$router.go(-1);
        }
      }
    });
  }
  defaultshowtype() {
    //点击取消按钮，如果是当前页面是新建流程页面，就显示流程目录，如果是其他的页面就回到上一页
    this.changeaddshowtype({ value: "menu" });
    if (this.newpagetype !== "new") {
      this.$router.go(-1);
    }
  }
  toChinesNum(num) {
    //阿拉伯数字转成中文
    let changeNum = [
      "零",
      "一",
      "二",
      "三",
      "四",
      "五",
      "六",
      "七",
      "八",
      "九"
    ]; //changeNum[0] = "零"
    let unit = ["", "十", "百", "千", "万"];
    num = parseInt(num);
    let getWan = temp => {
      let strArr = temp
        .toString()
        .split("")
        .reverse();
      let newNum = "";
      for (var i = 0; i < strArr.length; i++) {
        newNum =
          (i == 0 && strArr[i] == 0
            ? ""
            : i > 0 && strArr[i] == 0 && strArr[i - 1] == 0
              ? ""
              : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i])) +
          newNum;
      }
      return newNum;
    };
    let overWan = Math.floor(num / 10000);
    let noWan = num % 10000;
    if (noWan.toString().length < 4) noWan = "0" + noWan;
    return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
  }
  public rowList: any = [];
  public spanArr: any = [];
  public position: any = 0;
  rowspan() {
    console.log(this.addform.approvalAuditors);
    this.addform.approvalAuditors.forEach((item, index) => {
      if (index === 0) {
        this.spanArr.push(1);
        this.position = 0;
      } else {
        if (
          this.addform.approvalAuditors[index].level ===
          this.addform.approvalAuditors[index - 1].level
        ) {
          this.spanArr[this.position] += 1;
          this.spanArr.push(0);
        } else {
          this.spanArr.push(1);
          this.position = index;
        }
      }
    });
  }
  objectSpanMethod({ row, column, rowIndex, columnIndex }) {
    //表格合并行
    if (columnIndex === 0) {
      const _row = this.spanArr[rowIndex];
      const _col = _row > 0 ? 1 : 0;
      return {
        rowspan: _row,
        colspan: _col
      };
    }
  }
  @Mutation("setbaocun") setbaocun: any;
  public isbaocun: boolean = false; //是否是保存
  detaileshow(res: any, _table: any, muttype: any) {
    //详情回显数据处理
    if (res.state == 1000) {
      // if (res.data.approvalAuditors.length == 1) {
      //   //判断是否是保存
      //   this.isbaocun = true;
      //   this.setbaocun({value:true})
      //   this.$nextTick(() => {
      //     this.$set(
      //       this.addform,
      //       "feedback",
      //       res.data.approvalAuditors[0].feedback
      //     );
      //   });
      // }
      if (this.ispreserve == "true") {
        this.$nextTick(() => {
          this.$set(
            this.addform,
            "feedback",
            res.data.approvalAuditors[0].feedback
          );
        });
      }
      this.addform = res.data;
      this.rowspan();
      let value: any = {};
      for (let keyi in this.addform) {
        for (let keyj in _table) {
          if (keyi == keyj) {
            value[keyi] = (this as any).addform[keyi];
          }
        }
      }
      muttype({ value: value }); //把数据传到子组件表格里
      // this.addform.feedback = "";
      this.addform.files = [];
      this.addform.nextLeveldec = this.nodeText(
        this.addform.moduleCode,
        this.addform.currentLevel + 1
      ); //提交下一步弹框显示的流程节点
      this.addform.approvalAuditors.map((item, index) => {
        //流程图表格，显示流程节点
        item.leveldec = this.nodeText(item.businessType, item.level);
        return item;
      });
      let steps = this.addform.approvalAuditors.filter(item => {
        item.levelchines = "第" + this.toChinesNum(item.level) + "步";
        return item.auditorType == 1;
      });
      console.log(steps);
      if (this.addshowtype !== "official") {
        this.addform.steps = steps;
      }
    }
  }
  nodeText(_module: any, _level: any) {
    //办理流转节点,流程图流转节点文字显示
    switch (_module) {
      case "DOCUMENT_TRANSMISSION":
        return "第" + this.toChinesNum(_level) + "步";
      case "FUND_APPLICATION":
        switch (_level) {
          case 1:
            return "发出申请";
          case 2:
            return "分管领导审核";
          case 3:
            return "财务校长复核";
          case 4:
            return "校长审批";
          case 5:
            return "财务归档";
          case 6:
            return "结束流程";
          default:
            break;
        }
        break;
      case "REPAIR_APPLICATION":
        switch (_level) {
          case 1:
            return "维修申请";
          case 2:
            return "分管领导分派";
          case 3:
            return "维修人负责维修";
          case 4:
            return "申请人评价";
          case 5:
            return "维修人评价";
          case 6:
            return "结束流程";
          default:
            break;
        }
        break;
      case "MEETING_APPLICATION":
        switch (_level) {
          case 1:
            return "发出申请";
          case 2:
            return "管理员审核";
          case 3:
            return "结束流程";
          default:
            break;
        }
        break;
      default:
        break;
    }
  }
  getdetail() {
    //判断当前页面是哪种流程类型，展示详情
    switch (this.addshowtype) {
      case "official":
        (this as any).$ajax.approvalDocument
          .getDetailOfApprovalDocument({
            params: {
              businessId: Number(this.$route.query.businessId)
            }
          })
          .then((res: any) => {
            this.detaileshow(res, this.addofficialform, this.documentTitle);
          });
        break;
      case "funds":
        (this as any).$ajax.approvalOutlay
          .getDetailOfApprovalOutlay({
            params: {
              businessId: Number(this.$route.query.businessId)
            }
          })
          .then(res => {
            this.detaileshow(res, this.fundsform, this.addfunds);
          });
        break;
      case "maintenance":
        this.$ajax.approvalRepair
          .getDetailOfApprovalRepair({
            params: {
              businessId: Number(this.$route.query.businessId)
            }
          })
          .then(res => {
            this.detaileshow(res, this.maintenance, this.Maintenance);
          });
        break;
      case "meeting":
        this.$ajax.approvalMetting
          .getDetailOfMeetingRoom({
            params: {
              businessId: Number(this.$route.query.businessId)
            }
          })
          .then(res => {
            this.detaileshow(res, this.meeting, this.Meeting);
          });
        break;
      default:
        break;
    }
  }
  @Watch("$route")
  change(newValue: any, oldValue: string) {
    this.isbaocun = false;
    this.setbaocun({ value: false });
    if (oldValue.query.newpagetype !== "new") {
      this.isUniquestatu = null;
      //在办理或详情页面，预览之后，再返回页面，点击新建页面，显示菜单
      this.changeaddshowtype({ value: "menu" });
    }
    if (newValue.query.newpagetype == "new") {
      //新建页面，清楚流程图和步骤数据
      this.addform.approvalAuditors = [];
      this.addform.steps = [];
    }
    this.postProcessinfo = {
      //清空请求参数，
      businessId: null,
      businessType: null
    };
    //监听当前页面是哪个页面（新建流程，办理流程，流程详情）
    this.newpagetype = newValue.query.newpagetype;
    this.isendshow = false; //页面切换，弹框（抄送，结束样式清空），变成提交下一步弹框
    this.iscopyshow = false;
    this.init();
  }
  @Mutation("processTypeList") processTypeList: any;
  @Watch("addshowtype") //监听页面切换新建流程类型数据清空
  changeshowtype(newValue: string, oldValue: string): void {
    console.log(newValue);

    this.isbaocun = false;
    this.setbaocun({ value: false });
    this.isUniquestatu = null;
    this.addform = {
      ...this.addform,
      title: "",
      urgencyStatus: "",
      files: [],
      feedback: "",
      repairId: null,
      documentId: null,
      outlayId: null,
      roomApplyId: null
    };
    console.log(this.addform, "this.addform222222222222222222222");
    this.nextLeveldec();
  }
  gopreview() {
    //预览
    let query = this.addform;
    console.table(query);
    this.$router.push({
      path: "/process/preview",
      query
    });
    //   let newpagepreview = this.$router.resolve({path: "/process/preview",query})
    //  window.open(newpagepreview.href,'_blank')
  }
  public ispreserve: any = "false";
  mounted() {
    (this as any).newpagetype = this.$route.query.newpagetype;

    if (this.newpagetype == "handle") {
      if (!localStorage.getItem("reload")) {
        localStorage.setItem("reload", true);
        window.location.reload();
      }
      let params = {};
      params.code = "FUND_APPLICATION";
      switch (this.addshowtype) {
        case "official":
          break;
        case "funds":
          params = { code: "FUND_APPLICATION", showAll: 0 };
          break;
        case "maintenance":
          params = { code: "REPAIR_APPLICATION", showAll: 0 };
          // this.$ajax.approvalRepair
          //   .getFaultLocationList({
          //     params: {}
          //   })
          //   .then(res => {
          //     this.faultLocationList({ value: res.data });
          //   });
          break;
        case "meeting":
          params = { code: "MEETING_APPLICATION", showAll: 0 };
        // this.$ajax.approvalMetting
        //   .getMeetingRoomList({ params: [] })
        //   .then(res => {
        //     this.meetingRoomList({ value: res.data });
        //   });

        default:
          break;
      }

      this.$ajax.process
        .getProcessTypeList({
          //获取流程类型
          params: params
        })
        .then(res => {
          this.processTypeList({ value: res.data });
        });
    }

    this.ispreserve = this.$route.query.ispreserve;
    if (
      this.$route.path == "/process/newprocess" &&
      this.$route.query.newpagetype == "new"
    ) {
      if (window.history && window.history.pushState) {
        // 向历史记录中插入了当前页
        history.pushState(null, null, document.URL);
        window.addEventListener("popstate", this.goBack, false);
      }
    }

    this.isUniquestatu = null;
    (this as any).uploadImgApi = (this as any).$config.uploadImgApi;
    this.addform.senderName = localStorage.getItem("tname");
    this.addform.senderPept = localStorage.getItem("deptName");

    this.init();
    this.nextLeveldec();
  }
  nextLeveldec() {
    //新建页面提交下一步流转节点的显示
    if (this.newpagetype == "new") {
      switch (this.addshowtype) {
        case "official":
          this.addform.currentLevel = 1;
          this.addform.nextLeveldec = "第二步";
          break;
        case "funds":
          this.addform.currentLevel = 1;
          this.addform.nextLeveldec = "分管领导审核";
          break;
        case "maintenance":
          this.addform.currentLevel = 1;
          this.addform.nextLeveldec = "维修人负责维修";
          break;
        case "meeting":
          this.addform.currentLevel = 1;
          this.addform.nextLeveldec = "管理员审核";
          break;
        default:
          break;
      }
    }
  }
  public oldUrl: string = ""; //上一个页面的地址
  public beforeRouteEnter(to: any, from: any, next: any) {
    next(vm => {
      console.log(from);
      if (from.path == "/process/preview") {
        vm.oldUrl = from.path;
        vm.addform = from.query; //从预览页面返回新建页面，显示以前填写的内容
      }
    });
  }
  init() {
    //初始化页面
    if (this.newpagetype == "handle" || this.newpagetype == "detail") {
      //判断页面是（新建流程，办理流程，流程详情）
      this.$nextTick(() => {
        this.getdetail();
      });
    } else {
      this.$nextTick(() => {
        if (this.oldUrl !== "/process/preview") {
          //如果是上一个页面是预览页面，就显示预览之前的页面
          this.changeaddshowtype({ value: "menu" });
        }
      });
    }
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
    window.addEventListener("load", () => {
      sessionStorage.clear();
    });
  }
  printDeal() {
    var titleEle = document.getElementsByClassName("titleTxstAlign")[0];
    titleEle.style.textAlign = "center";
    var printBox = document.querySelector(".application");
    //拿到打印的区域的html内容
    var newContent = printBox.innerHTML;
    //将旧的页面储存起来，当打印完成后返给给页面。
    var oldContent = document.body.innerHTML;
    //赋值给body
    document.body.innerHTML = newContent;
    //执行window.print打印功能
    window.print();
    // 重新加载页面，以刷新数据。以防打印完之后，页面不能操作的问题
    window.location.reload();
    document.body.innerHTML = oldContent;
    return false;
  }
  destroyed() {
    localStorage.removeItem("reload");
    window.removeEventListener("popstate", this.goBack, false);
  }

  goBack() {
    // console.log("点击了浏览器的返回按钮");

    if (
      this.$route.path == "/process/newprocess" &&
      this.$route.query.newpagetype == "new"
    ) {
      this.changeaddshowtype({ value: "menu" });
    } else {
      window.history.back();
    }
    history.pushState(null, null, document.URL);
  }
  data() {
    const action = this.$config.uploadImgApi;
    return {
      checkList: ["选中且禁用", "复选框 A"],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      fileList: [],
      uploadImgApi: "", //上传图片路径
      form: {
        name: "fdfds ",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        content: ""
      },
      editorOption: {
        modules: {
          ImageExtend: {
            loading: true,
            name: "file",
            action,
            response: res => {
              if (res.state == 1000) {
                return res.data.url;
              }
              return "";
            }
          },
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function() {
                QuillWatch.emit(this.quill.id);
              }
            }
          }
        }
      }
    };
  }

  get editor() {
    return this.$refs.myQuillEditor.quill;
  }
  onEditorReady(e) {
    // 准备编辑器
    console.log("onEditorReady", e);
  }
  onEditorBlur(e) {
    console.log("onEditorBlur", e);
  } // 失去焦点事件
  onEditorFocus(e) {
    console.log("onEditorFocus", e);
  } // 获得焦点事件
  onEditorChange(e) {
    console.log("onEditorChange", e.html);
  } // 内容改变事件
  onSubmit() {
    console.log("submit!");
  }

  handleAvatarSuccess(response, file, fileList) {
    let urlarr = JSON.parse(JSON.stringify(fileList));
    urlarr = urlarr.map(item => {
      return item.response.data;
    });
    this.addform.files = urlarr;
  }
  handleRemove(file, fileList) {
    console.log(file, fileList);
  }
  beforeAvatarUpload(file) {
    // const isJPG = file.type === 'image/jpeg';
    const isLt5M = file.size / 1024 / 1024 < 5;

    // if (!isJPG) {
    //   this.$message.error('上传头像图片只能是 JPG 格式!');
    // }
    if (!isLt5M) {
      this.$message.error("上传文件大小不能超过 5MB!");
    }
    return isLt5M;
  }
  handlePreview(file) {
    console.log(file);
  }
  handleExceed(files, fileList) {
    this.$message.warning(
      `当前限制选择 3 个文件，本次选择了 ${
        files.length
      } 个文件，共选择了 ${files.length + fileList.length} 个文件`
    );
  }
  // beforeRemove(file, fileList) {
  //   return this.$confirm(`确定移除 ${file.name}？`);
  // }
}
</script>



<style lang="scss">
#printBox {
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
#progress {
  h4 {
    font-size: 16px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: rgba(72, 87, 106, 1);
  }
  .topbtn {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d1dbe5;
    padding: 20px 0;
  }
  .application {
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
  .step {
    margin-bottom: 30px;
    width: 100%;

    // .stepcontent{
    overflow-x: auto;
    display: flex;

    .item {
      width: 260px;
      display: flex;
      .left {
        width: 160px;
        .top {
          width: 160px;
          height: 40px;
          background: linear-gradient(
            138deg,
            rgba(248, 146, 146, 1) 0%,
            rgba(231, 56, 56, 1) 100%
          );
          border-radius: 2px 2px 0px 0px;
          font-size: 13px;
          font-family: MicrosoftYaHei;
          color: rgba(255, 255, 255, 1);
          line-height: 40px;
          text-align: center;
        }
        .img {
          border: 1px solid rgba(175, 190, 205, 1);
          box-sizing: border-box;
          width: 100%;
          height: 150px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          img {
            width: 55px;
          }
          p {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(51, 51, 51, 1);
            line-height: 19px;
          }
        }
      }
      .right {
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  // .step::-webkit-scrollbar {
  //       display: none;
  //   }
}
.dialog_step {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  h4 {
    margin-top: 0;
  }
  div {
    width: 30px;
    height: 30px;
    background: #e73838;
    border-radius: 50%;
    line-height: 30px;
    text-align: center;
    color: #fff;
  }
  p {
    color: #e73838;
  }
  // }
}
.widthlabel {
  label {
    width: 350px !important;
  }
  .el-form-item__error {
    left: 266px !important;
  }
}
.el-dialog__header {
  border-bottom: 1px solid #ccc !important;
}
</style>


<style>
.el-carousel__item {
  background-color: #fff !important;
}
</style>





