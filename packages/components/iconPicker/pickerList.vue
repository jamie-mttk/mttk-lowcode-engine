<template>
  <el-input
    v-model="filter"
    clearable
  >
    <template #append>
      <el-button-group>
        <el-button @click="emit('iconChoosed', undefined)">{{ $t('_._.clear') }}</el-button>
        <el-button @click="emit('closePopover')">{{ $t('_._.close') }}</el-button>
      </el-button-group>
    </template>
  </el-input>
  <!-- <el-scrollbar height="720px">
    <ul class="icon-list">
      <li  v-for="i in count" :key="i" class="icon-item">
        <PickerSingle :icon="icons[i]" @iconChoosed="emit('iconChoosed', icons[i])"></PickerSingle>
      </li>
    </ul>
  </el-scrollbar> -->
  <!-- <el-alert title="So far there is a bug" type="success"
            style="margin-bottom: 10px;" /> -->

  <!--Here we use v-infinite-scroll so only few controllers are created during startup to reduce load time-->
  <ul v-infinite-scroll="load" class="icon-list">
    <li v-for="i in Math.min(count,icons.length)" :key="i" class="icon-item">
      <PickerSingle
        :icon="icons[i - 1]"
        @iconChoosed="emit('iconChoosed', toLine(icons[i - 1]))"
      ></PickerSingle>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import * as mdi from '@mdi/js'
import PickerSingle from './pickerSingle.vue'
import { toLine } from '../icon/iconUtil'
//
//const emit = defineEmits(["update:modelValue"])
const emit = defineEmits<{
  (e: 'iconChoosed', value: string): void
  (e: 'closePopover'): void
}>()

//Store all the icons, so no need to load frequently
const iconsAll = ref([] as string[])
//
const filter = ref('')
//the icons to shown
const count = ref(0)
//Icons filtered from iconsAll
// const iconsFiltered = ref([] as string[])

const load = () => {

  count.value = Math.min(count.value + 60, icons.value.length)
  console.log('load is called'+count.value)
}


onMounted(()=>{
//Load all icons
let result = [] as string[]
for (const [key] of Object.entries(mdi)) {
  result.push(key)
}
iconsAll.value = result
})
// watch(
//   filter,
//   () => {
//     if (!filter.value) {
//       iconsFiltered.value = iconsAll.value
//     } else {
//       iconsFiltered.value = iconsAll.value.filter((icon) => {
//         //
//         return icon.toUpperCase().indexOf(filter.value.toUpperCase()) >= 0
//       })
//     }
//      console.log('watch runned:'+ iconsAll.value.length+'~~~'+ iconsFiltered.value.length+ '::'+count.value)
//     //The initial load can not trigger the infinite scroll untill you input some filter
//     count.value = Math.min(60, iconsFiltered.value.length)
//   },
//   {
//     immediate: false
//   }
// )

const icons = computed(() => {

  if (!filter.value) {
    return iconsAll.value
  }
  return iconsAll.value.filter((icon) => {
    //
    return icon.toUpperCase().indexOf(filter.value.toUpperCase()) >= 0
  })
})
//
function show(){

  load();
}
defineExpose({show})
</script>
<style scoped lang="scss">
.icon-list {
  height: 40vh;
  overflow-x: hidden;
  overflow-y: scroll;
  list-style: none;
  margin: 4px 0 0 0;
  padding: 0 !important;
  border-top: 1px solid var(--el-border-color);
  border-left: 1px solid var(--el-border-color);
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);

  .icon-item {
    width: 150px;
    text-align: center;
    color: var(--el-text-color-regular);
    height: 80px;
    font-size: 12px;
    border-right: 1px solid var(--el-border-color);
    border-bottom: 1px solid var(--el-border-color);
    transition: background-color var(--el-transition-duration);
  }
}
</style>
