<template>
  <v-snackbar v-model="visible" :color="color" :timeout="5000" location="top">
    <div class="text-center">
      {{ msg }}
    </div>
  </v-snackbar>
</template>

<script setup>
// Estado reactivo
import { ref } from 'vue'

const visible = ref(false)
const color = ref(null)
const msg = ref(null)

// Método expuesto
const show = (newColor, newMsg) => {
  color.value = newColor
  msg.value = newMsg
  visible.value = true
}

defineExpose({ show })
</script>
