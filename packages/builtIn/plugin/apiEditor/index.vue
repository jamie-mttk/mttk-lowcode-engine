<template>
  <el-table :data="tableData" border >
    <el-table-column  prop="key" :label="$t('_._.key')"  />
    <el-table-column prop="description" :label="$t('_._.description')" />
    <el-table-column prop="method" :label="$t('_.builtIn.plugin.apiEditor.data.method')" />
    <el-table-column prop="url" :label="$t('_.builtIn.plugin.apiEditor.data.url')" />
    <el-table-column fixed="right" :label="$t('_._.operation')" width="280px">
      <template #default="sp">
        <el-button-group>
        <el-button  type="primary" @click="handleAdd()">{{ $t('_._.add') }}</el-button>
        <el-button  type="success" @click="handleEdit(sp)">{{ $t('_._.edit') }}</el-button>
        <el-button  type="danger" @click="handleDelete(sp)">{{ $t('_._.del') }}</el-button>
        <el-button  type="warning" @click="handleCall(sp)">{{ $t('_.builtIn.plugin.apiEditor.call') }}</el-button>
        </el-button-group>
      </template>
    </el-table-column>
    <template #empty>
     <el-button  type="primary" @click="handleAdd()">{{ $t('_._.add') }}</el-button> 
      </template>
  </el-table>
 
  <ApiEditorDialog ref="apiEditorDialogRef"></ApiEditorDialog>

</template>

<script lang="ts" setup>
import {ref,computed,inject} from 'vue'
import { ElMessageBox,ElMessage } from 'element-plus'
import ApiEditorDialog from './ApiEditorDialog.vue'

import {deepCopy} from '@/utils/tools'
import {t} from '@/lang/index'
//Refer to the popup dialog
const apiEditorDialogRef=ref()
//
const context = inject('context')

//The row index editing
let editingIndex=-1
//
function handleAdd(){
  editingIndex=-1
   //
   apiEditorDialogRef.value.show({method:'GET',requestType:'none',responseMode:'none',},callback)
}
function handleEdit(sp){
  editingIndex=sp.$index
  //Deep copy to avoid form to change the table data directly
  const rowCopied=deepCopy(sp.row)
  apiEditorDialogRef.value.show(rowCopied,callback)
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
    t('_.builtIn.plugin.apiEditor.deletePrompt'),
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
    })

}
//Call
const handleCall = (sp) => {
  ElMessageBox.confirm(
    t('_.builtIn.plugin.apiEditor.callPrompt'),
    t('_._.warning'),
    {
      confirmButtonText: t('_._.yes'),
      cancelButtonText: t('_._.no'),
      type: 'warning',
    }
  )
    .then(() => {
     //
     context.apiManager.invoke(sp.row.key)
     //
     ElMessage({
    message: 'API is called.',
    type: 'success',
  })
    })

}
//table data
const tableData=computed(()=>{
  return context.codeManager.getCode().apis
})

</script>
