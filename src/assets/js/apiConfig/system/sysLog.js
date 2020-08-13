
import base from '../base';//公共
const {pageDataUrl} = base;
export default {
    moduleUrl:'cjcc/sysLog/',
    api:[
        {
            //操作日志管理列表
            name:'getSysLogList',
            url:'getSysLogList.do',
            resShowSuccessMsg:false,
        },
        {
            //导出-操作日志信息列表
            name:'importSysLogExcle',
            url:'importSysLogExcle.do',

        }
    ]
}