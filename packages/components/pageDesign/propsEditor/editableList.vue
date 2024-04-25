<template>
  <div style="width: 100%">
    <div v-if="mode == 'list'">
      <VueDraggable tag="ul" v-model="model" class="list-group" handle=".handle" item-key="key">
        <li class="list-group-item" v-for="(item, index) in model" :key="item.key">
          <div class="list-group-item-inside">
            <lc-icon
              class="handle"
              icon="mdiDialpad"
              style="height: 32px; padding-top: 2px; margin-right: 8px"
            ></lc-icon>
            <span class="content">{{ evalLabelColumn(item) }} </span>
            <el-button @click="edit(index)">
              <template #icon
                ><lc-icon class="operation" icon="mdiNoteEditOutline"></lc-icon
              ></template>
            </el-button>
            <el-button text @click="remove(index)">
              <template #icon>
                <lc-icon class="operation" icon="mdiCloseCircleOutline"></lc-icon
              ></template>
            </el-button>
          </div>
        </li>
      </VueDraggable>
      <el-button style=" margin-top: 6px;width:100%;" @click="add">
        <template #icon>
          <lc-icon icon="mdiPlus"></lc-icon>
        </template>
       {{ $t('_._.add') }}</el-button
      >
    </div>
    <div v-if="mode != 'list'">
      <el-page-header
        :title="$t('_._.back')"
        @back="goBack"
        style="padding: 10px; background-color: var(--el-fill-color-extra-light)"
      >
        <template #icon>
          <lc-icon icon="mdiArrowLeft"></lc-icon>
        </template>
        <MttkWrapComp
          :config="editorConfigTranformed"
          style="margin: 4px"
          ref="tableEditor"
        ></MttkWrapComp>
      </el-page-header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,  onMounted, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

import { formTransform } from './formTransform'
import { createUniqueString, deepCopy } from '@/utils/tools'
//
const model = defineModel({ type: Array })

//
let props = defineProps({
  labelColumn: {
    type: String,
    required: true
  },
  init: {
    type: Object,
    required: false
  },
  editConfig: {
    type: [Object, Function],
    required: true,
    default() {
      return {}
    }
  }
})

//界面模式 list:表格列表方式  edit:编辑模式 //add:增加模式
const mode = ref('list')
watch(
  () => props.editConfig,
  () => {
    //Once component selection is changed,return to list mode
    mode.value = 'list'
  }
)

//当前编辑的数据
let editingData = ref({})
//Refer to the form to edit detail data
let tableEditor = ref(null)
//
onMounted(() => {
  document.body.ondrop = function (event) {
    event.preventDefault()
    event.stopPropagation()
  }
})
//Eval the column label
function evalLabelColumn(element) {
  if (typeof props.labelColumn == 'function') {
    return props.labelColumn(element)
  } else {
    return element[props.labelColumn]
  }
}
//editor config tranformed
// const editorConfigTranformed = computed(() => {
//   return formTransform(props.editConfig, editingData)
// })
const editorConfigTranformed = formTransform(props.editConfig, editingData)
//
function add() {
  //
  const initValue=props.init?deepCopy(props.init):{}
  initValue.key=createUniqueString()
  //
  editingData.value =initValue
  //Here we push so the change will take affect immediately
  //on the other word, the change is saved if back button is not clicked
  model.value.push(editingData.value)
  //
  mode.value = 'add'
}
//
function remove(index: number) {
  model.value.splice(index, 1)
}
//
function edit(index: number) {
  editingData.value = model.value[index]
  //
  mode.value = 'edit'
}
//
function goBack() {
  //validate
  //console.log(tableEditor.value.getRef('tableEditor'))

  //  tableEditor.value.validate((valid, fields) => {
  //   if (valid) {
  //     console.log('submit!')
  //   } else {
  //     console.log('error submit!', fields)
  //   }
  // })
  //
  if ('add' == mode.value) {
    //already pushed during add
    // 
  } else {
    //edit
    //Do nothing since data is already updated
  }

  //
  mode.value = 'list'
}
</script>

<style scoped>
.list-group {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin:0;
}

.list-group-item {
  display: block;
  width: 100%;
  padding: 0.75rem 0;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.list-group-item-inside {
  display: flex;
}

.handle {
  flex: 0 0 48px;
  cursor: move;
  height: 24px;
  margin-right: 8px;
  padding-top: 20px;
}

.operation {
  flex: 0 0 48px;
  height: 20px;
}

.content {
  flex: 1 1 auto;
}
</style>
