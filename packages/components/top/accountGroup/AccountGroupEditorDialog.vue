<template>
  <el-dialog
    v-model="dialogVisible"
    :title="$t('_.components.top.accountGroup.dialogTitle')"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form ref="dataEditorFormRef" :model="formData" label-width="120px">
      <el-form-item :label="$t('_._.name')" prop="name" required>
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item :label="$t('_._.description')" prop="description">
        <el-input v-model="formData.description" />
      </el-form-item>
      <el-tabs v-model="activeTab">
        <el-tab-pane :label="$t('_.components.top.account.name')" name="accounts">
          <AccountShow :data="accounts"></AccountShow>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('_._.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm(dataEditorFormRef)">
          {{ $t('_._.save') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue'
import type { FormInstance } from 'element-plus'
import AccountShow from '../accountRole/AccountShow.vue'

//
const globalContext = inject('globalContext')
//
const activeTab = ref('accounts')
//data to show accounts
const accounts = ref([])
function loadAccounts(data) {
    console.log('######',JSON.stringify(data))
  if (!data._id) {
    return
  }
  //
  globalContext
    .request({
      method: 'GET',
      url: 'account/queryByGroup',
      params: {
        group: data._id
      }
    })
    .then(function (response) {
      accounts.value = response.list
    })
}
//Show this dialog
//data:data to fill into form(Do not use ref or reactive to wrap)
//callback:once data is saved,this function will be called with updated formData
function show(data: object, callback: Function) {
  loadAccounts(data)
  //
  formData.value = data
  callbackSaved = callback
  dialogVisible.value = true
}

//Whether the dialog is show or hide
const dialogVisible = ref(false)
//data of the form
const formData = ref({})
//Save the callback of funciton call
let callbackSaved: Function
//
const dataEditorFormRef = ref<FormInstance>()
//
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      //
      dialogVisible.value = false
      //
      if (callbackSaved) {
        callbackSaved(formData.value)
      }
    }
  })
}
//
defineExpose({ show })
</script>
<style scoped></style>
