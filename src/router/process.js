export default [
  {
    path: '/process/newprocess',
    component: () => import('@/page/process/newprocess.vue'),
    meta: {
      title: '投票管理 / 新增投票'
    }
  },
  {
    path: '/process/processlist',
    component: () => import('@/page/process/processlist.vue'),
    meta: {
      title: '工作流程 / 待办事宜'
    }
  },
  {
    path: '/process/processconfig',
    component: () => import('@/page/process/processconfig.vue'),
    meta: {
      title: '工作流程 / 流程配置'
    }
  },
]