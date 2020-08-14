<template>
  <div>
    <div class="column-content-header wp-100">
      <div class="header-title">基本信息</div>
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="160px"
      class="demo-ruleForm"
    >
      <el-form-item label="投票标题" prop="title">
        <el-input v-model="ruleForm.title" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="投票开始时间" prop="startTime">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="ruleForm.startTime"
          style="width:400px"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="投票结束时间" prop="endTime">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="ruleForm.endTime"
          style="width:400px"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="开启报名" prop="isOpen">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="ruleForm.isOpen"
          style="width:400px"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="报名开始时间" prop="applyStartTime">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="ruleForm.applyStartTime"
          style="width:400px"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="报名结束时间" prop="applyEndTime">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="ruleForm.applyEndTime"
          style="width:400px"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="封面文件大小限制">
        <div class="limit">
          <div>上传图片大小不超过</div>
          <el-input v-model="ruleForm.imgLimitSize" style="width:100px"></el-input>
          <div>（设置范围：1~10M）</div>
        </div>
        <div class="limit mg-top-10">
          <div>上传视频大小不超过</div>
          <el-input v-model="ruleForm.videoLimitSize" style="width:100px"></el-input>
          <div>（设置范围：1~150M）</div>
        </div>
        <div class="limit mg-top-10">
          <div>上传音频大小不超过</div>
          <el-input v-model="ruleForm.audioLimitSize" style="width:100px"></el-input>
          <div>（设置范围：1~50M）</div>
        </div>
      </el-form-item>
      <el-form-item label="投票说明" required>
        <div style="width:820px">
          <editor-bar v-model="detail" :isClear="isClear" @change="change"></editor-bar>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button type="primary" @click="goNext()">下一步</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import EditorBar from '@/components/editor'
export default {
  data() {
    return {
      rules: {
        title: [{ required: true, message: "请输入投票标题", trigger: "blur" }],
        startTime: [
          { required: true, message: "请选择投票开始时间", trigger: "change" },
        ],
        endTime: [
          { required: true, message: "请选择投票结束时间", trigger: "change" },
        ],
        isOpen: [
          { required: true, message: "请选择是否开启报名", trigger: "change" },
        ],
        applyStartTime: [
          { required: true, message: "请选择报名开始时间", trigger: "change" },
        ],
        applyEndTime: [
          { required: true, message: "请选择报名结束时间", trigger: "change" },
        ],
      },
      ruleForm: {
        title: "",
        startTime: "",
        endTime: "",
        isOpen: "",
        applyStartTime: "",
        applyEndTime: "",
        imgLimitSize: "",
        videoLimitSize: "",
        audioLimitSize: "",
        remark: "",
      },
      isClear: false,
      detail: "",
    };
  },
  components:{
       EditorBar
  }
};
</script>
<style lang="scss" scoped>
</style>