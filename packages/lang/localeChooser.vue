<template>
    <el-dropdown trigger="click"  @command="handleCommand">      
        <slot>
        <span><lc-icon  v-bind="$attrs" icon="mdiTranslate" style="border:1px solid var(--el-border-color);padding:4px;"></lc-icon></span>
      </slot>
          <template #dropdown>
            <el-dropdown-menu>          
              <el-dropdown-item v-for="locale in localeList" :key="locale.key" :command="locale.key" :disabled="localCurrent==locale.key"> {{ locale.name }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
  </template>
  
  <script setup lang="ts">
  import { inject} from "vue";
  import {localeList,changeLocale,localCurrent} from '@/lang/index'
  const globalContext=inject('globalContext')
  //
  
  const handleCommand = (command) => {
    changeLocale(command,globalContext)
}
  </script>
  