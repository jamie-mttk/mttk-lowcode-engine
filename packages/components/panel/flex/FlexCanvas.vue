<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
// import { generateRandomColor } from '@/utils/tools'
import lcWrap from '../../wrap/index.vue'
import useDropDetect from '../dropDetect'
import ChoosedBox from './ChoosedBox.vue'
import { isItemChoosed } from '../PanelUtil'
//
//
const model = defineModel({ type: Array, default: [] })
//
const context = inject('context')
//
const isEditMode = computed(() => context.mode.value == 'edit')
//
// const showTips = computed(() => {
//   return !(model.value && model.value.length > 0) && context.mode.value == 'edit'
// })
const dragDisabled = computed(() => {
  if (context.mode.value != 'edit') {
    // console.log('false','because of edit')
    return true
  }

  //
  return false
})
//
const { detecting, clearDetect, droppingClass } = useDropDetect(context)
function handleDrop(event) {
  //
  clearDetect()
  //Try to choose the dropped component
  let index = event.newIndex
  //console.log('handleDrop',arguments,index,props.modelValue.length)

  //Maybe it is a  bug of SortableJS, the first time drop in ,the index=1 and length are 1, in fact the index should be 0
  if (index == 1 && model.value.length == 1) {
    index = 0
  }
  //
  if (index == undefined || index >= model.value.length) {
    return
  }

  context.choosedManager.set(model.value[index])
}
//
//  const emit=defineEmits(['componentChoosed'])   @click="emit('componentChoosed')"
</script>

<template>
  <!-- filter=".draggable-header"     draggable=".draggable-item" -->
  <VueDraggable
    :disabled="dragDisabled"
    v-bind="$attrs"
    v-model="model"
    :group="{ name: 'components', pull: true, put: true }"
    class="wrap-group"
    :class="[
      isEditMode && !droppingClass ? 'wrap-group-edit' : '',
      droppingClass ? droppingClass : ''
    ]"
    @add="handleDrop"
    @change="detecting"
    :animation="150"
  >
    <!-- <div class="draggable-header" v-if="showTips">
      Please drag the component from pallet to drop here 
    </div> -->

    <lcWrap
      v-for="item in model"
      :key="item.key"
      class="draggable-item"
      :modelValue="item"
      :class="{ 'choosed-wrap': isItemChoosed(context, item) }"
    ></lcWrap>
  </VueDraggable>
  <ChoosedBox ref="choosedBoxRef" :modelValue="model"></ChoosedBox>
</template>

<style lang="scss" scoped>
.wrap-group {
  // 
  width: 100%;
  height: 100%;
  // background-color: red;

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  // .draggable-header {
  //   // min-height: 24px;
  //   width: 100%;

  //   background-color: var(--el-fill-color-lighter);
  //   margin: 1px;
  // }

  //   background-color: #00ffff;
  // border: 1px groove #E0E0E0;
  .draggable-item {
    min-height: 32px;
  }

  //set z-index to 999 once it is choosed!
  .choosed-wrap {
    //once choosed,set z-index to 999 so it will display at top
    z-index: 999;
  }
}
.wrap-group-edit {
  // outline: var(--el-color-success) dashed 1px;
  //
  outline: var(--el-color-white) solid 1px;
  min-height: 32px;
}

// .wrap-group:hovor {
//  // border: 1px solid #ff0000;
// }

// .component-ghost{
//   background-color: #00ffff;
//   border: 1px solid #ff0000;
// }
</style>
