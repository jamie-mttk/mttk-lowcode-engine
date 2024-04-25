<script setup lang="ts">
import { useI18n } from "vue-i18n";

import { reactive, computed ,ref,inject} from "vue";
import newMessage from './data'
import {aaa} from './data1'
import {useGlobalConfig,provideGlobalConfig} from 'element-plus'
import zhCN from 'element-plus/es/locale/lang/zh-cn' 
import enUS from 'element-plus/es/locale/lang/en'
//
const globalContext=inject('globalContext')
const I18n = useI18n();
    let { locale,t,mergeLocaleMessage } = I18n;
//
//
 provideGlobalConfig({locale:zhCN},globalContext.vueApp,true)
const changeLanguage = () => {
      locale.value = locale.value == "zhCN" ? "enUS" : "zhCN"; // 切换中英文
      //
      provideGlobalConfig({locale:zhCN},globalContext.vueApp,true)
    };
function show(){
  // const m=  i18nLanguage.global.t("headTxt.user.name")
  // console.log(m)
  //
  console.log('From data1.ts',aaa.value)
  console.log('second',t("test1"))
  //
  console.log('test',useGlobalConfig)
}
function addMessage(){
  mergeLocaleMessage('zh-CN',newMessage.zhCN)
  mergeLocaleMessage('en-US',newMessage.enUS)
}
const defaultTime = new Date(2000, 1, 1, 12, 0, 0)
const value2 = ref('2022-12-12 12:13:14')
</script>

<template>
<div>
  First line:{{ $t("_.components.top.title") }}<br>
  Second line:{{ $t("test1") }}<br>
  <button @click="show">SHOW</button>  <button @click="addMessage">Add message</button>
  <button @click="changeLanguage">
      {{ $t("languageTxt") }}
    </button>
</div>
<el-date-picker
        v-model="value2"
        type="datetime" defaultTime
        format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
        :default-time="defaultTime"
      />
</template>