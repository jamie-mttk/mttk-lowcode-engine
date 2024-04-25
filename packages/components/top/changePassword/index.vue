<template>
    <div>
     <h3>{{$t('_.components.top.account.cpDialog.title')}}</h3>
     
     <el-form ref="dataEditorFormRef" :model="formData" label-width="200px">
   
         <el-form-item
           :label="$t('_.components.top.account.cpDialog.passwordOld')"
           prop="passwordOld"
           required
         >
           <el-input type="password" :show-password="true" v-model="formData.passwordOld" />
         </el-form-item>
         <el-form-item
           :label="$t('_.components.top.account.cpDialog.password')"
           prop="password"
           required
         >
           <el-input type="password" :show-password="true" v-model="formData.password" />
         </el-form-item>
         <el-form-item
           :label="$t('_.components.top.account.cpDialog.passwordConfirm')"
           prop="passwordConfirm"
           required
           :rules="{ validator: validatePasswordSame }"
         >
           <el-input type="password" :show-password="true" v-model="formData.passwordConfirm" />
         </el-form-item>
         <el-form-item label="">
       <el-button type="primary" @click="submitForm(dataEditorFormRef)">
                       {{ $t('_._.ok') }}
                   </el-button>
                 </el-form-item>
       </el-form>
     
    </div>
   </template>
<script lang="ts" setup>
import {ref,inject} from 'vue'
import type { FormInstance } from 'element-plus'
import { t } from '@/lang/index'
import { ElMessage, ElMessageBox } from 'element-plus'
//
const globalContext=inject('globalContext')
//
const formData=ref({})
//
//
const dataEditorFormRef = ref<FormInstance>()
//
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      //
      globalContext
        .request({
          method: 'POST',
          url: 'account/changePassword',
          data: formData.value
        })
        .then(function (response) {
          // console.log(JSON.stringify(response, null, 2))
          if (response.error) {
            if (response.code == 202) {
              ElMessageBox.alert(t('_.components.top.account.cpDialog.error1'), t('_._.error'))
            } else {
              ElMessageBox.alert(
                t('_.components.top.account.cpDialog.error2', [response.code]),
                t('_._.error')
              )
            }
          } else {

            ElMessage({
              message: t('_.components.top.account.cpDialog.cpSuccess'),
              type: 'success'
            })
          }
        })
    }
  })
}

</script>