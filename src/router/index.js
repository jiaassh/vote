
import common from './common';//公共模块：如登录等、
import process from './process';//流程管理
import system from './system';//系统设置


const routes = [
	...common,
	...system,
	...process,
]

export default routes
