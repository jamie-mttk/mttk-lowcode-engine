<template>
  <el-dialog
    v-model="dialogVisible"
    :title="$t('_.components.top.account.rpDialog.title')"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >

    <el-form ref="dataEditorFormRef" :model="formData" label-width="200px">
      <el-form-item :label="$t('_._.name')" prop="name" >
        <el-input v-model="formData.name" readonly />
      </el-form-item>

      <el-form-item :label="$t('_.components.top.account.username')" prop="username" >
        <el-input v-model="formData.username" readonly />
      </el-form-item>
      <el-form-item
        :label="$t('_.components.top.account.rpDialog.password')"
        prop="password"
        required
      >
        <el-input type="password" :show-password="true" v-model="formData.password" />
      </el-form-item>
      <el-form-item
        :label="$t('_.components.top.account.rpDialog.passwordConfirm')"
        prop="passwordConfirm"
        required
        :rules="{ validator: validatePasswordSame }"
      >
        <el-input type="password" :show-password="true" v-model="formData.passwordConfirm" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('_._.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm(dataEditorFormRef)">
          {{ $t('_._.ok') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, inject, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { t } from '@/lang/index'

//
const globalContext = inject('globalContext')
//Whether the dialog is show or hide
const dialogVisible = ref(false)
//data of the form
const formData = ref({})

//Show this dialog
//data:data to fill into form(Do not use ref or reactive to wrap)
//callback:once data is saved,this function will be called with updated formData
function show(data: object) {
  formData.value = {
    _id: data._id,
    name: data.name,
    username: data.username
  }
  //
  dialogVisible.value = true
}
//
const dataEditorFormRef = ref<FormInstance>()
//
const validatePasswordSame = (rule: any, value: any, callback: any) => {
  if (value !== formData.value.password) {
    callback(new Error(t('_.components.top.account.rpDialog.errorValidate')))
  } else {
    callback()
  }
}
//
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      //
      globalContext
        .request({
          method: 'POST',
          url: 'account/resetPassword',
          data: formData.value
        })
        .then(function (response) {
          // console.log(JSON.stringify(response, null, 2))
          if (response.error) {
              ElMessageBox.alert(
                t('_.components.top.account.rpDialog.error', [response.code]),
                t('_._.error')
              )
            
          } else {
            dialogVisible.value = false
            ElMessage({
              message: t('_.components.top.account.rpDialog.success'),
              type: 'success'
            })
          }
        })
    }
  })
}

//
defineExpose({ show })
</script>

<style scoped></style>
