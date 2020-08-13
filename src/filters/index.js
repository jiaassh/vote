var filter;
import helper from '@/assets/js/ajax/helper.js'
export default filter = {
    //
    timeFormat(val) {
        if (val == '' || val == null) {
            return '-'
        } else {
            return val
        }
    },
    //流程紧急程度
    urgencyStatusTransform(val) {
        switch (val) {
            case 0:
                return '正常';
            case 1:
                return '紧急';
            case 2:
                return "重要"
            default:
                return '';
        }
    },
    planTransform(val) {  //审核
        switch (val) {
            case 1:
                return '计划内';
            case 0:
                return '计划外';

            default:
                return '';
        }
    },
    //会议室状态
    meetingTransform(val) {
        switch (val) {
            case 0:
                return '停用';
            case 1:
                return '启用';
            default:
                return '';
        }
    },
    //审批类型code
    businessTypeTransform(val) {
        switch (val) {
            case 'DOCUMENT_TRANSMISSION':
                return '公文传输流程';
            case 'FUND_APPLICATION':
                return '经费申请流程';
            case 'REPAIR_APPLICATION':
                return '维修申请流程';
            case 'MEETING_APPLICATION':
                return '会议室申请流程'

            default:
                return ''
        }
    },
    //人事状态
    aduitStatusTransform(val) {
        switch (val) {
            case 'NOT_VIEWED':
                return '未查看';
            case "VIEWED":
                return '已查看';
            case 'SUBMITTED':
                return '已提交'
            case 'INVALID':
                return '未查看'
            default:
                return ''
        }
    },
    //阿拉伯数字转成中文
    toChinesNum(num) {
        let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
        let unit = ["", "十", "百", "千", "万"];
        num = parseInt(num);
        let getWan = (temp) => {
            let strArr = temp.toString().split("").reverse();
            let newNum = "";
            for (var i = 0; i < strArr.length; i++) {
                newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
            }
            return newNum;
        }
        let overWan = Math.floor(num / 10000);
        let noWan = num % 10000;
        if (noWan.toString().length < 4) noWan = "0" + noWan;
        return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
    },

    //时间戳转换成天小时分钟秒
    formatDuring(mss) {
        var days = parseInt(mss / (1000 * 60 * 60 * 24));
        var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = ((mss % (1000 * 60)) / 1000).toFixed(0);
        var result = '';
        if (seconds > 0) {
            result = "" + parseInt(seconds) + "秒";
        }
        if (minutes > 0) {
            result = "" + parseInt(minutes) + "分" + result;
        }
        if (hours > 0) {
            result = "" + parseInt(hours) + "小时" + result;
        }
        if (days > 0) {
            result = "" + parseInt(days) + "天" + result;
        }
        return result;

    },
    //仪表状态
    statusTran(val) {
        if (val == 0) {
            return '执行中'
        } else if (val == 1) {
            return '已完成'
        } else {
            return '-'
        }
    },
    //评价
    EvaluateTran(val) {
        if (val === 0) {
            return '满意'
        } else if (val === 1) {
            return '基本满意'
        }
        else if (val === 2) {
            return '不满意'
        }
        else {
            return ''
        }
    },
    auditStatusTran(val) {
        console.log(val)
        if (val === 1) {
            return '拒绝'
        } else if (val === 0) {
            return '同意'
        } else {
            return ''
        }
    },
    //月度报表小图标
    witchIcon(val) {
        switch (val) {
            case 0:
                return 'nochange';
            case 1:
                return 'up';
            case 2:
                return 'down';
            default:
                return 'nochange'
        }
    },
    timeTrans(val) {
        if (val) {
            return helper.timeFormat(val, 'yyyy-MM-dd HH:mm')
        } else {
            return '-'
        }
    },
    toFixedIt(val) {
        let res = ''
        if (val !== null && val !== '') {
            res = val.toFixed(2);
        }
        return res;
    }
}