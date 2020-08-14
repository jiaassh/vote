<template>
    <div class="content">
        <div class="card" v-for="(item,index) in cardData" :key="index" :class="{spacing:index!=0}">
            <div class="title">{{item.title}}</div>
            <div class="text">{{item.text}}</div>
        </div>
    </div>
</template>
<script>

export default {
    data(){
        return {
            cardData:[
                {
                    title:'1、基本信息',
                    text:'投票标题，时间，简介'
                },
                 {
                    title:'2、选项信息',
                    text:'投票选项名称，编导，介绍'
                },
                {
                    title:'3、投票设置',
                    text:'设置页面样式和投票规则'
                },
                 {
                    title:'4、发布投票',
                    text:'投票发布设置'
                }
            ]
        }
    },
    props:{
        activeIndex:{
            type:Number,
            default:()=>{
                return 0
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.content{
    display: flex;
}
.spacing{
    margin-left:20px;
}
.card{
    width:200px;
    height: 90px;
    border-radius: 10px;
    border:1px solid #ccc;
    padding:20px 10px;
    box-sizing: border-box;
    font-size: 14px;
    .title{
        font-weight: bold;
    }
    .text{
        margin-top:10px;
        padding-left:20px
    }
}
</style>