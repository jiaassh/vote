
import base from '../base';//公共
const {pageDataUrl} = base;
export default {
    moduleUrl:'company/',
    api:[
        {
            //查询运营信息
            name:'selectInfoById',
            url:'selectInfoById.do',
            resShowSuccessMsg: false
        },
        {
            //编辑运营消息
            name:'updateOperationInfo',
            url: 'updateOperationInfo.do',
        }
    ]
}