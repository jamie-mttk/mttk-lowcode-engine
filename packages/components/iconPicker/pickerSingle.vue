<template>
      <div class="icon-holder" @click="iconChoosed">
        <lc-icon size="3em" :icon="props.icon" @click="iconChoosed"></lc-icon>
        <span class="name"> {{ icon }}</span>
      </div>
</template>

<script lang="ts" setup>
import lcIcon from '@/components/icon/index.vue'

//
let props = defineProps({
  icon: {
    type: String,
    required: true,
    default:''
  },
})
//const emit = defineEmits(["update:modelValue"])
const emit = defineEmits<{
  (e: 'iconChoosed', value: string): void
}>()
//
function iconChoosed(){
  emit('iconChoosed', props.icon)
}

</script>
<style scoped lang="scss">
  .icon-holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width:140px;
    height: 100%;
    cursor: pointer;

    .icon {
      height: 2em;
      width: 2em;

    }

    .name {
      margin-top: 8px;
      font-size: 1em;
    }
  }
</style>
