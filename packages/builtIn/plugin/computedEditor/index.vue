<template>
  <el-table :data="tableData" border >
    <el-table-column  prop="key" :label=" $t('_._.key')"  />
    <el-table-column prop="description" :label=" $t('_._.description')" />
    <el-table-column fixed="right" :label=" $t('_._.operation')" width="280px">
      <template #default="sp">
        <el-button-group>
        <el-button  type="primary" @click="handleAdd()">{{ $t('_._.add') }}</el-button>
        <el-button  type="success" @click="handleEdit(sp)">{{ $t('_._.edit') }}</el-button>
        <el-button  type="danger" @click="handleDelete(sp)">{{ $t('_._.del') }}</el-button>
        <el-button  type="success" @click="handleCurrentValue(sp)">{{ $t('_.builtIn.plugin.computedEditor.value') }}</el-button>
        </el-button-group>
      </template>
    </el-table-column>
    <template #empty>
      <el-button  type="primary" @click="handleAdd()">{{ $t('_._.add') }}</el-button> 
      </template>
  </el-table>
 
  <ComputedEditorDialog ref="computedEditorDialogRef"></ComputedEditorDialog>
  <ComputedValueDialog ref="computedValueDialogRef"></ComputedValueDialog>

</template>

<script lang="ts" setup>
import {ref,computed,inject} from 'vue'
import { ElMessageBox } from 'element-plus'
import ComputedEditorDialog from './ComputedEditorDialog.vue'
import ComputedValueDialog from './ComputedValueDialog.vue'

import {deepCopy} from '@/utils/tools'
import {t} from '@/lang/index'
//Refer to the popup dialog
const computedEditorDialogRef=ref()
const computedValueDialogRef=ref()
//The row index editing
let editingIndex=-1
//
const context = inject('context')
//
function handleAdd(){
  editingIndex=-1
   //
   computedEditorDialogRef.value.show({code:'',codeSet:''},callback)
}
function handleEdit(sp){
  editingIndex=sp.$index
  //Deep copy to avoid form to change the table data directly
  const rowCopied=deepCopy(sp.row)
  computedEditorDialogRef.value.show(rowCopied,callback)
}

const callback=(dataNew:Object)=>{
  if(editingIndex<0){
    //add
    tableData.value.push(dataNew)
  }else{
    //edit
    tableData.value[editingIndex]=dataNew
    //
    context.computedManager.clear(dataNew.key)
  }
}
//Delete
const handleDelete = (sp) => {
  ElMessageBox.confirm(
    t('_.builtIn.plugin.computedEditor.deletePrompt'),
    t('_._.warning'),
    {
      confirmButtonText: t('_._.yes'),
      cancelButtonText: t('_._.no'),
      type: 'warning',
    }
  )
    .then(() => {
     //
     tableData.value.splice(sp.$index,1);
     //Remove from data manager
     context.computedManager.reset(sp.row.key)
    })

}

//current Value 
const handleCurrentValue = (sp) => {
  computedValueDialogRef.value.show(sp.row)
}
//table data
const tableData=computed(()=>{
  return context.codeManager.getCode().computed
})


</script>
