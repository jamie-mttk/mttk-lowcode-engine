<template>
  <el-table :data="tableData" border>
    <el-table-column prop="key" :label="$t('_._.key')" />
    <el-table-column prop="description" :label="$t('_._.description')" />
    <el-table-column fixed="right" :label="$t('_._.operation')" width="220px">
      <template #default="sp">
        <el-button-group>
          <el-button type="primary" @click="handleAdd()">{{ $t('_._.add') }}</el-button>
          <el-button type="success" @click="handleEdit(sp)">{{ $t('_._.edit') }}</el-button>
          <el-button type="danger" @click="handleDelete(sp)">{{ $t('_._.del') }}</el-button>

        </el-button-group>
      </template>
    </el-table-column>
    <template #empty>
      <el-button type="primary" @click="handleAdd()">{{ $t('_._.add') }}</el-button> 
    </template>
  </el-table>

  <MethodEditorDialog ref="methodEditorDialogRef"></MethodEditorDialog>
</template>

<script lang="ts" setup>
import { ref, computed, inject } from 'vue'
import { ElMessageBox } from 'element-plus'
import MethodEditorDialog from './MethodEditorDialog.vue'
import { deepCopy } from '@/utils/tools'
import {t} from '@/lang/index'

//Refer to the popup dialog
const methodEditorDialogRef = ref()

//The row index editing
let editingIndex = -1
//
const context = inject('context')
//
function handleAdd() {
  editingIndex = -1
  //
  methodEditorDialogRef.value.show({
    paras: [{
      "key": "contextWrap",
      "type": "Object"
    }], code: ''
  }, callback)
}
function handleEdit(sp) {
  editingIndex = sp.$index
  //Deep copy to avoid form to change the table data directly
  const rowCopied = deepCopy(sp.row)
  methodEditorDialogRef.value.show(rowCopied, callback)
}

const callback = (dataNew: Object) => {
  if (editingIndex < 0) {
    //add
    tableData.value.push(dataNew)
  } else {
    //edit
    tableData.value[editingIndex] = dataNew
  }
}
//Delete
const handleDelete = (sp) => {
  ElMessageBox.confirm(
    t('_.builtIn.plugin.methodEditor.deletePrompt'),
    t('_._.warning'),
    {
      confirmButtonText: t('_._.yes'),
      cancelButtonText: t('_._.no'),
      type: 'warning',
    }
  )
    .then(() => {
      //
      tableData.value.splice(sp.$index, 1);
    })

}

//table data
const tableData = computed(() => {
  return context.codeManager.getCode().methods
})


</script>
