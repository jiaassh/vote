<template>
  <div>
    <div class="column-content-header wp-100">
      <div class="header-title">选项信息</div>
      <div>
        <el-button type="primary">新增</el-button>
      </div>
    </div>
    <div class="content">
      <!-- 搜索栏表单 -->
      <div>
        <el-form ref="searchForm" :model="searchForm" label-width="96px" :inline="true">
          <!-- 每行 -->
          <el-form-item label="标题" prop="title" label-width="125px">
            <el-input style="width:340px" v-model="searchForm.title" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="流程名称" prop="businessType" label-width="125px">
            <el-select v-model="searchForm.businessType" placeholder="请选择" class="w-340">
              <el-option
                v-for="(item,index) in businessTypeArr"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建人" prop="createBy" label-width="125px">
            <el-input style="width:340px" v-model="searchForm.createBy" placeholder="请输入内容"></el-input>
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
      <div class="line"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {},
    };
  },
};
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  border: 1px solid #ccc;
  min-height: 300px;
  padding-top: 20px;
  
}
.line{
    width:100%;
    height:1px;
    padding:20px 0;
    border-bottom: 1px solid #ccc;
}
</style>