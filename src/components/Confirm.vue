<template>
  <v-dialog v-model="visible" persistent scrim="black" max-width="380">
    <v-card elevation="24" class="py-4">
      <v-card-text>
        <v-row dense class="text-center">
          <v-col cols="12">
            <v-icon color="warning" size="48" icon="mdi-alert-octagon-outline" />
          </v-col>
          <v-col cols="12">
            <h3 class="font-weight-light">
              {{ message }}
            </h3>
          </v-col>
          <v-col cols="12" class="pt-3">
            <v-btn icon variant="flat" size="small" class="mr-2" @click="handleAction(false)">
              <v-icon>mdi-close</v-icon>
              <v-tooltip activator="parent" location="top">Cancelar</v-tooltip>
            </v-btn>
            <v-btn
              icon
              variant="flat"
              size="small"
              color="success"
              class="ml-2"
              @click="handleAction(true)"
            >
              <v-icon>mdi-check</v-icon>
              <v-tooltip activator="parent" location="top">Confirmar</v-tooltip>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
// Estado reactivo
import { ref } from 'vue'

const visible = ref(false)
const message = ref('')
const resolve = ref(null)

// Método expuesto
const show = (msg) => {
  message.value = msg
  visible.value = true
  return new Promise((rsp) => {
    resolve.value = rsp
  })
}

const handleAction = (rsp) => {
  resolve.value?.(rsp)
  visible.value = false
}

defineExpose({ show })
</script>
