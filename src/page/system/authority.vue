<template>
	<div class="column">
		<!-- 左侧侧栏 -->
		<div class="column-left">
			<div class="column-left-title">企业组织</div>
			<div class="column-left-content">
				<el-tree highlight-current="true" :data="tree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
			</div>
		</div>
		<!-- 右侧内容 -->
		<div class="column-main column-main-mini">

			<!-- 搜索区 -->
			<div class="column-search ">
				<div class="handle-group" v-if="orgEditDisabled">
					<el-button type="primary" @click="orgEdit()" v-if="$store.state.buttonOptControl.CC00021">编辑</el-button>
					<el-button type="primary" @click="openDialog('addChildOrg')" v-if="$store.state.buttonOptControl.CC00020">新增下级</el-button>
				</div>
				<div class="handle-group" v-if="!orgEditDisabled">
					<el-button @click="orgEditBack()">返回</el-button>
					<el-button type="primary" @click="orgEditSave()">保存</el-button>
					<el-button type="danger" @click="orgDelete()">删除</el-button>
				</div>
				<div class="column-search-title">企业组织基础信息</div>
				<div class="column-form-detail mgt-20">
					<el-form ref="orgDetail" :model="orgDetail" label-width="120px">
						<el-row>
							<el-col :span="12">
								<el-form-item label="组织编号" prop="deptNum">
									<el-input v-model="orgDetail.deptNum" :disabled="orgEditDisabled"></el-input>
								</el-form-item>
							</el-col>

							<el-col :span="12">
								<el-form-item label="组织名称" prop="deptName">
									<el-input v-model="orgDetail.deptName" :disabled="orgEditDisabled"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="上级组织编号">
									<el-input v-model="orgDetail.parentCode"  disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="是否有效" prop="status">
									<el-radio-group v-model="orgDetail.status">
										<el-radio :disabled="orgEditDisabled" :label="0">是</el-radio>
										<el-radio :disabled="orgEditDisabled" :label="1">否</el-radio>
									</el-radio-group>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="备注"  prop="remark">
									<el-input v-model="orgDetail.remark" :disabled="orgEditDisabled" type="textarea" :rows="2" placeholder="请输入内容">
									</el-input>
								</el-form-item>
							</el-col>
						</el-row>

					</el-form>
				</div>
			</div>

			<div class="column-content" style="padding: 0;">
				<el-tabs type="border-card">
					<el-tab-pane label="拥有角色" class="hp-100">
						<div class="p-r hp-100">
						<div >
							<div class="tab-titel" style="display: flex;justify-content: space-between;">
										企业组织拥有以下角色	
									<el-button type="primary" v-if="!orgEditDisabled" @click="addRole">添加</el-button>
							</div>
						</div>

							<el-table border ref="roleManagerList" :data="roleManagerList" tooltip-effect="dark" style="width: 100%" class="mgt-10">					
								<el-table-column label="序号" type="index" width="50">
