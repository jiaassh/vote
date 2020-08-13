<template>
	<div class="column" id="roleEdit">
		<!-- 左侧侧栏 -->
		<div class="column-left">
			<div class="column-left-title">角色信息</div>
			<div class="column-left-content">
				<el-form ref="form" :model="form" label-width="80px" :rules="rules">
					<el-form-item label="角色编号" prop="rolenum">
						<el-input v-model="form.rolenum" :disabled="editDisabled"></el-input>
					</el-form-item>
					<el-form-item label="角色名称" prop="rolename">
						<el-input v-model="form.rolename" :disabled="editDisabled"></el-input>
					</el-form-item>
					<el-form-item label="备注信息">
						<el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.remark" :disabled="editDisabled"></el-input>
					</el-form-item>

				</el-form>
			</div>
		</div>

		<!-- 右侧内容 -->
		<div class="column-main column-main-mini">

			<!-- 搜索区 -->
			<div class="column-search">
				<div class="handle-group " v-if="!editDisabled">
					<el-button @click="back()">返回</el-button>
					<el-button type="primary" @click="selectAll()">全选</el-button>
					<el-button type="warning" @click="selectAllRead()">全选查看功能</el-button>
					<el-button type="primary" @click="submitForm('form')">保存</el-button>
					<el-button type="danger" @click="selectCancel()">取消选择</el-button>
				</div>
				<div class="handle-group " v-else>
					<el-button @click="back()">返回</el-button>
				</div>
				<div class="column-form-detail mgt-20">
					<el-form ref="form" :model="form" label-width="120px">
						<el-row>
							<el-col :span="6">
								<el-form-item label="模块名称" prop="module">
									<el-select v-model="form.module" placeholder="请选择" @change="filterModule" class="w-340">
										<el-option label="全部" value="-1">
										</el-option>
										<el-option v-for="item in moduleNames" :key="item.id" :label="item.description" :value="item.id">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<!-- <el-col :span="6">
								<el-form-item label="菜单名称" prop="menu">
									<el-input v-model="form.menu" placeholder="请输入"></el-input>
								</el-form-item>
							</el-col> -->
						</el-row>

						<el-row>
							<el-col :span="12" :offset="1">
								<el-button type="primary" @click="changModule()">筛选</el-button>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12" class="mgt-20">
							</el-col>
						</el-row>

					</el-form>
				</div>
			</div>

			<div class="column-content" style="padding: 0;">
				<div class="header-title wp-100 pd-20">
					选择权限
				</div>
				<div class="edit-handle-list pd-20">
					<el-form ref="form" :model="form" label-width="100px">
						<div v-for="(item,listproIndex) in listpro" :key="listproIndex">
							<div class="edit-handle-cell bg-ccc">
								<el-checkbox @change="changeListpro(item,listproIndex)" :disabled="editDisabled" :label="item.name" v-model="item.checked" :key="item.id"></el-checkbox>
							</div>
							<div class="edit-column-content">
								<div v-for="(menu$item,menulistIndex) in item.menulist" :key="menulistIndex">
									<div class="d-f">
										<el-form-item :label="menu$item.name+':'">
											<el-checkbox @change="changeMenulist({
												pro:{
													item:item,
													index:listproIndex
												},
												menu:{
													item:menu$item,
													index:menulistIndex
												},
												handle:{
													item:handle$item,
													index:handleIndex
												},
											})" v-model="handle$item.checked" v-for="(handle$item,handleIndex) in menu$item.prolist" :disabled="editDisabled" :label="handle$item.name" :key="handleIndex">
												{{handle$item.name}}</el-checkbox>
										</el-form-item>
									</div>
								</div>
							</div>
						</div>
					</el-form>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
