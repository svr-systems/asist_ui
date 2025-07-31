<template>
  <v-text-field
    :label="label"
    :model-value="modelValue"
    @update:model-value="emitValue"
    :type="isVisible ? 'text' : 'password'"
    :rules="rules"
    :counter="counter"
    :disabled="disabled"
    :prepend-inner-icon="prepend"
    :append-inner-icon="isVisible ? 'mdi-eye-off' : 'mdi-eye'"
    @click:append-inner="toggleVisibility"
    variant="outlined"
    density="compact"
    maxlength="20"
    autocomplete="current-password"
    hide-details="auto"
  />
</template>

<script setup>
// Estado interno
import { ref } from 'vue'

// Props
const props = defineProps({
  label: String,
  modelValue: String,
  rules: Array,
  counter: Boolean,
  disabled: Boolean,
  prepend: String,
})

// Eventos
const emit = defineEmits(['update:modelValue'])

// Estado
const isVisible = ref(false)

// Métodos
const toggleVisibility = () => {
  isVisible.value = !isVisible.value
}

const emitValue = (val) => {
  emit('update:modelValue', val)
}
</script>
