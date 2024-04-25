<template>
    <el-dialog v-model="dialogVisible" :title="$t('_.builtIn.plugin.apiEditor.dialogTitle')" :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form ref="dataEditorFormRef" :model="formData"  label-width="240px">
            <el-form-item :label="$t('_._.key')"  prop="key" required>
                <el-input v-model="formData.key" />
            </el-form-item>
            <el-form-item :label="$t('_._.description')"  prop="description" >
                <el-input v-model="formData.description" />
            </el-form-item>
            <el-form-item :label="$t('_.builtIn.plugin.apiEditor.data.method')"  prop="method" required>
                <el-select v-model="formData.method" >
                    <el-option  label="GET" value="GET" />
                    <el-option  label="PUT" value="PUT" />
                    <el-option  label="POST" value="POST" />
                    <el-option  label="DELETE" value="DELETE" />
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('_.builtIn.plugin.apiEditor.data.url')"  prop="url" required>
                <el-input v-model="formData.url" />
            </el-form-item>
            <el-form-item :label="$t('_.builtIn.plugin.apiEditor.data.requestType')"  prop="requestType" required>
                <el-select v-model="formData.requestType" >
                    <el-option :label="$t('_.builtIn.plugin.apiEditor.data.requestType_none')" value="none" />
                    <el-option :label="$t('_.builtIn.plugin.apiEditor.data.requestType_para')" value="para" />
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('_.builtIn.plugin.apiEditor.data.requestMode')"  prop="requestMode" required v-if="formData.requestType!='none'">
                <el-select v-model="formData.requestMode" >
                    <el-option  :label="$t('_.builtIn.plugin.apiEditor.data.requestMode_data')" value="data" />
                    <el-option  :label="$t('_.builtIn.plugin.apiEditor.data.requestMode_computed')" value="computed" />
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('_.builtIn.plugin.apiEditor.data.requestMode_data')"  prop="requestContentValueData" required v-if="formData.requestMode=='data'">
                <el-select v-model="formData.requestContentValueData" >
                    <el-option  v-for="d in dataList" :key="d.key" :label="d.description" :value="d.key" />
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('_.builtIn.plugin.apiEditor.data.requestMode_computed')"  prop="requestContentValueComputed" required  v-if="formData.requestMode=='computed'">
                <el-select v-model="formData.requestContentValueComputed" >
                    <el-option  v-for="d in computedList" :key="d.key" :label="d.description" :value="d.key" />
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('_.builtIn.plugin.apiEditor.data.responseMode')"  prop="responseMode" required>
                <el-select v-model="formData.responseMode" >
                    <el-option :label="$t('_.builtIn.plugin.apiEditor.data.responseMode_none')" value="none" />
                    <el-option :label="$t('_.builtIn.plugin.apiEditor.data.responseMode_data')" value="data" />
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('_.builtIn.plugin.apiEditor.data.responseValue')"  prop="responseValue" required v-if="formData.responseMode!='none'">
                <el-select v-model="formData.responseValue" >
                    <el-option  v-for="d in dataList" :key="d.key" :label="d.description" :value="d.key" />
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('_.builtIn.plugin.apiEditor.data.responseExpression')"  prop="responseExpression" v-if="formData.responseMode!='none'">
                <el-input v-model="formData.responseExpression" />
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
import {  ref,computed,inject  } from 'vue'
import type { FormInstance } from 'element-plus'

//
const context = inject('context')
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
//All data list
const dataList=computed(()=>{
    return context.codeManager.getCode().data
})
//All computed list
const computedList=computed(()=>{
    return context.codeManager.getCode().computed
})
//
defineExpose({show})
</script>
<style scoped></style>
  