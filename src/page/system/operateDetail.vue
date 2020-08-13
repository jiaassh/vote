<template>
	<div>
		<div class="column-main wp-100 ">
			<div class="column-content ">
				<div class="column-left-title pdt-20" style="padding-left: 0;">
					企业信息
				</div>
				<el-form ref="operate" :model="operate" :rules="rules" label-width="130px">
					<el-row>
						<el-col :span="8">
							<el-form-item label="企业名称" prop="operateName">
								<el-input v-model="operate.operateName" :value="operate.operateName" :disabled="notEdit"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="企业编号" prop="operateNum">
								<el-input v-model="operate.operateNum" :value="operate.operateNum" :disabled="notEdit"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-row>
							<el-col :span="8">
								<el-form-item label="简称" prop="descName">
									<el-input v-model="operate.descName" :value="operate.descName" :disabled="notEdit"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label="联系人" prop="contact">
								<el-input v-model="operate.contact" :value="operate.contact" :disabled="notEdit"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="联系电话" prop="telephone">
								<el-input v-model="operate.telephone" :value="operate.telephone" :disabled="notEdit"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="16">
							<el-form-item label="地址" prop="address">
								<el-input v-model="operate.address" :value="operate.address" :disabled="notEdit"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label="电子邮箱" prop="email">
								<el-input v-model="operate.email" :value="operate.email" :disabled="notEdit"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="统一社会信用代码" prop="creditNum">
								<el-input v-model="operate.creditNum" :value="operate.creditNum" :disabled="notEdit"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="16">
							<el-form-item label="网址" prop="website">
								<el-input v-model="operate.website" :value="operate.website" :disabled="notEdit"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label="最后修改人" >
								<el-input v-model="operate.opname" :value="operate.opname" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="修改时间"  >
								<el-input v-model="operate.optime" :value="operate.optime" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label="企业logo">
								<div class="logo-big" v-if="notEdit">
									<img :src="operate.url" alt="" class="avatar-big">
								</div>
								<div v-else>
									<el-upload class="avatar-uploader" 
									:action="uploadImgApi" 
									:show-file-list="false" 
									:on-success="handleAvatarSuccessForBig"
									:before-upload="checkImgSize">
										<img v-if="operate.url" :src="operate.url" class="avatar-big">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="8" v-if="!notEdit">
							<!-- <el-form-item label="用途示例">
								<div>
									<img src="@/assets/image/exp-logo-big.png" alt="" class="avatar-big">
								</div>
								<div class="img-disc">
									<div>1、图片用于后台导航左上角logo展示</div>
									<div>2、上传图片最佳尺寸为140×50px </div>
									<div>3、您可以上传1张本地白色的.png格式图片文件，大小不超过10M</div>
								</div>
							</el-form-item> -->
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label="菜单缩起logo">
								<div class="logo-mini" v-if="notEdit">
									<img :src="operate.menuurl" alt="" class="avatar-mini">
								</div>
								<div v-else>
									<el-upload class="avatar-uploader" 
									:action="uploadImgApi" 
									:show-file-list="false" 
									:on-success="handleAvatarSuccessForMini"
									:before-upload="checkImgSize">
										<img v-if="operate.menuurl" :src="operate.menuurl" class="avatar-mini">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="8" v-if="!notEdit">
							<!-- <el-form-item label="用途示例">
								<div>
									<img src="@/assets/image/exp-logo-mini.png" class="avatar-mini">
								</div>
								<div class="img-disc">
									<div>1、图片用于后台导航左上角logo展示</div>
									<div>2、上传图片最佳尺寸为50×50px </div>
									<div>3、您可以上传1张本地白色的.png格式图片文件，大小不超过10M</div>
								</div>
							</el-form-item> -->
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="16" > 
							<el-form-item label="企业简介" prop="introduce">
								<el-input v-model="operate.introduce" type="textarea" :rows="2" placeholder="请输入内容" maxlength="150" :disabled="notEdit">
								</el-input>   
							</el-form-item>
						</el-col>
					</el-row>
					<el-row v-if="notEdit">
						<el-col :span="24">
							<div  class="t-center">
								<el-button type="primary" @click="setCanEditForm()" v-if="$store.state.buttonOptControl.CC00030">编辑</el-button>
							</div>
						</el-col>
					</el-row>
					<el-row v-else>
						<el-col :span="24">
							<div class="t-center">
								<el-button type="primary" @click="submitForm('operate')">保存</el-button>
								<el-button @click="resetForm('operate')">重置</el-button>
								<el-button @click="cancelEdit()">取消</el-button>
							</div>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			let isMobileNumber= (rule, value, callback) => {
			   if (!value) {
			        return new Error("请输入电话号码");
			      } else {
			        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
			        const isPhone = reg.test(value);
			        value = Number(value); //转换为数字
			        if (typeof value === "number" && !isNaN(value)) {//判断是否为数字
			        value = value.toString(); //转换成字符串
			          if (value.length < 0 || value.length > 12 || !isPhone) { //判断是否为11位手机号
			            callback(new Error("手机号码格式不正确"));
			          } else {
			            callback();
			          }
			        } else {
			          callback(new Error("请输入电话号码"));
			        }
			      }
			    };
			
			return {
				showSearchIndex: '1', //折叠面板下标
				showSearchHidden: false, //折叠面板
				operate: {}, //搜索表单
				notEdit: true, //可否编辑
				imgBigUrl: '',
				imgMiniUrl: '',
				imageUrl: '', //上传图片返回的路径
				uploadImgApi: '',
				rules:{
					operateName: [
						{ required: true, message: '请输入运营名称', trigger: 'blur' },
						{ max: 50, message: '最大填写50个字符', trigger: 'blur' }
					],
					operateNum: [
						{ required: true, message: '请输入编号', trigger: 'blur' },
						{ max: 50, message: '最大填写50个字符', trigger: 'blur' }
					],
					descName: [
						{ required: true, message: '请输入简称', trigger: 'blur' },
						{ max: 50, message: '最大填写50个字符', trigger: 'blur' }
					],
					contact: [
						{ required: true, message: '请输入联系人', trigger: 'blur' },
						{ max: 50, message: '最大填写50个字符', trigger: 'blur' }
					],
					telephone: [
						{ required: true, message: '请输入联系电话', trigger: 'blur' },
						{ validator: isMobileNumber, trigger: "blur" }
					],
					address: [
						{ required: true, message: '请输入地址', trigger: 'blur' },
						{ max: 200, message: '最大填写200个字符', trigger: 'blur' }
					],
				}
			}
		},
		methods: {
			// 放开表单编辑
			setCanEditForm() {
				this.notEdit = false
			},
			// 取消编辑
			cancelEdit() {
				this.notEdit = true
				
				this.operateDetail()
			},
			// 提交表单
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.saveOperateEdit()
					}
				});
			},
			// 重置表单
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			// 提交编辑的数据
			saveOperateEdit() {
				let param=this.operate
				delete param.optime
				this.$ajax.operateDetail.updateOperationInfo({
					params: param
				}).then(res =>{
					// this.cancelEdit()
					this.$router.go(0)
				})
			},
			// 获取表格数据
			operateDetail() {
				this.$ajax.operateDetail.selectInfoById({
					params: {
						// id: 1
					}
				}).then(res =>{
					if(res.state===1000){
						let obj=res.data
						obj.optime=this.$helper.timeFormat(obj.optime,'yyyy-MM-dd HH:mm:ss')
						this.operate = obj;

					}
				})
			},
			// 上传操作
			handleAvatarSuccessForBig(res, file) {
				if (res.state == 1000) {
					this.operate.url = res.data.url
				}
			},
			// 上传操作
			handleAvatarSuccessForMini(res, file) {
				if (res.state == 1000) {
					this.operate.menuurl = res.data.url
				}
			},
			// 图片上传限制
			checkImgSize(file) {
				const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif');
				const isLt10M = file.size / 1024 / 1024 < 10;
				if (!isLt10M) {
					this.$message.error('上传图片大小不能超过 10MB!');
				}
				if(!isJPG){
					this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!');
				}
				return isLt10M&&isJPG;
			}
		},
		mounted() {
			this.operateDetail()
			this.uploadImgApi = this.$config.uploadImgApi;
		}
	}
</script>

<style>
	.logo-big,
	.logo-mini {
		background: #F5F7FA;
		border: 1px solid #E4E7ED;
		border-radius: 4px
	}

	.logo-big {
		width: 140px;
		height: 50px;
	}

	.logo-mini {
		width: 50px;
		height: 50px;
	}

	.img-disc {
		line-height: 20px;
		font-family: MicrosoftYaHei;
		color: rgba(72, 87, 106, 1);
		font-size: 14px;
	}
	.avatar-mini{
		height: 50px;
		width: 50px;
	}
	.avatar-big{
		height: 50px;
		width: 140px;
	}
	.avatar-uploader .el-upload{
		border-radius: 0!important;
	}

	.el-form-item__content{
		/* line-height: 0; */
	}
</style>
