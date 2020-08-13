import Component from 'vue-class-component'

Component.registerHooks([
 'beforeRouteEnter',
 'beforeRouteLeave',
 'beforeRouteUpdate'     
])

import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js';// 路由
import './plugins/element.js';
import '@/assets/css/iconfont.css';
import '@/assets/css/public.css';
import '@/assets/css/project.css';
import '@/assets/sass/base.scss';
import '@/assets/css/iconfontCC.css';

import vueConfig from './vueConfig';
vueConfig(Vue,App,router)
import Print from '@/plugins/print.js'
Vue.use(Print) // 注册


import ElementUI, { Message } from 'element-ui'

// ...

// 为了实现Class的私有属性
const showMessage = Symbol('showMessage')
/** 
 *  重写ElementUI的Message
 *  single默认值true，因为项目需求，默认只弹出一个，可以根据实际需要设置
 */
class DonMessage {
  success (options, single = true) {
    this[showMessage]('success', options, single)
  }
  warning (options, single = true) {
    this[showMessage]('warning', options, single)
  }
  info (options, single = true) {
    this[showMessage]('info', options, single)
  }
  error (options, single = true) {
    this[showMessage]('error', options, single)
  }

  [showMessage] (type, options, single) {
    if (single) {
      // 判断是否已存在Message
      if (document.getElementsByClassName('el-message').length === 0) {
        Message[type](options)
      }
    } else {
      Message[type](options)
    }
  }
}

// ... 

Vue.use(ElementUI)
// 命名根据需要，DonMessage只是在文章中使用
Vue.prototype.$messageonly = new DonMessage()