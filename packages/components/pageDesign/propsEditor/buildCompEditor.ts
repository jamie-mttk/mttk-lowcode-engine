import { ref,  computed, watch,  } from 'vue'
import {t} from '@/lang/index'


import {pageProps,promptMsg,buildInternal} from './buildCompEditorUti'
//build editor for component
export default function buildCompEditor(context) {
  
  const choosed=computed(()=>context.choosedManager.get())

  //Whether the component can be delte
  const canBeDelete = computed(() => {
    //
    return choosed.value && choosed.value.key && '_root' != choosed.value.key
  })
  //
  const isPageConfig=computed(()=>!choosed.value || !choosed.value.key||'_root' == choosed.value.key)
  //
  const configTitle = computed(() => {
    //
    if (isPageConfig.value) {
      return t('_.components.pageDesign.propsEditor.buildCompEditor.pageConfig')
    }
    //{ "key": "button215", "type": "button", "config": { "props": { "type": "primary" }, "slots": { "default": "Button3" } }, "data": {}, "event": [] }
    return choosed.value.key
  })
  //tab index to indicate which tab to show
  const tabIndex = ref('')
  //the UI description
  const compEditor = ref(pageProps(context))
//
//Add a scrollbar so the basic can be displayed even if it is very high
// const sc_height = ref('640px') 
// calScHeight()
// window.onresize = function () {
//     calScHeight()
// }
// function calScHeight(){
//     sc_height.value = (window.innerHeight - 320) + 'px' 
// }

  watch(
    () => choosed.value,
    () => {
      //
      // console.log('configBasic is calculated',choosed)
      // console.log(JSON.stringify(choosed))
      if (isPageConfig.value) {
        //
        compEditor.value = pageProps(context)
        return
        //return promptMsg('No component is choosed')
      }

      //{ "key": "button215", "type": "button", "config": { "props": { "type": "primary" }, "slots": { "default": "Button3" } }, "data": {}, "event": [] }
      const componentConfig = context.appContext.globalContext.componentRepository.componentByKey(choosed.value.type)
      if (!componentConfig) {
        compEditor.value = promptMsg(t('_.components.pageDesign.propsEditor.buildCompEditor.error1',[choosed.value.type]) )
        return
      }
      if (!componentConfig.editor) {
        compEditor.value = promptMsg(t('_.components.pageDesign.propsEditor.buildCompEditor.error2',[choosed.value.type]) )
        return
      }
      //
      buildInternal(choosed.value,context,componentConfig,compEditor,tabIndex)
    },
    {
      immediate: true
    }
  )

  
  //
  return {
    canBeDelete,
    configTitle,
    compEditor
  }
}
