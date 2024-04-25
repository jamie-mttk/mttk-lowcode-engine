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
import { ref } from 'vue'
//
const formData=ref({})
</script>
