<template>
   <div class="auth-container">
  <div class="lc-common-toolbar toolbar"
    style="background-color:var(--el-color-info);margin-top:10px 0;border-radius:0px;">
    <div class="left" style="font-weight: bold;"><lc-icon icon="mdiShieldAccount" style="margin-right: 4px" size="large" />
      {{ $t('_.components.top.accountRole.title') }}
    </div>
    <el-input v-model="filter" :placeholder="$t('_._.filterPrompt')" class="middle" clearable></el-input>

    <el-button-group class="right">
      <el-button @click="load">
        <template #icon>
          <lc-icon icon="mdiRefresh"></lc-icon>
        </template>
        {{ $t('_._.refresh') }}</el-button>
      <el-button @click="handleAdd" v-auth:accountRole_add> <template #icon>
          <lc-icon icon="mdiPlus"></lc-icon>
        </template>{{ $t('_._.add') }}</el-button>
  
    </el-button-group>
  </div>
  <el-table :data="filteredData" :highlight-current-row="true" table-layout="fixed"
  class="table-area" ref="editorTableRef">


    <el-table-column prop="name" :label="$t('_._.name')" sortable  width="320" ></el-table-column>
    <el-table-column prop="description" :label="$t('_._.description')" sortable/>

    <el-table-column prop="_updateTime" :label="$t('_._.updateTime')" sortable width="240">
      <template #default="sp">
        {{ formatMongoDate(sp.row['_updateTime']) }}
      </template>
    </el-table-column>
    <el-table-column :label="$t('_._.operation')" width="320">
      <template #default="sp">
        <el-button-group>
          <el-button @click="handleEdit(sp)"  v-data-auth:edit="sp.row">{{ $t('_._.edit') }}</el-button>
          <el-button @click="handleDelete(sp)"  v-data-auth:del="sp.row">{{ $t('_._.del') }}</el-button>
          <el-button @click="handleCopy(sp)"  v-auth:accountRole_add>{{ $t('_._.copy') }}</el-button>
          <DataAuthButton :data="sp.row" resource="page" />
        </el-button-group>
      </template>
    </el-table-column>
  </el-table>
</div>
  <AccountRoleEditorDialog ref="editorDialogRef"></AccountRoleEditorDialog>
</template>


<script setup lang="ts">
import { deepCopy } from '@/utils/tools'
// import { vTableDragable } from "@/utils/table-dragable";
import { ref, computed, nextTick, onMounted, inject } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import AccountRoleEditorDialog from './AccountRoleEditorDialog.vue'
import { formatMongoDate } from '@/utils/tools'
import DataAuthButton from '@/components/auth/DataAuthButton.vue'
import {t} from '@/lang/index'

const globalContext = inject('globalContext')


//Filter  item 
const filter = ref('')
//
const tableData = ref([])
//Load table 
onMounted(()=>load())

//Load menu list
function load() {

  globalContext.request({
    method: "GET",
    url: "accountRole/query",
    params: {
    
    }
  }).then(function (response) {
    tableData.value = response.list || []
    //  :default-sort="{ prop: '_updateTime', order: 'descending' }" does not work for dynamic data,sort manually
    nextTick(() => {
      if (editorTableRef.value) {
        editorTableRef.value.sort('_updateTime', 'descending')
      }
    })

  });
}

//
const filteredData = computed(() => {
  return tableData.value.filter((item) => {
    if (filter.value) {
      if ((item.name && item.name.indexOf(filter.value) >= 0) || (item.description && item.description.indexOf(filter.value) >= 0)) {
        //name or description matched,pass to next check
      } else {
        return false;
      }
    }
    //
    return true
  })
})

//
//
const editorDialogRef = ref()

//
const editorTableRef = ref()
//
 function handleAdd() {


  //
  let dataAdd = {authorities:{}}
  //console.log(JSON.stringify(dataAdd))
  //
  editorDialogRef.value.show(dataAdd, callback)
}
function handleEdit(sp) {
  //Deep copy to avoid form to change the table data directly
  const rowCopied = deepCopy(sp.row)
  //
  editorDialogRef.value.show(rowCopied, callback)
}

const callback = (dataNew: Object) => {
  // console.log('CALLBACK:'+JSON.stringify(dataNew))
  //
  globalContext.request({
    method: "POST",
    url: 'accountRole/save',
    data: dataNew,
  }).then(function () {
    load();
    //
    ElMessage({
      message: t('_._.saveSuccess'),
      type: 'success',
    })
  });
}
//Delete
const handleDelete = (sp) => {
  ElMessageBox.confirm(
    t('_._.delPrompt'),
    t('_._.warning'),
    {
      confirmButtonText: t('_._.yes'),
      cancelButtonText: t('_._.no'),
      type: 'warning',
    }
  )
    .then(() => {
      //
      //
      globalContext.request({
        method: "POST",
        url: 'accountRole/delete',
        params: {
          id: sp.row['_id']
        }
      }).then(function () {
        load();
        //
        ElMessage({
          message: t('_._.delSuccess'),
          type: 'success',
        })
      });

    })
}
//Copy
const handleCopy = (sp) => {
  ElMessageBox.confirm(
    t('_._.copyPrompt'),
    t('_._.warning'),
    {
      confirmButtonText: t('_._.yes'),
      cancelButtonText: t('_._.no'),
      type: 'warning',
    }
  )
    .then(() => {
      //
      //
      globalContext.request({
        method: "POST",
        url: 'accountRole/copy',
        params: {
          id: sp.row['_id']
        }
      }).then(function () {
        load();
        //
        ElMessage({
          message: t('_._.copySuccess'),
          type: 'success',
        })
      });

    })
}


</script>


<style lang="scss" scoped></style>