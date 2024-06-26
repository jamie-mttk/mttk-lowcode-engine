<template>
  <el-row style="margin: 12px">
    <el-col :span="24" :style="singleStyle" ref="target">
      <h2 style="margin: 16px 0 0 16px;height:32px;">{{ props.modelValue.name }}</h2>
      <div style="overflow: hidden;margin: 10px 0 0 16px; padding-right: 100px; height:42px;">
        {{ props.modelValue.description }}
      </div>
      <div v-if="isMobile().value" style="margin-top: 16px; display: flex; justify-content: center">
        <el-button type="primary"  text bg @click="emitAction('launch')" style="width: 70%">{{
          $t('_.components.appManager.single.launch')
        }}</el-button>
      </div>
      <div
        v-else
       v-show="!isOutside"
        style="margin-top: 16px; display: flex; justify-content: center"
      >
        <el-button-group>
          <el-button
            type="primary" style="padding:5px 8px"
            @click="emitAction('design')"
            v-data-auth:edit="props.modelValue"
            >{{ $t('_.components.appManager.single.design') }}</el-button
          >
          <el-button type="success" style="padding:5px 8px" @click="emitAction('launch')">{{
            $t('_.components.appManager.single.launch')
          }}</el-button>
          <el-button
            type="default" style="padding:5px 8px"
            @click="emitAction('edit')"
            v-data-auth:edit="props.modelValue"
            >{{ $t('_.components.appManager.single.setting') }}</el-button
          >
          <el-button
            type="danger" style="padding:5px 8px"
            @click="emitAction('delete')"
            v-data-auth:del="props.modelValue"
            >{{ $t('_._.del') }}</el-button
          >
          <DataAuthButton
            type="warning" 
            :data="props.modelValue"
            resource="app"
          >
         
          </DataAuthButton>
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
import { isMobile } from '../../../utils/tools'
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
