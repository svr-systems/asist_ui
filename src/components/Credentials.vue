<template>
  <div>
    <v-card flat>
      <v-card-title class=" justify-space-between text-center align-center pb-2">
        <span class="text-h6">{{ label }}</span>
      </v-card-title>

      <v-divider class="mx-4"></v-divider>

      <v-card-text class="px-4 pt-2 pb-4">
        <v-img :src="base64Image" contain max-height="400" class="mb-4 mt-2" />

        <div class="text-center">
          <v-btn color="primary" @click="downloadImage" prepend-icon="mdi-download" variant="flat">
            DESCARGAR
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  label: String,
  base64Image: String,
})

const downloadImage = () => {
  if (!props.base64Image) return

  const link = document.createElement('a')
  link.href = props.base64Image
  link.download = `credencial_${new Date().toISOString().slice(0, 10)}.png`
  link.click()
}
</script>

<style scoped>
.v-card-title {
  padding-bottom: 0;
}
.v-card-text {
  padding-top: 0;
}
</style>