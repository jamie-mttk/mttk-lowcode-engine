<template>
    <el-scrollbar height="520px">
        <el-alert  type="info"  :closable="false"  >
            <template #title>
                {{ $t('_.components.appManager.customizeComponent.total') }}: {{ total }} {{ $t('_.components.appManager.customizeComponent.selected') }}: {{modelValue.length}}   ( {{ $t('_.components.appManager.customizeComponent.prompt') }} )
            </template>
            </el-alert>
        <el-table :data="tableData" ref="tableRef" style="width: 100%; " row-key="key" border default-expand-all 
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50" />
            <el-table-column prop="key" :label="$t('_._.key')" width="200" sortable>
                <template #default="{ row }">
                    <lc-icon :icon="row.icon"></lc-icon> {{ row.key }}
                </template>
            </el-table-column>
            <el-table-column prop="name" :label="$t('_._.name')" width="240" sortable />
            <el-table-column prop="description" :label="$t('_._.description')" sortable />
            <el-table-column prop="sequence" :label="$t('_._.sequence')" width="120" sortable />
        </el-table>

    </el-scrollbar>
</template>
<script lang="ts" setup>
import { ref, inject, onMounted } from 'vue'
import { useVModels } from '@vueuse/core'
import { deepCopy } from '@/utils/tools';



//modelValue is field list
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
//
const { modelValue } = useVModels(props, emit)
//
const globalContext=inject('globalContext')

//
const tableRef = ref(null)
//total ,include folders and components
let total=0;
//
function buildComponents() {
    //
    const folders = globalContext.componentRepository.componentFolders()
    //
    total=folders.length
    //
    const result=[]
    for(const folder of folders){
        //deep copy to a
        const r=deepCopy(folder)
        r.type='folder'
        //
        r.children= globalContext.componentRepository.componentsByFolder(folder.key)
        //
        result.push(r)
        //
        total+=r.children.length
    }
    //
    return result;
}
//
const tableData =buildComponents()
// console.log(globalContext.pluginManager.findAllPlugins().map(item => item.key))

//To avoid handleSelectionChange to take affect before set all the choosed selection
let finishInit = false
//

onMounted(() => {
    //choose already choosed plugins
    for (const folder of tableData) {
        //it is folder level
        tableRef.value.toggleRowSelection(folder, !!modelValue.value.find(item =>item.key==folder.key && item.type=='folder'))
        //component 
        for(const component of folder.children||[]){
            tableRef.value.toggleRowSelection(component, !!modelValue.value.find(item =>item.key==component.key && item.type=='component'))
        }
    }
    ///
    finishInit = true

})

//
function handleSelectionChange(selection) {
    if (!finishInit) {
        return
    }
    //
    const result=[]
    for(const row of selection){
        result.push({type:row.type||'component',key:row.key})
        if(row.folder){
            //component,check whether folder is already inserted
            if(!(result.find(item=>item.type=='folder' && item.key==row.folder))){
                //not found,add
                result.push({type:'folder',key:row.folder})
            }
        }
    }

    //
    modelValue.value = result
}

</script>
  