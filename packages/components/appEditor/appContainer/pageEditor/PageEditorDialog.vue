<template>
    <el-dialog v-model="dialogVisible" :title="$t('_.components.appEditor.pageEditor.pageEditorDialog.title')" :destroy-on-close="true" @open="loadMenus"
        :close-on-click-modal="false" :close-on-press-escape="false">

        <el-form ref="dataEditorFormRef" :model="formData" label-width="160px">
            <el-form-item :label="$t('_._.id')" prop="_id">
                <el-input v-model="formData['_id']" :disabled="true" />
            </el-form-item>
            <el-form-item :label="$t('_._.name')" prop="name" required>
                <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item :label="$t('_._.description')" prop="description">
                <el-input v-model="formData.description" />
            </el-form-item>
            <el-form-item :label="$t('_.components.appEditor.pageEditor.data.menu')" prop="menu">
                <el-select v-model="formData.menu" clearable>
                    <el-option v-for="menu in menus" :key="menu['_id']" :label="menu.name" :value="menu['_id']" />
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('_._.icon')" prop="icon">
                <lc-icon-picker v-model="formData.icon" />
            </el-form-item>
            <el-form-item :label="$t('_._.sequence')" prop="sequence" required>
                <el-input-number v-model="formData.sequence" />
            </el-form-item>
            <el-form-item :label="$t('_.components.appEditor.pageEditor.data.renderMode')" prop="renderMode" required>
                <el-radio-group v-model="formData.renderMode">
                    <el-radio-button value="flex">{{ $t('_.components.appEditor.pageEditor.data.renderMode_flex') }}</el-radio-button>
                    <el-radio-button value="absolute">{{ $t('_.components.appEditor.pageEditor.data.renderMode_absolute') }}</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('_.components.appEditor.pageEditor.data.width')" v-if="formData.renderMode=='absolute'" prop="settingAbsolute.width" required>
                <el-input-number v-model="formData.settingAbsolute.width" :controls="false" :precision="0" /> 
            </el-form-item>
            <el-form-item :label="$t('_.components.appEditor.pageEditor.data.height')" v-if="formData.renderMode=='absolute'" prop="settingAbsolute.height" required>
                <el-input-number v-model="formData.settingAbsolute.height" :controls="false" :precision="0" /> 
            </el-form-item>

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
import { ref, inject,  } from 'vue'
import type { FormInstance } from 'element-plus'
const globalContext = inject('globalContext')


//Show this dialog
//data:data to fill into form(Do not use ref or reactive to wrap)
//callback:once data is saved,this function will be called with updated formData
function show(data: object, callback: Function) {
    if(!data.settingAbsolute){
        data.settingAbsolute={}
    }
    formData.value = data
    callbackSaved = callback;
    dialogVisible.value = true
}

//Whether the dialog is show or hide
const dialogVisible = ref(false)
//data of the form
const formData = ref({})
//Save the callback of funciton call
let callbackSaved: Function;
//
const dataEditorFormRef = ref<FormInstance>()
//
const appContext = inject('appContext')
//
const menus = ref([])

//Load menu list
function loadMenus() {
    if (!appContext.getKey()) {
        //maybe it is NOT finish initiation 
        return
    }
    globalContext.request({
        method: "GET",
        url: "menu/query",
        params: {
            app: appContext.getKey()
        }
    }).then(function (response) {
        menus.value = response.list || []
    });
}


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
  