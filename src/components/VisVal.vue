<template>
  <div>
    <div v-if="label" class="font-weight-light text-caption">
      {{ label }}
    </div>
    <div class="text-body-2">
      {{ value != null && value !== '' ? value : '-' }}
    </div>
    <div v-if="subvalue" class="text-caption">
      <small>{{ subvalue }}</small>
    </div>
  </div>
</template>

<script setup>
// Props
defineProps({
  label: String,
  value: [String, Number, Boolean],
  subvalue: String,
})
</script>