export default {
  data() {
    return {
      type: null, //CURD类型
      id: null, //详情或编辑所用的id
      roleInfo: {}, //角色详情信息
      permissionids: [], //角色已经拥有的权限
      editDisabled: false, //禁用
      form: {
        remark: "",
        rolenum: "",
        rolename: ""
      }, //提交的表单
      checkedList: [], //选择的id列表
      listpro: [], //权限树，可筛选
      listproSave: [], //权限树留存
      moduleNames: [], //模块下拉框
      filterMenuId: null, //筛选切换的id
      rules: {
        remark: [
          {
            required: true,
            message: "请填写",
            trigger: ["change", "blur"]
          }
        ],
        rolenum: [
          {
            required: true,
            message: "请填写",
            trigger: ["change", "blur"]
          }
        ],
        rolename: [
          {
            required: true,
            message: "请填写",
            trigger: ["change", "blur"]
          }
        ]
      }
    };
  },
  methods: {
    // 提交表单并验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.sendFromData();
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 提交
    sendFromData() {
      let params = this.form;
      params.proids = this.checkedList;
      if (this.type == "add") {
        this.$ajax.permission
          .insertRoleInfo({
            params
          })
          .then(res => {
            // this.resetForm('form')
            // this.getListpro()
            // this.getModuleNames()
            this.back();
          });
      } else if (this.type == "edit") {
        this.$ajax.permission
          .updateRoleInfo({
            params
          })
          .then(res => {
            this.back();
            // this.init()
          });
      }
    },
    // 返回到列表
    back() {
      this.$router.push({
        path: "/system/role"
      });
    },
    //全选
    selectAll() {
      this.selectAllSetChecked(true);
    },
    // 全选改写勾选状态
    selectAllSetChecked(checked, onlySelectRead) {
      let list = [];
      console.log(this.listpro);
      this.listpro.map(item => {
        if (!onlySelectRead) {
          item.checked = checked;
        }
        if (item.menulist && item.menulist.length > 0) {
          item.menulist.map(item$menu => {
            if (item$menu.prolist && item$menu.prolist.length > 0) {
              item$menu.prolist.map(item$pro => {
                if (!onlySelectRead) {
                  item$pro.checked = checked;
                  list.push(item$pro.id);
                } else {
                  if (item$pro.name == "查看") {
                    item$pro.checked = checked;
                    list.push(item$pro.id);
                  }
                }
              });
            }
          });
        }
      });

      this.setBatchDeleteOrAdd(list, checked);
      this.listpro = JSON.parse(JSON.stringify(this.listpro));
    },
    //全选查看
    selectAllRead() {
      this.selectAllSetChecked(true, true);
    },
    // 取消选择
    selectCancel() {
      this.selectAllSetChecked(false);
    },
    // 保存表单
    save() {},
    // 筛选模块
    filterModule(id) {
      this.filterMenuId = id;
    },
    // 点击进行筛选
    changModule() {
      const id = this.filterMenuId;
      if (id == -1) {
        this.listpro = this.listproSave;
      }
      const menu = this.form.menu;

      this.listproSave.map(item => {
        if (item.id == id && !menu) {
          this.listpro = [item];
        }
        let list = item.menulist;
        if (menu && list && list.length > 0) {
          list.map(i => {
            if (i.name == menu) {
              this.listpro = [item];
              this.listpro[0].menulist = [i];
            }
          });
        }
      });
    },
    // // 获取模块下拉框
    getModuleNames() {
      this.$ajax.permission.getModuleNames().then(res => {
        this.moduleNames = res.data;
      });
    },
    // // 获取企业组织信息
    getListpro() {
      this.$ajax.permission.findListPro().then(res => {
        this.listproSave = res.data;
        this.listpro = this.listproSave;
        this.changeView();
      });
    },
    // 切换显示状态，如果是详情就获取接口，如果是编辑
    changeView() {
      const type = this.type;
      if (type == "edit" || type == "detail") {
        this.getRoleDetail();
      }
      if (type == "detail") {
        this.editDisabled = true;
      }
    },
    // 获取用户详情
    getRoleDetail() {
      const params = { rid: this.id };
      this.$ajax.permission.getRoleInfoById({ params }).then(res => {
        this.form = res.data.roleInfo;
        this.permissionids = res.data.permissionids;
        this.checkedRolePermissionids();
      });
    },
    // 勾选当前角色已拥有的权限
    checkedRolePermissionids() {
      let list = [];
      console.log(this.listpro)
      this.listpro.map(item => {
        if (item.menulist && item.menulist.length > 0) {
          item.menulist.map(item$menu => {
            console.log(item$menu, 22);
            if (item$menu.prolist && item$menu.prolist.length > 0) {
              item$menu.prolist.map(item$pro => {
                if (this.permissionids.includes(item$pro.id)) {
                  item$pro.checked = true;
                  list.push(item$pro.id);
                }
              });
            }
          });
        }
      });

      this.setBatchDeleteOrAdd(list, true);
      this.listpro = JSON.parse(JSON.stringify(this.listpro));
    },
    // 批量添加或者删除
    setBatchDeleteOrAdd(handleList, checked) {
      console.log(this.checkedList,handleList)
      if (checked) {
        this.checkedList = [...this.checkedList, ...handleList];
      } else {
        handleList.map(item$handle => {
          this.checkedList.map((item$checked, index) => {
            if (item$checked == item$handle) {
              this.checkedList.splice(index, 1);
            }
          });
        });
      }
      // 去重
      this.checkedList = this.unique(this.checkedList);
      console.log(this.checkedList);
      // console.log(handleList);
    },
    // 数组去重
    unique(arr) {
      let hash = [];
      for (let i = 0; i < arr.length; i++) {
        if (hash.indexOf(arr[i]) == -1) {
          hash.push(arr[i]);
        }
      }
      return hash;
    },
    // 批量设置选择
    setBatchChecked(item, checked) {
      let list = [];
      let menulist = item.menulist;
      if (menulist.length > 0) {
        menulist.map(item$menu => {
          item$menu.prolist.map(pro => {
            pro.checked = checked;
            list.push(pro.id);
          });
        });
      }
      return list;
    },
    // 外层栏目切换
    changeListpro(item, index) {
      console.log(item,index)
      const checked = item.checked;
      let handleList = this.setBatchChecked(item, checked);
      this.setBatchDeleteOrAdd(handleList, checked);
    },
    // 内层菜单切换
    changeMenulist(item, index) {
      console.log(item,index)
      const { handle, menu, pro } = item;
      const id = this.listpro[pro.index].menulist[menu.index].prolist[
        handle.index
      ].id;

      if (handle.item.checked) {
        this.checkedList.push(id);
      } else {
        this.checkedList.map(item => {
          const index = this.checkedList.indexOf(id);
          if (index > -1) {
            this.checkedList.splice(index, 1);
          }
        });
      }
     
      let checkedAll = true;
      this.listpro[pro.index].menulist.map(item => {
        item.prolist.map(item => {
          if (!item.checked) {
            checkedAll = false;
          }
        });
      });
      this.listpro[pro.index].checked = checkedAll;
    },
    init() {
      this.getListpro();
      this.getModuleNames();
    }
  },
  created() {
    let params = this.$route.params;
    this.type = params.type;
    this.id = params.id;
  },
  mounted() {
    this.init();
  }
};
</script>


