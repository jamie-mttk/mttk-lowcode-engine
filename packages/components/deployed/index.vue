<script setup lang="ts">
import { ref, watch, inject, computed } from 'vue'
import { ElMessage } from 'element-plus'
import DeployedNoRouter from './deployedNoRouter.vue'
import {t} from '@/lang/index'

//
const globalContext = inject('globalContext')

//


//
let pageId = ref('')
//

watch(
  () => globalContext.router.currentRoute.value.params.page,
  () => {
    let appIdNew = globalContext.router.currentRoute.value.params.app
    let pageIdNew = globalContext.router.currentRoute.value.params.page
    if (!appIdNew) {
      //Try to get app from injected context
      const appContext = inject('appContext')
      //
      if (!appContext) {
        ElMessage({
          message: t('_.components.deployed.errorNoContext'),
          type: 'error',
        })
        //
        return
      }
      //
      // console.log('TEST',appContext)
      appIdNew = appContext.getKey()

    }
    //
    qualifydPageId(appIdNew, pageIdNew)
  },
  { immediate: true })

function qualifydPageId(appIdNew, pageIdNew) {


  if (pageIdNew && 'ROOT' != pageIdNew) {
    pageId.value = pageIdNew
    return
  }
  //Here we need to find the first page of the app
  globalContext.request({
    method: "GET",
    url: "page/query",
    params: {
      app: appIdNew
    }
  }).then(function (response) {
    if (response.list && Array.isArray(response.list) && response.list.length > 0) {
      //
      for(const page of response.list){
        //Try to find one with menu linked
        if(!page.menu){
          continue;
        }
        pageId.value =page['_id']
        //Push so the layout can display breadcum breadcrumb
        globalContext.router.push('/deploy/' + appIdNew+ '/'+page['_id'])
        //
        return
      }     
    }
    //
    ElMessage({
      message: t('_.components.deployed.errorNoPage',[appIdNew,pageIdNew]) ,
      type: 'error',
    })

  });
}

const showBreadcrumb = computed(() => {
  const show = globalContext.router.currentRoute.value.meta?.showBreadcrumb
  if (show == undefined) {
    return true;
  }
  return !!show
})
</script>

<template>
  <DeployedNoRouter :modelValue="pageId" :showBreadcrumb="showBreadcrumb"></DeployedNoRouter>
</template>

<style></style>
