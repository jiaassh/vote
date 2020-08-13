import base from '../base';//公共
const {pageDataUrl} = base;

export default {
    moduleUrl: 'cjcc/property/',
    api: [
        {
            //查询企业列表页
            name:'propertyList',
            url: 'propertyList.do' ,
            resShowSuccessMsg: false
        },
        {
            //新增项目
            name: 'addProperty',
            url: 'addProperty.do',
            resShowSuccessMsg: true,
        },
        {
            //根据id查看详情
            name: 'propertyById',
            url: 'propertyById.do',
            resShowSuccessMsg: false,
        },
        {
            //编辑项目
            name: 'updateProperty',
            url: 'updateProperty.do',
            resShowSuccessMsg: false
        }
    ]
}