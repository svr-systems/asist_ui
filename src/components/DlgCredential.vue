<template>
  <v-dialog v-model="show" persistent scrim="black" max-width="600">
    <v-card flat>
      <v-card-title>
        <v-row dense>
          <v-col cols="11">
            <CardTitle text="CREDENCIAL" icon="mdi-card-account-details" sub />
          </v-col>
          <v-col cols="1" class="text-right">
            <v-btn icon variant="text" size="x-small" @click="show = false">
              <v-icon>mdi-close</v-icon>
              <v-tooltip activator="parent" location="left">Cerrar</v-tooltip>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-skeleton-loader v-if="loading" type="image" class="mx-auto" width="70%" />
        <v-row v-else dense class="text-center">
          <v-col cols="12">
            <img :src="imgSrc" alt="Credencial" width="70%" />
          </v-col>
          <v-col cols="12">
            <v-btn size="x-small" color="info" @click.prevent="downloadImage">
              Descargar
              <v-icon right>mdi-download</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
// Importaciones externas
import { ref, watch, computed } from 'vue'
import { getBlob } from '@/utils/coders'
import { getDateTime } from '@/utils/formatters'

// Importaciones internas
import CardTitle from '@/components/CardTitle.vue'

// Props y emits
const props = defineProps({
  modelValue: Boolean,
  loading: Boolean,
  img: String,
})
const emit = defineEmits(['update:modelValue'])

// Estado local
const show = ref(props.modelValue)

// Computado para imagen con prefijo base64
const imgSrc = computed(() => (props.img ? `data:image/jpeg;base64,${props.img}` : null))

// Sincronización bidireccional
watch(
  () => props.modelValue,
  (val) => (show.value = val)
)
watch(show, (val) => emit('update:modelValue', val))

// Descargar imagen
const downloadImage = () => {
  if (!props.img) return

  const blob = getBlob(props.img, 'jpg')
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `credencial_${getDateTime('', '', '')}.jpg`
  link.setAttribute('target', '_blank')
  link.click()
}
</script>
