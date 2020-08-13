<!-- 系统设置 - 角色管理 -->

<template>
	<div>
		<!-- 右侧内容 -->
		<div class="column-main wp-100">

			<!-- 搜索区 -->
			<div class="column-search">
				<!-- 折叠面板 -->
				<el-collapse v-model="showSearchIndex" accordion @change="showSearchBox">
					<el-collapse-item name="1">
						<!-- 搜索栏标题 -->
						<template slot="title">
                            <div class="column-search-title" >查询条件</div>
                            <span class="column-search-icon iconfont" 
                                  :class="{'icon-xingzhuang':showSearchHidden,'icon-xingzhuang1':!showSearchHidden}"></span>
                        </template>
						<!-- 搜索栏表单 -->
						<!-- 搜索栏表单 -->
						<div class="column-search-form">
							<el-form ref="searchForm" :model="searchForm" label-width="96px" :inline="true" >
								<!-- 每行 -->

                    			<el-form-item label="角色编号" prop="rnum">
											<el-input v-model="searchForm.rnum" placeholder="请输入" class="w-340"></el-input>
										</el-form-item>
										<el-form-item label="角色名称" prop="rname">
											<el-input v-model="searchForm.rname" placeholder="请输入" class="w-340"></el-input>
										</el-form-item>

								<!-- 每行 -->
								<el-row class="column-search-btn">
									<el-col :offset="1">
										<el-button type="primary" @click="submitForm('searchForm')" :disabled="secDisabled" :loading="secDisabled">查询</el-button>
										<el-button @click="resetForm('searchForm')">重置</el-button>
									</el-col>
								</el-row>
							</el-form>
						</div>
					</el-collapse-item>
				</el-collapse>
			</div>
		</div>

		<!-- 内容区 -->
		<div class="column-content">
			<div class="column-content-header wp-100">
				<div class="header-title">
					查询结果列表
				</div>
				<div class="header-handle">
					<el-button type="primary" @click="handleCURD('add')" v-if="$store.state.buttonOptControl.CC00022">新增</el-button>
				</div>
			</div>
			<div class="column-content-table">
				<template>
					<el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">

						<el-table-column label="序号" type="index" width="50">
						</el-table-column>
						<el-table-column prop="rolenum" label="角色编号">
							<template slot-scope="scope">{{ scope.row.rolenum }}</template>
						</el-table-column>
						<el-table-column prop="rolename" label="角色名称">
							<template slot-scope="scope">
								<span @click="handleCURD('detail',scope.row)" class="href">{{ scope.row.rolename }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="opname" label="最近修改人">
							<template slot-scope="scope">{{ scope.row.opname }}</template>
						</el-table-column>
						<el-table-column prop="optimeFormat" label="修改时间">
							<template slot-scope="scope">{{ scope.row.optimeFormat|timeFormat}}</template>
						</el-table-column>
						<el-table-column prop="remark" label="备注">
							<template slot-scope="scope">{{ scope.row.remark }}</template>
						</el-table-column>
						<el-table-column prop="address" label="操作列">
							<template slot-scope="scope">
								<el-tag type="primary" @click="handleCURD('edit',scope.row)" v-if="$store.state.buttonOptControl.CC00024">
									编辑
								</el-tag>
								<el-tag class="mgl-20" type="danger" @click="tableDelete(scope.row)" v-if="$store.state.buttonOptControl.CC00023">
									删除
								</el-tag>
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

<script>
	export default {
		data() {
			return {
				showSearchIndex: '1', //折叠面板下标
				showSearchHidden: false, //折叠面板
				searchForm: {
				  rname: null,
				  rnum:null,
					pageNo: 1,
					pageSize:10,
                    propertyId: parseInt(localStorage.getItem("defaultPropertyID")), //项目id

				}, //搜索表单
				secDisabled: false, //查询按钮
				tableData: [], //表格数据
				total: 0, //总数
				roleDetail: {}, //角色详情
			}
		},
		methods: {
			// 折叠面板
			showSearchBox() {
				this.showSearchHidden = !this.showSearchHidden
			},
			// 提交表单
			submitForm() {
				this.searchForm.pageNo=1
				this.getTableData()
			},
			// 重置表单
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			// 获取表格数据
			getTableData() {
				this.secDisabled = true ;
				this.$ajax.permission.getRoleManagerList({
					params: this.searchForm,
					transform:{
						optime:{
							timeFormat:'yyyy-MM-dd HH:mm'
						}
					}
				}).then(res =>{
					if(this.secDisabled == true){
						this.secDisabled=false
					}
					if(res.success){
						this.tableData = res.data.list
						this.total = res.data.total
					}
				})
			},
			// 获取角色名称
			tableDetail(row) {
				this.$ajax.permission.getRoleInfoById({
					params: {
						rid: row.id
					}
				}).then(res =>{
					this.roleDetail = res.data
				})
			},
			// 表格编辑
			tableEdit(row) {
				console.log(row);
			},
			// 表格删除
			tableDelete(row) {
				this.$confirm('确认删除？').then(_ => {
					this.$ajax.permission.deleteRoleInfo({
						params: {
							rid: row.id
						}
					}).then(res=>{
						this.getTableData();
					})
					done();
				}).catch(_ => {});
			},
			// 分页切换
			pageChange(page) {
				this.searchForm.pageNo = page;
				this.getTableData();
			},
			// 去新增页面
			 handleCURD(type,data = {}){
				const { id } = data;
				const params = { id,type }
				
				this.$router.push({
					name:'roleEdit',
					params
				});
			}
		},
		mounted() {
			this.getTableData()
		}
	}
</script>

<style>
	.column-content table tbody tr{
		min-height: 70px;
		height:40px!important;
	}
</style>
