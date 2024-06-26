<template>
  <div class="toolbar-table-container">
    <div class="lc-common-toolbar toolbar" style="background-color: var(--el-color-primary)">
      <div class="left" style="font-weight: bold; color: var(--el-color-white)">
        {{ $t('_.components.appEditor.pageEditor.title') }}
      </div>
      <el-input v-model="filter" placeholder="Input to filter" class="middle" clearable></el-input>

      <el-button-group class="right">
        <el-button @click="load">
          <template #icon>
            <lc-icon icon="mdiRefresh"></lc-icon>
          </template>
          {{ $t('_._.refresh') }}</el-button
        >
        <el-button @click="handleAdd" v-auth:page_add>
          <template #icon> <lc-icon icon="mdiPlus"></lc-icon> </template
          >{{ $t('_.components.appEditor.pageEditor.add') }}</el-button
        >
        <!-- <el-button @click="handleBatchExport">
          <template #icon>
            <lc-icon icon="mdiExport"></lc-icon> </template
          >{{ $t('_.components.appEditor.pageEditor.batchExport') }}</el-button
        >
        <el-upload
          style="display: inline-block; margin-top: 2px"
          ref="doImportRef"
          action="page/doImport"
          :http-request="handleImport"
          :multiple="false"
          :show-file-list="false"
          :limit="1"
          v-auth:page_add
        >
          <el-button>
            <template #icon>
              <lc-icon icon="mdiImport"></lc-icon> </template
            >{{ $t('_.components.appEditor.pageEditor.import') }}</el-button
          >
        </el-upload> -->
      </el-button-group>
    </div>

    <el-table
      :data="filteredData"
      :highlight-current-row="true"
      table-layout="fixed"
      ref="pageEditorTableRef"
      class="table-area"
      v-fullHeight="8"
      @row-click="handleRowClick"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" :label="$t('_._.name')" sortable>
        <template #default="sp">
          <lc-icon :icon="sp.row.icon || ''" size="medium" style="margin-right: 16px"></lc-icon>
          {{ sp.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="sequence" :label="$t('_._.sequence')" sortable width="120" />
      <el-table-column
        prop="menu_NAME"
        :label="$t('_.components.appEditor.pageEditor.data.menu')"
        sortable
        width="240"
      />
      <el-table-column prop="_updateTime" :label="$t('_._.updateTime')" sortable width="180">
        <template #default="sp">
          {{ formatMongoDate(sp.row['_updateTime']) }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('_._.operation')" width="380">
        <template #default="sp">
          <el-button-group>
            <el-button @click="handleDesign(sp.row['_id'])" v-data-auth:edit="sp.row">{{
              $t('_.components.appEditor.pageEditor.design')
            }}</el-button>
            <el-button @click="handleEdit(sp)" v-data-auth:edit="sp.row">{{
              $t('_._.edit')
            }}</el-button>
            <el-button @click="handleDelete(sp)" v-data-auth:del="sp.row">{{
              $t('_._.del')
            }}</el-button>
            <el-button @click="handleCopy(sp)" v-auth:page_add>{{ $t('_._.copy') }}</el-button>
            <DataAuthButton :data="sp.row" resource="page" />
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <PageEditorDialog ref="pageEditorDialogRef"></PageEditorDialog>
</template>

<script setup lang="ts">
import { deepCopy } from '@/utils/tools'
// import { vTableDragable } from "@/utils/table-dragable";
import { ref, computed, nextTick, watch, inject } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import PageEditorDialog from './PageEditorDialog.vue'
import { formatMongoDate } from '@/utils/tools'
import { downloadHttpResponse } from '@/utils/download'
import DataAuthButton from '@/components/auth/DataAuthButton.vue'
import { vFullHeight } from '../../../fullHeight/directive'
import {hasAuth} from '@/utils/auth'
import { t } from '@/lang/index'


//
const props = defineProps({
  menuFilter: {
    type: String,
    required: false,
    default: ''
  }
})
const emit = defineEmits<{
  (e: 'pageDesign', page: string): void
}>()

const globalContext = inject('globalContext')

//

const appContext = inject('appContext')
//Filter  item
const filter = ref('')
//
const tableData = ref([])
watch(
  () => appContext.getKey(),
  () => {
    load()
  },
  { immediate: true }
)

//Load menu list
function load() {
  if (!appContext.getKey()) {
    //maybe it is NOT finish initiation
    return
  }
  globalContext
    .request({
      method: 'GET',
      url: 'page/query',
      params: {
        app: appContext.getKey()
      }
    })
    .then(function (response) {
      tableData.value = response.list || []
      //  :default-sort="{ prop: '_updateTime', order: 'descending' }" does not work for dynamic data,sort manually
      nextTick(() => {
        if (pageEditorTableRef.value) {
          pageEditorTableRef.value.sort('_updateTime', 'descending')
        }
      })
    })
}

//
const filteredData = computed(() => {
  return tableData.value.filter((item) => {
    if (props.menuFilter && item.menu != props.menuFilter) {
      //If menu filter existed (menu choosed) but menu is not match,return false directly
      return false
    }
    if (filter.value) {
      if (
        (item.name && item.name.indexOf(filter.value) >= 0) ||
        (item.description && item.description.indexOf(filter.value) >= 0)
      ) {
        //name or description matched,pass to next check
      } else {
        return false
      }
    }
    //
    return true
  })
})

//
//
const pageEditorDialogRef = ref()
//
//
async function handleAdd() {
  //
  const styleDefault = {
    diaplay: 'block',
    'min-height': '128px',
    'background-color': appContext.getCode().colorBackground || '#EBEDF0',
    'box-sizing': 'border-box',
    ...appContext.getCode().pageStyle||{}
  }
  //
  const ui = [
    {
      key: '_root',
      type: '_container',
      label: 'ROOT',
      version: '1.0',
      config: {
        basic: {
          _slot: {
            default: []
          }
        },
        data: {},
        event: [],
        display: {style:styleDefault}
      }
    }
  ]
  //
  //
  const result = await globalContext.request({
    method: 'GET',
    url: 'page/maxSequence',
    params: {
      app: appContext.getKey()
    }
  })
  //Calcuate next sequence
  const nextSequence = result?.sequenceMax != undefined ? result.sequenceMax + 1 : 0
  //
  let dataAdd = {
    app: appContext.getKey(),
    sequence: nextSequence,
    apis: [],
    computed: [],
    data: [],
    lifecycle: [],
    methods: [],
    ui: ui,
    renderMode: 'flex',
    "settingAbsolute" : {
        "width" : 1920,
        "height" : 1080
    },
  }
  //console.log(JSON.stringify(dataAdd))
  //
  pageEditorDialogRef.value.show(dataAdd, callback)
}
function handleEdit(sp) {
  //Deep copy to avoid form to change the table data directly
  const rowCopied = deepCopy(sp.row)
  //
  pageEditorDialogRef.value.show(rowCopied, callback)
}

function handleRowClick(row) {
  //emit('pageDesign', row['_id'])
}
const callback = (dataNew: Object) => {
  // console.log('CALLBACK:'+JSON.stringify(dataNew))
  //
  globalContext
    .request({
      method: 'POST',
      url: 'page/saveInfo',
      data: dataNew
    })
    .then(function (response) {
      if (!dataNew['_id'] && hasAuth('page_edit')) {
        //User may has no page edit so can not open page design
        //And if user has page edit absolutely it can edit it since he is the page owner
        //add
        //Open design
        handleDesign(response['_id'])
      } else {
        //edit
        load()
        //
        ElMessage({
          message: t('_._.saveSuccess'),
          type: 'success'
        })
      }
    })
}
//Delete
const handleDelete = (sp) => {
  ElMessageBox.confirm(t('_.components.appEditor.pageEditor.delPrompt'), t('_._.warning'), {
    confirmButtonText: t('_._.yes'),
    cancelButtonText: t('_._.no'),
    type: 'warning'
  }).then(() => {
    //
    //
    globalContext
      .request({
        method: 'POST',
        url: 'page/delete',
        params: {
          id: sp.row['_id']
        }
      })
      .then(function () {
        load()
        //
        ElMessage({
          message: t('_._.delSuccess'),
          type: 'success'
        })
      })
  })
}
//Copy
const handleCopy = (sp) => {
  ElMessageBox.confirm(t('_.components.appEditor.pageEditor.copyPrompt'), t('_._.warning'), {
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    type: 'warning'
  }).then(() => {
    //
    //
    globalContext
      .request({
        method: 'POST',
        url: 'page/copy',
        params: {
          id: sp.row['_id']
        }
      })
      .then(function () {
        load()
        //
        ElMessage({
          message: t('_._.copySuccess'),
          type: 'success'
        })
      })
  })
}
function handleDesign(id) {
  emit('pageDesign', id)
}

//
const pageEditorTableRef = ref()
//
function handleBatchExport() {
  const rows = pageEditorTableRef.value.getSelectionRows()
  if (!rows || rows.length == 0) {
    //
    ElMessage.error('Please select rows first')
    return
  }
  //
  const ids = rows.map((item) => item['_id'])
  //
  ElMessageBox.confirm('Do you want to export the select pages?', 'Warning', {
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    type: 'warning'
  }).then(() => {
    //
    globalContext
      .request({
        method: 'POST',
        url: 'page/doExport',
        responseType: 'blob',
        timeout: 180000,
        fullResponse: true,
        data: ids
      })
      .then(function (response) {
        console.log(response)
        downloadHttpResponse(response, 'pages.zip')
        //
        // ElMessage.success('Download done!')
      })
  })
}

//
const doImportRef = ref()
//upload
function handleImport(params) {
  let formData = new FormData()
  formData.append('file', params.file)
  formData.append('app', appContext.getKey())
  console.log(params)
  console.log(formData)
  globalContext
    .request({
      method: 'post',
      url: 'page/doImport',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData
    })
    .then(function () {
      //
      load()
      //
      ElMessage.success('Import done')
    })
    .finally(function () {
      doImportRef.value.clearFiles()
      //
    })
}
</script>

<style lang="scss" scoped></style>