<!--									<template slot-scope="scope">{{ scope.row.id }}</template>-->
								</el-table-column>
								<el-table-column label="角色名称">
									<template slot-scope="scope">
										<el-select
										v-if="!orgEditDisabled"
										v-model="scope.row.id"
										size="mini"
										>
											<el-option
											v-for="item in addRoleList"
											:key="item.id"
											:label="item.rolename"
											:value="item.id">
										</el-option>
										</el-select>
										<span v-else>{{ scope.row.rolename }}</span>
										</template>
								</el-table-column>
								<el-table-column prop="rolenum" label="角色编号" show-overflow-tooltip>
									<template slot-scope="scope">{{ scope.row.rolenum }}</template>
								</el-table-column>
								<el-table-column prop="opname" label="修改人">
									<template slot-scope="scope">{{ scope.row.opname }}</template>
								</el-table-column>
								<el-table-column prop="optime" label="修改时间" min-width="100" show-overflow-tooltip>
									<template slot-scope="scope">{{ scope.row.optime|timeTrans }}</template>
								</el-table-column>
								<el-table-column label='操作'>
									<template v-if="!orgEditDisabled" slot-scope="scope">	
										<el-tag type="danger" @click="delRoles(scope.row)">删除</el-tag>
									</template>
								</el-table-column>
							</el-table>
							<!-- <div class="mgt-20">
								<el-pagination background layout="prev, pager, next" :total="total" @current-change="pageChange" :current-page='pageList.pageNo'>
								</el-pagination>
							</div> -->
						</div>
					</el-tab-pane>
				
				</el-tabs>
			</div>
		</div>
		<el-dialog title="新增下级组织" :visible.sync="dialog.addChildOrg" width="50%">
			<div class="dialog-content">
				<el-form ref="addChildOrg" :model="addChildOrg" :rules="addChildOrgRules" label-width="120px">
					<el-row>
						<el-col :span="12">
							<el-form-item label="组织名称" prop="deptName">
								<el-input v-model="addChildOrg.deptName" ></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="组织编号" prop="deptNum">
								<el-input v-model="addChildOrg.deptNum"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="上级组织编号" >
								<el-input v-model="addChildOrg.parentCode" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="是否有效" prop="isLeaf">
								<el-radio-group v-model="addChildOrg.isLeaf">
									<el-radio :label="0">有效</el-radio>
									<el-radio :label="1">无效</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="23">
							<el-form-item label="备注" prop="remark">
								<el-input v-model="addChildOrg.remark" placeholder="请输入"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					
					<el-row>
						<el-col :span="24">
							<div class="useradd-btn-group">
								<el-button type="primary" @click="submitForm('addChildOrg')">提交</el-button>
								<el-button @click="closeDialog('addChildOrg')">取消</el-button>
							</div>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</el-dialog>
		
		<!-- <el-dialog title="新增角色" :visible.sync="dialog.addChildOrg" width="50%">
			<div class="dialog-content">
				<el-form ref="addChildOrg" :model="addChildOrg" :rules="addChildOrgRules" label-width="120px">			

				</el-form>
			</div>
		</el-dialog> -->
		
	</div>
</template>

