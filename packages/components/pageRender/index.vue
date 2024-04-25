<template>
  <MttkWrapComp :config="pageConfig"></MttkWrapComp>
</template>

<script setup lang="ts">
import lcWrap from '@/components/wrap/index.vue'
import { useWindowSize  } from '@vueuse/core'
import { computed, provide } from 'vue'

//
const props = defineProps({
  context: {
    type: Object,
    required: true,
    default() {
      return {}
    }
  }
})
//
provide('context', props.context)
//
const pageConfig = computed(() => {
  if (!props.context.codeManager.getCode().ui) {
    return { '~': 'div', '#': 'No source code available' }
  }

  // console.log('calculate with'+JSON.stringify(props.context.codeManager.getCode(),null,2))
  const lifecycles = computed(() => {
    const lifecycle = props.context.codeManager.getCode().lifecycle
    if (!lifecycle || !Array.isArray(lifecycle) || lifecycle.length == 0) {
      return {}
    }
    //
    const result = {}
    for (const lc of lifecycle) {
      //so far only script is supported
      const mode = lc.mode || 'script'

      if (mode == 'script') {
        appendLifeCycle(result, lc.key, function () {
          return props.context.methodManager.scriptCall({ code: lc.code })
        })
      } else if (mode == 'method') {
        appendLifeCycle(result, lc.key, function () {
          return props.context.methodManager.methodCall({ method: lc.method })
        })
      } else {
        throw new Error('Unsuported lifecyle mode:' + lc.mode)
      }
    }
    //
    return result
  })
  //
  //  console.log('!!!!!!!!!!!!', JSON.stringify(props.context.codeManager.getCode().ui[0]))
  //
  const code = props.context.codeManager.getCode()
  let config = {
    '~component': lcWrap,
    modelValue: code.ui[0],

    // pageContext: props.context,
    // jamie:'I am '+props.context.test
    ...lifecycles.value
  }

  //
  trySetStyle(config, code)

  // console.log(config)
  // console.log(JSON.stringify(config))
  //
  //  try{
  // throw new Error('TEST ME')
  //  }catch(err){
  //   console.log(err)
  //  }
  //

  //
  return config
})
//
function trySetStyle(config, code) {
  //Only need to set if render mode is NOT absolute
  if (code.renderMode != 'absolute') {
    return
  }
  //
  const width = code.settingAbsolute?.width || 1920
  const height = code.settingAbsolute?.height || 1080
  //calculate scaleValue
  let scaleX = 1
  let scaleY = 1
  if (props.context.mode.value == 'edit') {
    scaleX = (code.settingAbsolute?.zoom || 100) / 100
    scaleY = scaleX
  } else {
    //View mode
    const scale = tryCalScale(config, code, { width, height })
    if (scale) {
      scaleX = scale.scaleX || 1
      scaleY = scale.scaleY || 1
    }
    //

  }

  //
  if (scaleX == 1 && scaleY == 1) {
    //No need to zoom
    config.style = {
      width: width + 'px',
      height: height + 'px'
    }
  } else {
    //Zoom
    config.style = {
      width: width + 'px',
      height: height + 'px',
      'transform-origin': '0 0',
      transform: 'scale(' + scaleX + ',' + scaleY + ')'
    }
    //Here we wrap a DIV since the sapce in DOM is still kept after transform
    config = {
      '~': 'div',
      style: {
        width: width * scaleX + 'px',
        height: height * scaleY + 'px',
        overflow: 'hidden'
      },
      '#': config
    }
  }
}
//
function tryCalScale(config, code, { width, height }) {
  const zoomMode = code.settingAbsolute?.zoomMode||'none'
  if (!zoomMode || zoomMode == 'none') {
    //no need to scale
    return undefined
  }
  //view main area bounding
  const viewMain=getViewMain()
  //full screen
  const { width:widthFull, height:heightFull } = useWindowSize()
  //calculate the main area's max possible width and height
  //-1 is to fix the precision issue to avoid scroll bar showing
  const widthMax=widthFull.value-(viewMain?.left||0)-1
  const heightMax=heightFull.value-(viewMain?.top||0)-1
  //
let scaleX=1
let scaleY=1
if(zoomMode=='zoom-width'){
  scaleX= widthMax/width
  scaleY=scaleX
}

if(zoomMode=='zoom-height'){
  scaleY=heightMax/height
  scaleX=scaleY
}
if(zoomMode=='zoom-both'){
  scaleX= widthMax/width
  scaleY=heightMax/height
}
// console.log(viewMain,widthFull.value,heightFull.value,widthMax,heightMax,'@@@@', width, height,'###', { scaleX, scaleY })
  //
  return { scaleX, scaleY }
}
//return lcViewMainArea's bounding 
function getViewMain() {
  //Get view main area
  const element = document.querySelector('#lcViewMainArea')
  if (!element) {
    return undefined
  }
  //
  return element.getBoundingClientRect()
}
//append to lifecyle list
function appendLifeCycle(result, key, func) {
  const keyReal = '^' + key
  if (!result[keyReal]) {
    result[keyReal] = []
  }
  result[keyReal].push(func)
}
</script>
<style lang="scss"></style>
