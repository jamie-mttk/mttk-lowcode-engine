<script lang="ts" setup>
import { ref, computed, onUnmounted, inject } from 'vue'
import { watchPausable } from '@vueuse/core'

//Current selected row,use to make it editable
const currentRow = ref({})
//
const model=defineModel({ type: Object})
// const emit = defineEmits<{
//     (e: 'update:modelValue', value: Object): void
// }>()
//
// const context = inject('context')
//Whether component is choosed
// const isChoosed = computed(() => {   
//     const choosed = context.choosedManager.get()
//     return choosed && choosed.key
// })
//Build from props
const tableData = ref([])
const { pause, resume } = watchPausable(
    () => model.value,
    () => {
        //
        const result = []
        for (const k of Object.keys(model.value)) {
            result.push({ name: k, value: model.value[k] })
        }
        tableData.value = result
    }, {
    immediate: true,
    deep:true,
})

//Once click,save current row
function handleRowClick(row) {
    currentRow.value = row
}
//Add a new style
function addNewStyle() {
    //console.log(isRef(model.value)+'~~~'+isReactive(model.value))
    tableData.value.push({})
}
//Delete from
function deleteRow(sp) {
    //
    tableData.value.splice(sp.$index, 1)
    //
    updateBack();
}
//
onUnmounted(()=>{
    updateBack()
})
//
function updateBack() {

    pause()
    //Delete later,the keys which has been changed or deleted
    for (const k of Object.keys(model.value)) {
        if (!styleExist(k)) {
            delete model.value[k]
        }
    }
    //
    for (const line of tableData.value) {
        if (!line.name || !line.value) {
            continue;
        }
        //
        model.value[line.name] = line.value
        //
        //
        //emit("update:modelValue", model.value)
    }
    //
    resume()

}
function styleExist(name: string) {
    for (const line of tableData.value) {
        if (name == line.name) {
            return true
        }
    }
    return false
}
</script>

<template>
    <div style="width:100%;">
        <el-table :data="tableData" style="width: 100%" :show-header="false"  
            @row-click="handleRowClick" class="styleEditorTable">
            <el-table-column prop="name" label="Name">
                <template #default="sp">
                    <el-input v-model="sp.row.name" v-if="currentRow == sp.row"  @change="updateBack" @blur="updateBack"></el-input>
                    <span v-else>{{ sp.row.name || 'Empty' }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="value" label="Value">
                <template #default="sp">
                    <el-input v-model="sp.row.value" v-if="currentRow == sp.row"  @change="updateBack" @blur="updateBack"></el-input>
                    <span v-else>{{ sp.row.value }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="operation" label="Operation" width="32px" align="center">
                <template #default="sp">
                 
                            <lc-icon icon="mdiTrashCanOutline" @click="deleteRow(sp)"></lc-icon>
                       
                </template>
            </el-table-column>
        </el-table>
        <el-button @click="addNewStyle" style="margin-top:6px;width:100%;">
            <template #icon>
                <lc-icon icon="mdiPlus"></lc-icon>
            </template>
            {{ $t('_._.add') }}</el-button>
    </div>
  
</template>
<style lang="scss">
.styleEditorTable  .cell{
    padding: 0 2px;
}
</style>