<style lang="scss">
#roleEdit {
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

  .handle-group {
    padding: 20px;
  }

  .el-tabs--border-card {
    -webkit-box-shadow: none;
    box-shadow: none;
    border: none;
    border-radius: 5px;
  }

  .el-tabs__header {
    border-radius: 5px;
  }

  .tab-titel {
    font-size: 16px;
    font-weight: bold;
    color: rgba(72, 87, 106, 1);
  }

  .edit-handle-cell {
    height: 40px;
    border: 1px solid rgba(209, 219, 229, 1);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20px;
    padding-left: 20px;
  }

  .edit-btn {
    margin-left: 200px;
    margin-top: 20px;
  }

  .edit-column-content {
    border: 1px solid rgba(209, 219, 229, 1);
    border-top: none;
    padding: 20px 0;
    padding-left: 20px;
    padding-right: 122px;
  }

  .tips {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(72, 87, 106, 1);
  }

  .column-content table {
    text-align: center;
  }

  .column-content table tbody tr {
    height: 100px;
    font-size: 14px;
    color: #48576a;
  }

  .coupon-rule-txt {
    width: 120px;
    text-align: right;
  }

  .handle {
    margin-left: 40px;
    display: flex;
  }

  .handle-item {
    margin-left: 20px;
  }

  .edit-handle-list .el-form-item {
    margin-bottom: 0;
  }

  .edit-column-content {
    color: #48576a;
  }
}
</style>
