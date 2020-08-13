export default {
    buttonOptControl: {
        CC00004: true,
        CC00005: true,
        CC00006: true,
        CC00007: true,
        CC00053: true,
        CC00008: true,
        CC00009: true,
        CC00010: true,
        CC00011: true,
        CC00012: true,
        CC00013: true,
        CC00014: true,
        CC00015: true,
        CC00016: true,
        CC00017: true,
        CC00018: true,
        CC00019: true,
        CC00020: true,
        CC00021: true,
        CC00022: true,
        CC00023: true,
        CC00024: true,
        CC00025: true,
        CC00026: true,
        CC00027: true,
        CC00028: true,
        CC00029: true,
        CC00030: true,
        CC00031: true,
        CC00032: true,
        CC00033: true,
        CC00034: true,
        CC00035: true,
        CC00036: true,
        CC00037: true,
        CC00038: true,
        CC00039: true,
        CC00040: true,
        CC00056: true,
        CC00057: true,
        CC00058: true,
        CC00059: true,
        CC00060: true,

    },
    addOfficialform: {  //新增公文传输
        completionDate: '',
        documentTitle: "",
        documentContent: '',
        documentRemark: ''
    },
    fundsform: {  //新增经费申请
        requiredDate: "",
        applyMoney: "",
        purpose: "",
        remark: "",
        processTypeId: "",
        processTypeName:"",

        leadAudit: '',
        leadRemark: '',
        financePrincipalAudit: '',
        financePrincipalRemark: '',
        principalAudit: '',
        principalRemark: '',
        financeAudit: '',
        financeRemark: '',
        
    },
    maintenance: {  //新增维修申请
        processTypeId: "",
        processTypeName:"",
        faultCode: '',
        faultTablet: "",
        faultRemark: "",
        deviceName: "",
        faultTime: "",
        remark: "",
        repairContent: '',
        applyUserEvaluate: '',
        repairUserEvaluate: '',
        repairUser:'',
        repairOrganization:''
    },
    meeting: {
        processTypeId: "",
        remark:'',
        meetingTheme: '',
        meetingRoomId: '',
        meetingRoomName:'',
        meetingTypeCode: '',
        meetingStartTime: '',
        meetingEndTime: '',
        joinUser: '',
        auditStatus: '',
        approvalStatus: '',
        status: '',
        meetingTime:'',
        processTypeName:"",
        auditRemark:''
    },
    processTypeList: [],  // 流程类别
    addshowtype: 'menu',//显示目录还是四种新增的流程类型     
    faultLocationList: [],//故障地点列表
    meetingRoomList:[],//会议室列表
    selectProcessordialogVisible:false,//选择人员弹框是否显示
    joinUser:[],//选中的人员列表
    selecttimedialogFormVisible:false,//选择时间弹框是否显示
    fatherson:'',//在新建页面，判断调用时间选择的是父组件还是子组件
    issubmit:false,//是否点击了提交按钮
    isvalid:false,//四个流程的表单验证
    meetingSelectTime:[],//选择会议室之后，获取会议室使用情况，传给选择时间组件
    isbaocun:false,//流程是否是保存
}