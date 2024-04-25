<template>
  <el-dialog
    v-model="visible"
    :title="$t('_.components.auth.dialog.title')"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="handleClose"
  >

    <el-form ref="dataEditorFormRef" :model="data" label-position="top">
      <el-form-item :label="$t('_.components.auth.dialog.data._owners')" prop="_owners">
        <el-select multiple filterable v-model="data._owners">
          <el-option
            v-for="item in accounts"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="_authorities" :rules="{validator:validateAuthorities}">
        <template #label>
          <div style="display: flex; align-items: center; justify-content: space-between">
            <span>{{ $t('_.components.auth.name') }}</span>
            <span><el-button type="success" @click="handleAdd">{{$t('_._.add')}}</el-button></span>
          </div>
        </template>
        <el-table :data="data._authorities" style="width: 100%">
          <el-table-column prop="type" :label="$t('_.components.auth.dialog.data.type')" width="160">
            <template #default="sp">
              <el-select filterable v-model="sp.row.type" :disabled="sp.row.type == 'ownerGroup'">
                <el-option
                  v-for="item in dataAuthTypes"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                  :disabled="item.value == 'ownerGroup'"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="id" :label="$t('_.components.auth.dialog.data.userOrUserGroup')">
            <template #default="sp">
              <div v-if="sp.row.type == 'ownerGroup'"></div>
              <el-select filterable v-model="sp.row.id" v-else>
                <el-option
                  v-for="item in idList(sp.row.type)"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="access" :label="$t('_.components.auth.dialog.data.access')" width="100">
            <template #default="sp">
              <el-switch
                :modelValue="authValue(sp.row, 'access')"
                @update:modelValue="authValueSet(sp.row, 'access', $event)"
              />
            </template>
          </el-table-column>
          <el-table-column prop="edit" :label="$t('_._.edit')" width="100">
            <template #default="sp">
              <el-switch
                :modelValue="authValue(sp.row, 'edit')"
                @update:modelValue="authValueSet(sp.row, 'edit', $event)"
              />
            </template>
          </el-table-column>
          <el-table-column prop="del" :label="$t('_._.del')" width="100">
            <template #default="sp">
              <el-switch
                :modelValue="authValue(sp.row, 'del')"
                @update:modelValue="authValueSet(sp.row, 'del', $event)"
              />
            </template>
          </el-table-column>
          <el-table-column prop="auth" :label="$t('_.components.auth.dialog.data.auth')" width="100">
            <template #default="sp">
              <el-switch
                :modelValue="authValue(sp.row, 'auth')"
                @update:modelValue="authValueSet(sp.row, 'auth', $event)"
              />
            </template>
          </el-table-column>
          <el-table-column prop="operation" :label="$t('_._.operation')" width="100">
            <template #default="sp">
              <lc-icon
                icon="mdiDeleteOutline"
                @click="handleDelete(sp)"
                v-if="sp.row.type != 'ownerGroup'"
              ></lc-icon>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">{{$t('_._.cancel')}}</el-button>
        <el-button type="primary" @click="submitForm(dataEditorFormRef)">{{ $t('_._.save')}} </el-button>

      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, inject, onMounted } from 'vue'
import {  ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { dataAuthTypes } from './data'
import {t} from '@/lang/index'
//
const props = defineProps([ 'resource','uri'])
const emit=defineEmits(['close'])
const visible = defineModel('visible', { default: false })
const data = defineModel('data', { default: {_authorities:[]} })

const globalContext = inject('globalContext')
//
const accounts = ref([])
const accountGroups = ref([])
onMounted(() => {
  //
  globalContext
    .request({
      method: 'GET',
      url: 'account/query'
    })
    .then(function (response) {
      accounts.value = response.list
    })
  //
  globalContext
    .request({
      method: 'GET',
      url: 'accountGroup/query'
    })
    .then(function (response) {
      accountGroups.value = response.list
    })
})
//User or userGroup list
const idList = computed(() => (type) => {
  if (type == 'user') {
    return accounts.value
  } else if (type == 'group') {
    return accountGroups.value
  } else {
    return []
  }
})



const authValue = computed(() => (row, operation) => {
  return (row.operations || []).includes(operation)
})

function authValueSet(row, operation, valueNew) {

  if (!row.operations) {
    row.operations = []
  }
  if (valueNew) {
    //try to add
    if (!row.operations.includes(operation)) {
      row.operations.push(operation)
    }
  } else {
    //try to remove
    for (let i = 0; i < row.operations.length; i++) {
      if (row.operations[i] === operation) {
        row.operations.splice(i, 1)
        break
      }
    }
  }
}
//This is to notify dynamicRender to destroy div created for dialog
function handleClose(){
  emit('close')
}
//
function handleAdd() {
  data.value._authorities.push({ type: 'group', id: '' })
}

//
function handleDelete(sp) {
  data.value._authorities.splice(sp.$index, 1)
}

const validateAuthorities = (rule: any, value: any, callback: any) => {
  for(let i=0;i<value.length;i++){
    const a=value[i]
    if(a.type!='ownerGroup' &&  !a.id){
      callback(new Error(t('_.components.auth.dialog.saveError1',[(i+1)])))
    }
    // console.log(a,i,(!a.operations || a.operations.length==0))
    if(!a.operations || a.operations.length==0){
      callback(new Error(t('_.components.auth.dialog.saveError2',[(i+1)])))
    }
  }
  //OK
  callback()

}

//
const dataEditorFormRef = ref<FormInstance>()

//
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      //save
      globalContext
        .request({
          method: 'POST',
          url: (props.uri||props.resource)+'/saveDataAuth',
          data: data.value,
        })
        .then(function () {
          //
          visible.value = false
          //
          ElMessage({
            message: t('_._.saveSuccess'),
            type: 'success'
          })
        })

    }
  })
}
//
</script>

<style scoped></style>
