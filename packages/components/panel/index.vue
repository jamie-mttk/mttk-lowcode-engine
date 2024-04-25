<script setup lang="ts">
import { onMounted, inject } from 'vue'
import FlexCanvas from './flex/FlexCanvas.vue'
import DraggableCanvas from './absolute/DraggableCanvas.vue'

//
const model = defineModel({ type: Array, default: [] })
const context = inject('context')
//
onMounted(() => {
  //Prevent firefox to open new page once item is dropped
  document.body.ondrop = function (event) {
    event.preventDefault()
    event.stopPropagation()
  }
})
//
// const emit=defineEmits(['componentChoosed'])
</script>

<template>

  <FlexCanvas
    v-if="context.componentManager.renderMode.value == 'flex'"
    v-bind="$attrs"
    v-model="model" >

  </FlexCanvas>
  <DraggableCanvas
    v-else
    v-bind="$attrs"
    v-model="model"
  >
  </DraggableCanvas>

</template>

<style lang="scss" scoped>

</style>
