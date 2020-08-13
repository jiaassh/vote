
import base from '../base';//公共
const {pageDataUrl} = base;
export default {
    moduleUrl:'cjcc/location/',
    api:[
        {
            //查询位置树信息
            name:'locationTree',
            url:'locationTree.do',
            resShowSuccessMsg:false,
        },
        {//新增位置
            name: 'addLocation',
            url: 'addLocation.do'
        },{//编辑位置
            name: 'editLocation',
            url: 'editLocation.do'
        },{//位置详情
            name: 'locationDetail',
            url: 'locationDetail.do',
            resShowSuccessMsg:false,
        },{//删除位置
            name: 'deleteLocation',
            url: 'deleteLocation.do'
        },
        {
            name:'selectLocationTree',
            url:'selectLocationTree.do',
            resShowSuccessMsg:false,

        }
    ]
}