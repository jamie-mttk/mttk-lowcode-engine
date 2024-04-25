//Basic needed for app launch project and page designer
//
import { defineAsyncComponent, } from 'vue'
//
import MttkVueWrap from 'mttk-vue-wrap'
//
import createGlobalContext from '@/context/globalContext/index'
//Element PLUS
import ElementPlus from 'element-plus'
 import 'element-plus/dist/index.css'
//
import './styles/main.scss'
//
//import 'animate.css'
//
import { installI18n } from '@/lang/index'
import { initPermission } from '@/utils/permission'

//
export function installBasis(app,router?,  option?) {
    //MttkVueWrap install
    app.use(MttkVueWrap)
  //Create global context
  const globalContext = createGlobalContext(option?.url || '', app, router)
  app.provide('globalContext', globalContext)
  //Element plus install
  app.use(ElementPlus, { size: 'default' })
  //i18n
  installI18n(globalContext)
  //
  initPermission(globalContext)
  //
  app.component(
    'lc-icon',
    defineAsyncComponent(() => import('@/components/icon/index.vue'))
  )

  //
  return { globalContext }
}

