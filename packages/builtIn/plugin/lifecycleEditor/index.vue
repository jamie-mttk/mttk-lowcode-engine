<template>
  <el-table :data="tableData" border >
    <el-table-column  prop="key" :label="$t('_.builtIn.plugin.lifecycleEditor.key')"  />
    <el-table-column fixed="right" :label="$t('_._.operation')" width="280px">
      <template #default="sp">
        <el-button-group>
        <el-button  type="primary" @click="handleAdd()">{{ $t('_._.add') }}</el-button>
        <el-button  type="success" @click="handleEdit(sp)">{{ $t('_._.edit') }}</el-button>
        <el-button  type="danger" @click="handleDelete(sp)">{{ $t('_._.del') }}</el-button>
        </el-button-group>
      </template>
    </el-table-column>
    <template #empty>
      <el-button  type="primary" @click="handleAdd()">{{ $t('_._.add') }}</el-button> 
      </template>
  </el-table>
 
  <LifecycleEditorDialog ref="lifecycleEditorDialogRef"></LifecycleEditorDialog>


</template>

<script lang="ts" setup>
import {ref,computed,inject} from 'vue'
import { ElMessageBox } from 'element-plus'
import LifecycleEditorDialog from './LifecycleEditorDialog.vue'
import {deepCopy} from '@/utils/tools'
import {t} from '@/lang/index'
//Refer to the popup dialog
const lifecycleEditorDialogRef=ref()

//The row index editing
let editingIndex=-1
//
const context = inject('context')
//
function handleAdd(){
  editingIndex=-1
   //
   lifecycleEditorDialogRef.value.show({mode:'script',code:''},callback)
}
function handleEdit(sp){
  editingIndex=sp.$index
  //Deep copy to avoid form to change the table data directly
  const rowCopied=deepCopy(sp.row)
  lifecycleEditorDialogRef.value.show(rowCopied,callback)
}

const callback=(dataNew:Object)=>{
  if(editingIndex<0){
    //add
    tableData.value.push(dataNew)
  }else{
    //edit
    tableData.value[editingIndex]=dataNew
  }
}
//Delete
const handleDelete = (sp) => {
  ElMessageBox.confirm(
    t('_.builtIn.plugin.lifecycleEditor.deletePrompt'),
    t('_._.warning'),
    {
      confirmButtonText: t('_._.yes'),
      cancelButtonText:t('_._.no'),
      type: 'warning',
    }
  )
    .then(() => {
     //
     tableData.value.splice(sp.$index,1);
    })

}

//table data
const tableData=computed(()=>{
  return context.codeManager.getCode().lifecycle
})


</script>
