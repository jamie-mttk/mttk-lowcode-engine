<template>
  <el-container style="height: 100%"  class="page-designer-main">
    <el-header style="padding: 0px; margin: 0; height: 40px">
      <MttkWrapComp :config="configTop"></MttkWrapComp>
    </el-header>
    <!-- <Transition  
      mode="out-in"
      name="custom-classes"
      enter-active-class=" page_enter"
      leave-active-class=" page_leave"
    > --> 
    <div ref="previewPageRenderRef" id="lcViewMainArea" style="margin-top:2px">
      <el-container v-if="isEditMode">
        <el-aside width="auto">
          <!-- <MttkWrapComp :config="configLeft"></MttkWrapComp> -->
          <ToolbarLeft style="margin-top:2px;"></ToolbarLeft>
        </el-aside>
        <el-main style="padding: 0 0 0 8px;">
          <MttkWrapComp :config="configMain"></MttkWrapComp>
        </el-main>
      </el-container>
      <el-row v-else style="height:100%;">
        <el-col :span="24" style="max-height:100vh;overflow-y: auto;">
          <PageRender :context="context" ></PageRender>
        </el-col>
      </el-row>
    </div>
    <!-- </Transition> -->
  </el-container>
</template>

<script setup lang="ts">
import PageRender from '../pageRender/index.vue'
import { ref,computed, watch,provide, inject } from 'vue'
import { useFullscreen } from '@vueuse/core'
import ToolbarLeft from './ToolbarLeft.vue'

import createContext from '@/context/pageContext/index'
import { buildTop } from './buildTop'

import { buildMain } from './buildMain'

//
const props = defineProps({
  //modelValue is source code
  modelValue: {
    type: Object,
    required: true,
    default() {
      return {}
    }
  }
})

//
//return  - Return to application edit UI
//save    - Save button is called
const emit = defineEmits(['action'])
//

//
const appContext = inject('appContext')
//Create and provide context
const context = createContext('edit', appContext)
provide('context', context)
//
context.mitt.on('action', function (detail) {
  emit('action', detail)
})

//whether it is edit mode
const isEditMode = computed(() => context.mode.value == 'edit')
//Set code once props is changed
watch(
  () => props.modelValue,
  () => {
    context.codeManager.setCode(props.modelValue)
  },
  { immediate: true }
)
//
const configTop = buildTop(context)
// const configLeft = buildLeft(context)
const configMain = buildMain(context)
//
const previewPageRenderRef=ref()
const { isFullscreen, enter,  } = useFullscreen(previewPageRenderRef)
context.mitt.on('previewFullSCreen',()=>{

  enter()
})
watch(isFullscreen, (value) => {
  if(!value){
    //Once full scren preview is done, change to edit mode
    context.mode.value = 'edit'
  }
})
//
</script>
<style lang="scss">
// .max-tab-height {
//   .el-tabs {
//     height: 100%;
//   }

//   .el-tabs__content {
//     height: calc(100% - 40px);

//     .el-tab-pane {
//       height: 100%;
//     }
//   }
// }

.el-affix {
  height: 100%;
}

.el-affix > div {
  height: 100%;
}

.page_enter {
  //animation-delay: 10s;
  animation: zoomInUp;
  animation-duration: 0.5s;
}

.page_leave {
  animation: zoomOutDown;
  animation-duration: 0.2s;
}

//Remove the tabs top line below
.page-designer-main {
  .el-tabs__nav-wrap::after {
    /* Hide the line under tabs top */
    height: 0px !important;
  }
}
</style>
