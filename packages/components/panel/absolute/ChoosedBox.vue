<template>
  <div
    class="choosed-box choosed-box-absolute"
    :style="choosedBoxStyle"
    @mousedown.prevent.stop="triggerMove"
  >

    <!-- Draw the resize points of the current item -->
    <div @mousedown.stop="trggerResize('resize-lt')" class="resize-icon resize-left-top"></div>
    <div @mousedown.stop="trggerResize('resize-lc')" class="resize-icon resize-left-center"></div>
    <div @mousedown.stop="trggerResize('resize-lb')" class="resize-icon resize-left-bottom"></div>
    <div @mousedown.stop="trggerResize('resize-rt')" class="resize-icon resize-right-top"></div>
    <div @mousedown.stop="trggerResize('resize-rc')" class="resize-icon resize-right-center"></div>
    <div @mousedown.stop="trggerResize('resize-rb')" class="resize-icon resize-right-bottom"></div>
    <div @mousedown.stop="trggerResize('resize-ct')" class="resize-icon resize-center-top"></div>
    <div @mousedown.stop="trggerResize('resize-cb')" class="resize-icon resize-center-bottom"></div>
  </div>
</template>
<script lang="ts" setup>
import { computed, inject ,} from 'vue'
import useResizeAndMove from '../resizeAndMove/useResizeAndMove'
// import {createUniqueString} from '@/utils/tools'
//
const props=defineProps(['modelValue'])
//
const { choosed, triggerMove, trggerResize, handleMouseMove, trggerDone, choosedBounding,isThisPanelChoosed } =useResizeAndMove(props.modelValue)
//
const context = inject('context')

//
const choosedBoxStyle = computed(() => {
  // console.log(choosed.value,isThisPanelChoosed(props.modelValue),unref(props.modelValue))
  if (
    context.mode.value == 'view' ||
    !choosed.value ||
    choosed.value.type == '_container' ||
    choosed.value.type == undefined||
    !isThisPanelChoosed()
  ) {
    return { display: 'none' }
  }

  //
  const result = {} as any
  //top
  result.top = choosed.value.config?.display?.style?.top || '0px'
  //left
  result.left = choosed.value.config?.display?.style?.left || '0px'
  //width
  if (choosed.value.config?.display?.style?.width) {
    result.width = choosed.value.config.display.style.width
  } else {
    //Try to get the choosed component real size
    result.width = (choosedBounding?.value?.width?.value || 32) + 'px'
  }
  //height
  if (choosed.value.config?.display?.style?.height) {
    result.height = choosed.value.config.display.style.height
  } else {
    //Try to get the choosed component real size
    result.height = (choosedBounding?.value?.height?.value || 32) + 'px'
  }
  //z
  //DO NOT NEED TO SET z-index since it will be set a fixed value 998
  // result['z-index'] = 9999
  // console.log('########', choosed.value.type, choosed.value, JSON.stringify(result))
  //
  return result
})
//
// const val = createUniqueString()
//
defineExpose({ handleMouseMove, trggerDone, triggerMove })
</script>

<style lang="scss" scoped>
@import '../resizeAndMove/resizeAndMove.scss';

.choosed-box-absolute {
  position: absolute;
}
</style>
