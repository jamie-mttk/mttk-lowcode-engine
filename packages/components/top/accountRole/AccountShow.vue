<template>
<el-table
      :data="data"
      :highlight-current-row="true"
      table-layout="fixed"
      class="table-area"
      ref="editorTableRef"
    >
      <el-table-column prop="name" :label=" $t('_._.name') " sortable width="240"></el-table-column>
      <el-table-column prop="username" :label="$t('_.components.top.account.username')" sortable width="240"></el-table-column>
      <el-table-column prop="active" :label="$t('_.components.top.account.active')" sortable width="120">
        <template #default="sp">
          <el-switch v-model="sp.row['active']" :before-change="()=>{return false}"/>

        </template>
      </el-table-column>
      <el-table-column prop="description" :label=" $t('_._.description') " sortable />

      <el-table-column prop="_updateTime" :label=" $t('_._.updateTime') " sortable width="240">
        <template #default="sp">
          {{ formatMongoDate(sp.row['_updateTime']) }}
        </template>
      </el-table-column>
    </el-table>

</template>
<script setup lang="ts">
import { formatMongoDate } from '@/utils/tools'

defineProps({
  data:{
    type:Array,
    required: true,
    default() {
      return []
    }
  },
})
</script>