<template>
  <img :src="logo" alt="Logo" v-bind="imgAttrs" />
</template>

<script setup>
import { computed } from 'vue'
import logo from '@/assets/logo.png'

const props = defineProps({
  width: [String, Number],
  height: [String, Number],
})

const imgAttrs = computed(() => {
  if (props.width) {
    return {
      width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    }
  }

  if (props.height) {
    return {
      height: typeof props.height === 'number' ? `${props.height}px` : props.height,
    }
  }

  return { width: '48px' }
})
</script>
