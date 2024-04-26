<template>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" :label="$t('_._.name')" />
        <el-table-column prop="access" :label="$t('_.components.top.accountRole.roleAuthorities.access')" width="100">
            <template #default="sp">
                <el-switch v-model="sp.row['access']" @change="handleChange" />
            </template>
        </el-table-column>
        <el-table-column prop="add" :label="$t('_.components.top.accountRole.roleAuthorities.add')" width="100">

            <template #default="sp">
                <el-switch v-model="sp.row['add']" @change="handleChange" />
            </template>
        </el-table-column>
        <el-table-column prop="edit" :label="$t('_.components.top.accountRole.roleAuthorities.edit')" width="100">

            <template #default="sp">
                <el-switch v-model="sp.row['edit']" @change="handleChange" />
            </template>
        </el-table-column>
        <el-table-column prop="del" :label="$t('_.components.top.accountRole.roleAuthorities.del')" width="100">
            <template #default="sp">
                <el-switch v-model="sp.row['del']" @change="handleChange" />
            </template>
        </el-table-column>
        <el-table-column prop="auth" :label="$t('_.components.top.accountRole.roleAuthorities.auth')" width="100">
            <template #default="sp">
                <el-switch v-model="sp.row['auth']" @change="handleChange" />
            </template>
        </el-table-column>
        <el-table-column prop="all" :label="$t('_.components.top.accountRole.roleAuthorities.all')" width="120">
            <template #default="sp">
                <el-switch v-model="sp.row['all']" @change="handleChange" />
            </template>
        </el-table-column>
        <el-table-column prop="all_read" :label="$t('_.components.top.accountRole.roleAuthorities.all_read')" width="120">
            <template #default="sp">
                <el-switch v-model="sp.row['all_read']" @change="handleChange" />
            </template>
        </el-table-column>
    </el-table>

</template>


<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import {t} from '@/lang/index'
//
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const globalContext = inject('globalContext')
//Table data
const tableData = ref([])
//
onMounted(() => init())
//
async function init() {
    const authorities = (await globalContext.request.get('/account/authorities')).list

    tableData.value = buildTableData(authorities, props.modelValue)
}
//
function buildTableData(authorities, roleAuthorities) {
    const result = []
    for (const a of authorities) {
        const authority = {}
        result.push(authority)
        //
        authority.key = a.key
        authority.name = t(a.name)

        //
        const authorityRole =roleAuthorities[a.key]
        handleAuthSingle(authority, authorityRole, 'access')
        handleAuthSingle(authority, authorityRole, 'add')
        handleAuthSingle(authority, authorityRole, 'edit')
        handleAuthSingle(authority, authorityRole, 'del')
        handleAuthSingle(authority, authorityRole, 'auth')
        handleAuthSingle(authority, authorityRole, 'all')
        handleAuthSingle(authority, authorityRole, 'all_read')
    }
    //
    return result;
}
function handleAuthSingle(authority, authorityRole, operation) {
    authority[operation] = authorityRole ? authorityRole.includes(operation) : false
}
function buildRoleAuthorities() {
    const authorities = {}
    for (const dt of tableData.value) {
        const r = []
        authorities[dt.key] = r
        pushIfTrue(r, dt, 'access')
        pushIfTrue(r, dt, 'add')
        pushIfTrue(r, dt, 'edit')
        pushIfTrue(r, dt, 'del')
        pushIfTrue(r, dt, 'auth')
        pushIfTrue(r, dt, 'all')
        pushIfTrue(r, dt, 'all_read')
    }
    return authorities;
}
function pushIfTrue(r, dt, operation) {
    if (dt[operation]) {
        r.push(operation)
    }
}

function handleChange() {
    emit('update:modelValue', buildRoleAuthorities())
}

</script>


<style lang="scss" scoped></style>