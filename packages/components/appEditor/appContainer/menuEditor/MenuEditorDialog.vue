<template>
    <el-dialog v-model="dialogVisible" :destroy-on-close="true" width="35%" :title="$t('_.components.appEditor.menuEditor.menuEditorDialog.title')" :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form ref="dataEditorFormRef" :model="formData"  label-width="120px">
            <el-form-item :label="$t('_._.name')"  prop="name" required>
                <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item :label="$t('_._.description')"  prop="description" >
                <el-input v-model="formData.description" />
            </el-form-item>
            <!--
            <el-form-item label="Visible"  prop="visible" required>
                <el-switch v-model="formData.visible" />
            </el-form-item>
            -->
            <el-form-item :label="$t('_._.icon')"  prop="icon" >
                <lc-icon-picker v-model="formData.icon" />
            </el-form-item>
            <el-form-item :label="$t('_._.sequence')"  prop="sequence" >
                <el-input-number v-model="formData.sequence" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible=false">{{ $t('_._.cancel') }}</el-button>
                <el-button type="primary" @click="submitForm(dataEditorFormRef)">
                    {{ $t('_._.save') }}
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import {  ref  } from 'vue'
import type { FormInstance } from 'element-plus'


//Show this dialog
//data:data to fill into form(Do not use ref or reactive to wrap)
//callback:once data is saved,this function will be called with updated formData
function show(data:object,callback:Function){
   
   formData.value=data
    callbackSaved=callback;
    dialogVisible.value=true    
}

//Whether the dialog is show or hide
const dialogVisible=ref(false)
//data of the form
const formData = ref({})
//Save the callback of funciton call
let callbackSaved:Function;
//
const dataEditorFormRef = ref<FormInstance>()

//
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      //
      dialogVisible.value=false
      //
      if(callbackSaved){
        callbackSaved(formData.value)
      }
    }
  })
}


//
defineExpose({show})
</script>
<style scoped></style>
  