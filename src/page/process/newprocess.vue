<template>
  <div id="progress">
    <!-- 内容区 -->

    <!-- 新建流程目录 -->
    <div class="column-content">
      <div class="column-content-header wp-100">
        <div class="header-title">新增投票</div>
      </div>
      <!-- 步骤卡片 -->
      <progressCard></progressCard>
      <!-- 新增投票表单 基本信息 -->
      <addVoteForm></addVoteForm>
       <!-- 新增投票 选项信息 -->
      <optionInfo></optionInfo>
  </div>
  </div>
</template>

<script>
import progressCard from "@/components/progressCard";
import addVoteForm from "@/components/addVote/addVoteForm"
import optionInfo from '@/components/addVote/optionInfo'
export default {
  data() {
    return {
      
    };
  },
  components: {
    progressCard,
    addVoteForm,
    optionInfo
  },
  methods:{
    goNext(){

    },
    change(val) {
      console.log(val)
      this.ruleForm.remark = val
    },
  }
};
</script>
<style lang="scss">
.limit{
  display: flex;
  align-items: center;
  
}
.mg-top-10{
  margin-top:10px;
}
</style>