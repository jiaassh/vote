<!-- 人员管理 -->
<template>
	<div class="column">
		<!-- 左侧侧栏 -->

		<!-- 右侧内容 -->
		<div class="column-main">

			<!-- 搜索区 -->
			<div class="column-search">
				<!-- 折叠面板 -->
				<el-collapse v-model="showSearchIndex" accordion @change="showSearchBox">
					<el-collapse-item name="1">
						<!-- 搜索栏标题 -->
						<template slot="title">
							<div class="column-search-title">查询条件</div>
							<span class="column-search-icon iconfont" :class="{'icon-cxsq':showSearchHidden,'icon-cxzk':!showSearchHidden}"></span>
						</template>
						<!-- 搜索栏表单 -->
						<div class="mgl-50">
							<el-form ref="searchForm" :model="searchForm" label-width="80px" :inline="true" label-position="right">
								<!-- 每行 -->

								<el-form-item label="会议室名称" prop="name" label-width="82px">
									<el-input v-model="searchForm.name" placeholder="请输入" class="w-340"></el-input>
								</el-form-item>

								<!-- 每行 -->
								<el-form-item label="状态" prop="valid">
									<el-select v-model="searchForm.valid" placeholder="请选择" class="w-340">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>

								<!-- 每行 -->
								<el-row class="column-search-btn">
									<el-col :offset="1">
										<el-button type="primary" @click="submitForm('searchForm')" :disabled="seaDisabled" :loading="seaDisabled">查询</el-button>
										<el-button @click="resetForm('searchForm')">重置</el-button>
									</el-col>
								</el-row>
							</el-form>
						</div>
					</el-collapse-item>
				</el-collapse>
			</div>

			<div class="column-content">
				<div class="column-content-header">
					<div class="header-title">

						查询结果列表
					</div>
					<div class="header-handle">
						<el-button type="success" @click="gouse">会议室使用情况</el-button>
						<el-button type="primary" @click="dialogOpen('userAdd')" v-if="$store.state.buttonOptControl.CC00025">新增</el-button>

					</div>
				</div>
				<div class="column-content-table">
					<template>
						<el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column label="序号" type='index' width="50">
								<!-- <template slot-scope="scope">{{ scope.row.id }}</template> -->
							</el-table-column>
							<el-table-column prop="name" label="会议室名称">
								<template slot-scope="scope">
									<span @click="getUserDetail(scope.row,'detail')" class="href">{{ scope.row.name }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="location" label="会议室地址">
								<template slot-scope="scope">{{ scope.row.location }}</template>
							</el-table-column>
							<el-table-column prop="maxCapacity" label="最多容纳人数">
								<template slot-scope="scope">{{ scope.row.maxCapacity }} </template>
							</el-table-column>
							<el-table-column prop="valid" label="状态">
								<template slot-scope="scope">{{ scope.row.valid|meetingTransform }}</template>
							</el-table-column>

							<el-table-column prop="address" label="操作">
								<template slot-scope="scope">
									<el-button type="primary" plain size="small" @click="userEditHandle(scope.row,'edit')">
										编辑
									</el-button>
									<el-button v-if="scope.row.valid==1" type="danger" plain size="small" @click="updateValid(scope.row,{valid:0})">
										停用
									</el-button>
									<el-button type="success" v-if="scope.row.valid==0" plain size="small" @click="updateValid(scope.row,{valid:1})">
										启用
									</el-button>
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

		<!-- 用户详情 -->
		<el-dialog title="查看会议室" :visible.sync="dialogVisible.userDetail" width="50%">
			<div class="dialog-content">
				<el-form ref="userDetail" :model="userDetail" label-width="120px">
					<el-row>
						<el-col :span="12">
							<el-form-item label="会议室名称" prop="name">
								<el-input :value="userDetail.name" :disabled="isDisabledForEdit"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="会议室地址" prop="location">
								<el-input :value="userDetail.location" :disabled="isDisabledForEdit"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="最多容纳人数" prop="maxCapacity">
								<el-input :value="userDetail.maxCapacity" :disabled="isDisabledForEdit"><span slot="suffix">人</span></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="状态" prop="valid">
								<el-radio-group v-model="userDetail.valid">
									<el-radio :disabled="isDisabledForEdit" :label="1">启用</el-radio>
									<el-radio :disabled="isDisabledForEdit" :label="0">停用</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>

				</el-form>
			</div>
		</el-dialog>
		<!-- 用户详情 end -->

		<!-- 用户新增 -->
		<el-dialog title="新增会议室" :visible.sync="dialogVisible.userAdd" width="50%">
			<div class="dialog-content">
				<el-form ref="userAdd" :model="userAdd"  :rules="rules" label-width="120px">
					<el-row>
						<el-col :span="12">
							<el-form-item label="会议室名称" prop="name">
								<el-input v-model="userAdd.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="会议室地址" prop="location">
								<el-input v-model="userAdd.location"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="最多容纳人数" prop="maxCapacity">
								<el-input v-model="userAdd.maxCapacity"><span slot="suffix">人</span></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="状态" prop="valid">
								<el-radio-group v-model="userAdd.valid">
									<el-radio :label="1">启用</el-radio>
									<el-radio :label="0">停用</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<div class="useradd-btn-group">
								<el-button type="primary" @click="submitForm('userAdd')">保存</el-button>
								<el-button @click="resetForm('userAdd')">重置</el-button>
								<el-button @click="dialogClose('userAdd')">取消</el-button>
							</div>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</el-dialog>
		<!-- 用户新增 end -->

		<!-- 用户编辑  -->
		<el-dialog title="编辑会议室" :visible.sync="dialogVisible.userEdit" width="50%">
			<div class="dialog-content">
				<el-form ref="userEdit" :model="userEdit" :rules="rules" label-width="120px">
					<el-row>
						<el-col :span="12">
							<el-form-item label="会议室名称" prop="name">
								<el-input v-model="userEdit.name" :value="userEdit.phone"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="会议室地址" prop="location">
								<el-input v-model="userEdit.location" :value="userEdit.idnumber" maxlength="20"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="最多容纳人数" prop="maxCapacity">
								<el-input v-model="userEdit.maxCapacity"><span slot="suffix">人</span></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="状态" prop="valid">
								<el-radio-group v-model="userEdit.valid">
									<el-radio :label="1">启用</el-radio>
									<el-radio :label="0">停用</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="24">
							<div class="useradd-btn-group">
								<el-button type="primary" @click="submitForm('userEdit')">保存</el-button>
								<el-button @click="resetForm('userEdit')">重置</el-button>
								<el-button @click="dialogClose('userEdit')">取消</el-button>
							</div>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</el-dialog>
		<!-- 用户编辑 end -->

		<!-- 用户调动 -->
		<el-dialog title="人员调动" :visible.sync="dialogVisible.userTransfer" width="50%">

			<div class="dialog-title">人员信息</div>
			<el-form :model="org" label-width="120px">
				<el-row>
					<el-col :span="24">
						<el-form-item label="人员">
							<el-tag style="margin-right: 10px;" :key="item.id" v-for="item in this.multipleSelection">{{item.tname}}({{item.username}})</el-tag>
						</el-form-item>
					</el-col>

				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="所属组织名称">
							<el-input v-model="org.label" :value="org.label" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="所属组织编号">
							<el-input v-model="org.deptNum" :value="org.deptNum" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>

			<div class="dialog-title">调动到</div>
			<el-form ref="userTransfer" :model="userTransfer" label-width="120px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="新组织名称">
							<el-tree class="mgt-10" :data="tree" :props="defaultProps" @node-click="transferOrg"></el-tree>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="新组织编号">
							<el-input v-model="userTransfer.deptNum" :value="userTransfer.deptNum" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<div class="useradd-btn-group">
							<el-button type="primary" @click="submitForm('userTransfer')">确定</el-button>
							<el-button @click="dialogClose('userTransfer')">取消</el-button>
						</div>
					</el-col>
				</el-row>
			</el-form>

		</el-dialog>
		<!-- 用户调动 -->
	</div>
</template>

<script>
import md5 from "js-md5";
import validatas from "@/assets/js/validata.js";

// 离职状态字典
const statusDic = [
  {
    value: 0,
    label: "停用"
  },
  {
    value: 1,
    label: "启用"
  }
];

export default {
  data() {
    var havsBlank = (rule, value, callback) => {
      if (value.indexOf(" ") >= 0) {
        callback(new Error("不能输入空格"));
      } else {
        callback();
      }
    };
    return {
      showSearchIndex: "1", //折叠面板下标
      showSearchHidden: false, //折叠面板
      tree: [], //组织树
      defaultProps: {
        //组织数初始参数
        children: "children",
        label: "label"
      },
      isDisabledForEdit: true, //编辑和详情共用一个窗口，根据参数决定是否禁用
      tableData: [], //表格数据
      multipleSelection: [], //表格全选数组
      searchForm: {
        //查询表单
        valid: "", //是否有效 1 是 0 否
        name: "", //会议室名称
        pageSize: 10, //分页数量
        pageNo: 1 //当前页
      },
      seaDisabled: false, //查询按钮
      options: statusDic, //状态栏字典
      total: 0, //分页总数
      dialogVisible: {
        //窗口遮罩
        userDetail: false, //用户详情
        userAdd: false, //用户新增
        userEdit: false, //用户编辑
        userTransfer: false //用户调动
      },

      rules: {
        name: [{ required: true, message: "请输入会议室名称", trigger: "blur" }],
        location: [{ required: true,message: "请输入会议室地址", vtrigger: "blur"  }],
        maxCapacity: [
          { required: true, message: "请输入容纳人数", trigger: "blur" },
          
        ],
      },

      // *** 此处分开写是之前出现界面差异很大的现象，切分开到不同界面需要带参，先不做改动 ***
      userDetail: {
        //用户信息详情
        name: "",
        location: "",
        maxCapacity: "",
        valid: 1
      },
      // *** 此处分开写是之前出现界面差异很大的现象，切分开到不同界面需要带参，先不做改动 ***
      userAdd: {
        //用户添加表单
        name: "",
        location: "",
        maxCapacity: "",
        valid: 1
      },
      // *** 此处分开写是之前出现界面差异很大的现象，切分开到不同界面需要带参，先不做改动 ***
      userEdit: {
        //用户编辑表单

        name: "",
        location: "",
        maxCapacity: "",
        valid: 1
      },
      // *** 此处分开写是之前出现界面差异很大的现象，切分开到不同界面需要带参，先不做改动 ***
      userTransfer: {
        //用户调动
        name: "",
        location: "",
        maxCapacity: "",
        valid: 1
      },
      imageUrl: "", //上传图片路径
      org: {}, //当前组织
      uploadImgApi: "", //图片上传接口
      treeSpreadArr: [], //树展开
      treeConfig: {
        checkStrictly: true
      },
      accept: "" //图片上传限制
    };
  },
  methods: {
    gouse() {
      this.$router.push({
        path: "/system/maintenance"
      });
    },
    // 设置发送参数
    setSendParams(formName) {
      // this[formName] = this.$helper.timeArrSlice(this[formName],{
      // 	timeArrField:'timeArr'
      // })

      let params = { ...this[formName] };
      // params.pwd = md5("123456");
      // params.url = this.imageUrl;
      return params;
    },
    // 提交新增用户
    sendUserAdd() {
      this.$ajax.meetingRoom
        .addMeetingRoom({
          params: this.setSendParams("userAdd")
        })
        .then(res => {
          this.dialogClose("userAdd");
          this.getTableData();
        });
	},
	updateValid(_item,_type){
		let params ={..._item,..._type}
      // params.pwd = md5(this.userEdit.pwd)
      this.$ajax.meetingRoom
        .updateMeetingRoom({
          params
        })
        .then(res => {
          this.getTableData();
        });
	},
    // 发送用户编辑表单
    sendUserEdit() {
      let params = this.setSendParams("userEdit");
      // params.pwd = md5(this.userEdit.pwd)
      this.$ajax.meetingRoom
        .updateMeetingRoom({
          params
        })
        .then(res => {
          this.dialogClose("userEdit");
          this.getTableData();
        });
    },
    // 发送调动数据
    sendUserTransfer() {
      const deptid = this.userTransfer.id;
      let user = [];
      this.multipleSelection.map(item => {
        user.push(item.id);
      });
      this.$ajax.staffs
        .shiftUserInfo({
          params: {
            ids: user,
            deptid
          }
        })
        .then(res => {
          this.dialogClose("userTransfer");
          this.getTableData();
        });
    },
    // 人员离职
    userLeaveOffice() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请勾选人员",
          type: "warning"
        });
      } else {
        this.$confirm("是否确定操作员工离职?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let ids = [];
            this.multipleSelection.map(item => {
              ids.push(item.id);
            });
            this.$ajax.staffs
              .leaveOffice({
                params: {
                  ids
                }
              })
              .then(res => {
                this.getTableData();
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      }
    },
    //重置密码
    resetPassword() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请勾选人员",
          type: "warning"
        });
      } else {
        this.$confirm("是否确定重置密码?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let ids = [];
            this.multipleSelection.map(item => {
              ids.push(item.id);
            });
            this.$ajax.staffs
              .resetPassword({
                params: {
                  ids
                }
              })
              .then(res => {
                this.getTableData();
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      }
    },

    // 切换dialog
    dialogToogle(name) {
      this.dialogVisible[name] = !this.dialogVisible[name];
    },
    //关闭dialog
    dialogClose(name) {
      this.dialogVisible[name] = false;
    },
    //打开dialog
    dialogOpen(name) {
      // if (!this.org.id) {
      // 	this.$message({
      // 		message: '请选择企业组织',
      // 		type: 'warning'
      // 	});
      // }else{
      // 	this.dialogVisible[name] = true
      // }
      this.dialogVisible[name] = true;
    },
    // 用户详情
    getUserDetail(row, handle) {
      this.userDetail = row;
      this.dialogVisible.userDetail = true;
      // this.$ajax.staffs.getUserInfoById({
      // 	params: {
      // 		id: row.id
      // 	}
      // }).then(res =>{
      // 	let data = res.data;
      // 	const {startTime,endTime} = data
      // 	this.userDetail = data
      // 	this.userDetail.timeArr = [startTime * 1000, endTime * 1000]
      // 	this.dialogVisible.userDetail = true;
      // })
    },
    // 提交表单并验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          switch (formName) {
            case "searchForm":
              this.searchForm.pageNo = 1;
              this.getTableData();
              break;

            case "userAdd":
              this.sendUserAdd();
              break;

            case "userEdit":
              this.sendUserEdit();
              break;

            case "userTransfer":
              this.sendUserTransfer();
              break;

            default:
              this.getTableData();
              break;
          }
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 分页切换
    pageChange(page) {
      this.searchForm.pageNo = page;
      this.getTableData();
    },
    // 折叠面板
    showSearchBox() {
      this.showSearchHidden = !this.showSearchHidden;
    },
    // 点击获取节点
    handleNodeClick(data) {
      const { id, label } = data;
      this.searchForm.deptid = id;
      this.userAdd.deptName = label;
      this.userAdd.deptid = id;
      this.org = data;
      this.getTableData();
    },

    // 请求列表数据
    getTableData() {
      this.seaDisabled = true;
      this.$ajax.meetingRoom
        .getMeetingRoomList({
          params: this.searchForm,
          dictionary: {
            status: statusDic
          },
          transform: {
            optime: {
              timeFormat: "yyyy-MM-dd hh:mm"
            }
          }
        })
        .then(res => {
          if (this.seaDisabled == true) {
            this.seaDisabled = false;
          }
          if (res.success) {
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        });
    },
    // 获取组织树
    getOrgTree() {
      this.$ajax.permission
        .getOrgTree({
          params: {
            status: 0
          }
        })
        .then(res => {
          if (res.success) {
            this.tree = res.data;
          }
        });
    },
    // 平铺树
    repeatTree(tree) {
      tree.map(item => {
        if ("children" in item) {
          if (item.children.length == 0) {
            delete item.children;
          } else {
            this.repeatTree(item.children);
          }
        }
      });
    },
    // 表格点击编辑按钮操作
    userEditHandle(row) {
      // console.log(row)
      this.userEdit = row;
      this.dialogOpen("userEdit");
      // this.$ajax.staffs.getUserInfoById({
      // 	params: {
      // 		id: row.id
      // 	}
      // }).then(res =>{
      // 	if(res.success){
      // 		this.dialogOpen('userEdit');
      // 		this.userEdit = res.data;
      // 		this.userEdit.pwd=123456
      // 		// this.userEdit.pwd = 123456;
      // 		this.userEdit.timeArr = [this.userEdit.startTime * 1000, this.userEdit.endTime * 1000] ;
      // 		this.userEdit = {...this.userEdit} ;
      // 		// console.log('this.userEdit',this.userEdit);
      // 	}
      // })
    },
    // 调动按钮操作
    userTransferHandle() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请勾选人员",
          type: "warning"
        });
      } else {
        this.dialogOpen("userTransfer");
      }
    },

    // 当展开节点发生变化时触发
    transferOrgExpand(e) {},
    // 组织调动
    transferOrg(org) {
      this.userTransfer.deptNum = org.deptNum;
      this.userTransfer.id = org.id;
      this.userTransfer = { ...this.userTransfer };
    },
    // 表格选中操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 表格点击编辑
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      if (res.state == 1000) {
        const url = res.data.url;
        this.imageUrl = url;
        if (this.dialogVisible.userEdit) {
          this.userEdit.url = url;
        }
        if (this.dialogVisible.userAdd) {
          this.userAdd.url = url;
        }
      }
    },
    // 上传之前
    beforeAvatarUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error("上传图片大小不能超过 10MB!");
      }
      return isLt10M;
    }
  },
  created() {
    this.userAdd.defaultPropertyId = localStorage.getItem("defaultPropertyID");
    this.accept = this.$config.getUploadImgAccept;
    // this.getOrgTree();
    this.uploadImgApi = this.$config.uploadImgApi;
  },
  mounted() {
    this.getTableData();
  }
};
</script>

<style>
.user-detail-img {
  width: 160px;
  height: 160px;
  border: 1px solid rgba(209, 219, 229, 1);
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.href {
  cursor: pointer;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.upload-text {
  font-size: 14px;
  color: rgba(72, 87, 106, 1);
}

.useradd-btn-group {
  display: flex;
  justify-content: center;
}
</style>
