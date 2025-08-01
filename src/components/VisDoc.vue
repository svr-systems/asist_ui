<template>
  <div>
    <div class="text-caption font-weight-bold">{{ label }}</div>

    <div>
      <div v-if="value" class="d-inline-flex align-center ga-1">
        <v-avatar
          v-if="isImageVisible"
          size="21"
          style="cursor: pointer"
          @click.prevent="imgDlg = true"
        >
          <v-img :src="docUrl" />
          <v-tooltip activator="parent" location="right">Ver</v-tooltip>
        </v-avatar>

        <v-btn icon variant="text" size="x-small" @click.prevent="docDwd">
          <v-icon>mdi-download</v-icon>
          <v-tooltip activator="parent" location="right">Descargar</v-tooltip>
        </v-btn>
      </div>

      <v-tooltip v-else location="right">
        <template #activator="{ props: activatorProps }">
          <v-icon v-bind="activatorProps" size="small">mdi-alert</v-icon>
        </template>
        <span>Pendiente</span>
      </v-tooltip>
    </div>

    <v-dialog
      v-if="docUrl && isImageVisible"
      v-model="imgDlg"
      persistent
      scrim="black"
      max-width="350"
    >
      <v-card flat>
        <v-card-title>
          <v-row dense>
            <v-col cols="11">
              <CardTitle :text="label" sub />
            </v-col>
            <v-col cols="1" class="text-right">
              <v-btn icon variant="text" size="x-small" @click.prevent="imgDlg = false">
                <v-icon>mdi-close</v-icon>
                <v-tooltip activator="parent" location="left">Cerrar</v-tooltip>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>

        <v-card-text>
          <v-img :src="docUrl" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
// Importaciones
import { ref, onMounted } from 'vue'
import { getBlob } from '@/utils/coders'
import { getDateTime } from '@/utils/formatters'
import CardTitle from '@/components/CardTitle.vue'

// Props
const props = defineProps({
  label: String,
  value: Object,
  img: Boolean,
})

// Estado
const docUrl = ref(null)
const imgDlg = ref(false)
const isImageVisible = ref(false)

// Métodos
const docDwd = () => {
  const link = document.createElement('a')
  link.href = docUrl.value
  link.setAttribute('target', '_blank')
  link.download = `doc_${getDateTime('', '', '')}.${props.value?.ext || 'bin'}`
  link.click()
}

// Inicialización
onMounted(() => {
  const { value } = props
  if (value?.cnt && value?.ext) {
    docUrl.value = URL.createObjectURL(getBlob(value.cnt, value.ext))
  }
  isImageVisible.value = props.img
})
</script>
