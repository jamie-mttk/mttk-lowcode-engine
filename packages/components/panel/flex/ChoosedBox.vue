<script setup lang="ts">
import { computed, inject } from 'vue'

import useResizeAndMove from '../resizeAndMove/useResizeAndMove'
//
//
const props=defineProps(['modelValue'])
const { choosed, trggerResize, handleMouseMove, trggerDone, choosedBounding ,isThisPanelChoosed} = useResizeAndMove(props.modelValue)
//
const context = inject('context')
//
const choosedBoxStyle = computed(() => {

  if (
    context.mode.value == 'view' ||
    !choosed.value ||
    choosed.value.type == '_container' ||
    choosed.value.type == undefined|| !isThisPanelChoosed()
  ) {
    return { display: 'none' }
  }

  //
  const result = {
    top: choosedBounding.value.top.value + 'px',
    left: choosedBounding.value.left.value + 'px',
    width: choosedBounding.value.width.value + 'px',
    height: choosedBounding.value.height.value + 'px'
  }

  //
  return result
})


//
defineExpose({ handleMouseMove, trggerDone })
</script>
<template>
  <!--Teleport to body otherwise the choosed box will capture the mouse down event of the components inside child panel
  This will cause child component can not be choosed if it's parent container is choosed-->
  <Teleport to="body">
    <div class="choosed-box choosed-box-flex" :style="choosedBoxStyle" >
      <div
        @mousedown.stop="trggerResize('resize-cb')"
        class="resize-icon resize-center-bottom"
      ></div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
@import '../resizeAndMove/resizeAndMove.scss';

.choosed-box-flex {
  position: fixed;
}
</style>