<script>
	// 离职状态字典
	const statusDic = [{
		value: 0,
		label: "在职"
	}, {
		value: 1,
		label: "离职"
	}]

	export default {
		data() {
			return {
				tree: [], //组织树
				orgDetail: {}, //组织详情
				// permissionTree: [], //权限树
				defaultProps: { //权限树组件默认字段
					children: 'children',
					label: 'label'
				},
				deptid:'',//当前节点组织id
				roleManagerList:[],//角色列表
				editRoleList:[],
				total: 0, //分页总数
				dialog:{
					addChildOrg:false
				},
				pageList:{
					pageNo:1,
					pageSize:10
				},
				addChildOrg:{//新增下级组织
					deptName:'',
					deptNum:'',
					parentId:'',
					level:'',
					isLeaf:0,
					remark:'',
					parentCode:'',
				},
				addChildOrgRules:{
					deptName: [{
						required: true,
						message: '请输入组织名称',
						trigger: 'blur'
					}],
					deptNum: [{
						required: true,
						message: '请输入组织编号',
						trigger: 'blur'
					}],
					isLeaf: [{
						required: true,
						message: '请选择是否有效',
						trigger: 'blur'
					}],
				},//增加下级组织表单验证规则
				orgEditId:'',//组织编辑id
				orgEditDisabled:true,
				permissionTreeCheckedNodes:[],//权限树被选中的节点
				permissionTreeCheckeds:[],//已经勾上的节点
				addRoleList:[], //角色列表
			}
		},
		methods: {
			// 权限树点击操作
			handleCheckChange(data, checked, indeterminate) {
				this.permissionTreeCheckedNodes = this.$refs.permissionTree.getCheckedNodes()
			},
			// 组织编辑返回按钮操作
			orgEditBack(){
				this.orgEditDisabled = true;
				this.selectOrganizationInfo()
			},
			// 组织保存编辑
			orgEditSave(){
				let gymproid = [];
				let params = this.orgDetail;
				let flag=true
				// this.permissionTreeCheckedNodes.map(item =>{
				// 	gymproid.push(item.id)
				// })
				params.gymproid = gymproid;
				params.orgroles = [];
				let arr=[]
				
				this.roleManagerList.map(item=>{
					if(item.id){
						let obj={}
						obj.roleid=item.id
						obj.organizationid=params.id
						arr.push(item.id)
						params.orgroles.push(obj)
					}
				})
				arr.reduce((pre,cur)=>{
					if(!pre.includes(cur)){
						return pre.concat(cur)
					}else{
						this.$message.error('不能添加重复角色')
						return (flag=false)
					}
				},[])
				if(flag){
					this.$ajax.setting.updateOrganizationInfo({
					params
				}).then(res =>{
					this.getOrgTree()
					this.selectOrganizationInfo()
					this.orgEditDisabled = true;
				})
				}
			},
			// 组织编辑表单可填写
			orgEdit(){
				this.orgEditDisabled = false;
				this.orgDetail = {...this.orgDetail}
				this.getRoleInfoList()
			},
			//获取角色信息
			getRoleInfoList(){
				this.$ajax.permission.getRoleInfoList({}).then(res=>{
					
					this.addRoleList=res.data
				})
			},
			//添加角色	
			addRole(){
				this.roleManagerList=this.editRoleList
				let that=this
				if(this.roleManagerList.length==0){
					this.roleManagerList.push({})
				}else{
					if(Object.keys(this.roleManagerList[this.roleManagerList.length-1]).length === 0){
						this.$message({
							type:'warning',
							message:'请选择要添加的角色'
						})
					}else{
					this.roleManagerList.push({})
					}
				}
			},
			//删除角色
			delRoles(row){
				this.roleManagerList.forEach((item,index)=>{
					if(item.id==row.id){
						this.roleManagerList.splice(index,1)
					}
				})
			},
			// 删除组织
			orgDelete(){
				this.$confirm('是否确定删除?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'danger'
				}).then(() => {
					this.$ajax.setting.deleteOrganizationInfo({
						params:{
							deptid:this.deptid
						}
					}).then(res =>{
						// this.orgEditBack()
						this.orgEditDisabled = true;
						this.getOrgTree()
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});          
				});
			},
			// 提交表单并验证
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						switch (formName){
							case 'addChildOrg':
								this.sendAddChildOrg()
								break;
							default:
								break;
						}
					}
				});
			},
			// 重置表单
			resetForm(formName) {
				if(this.$refs[formName]){
					this.$refs[formName].resetFields();
				}
			},
			// 添加组织表单发送
			sendAddChildOrg(){
				this.$ajax.permission.insertOrganizationInfo({
					params:this.addChildOrg
				}).then(res =>{
					this.getOrgTree() 
				})
				this.closeDialog('addChildOrg')
			},
			// 打开弹窗
			openDialog(name){
				this.dialog[name]= true
				this.resetForm('addChildOrg')
			},
			// 关闭弹窗
			closeDialog(name){
				this.dialog[name]= false
			},
			// 获取组织树
			getOrgTree() {
				this.$ajax.permission.getOrgTree({
					params:{
						status:0
					}
				}).then(res =>{
					this.tree = res.data
				})
			},
			// 点击获取节点
			handleNodeClick(data) {
				this.deptid = data.id;
				this.selectOrganizationInfo()
			},
			
			// 获取组织数详情信息
			selectOrganizationInfo(){
				this.$ajax.setting.selectOrganizationInfo({
					params: {
						deptid:this.deptid || 1
					}
				}).then(res => {
			
					if(res.state===1000){
						this.orgDetail = res.data.organizationInfo;
						this.addChildOrg.parentId = this.orgDetail.id;
						this.addChildOrg.parentCode=this.orgDetail.deptNum
						this.addChildOrg.level = this.orgDetail.level + 1;
						let arr=res.data.pageInfo.list.filter(item=>{
							return item!=null
						})
						this.roleManagerList=arr
						this.editRoleList=JSON.parse(JSON.stringify(arr))
					}
					// this.getPermissionTree()
					// this.getRoleManagerList()
				})
			},
			// 分页切换
			// pageChange(page) {
			// 	this.getRoleManagerList()
			// },
			// 获取权限树
			// getPermissionTree() {
			// 	this.$ajax.setting.getPermissionTree({
			// 		params:{
			// 			deptid:this.deptid
			// 		}
			// 	}).then(res =>{
			// 		if(res.data){
			// 			this.permissionTree = res.data.tree;
			// 			this.permissionTreeCheckeds = res.data.treeCheckeds;
			// 		}
			// 	})
			// },
			// 获取角色列表
			getRoleManagerList(){
				this.$ajax.setting.getRoleManagerList({
					params: {
						deptid:this.deptid
					},
					transform:{
						optime:{
							timeFormat:'yyyy-MM-dd hh:mm'
						}
					}
				}).then(res =>{
					this.roleManagerList = res.data.list
				})
			},
		},
		mounted() {
			this.getOrgTree()
		}
	};
</script>

<style>
	.user-detail-img {
		width: 160px;
		height: 160px;
		border: 1px solid rgba(209, 219, 229, 1);
	}
	.el-tag{
        cursor: pointer;
    }
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
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
	
	.el-tree-node:focus>.el-tree-node__content{
		background:rgba(64,158,255,0.2)!important;
	}
</style>
