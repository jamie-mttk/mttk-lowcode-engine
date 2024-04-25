<script setup lang="ts">
import { inject } from 'vue'
import { ElMessageBox } from 'element-plus'
import buildCompEditor from './buildCompEditor'
import {t} from '@/lang/index'


const emit = defineEmits(['narrow'])
//
function handleNarrow() {
  emit('narrow')
}
//
const context = inject('context')
//
const { canBeDelete, configTitle, compEditor } = buildCompEditor(context)

//
function handleDelete() {
  //
  ElMessageBox.confirm(t('_.components.pageDesign.propsEditor.deletePrompt'), t('_._.confirm'), {
    confirmButtonText: t('_._.yes'),
    cancelButtonText: t('_._.no'),
    type: 'warning'
  }).then(() => {
    //
    const choosed = context.choosedManager.get()
    if (!choosed || !choosed.key) {
      return
    }
    //
    context.componentManager.del(choosed.key)
    //
    context.choosedManager.set(undefined)
  })
}
//
function handleDuplicate() {
  //
  ElMessageBox.confirm(t('_.components.pageDesign.propsEditor.duplicatePrompt'),t('_._.confirm'), {
    confirmButtonText: t('_._.yes'),
    cancelButtonText: t('_._.no'),
    type: 'warning'
  }).then(() => {
    //
    const choosed = context.choosedManager.get()
    if (!choosed || !choosed.key) {
      return
    }
    //
    const controllerNew = context.componentManager.duplicate(choosed.key)
    //
    context.choosedManager.set(controllerNew)
  })
}

// //Add a scrollbar so the basic can be displayed even if it is very high
// const sc_height = ref('640px')
// calScHeight()
// window.onresize = function () {
//     calScHeight()
// }
// function calScHeight(){
//     sc_height.value = (window.innerHeight - 320) + 'px'
// }
</script>

<template>

    <el-card shadow="never" style="min-width: 320px;margin-top:4px;margin-left:4px;margin-right:4px;height:calc(100% - 6px);">
      <template #header>
        <div class="card-header">
          <span>
            <span class="card-title">{{ configTitle }}</span>
            <el-button-group>
              <el-button type="warning" size="small" v-if="canBeDelete" @click="handleDuplicate">
                <template #icon>
                  <lc-icon icon="mdiContentCopy"></lc-icon>
                </template>
              </el-button>
              <el-button type="danger" size="small" v-if="canBeDelete" @click="handleDelete">
                <template #icon>
                  <lc-icon icon="mdiTrashCanOutline"></lc-icon>
                </template>
              </el-button>
            </el-button-group>
       
          </span>
          <el-button size="small" @click="handleNarrow">
            <template #icon>
              <lc-icon icon="mdiMenuRightOutline" size="x-large"></lc-icon>
            </template>
          </el-button>
        </div>
      </template>
      <div vFullHeight="32">
        
      <MttkWrapComp :config="compEditor"></MttkWrapComp>
      </div>
    </el-card>

</template>

<style scoped>

:deep(.el-card__header){
   padding: 12px 20px 12px 12px; 
}
:deep(.el-card__body){
  margin: 0 0 0 4px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 1.1em;
  margin-right: 10px;
}
</style>
