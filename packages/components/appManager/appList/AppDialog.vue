<template>
  <el-dialog
    v-model="dialogVisible"
    :title="$t('_.components.appManager.appDialog.title')"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="75%"
    class="app-dialog-dummy"
    @open="activeTab = 'basic'"
  >
    <el-tabs v-model="activeTab">
      <el-tab-pane :label="$t('_.components.appManager.appDialog.basic')" name="basic">
        <el-form ref="appEditorFormRef" :model="formData" label-width="200px">
          <el-form-item :label="$t('_._.id')" prop="_id">
            <el-input v-model="formData['_id']" :disabled="true" />
          </el-form-item>
          <el-form-item :label="$t('_._.name')" prop="name" required>
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item :label="$t('_._.description')" prop="description">
            <el-input v-model="formData.description" />
          </el-form-item>
          <el-form-item :label="$t('_._.icon')" prop="icon">
            <lc-icon-picker v-model="formData.icon" />
          </el-form-item>
          <el-form-item :label="$t('_.components.appManager.appDialog.mainColor')" prop="color">
            <el-color-picker v-model="formData.color" />
          </el-form-item>

          <el-form-item
            :label="$t('_.components.appManager.appDialog.customizePlugin')"
            prop="customizePlugin"
          >
            <el-switch v-model="formData.customizePlugin" />
          </el-form-item>
          <el-form-item
            :label="$t('_.components.appManager.appDialog.customizeComponent')"
            prop="customizeComponent"
          >
            <el-switch v-model="formData.customizeComponent" />
          </el-form-item>
          <!--
            <el-form-item label="Visible"  prop="visible" required>
                <el-switch v-model="formData.visible" />
            </el-form-item>
            -->
        </el-form>
      </el-tab-pane>
      <el-tab-pane :label="$t('_.components.appManager.appDialog.pageDefault')" name="page">
        <el-alert  type="info"  :closable="false"  >
            <template #title>
                {{ $t('_.components.appManager.appDialog.pagePrompt') }} 
            </template>
            </el-alert>
        <el-form  :model="formData" label-width="160px">
        <el-form-item
          :label="$t('_.components.appManager.appDialog.backgroundColor')"
          prop="colorBackground"
        >
          <el-color-picker
            v-model="formData.colorBackground"
            :predefine="['#F5F7FA', '#F0F2F5', '#EBEDF0', '#000000']"
          />
        </el-form-item>
        <el-form-item :label="$t('_.components.appManager.appDialog.style')" prop="pageStyle">
          <styleEditor v-model="formData.pageStyle"></styleEditor>
        </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('_.components.appManager.appDialog.customizePlugin')"
        name="customizePlugin"
        v-if="formData.customizePlugin"
      >
        <CustomizePlugin v-model="formData.plugins"></CustomizePlugin>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('_.components.appManager.appDialog.customizeComponent')"
        name="customizeComponent"
        v-if="formData.customizeComponent"
      >
        <CustomizeComponent v-model="formData.components"></CustomizeComponent>
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('_._.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm(appEditorFormRef)">
          {{ $t('_._.save') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
import CustomizePlugin from './CustomizePlugin.vue'
import CustomizeComponent from './CustomizeComponent.vue'
import StyleEditor from '@/components/pageDesign/propsEditor/styleEditor.vue'
//
const activeTab = ref('basic')
//Show this dialog
//data:data to fill into form(Do not use ref or reactive to wrap)
//callback:once data is saved,this function will be called with updated formData
function show(data: object, callback: Function) {
  if (!data.plugins) {
    data.plugins = []
  }
  if (!data.components) {
    data.components = []
  }
  if(!data.pageStyle){
    data.pageStyle={}
  }
  //
  formData.value = data
  //
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
const appEditorFormRef = ref<FormInstance>()

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
<style>
.app-dialog-dummy .el-dialog__body {
  padding: 10px 20px;
}
</style>
