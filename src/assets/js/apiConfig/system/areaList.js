import base from '../base';//公共
const {pageDataUrl} = base;

export default {
    moduleUrl:'cjcc/area/',
    api:[
        {
            //查询区域管理列表
            name: 'getAreaInfoList',
            url: 'getAreaInfoList.do',
            resShowSuccessMsg: false,
            resDepthFieldUrl:pageDataUrl
        },
        {
            //新增区域
            name:'insertAreaInfo',
            url: 'insertAreaInfo.do',
        },
        {
            //根据id查询区域信息
            name: 'selectInfoById',
            url: 'selectInfoById.do' ,
            resShowSuccessMsg: false,
        },
        {
            //编辑更新区域信息
            name: 'updateAreaInfo',
            url: 'updateAreaInfo.do',
        },
        {
            //企业设置-区域列表排序操作
            name: 'areaSort',
            url: 'areaSort.do',
        },
        {
            name:'getAreaName',
            url:'getAreaName.do',
            resShowSuccessMsg: false,
        }
    ]
}