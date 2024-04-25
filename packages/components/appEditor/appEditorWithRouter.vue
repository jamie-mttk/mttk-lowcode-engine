<script setup lang="ts">
import {inject,  } from 'vue'
import AppEditor from './index.vue'
const globalContext = inject('globalContext')
</script>

<template>
<!-- @return="handleReturn" -->
<AppEditor :modelValue=" globalContext.router.currentRoute.value.params.app"  ></AppEditor>
</template>

<style></style>
