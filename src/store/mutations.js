export default {
    setButtonOptControl(state, key) {   
        state.buttonOptControl[key] = true;
    }, 
    processTypeList(state,key){   //流程类型列表
        state.processTypeList=key.value
      },
      addshowtype(state,key){   //是否显示目录还是流程类型，显示哪种流程类型
        state.addshowtype=key.value
    },
    documentTitle(state,key){   //公文传输（输入值时改变state）
        state.addOfficialform=key.value
    },
    addfunds(state,key){  //申请经费（输入值时改变state）
        console.log(state,key,'addfunds========')
        state.fundsform=key.value
    },
    maintenance(state,key){  //维修申请（输入值时改变state）
        console.log(state,key,'maintenance========')
        state.maintenance=key.value
    },
    faultLocationList(state,key){   //维修地址列表
        state.faultLocationList=key.value
    },
    meeting(state,key){   //申请会议室（输入值时改变state）
        console.log(state,key,'meeting========')
        state.meeting=key.value
    },
    meetingRoomList(state,key){   //会议室列表
        state.meetingRoomList=key.value
    },
    selectProcessordialogVisiblemu(state,key){  //选择人员的弹框是否显示
        state.selectProcessordialogVisible=key.value
    },
    setjoinUser(state,key){  //选中的人员列表
        state.joinUser=key.value;
    },
    selecttimedialogFormVisiblemu(state,key){
        state.selecttimedialogFormVisible=key.value
    },
    fathersonmu(state,key){//在新建页面，判断调用时间选择的是父组件还是子组件
      state.fatherson=key.value;
    },
    setissubmit(state,key){    //是否点击提交按钮
        // console.log(state,key,'setissubmit')
        state.issubmit=key.value;
    },
    setisvalid(state,key){
        // console.log(state,key,'setisvalid')
        state.isvalid=key.value
    },
    setmeetingSelectTime(state,key){
        state.meetingSelectTime=key.value;
    },
    setbaocun(state,key){
        state.isbaocun=key.value;
    }
    
}