<template>
  <el-row style="margin: 12px" >
    <el-col :span="24" :style="singleStyle" ref="target">
      <h2 style="margin: 16px 0 0 16px;" >{{ props.modelValue.name }}</h2>
      <div style="margin: 10px 0 0 16px; padding-right: 100px; min-height: 32px">
        {{ props.modelValue.description }} 
      </div>
      <div
        v-show="!isOutside||isMobile().value"
        style="margin-top: 16px; display: flex; justify-content: center;"
      >
 
          <el-button-group>
            <el-button
              type="primary" v-if="!isMobile().value"
              @click="emitAction('design')"
              v-data-auth:edit="props.modelValue"
              >{{ $t('_.components.appManager.single.design') }}</el-button
            >
            <el-button type="success" @click="emitAction('launch')" >{{ $t('_.components.appManager.single.launch') }}</el-button>
            <el-button
              type="default" v-if="!isMobile().value"
              @click="emitAction('edit')"
              v-data-auth:edit="props.modelValue"
              >{{$t('_.components.appManager.single.setting')}}</el-button
            >
            <el-button
              type="danger" v-if="!isMobile().value"
              @click="emitAction('delete')"
              v-data-auth:del="props.modelValue"
              >{{$t('_._.del')}}</el-button
            >
            <DataAuthButton type="warning"  v-if="!isMobile().value" :data="props.modelValue" resource="app" />
          </el-button-group>

      </div>
    </el-col>
    <div style="position: absolute; top: 40px; right: 40px">
      <lcIcon :icon="modelValue.icon" size="4em"> </lcIcon>
    </div>
  </el-row>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMouseInElement } from '@vueuse/core'
import { generateRandomColor } from '@/utils/tools'
import lcIcon from '@/components/icon/index.vue'
import DataAuthButton from '@/components/auth/DataAuthButton.vue'
import {isMobile} from '../../../utils/tools'
//
const target = ref(null)
const { isOutside } = useMouseInElement(target)

//
let props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})
//const emit = defineEmits(["update:modelValue"])
const emit = defineEmits<{
  (e: 'action', type: string, app: object): void
}>()
//
const singleStyle = computed(() => {
  return {
    height: '160px',
    'border-radius': '4px',
    'background-color': props.modelValue.color || generateRandomColor()
  }
})

function emitAction(type: string) {
  emit('action', type, props.modelValue)
}
</script>

<style scoped></style>
