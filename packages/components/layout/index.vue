<template>
    <MttkWrapComp :config="config"></MttkWrapComp>
</template>
<script setup lang="ts">
import { inject } from 'vue'
//
const globalContext = inject('globalContext')
const config = function () {
  //Find all login plugin
  const plugins = globalContext.pluginManager.findByEntry('layout')
  if (!plugins || plugins.length == 0) {
    return { '~': 'el-empty', description: 'No layout plugin found!' }
  } else {
    //Get last one
    const p = plugins[plugins.length - 1]
    return p.ui
  }
}
</script>
