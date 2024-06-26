import { computed } from 'vue'
//Once use select this component
export function componentChoosed(context, event, item) {
  if (context.mode.value == 'view') {
    //under view mode ,it is not necessary to set choosed
    //and return here will make page widget can be choosed
    return
  }
  // if (event && event.stopPropagation) {
  //   try {
  //     //console.log('stopPropagation is called')
  //     event.stopPropagation()
  //   } catch (error) {
  //     console.log(error)
  //     //console.log(e.event.event.stopPropagation())
  //     //console.log(e.event.stop())
  //     //ignore
  //   }
  // }
  //
  // console.log('COMPONENT CHOOSED IS CALLED',props.modelValue)
  context.choosedManager.set(item, event.timeStamp)
}

//Whether the component is the one current choosed
export const isItemChoosed = computed(() => {
  return function (context, item) {
    // console.log('#########', item.key, context.choosedManager.get()?.key,( item.key == context.choosedManager.get()?.key))
    return context.mode.value == 'edit' && item.key == context.choosedManager.get()?.key
  }
})

import { deepCopy } from '@/utils/tools'
//Clone component for drag and drop
export function cloneComponent(context, component) {
  if (!component) {
    return
  }
  //
  if (typeof component == 'string') {
    //If it is string,try to find the component
    component = context.appContext.globalContext.componentRepository.componentByKey(component)
    if (!component) {
      return
    }
  }
  // console.log(arguments)
  //Create unique key
  const key = context.componentManager.createKey(component.key)
  const componentCloned = {
    key: key,
    type: component.key,
    config: buildConfigInit(component, { context, key })
  }
  //
  // lastComponent.value = componentCloned;
  //
  return componentCloned
}
// function buildInitConfig(component){
//   const initConfig=deepCopy(component.editor?.basic?.init) || {}
//   //If there are _container,add key
//   if(initConfig && initConfig['_container'] && Array.isArray(initConfig['_container']) && initConfig['_container'].length>0){
//     for(const c of initConfig.props['_container']){
//       if(!c.key){
//         //Set key if it is not present
//         c.key=createUniqueString()
//       }
//     }
//   }

//   //
//   return initConfig;
// }
function buildConfigInit(component, para) {
  const configInit = {}
  // //Please note the default value of basic/data/events/display is alreay set
  // //basic
  // configInit.basic = deepCopy(component.editor?.basic?.init) || {}
  // //data
  // configInit.data = deepCopy(component.editor?.data?.init) || {}
  // //event
  // configInit.event = deepCopy(component.editor?.event?.init) || []
  // //display
  // configInit.display = deepCopy(component.editor?.display?.init) || { style: {}, class: '' }
  // //Checker whether there are customized
  // for (const k of Object.keys(component.editor)) {
  //   if (k == 'basic' || k == 'data' || k == 'event' || k == 'display') {
  //     continue;
  //   }
  //   //Here the init value is set to {}
  //   configInit[k] = deepCopy(component.editor[k].init) || {}
  // }

  //Please note the default value of basic/data/events/display is alreay set
  //basic
  handleInitValue(component, para, configInit, 'basic', {})
  //data
  handleInitValue(component, para, configInit, 'data', {})
  //event
  handleInitValue(component, para, configInit, 'event', [])
  //display
  handleInitValue(component, para, configInit, 'display', { style: {}, class: '' })
  //Checker whether there are customized
  for (const k of Object.keys(component.editor)) {
    if (k == 'basic' || k == 'data' || k == 'event' || k == 'display') {
      continue
    }
    //Here the init value is set to {}
    handleInitValue(component, para, configInit, k, {})
  }

  //
  return configInit
}

function handleInitValue(component, para, configInit, key, defaultVal) {
  const result=handleInitValueCalculate(component, para,  key, defaultVal)
  configInit[key] = result
}
function handleInitValueCalculate(component, para,  key, defaultVal) {
  if (!component.editor || !component.editor[key] || !component.editor[key].init) {
    return defaultVal
  }
  // console.log(key,component.editor)
  let init = component.editor[key].init
  if (typeof init == 'function') {
    init = init(para)
  }
  if (!init) {
    return defaultVal
  }
  //That means it is event,return directly
  if (Array.isArray(init)) {
    return init
  }
  //

  const renderMode = para.context.renderMode.value || 'flex'
  const result = {}
  //
  for (const k of Object.keys(init)) {
    //key can be simple,like 'title' or complex 'caption.flex' which means it is only be append under flex mode
    const splited = k.split('.')
    const value = deepCopy(init[k])
    if (splited.length >= 2) {
      //complex
      if (renderMode == splited[1]) {
        result[splited[0]] = value
      }
    } else {
      //simple
      result[k] = value
    }
  }
  //
  return result;
}
