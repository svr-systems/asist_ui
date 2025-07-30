<template>
  <v-card elevation="24" :disabled="isLoading" :loading="isLoading">
    <v-card-title>
      <v-row dense>
        <v-col cols="10">
          <BtnBack
            :route="{
              name: 'assistance/file',
            }"
          />
          <CardTitle :text="$route.meta.title" :icon="$route.meta.icon" />
        </v-col>
        <v-col cols="2" class="text-right" />
      </v-row>
    </v-card-title>

    <v-card-text v-if="item">
      <v-form ref="formRef" @submit.prevent>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>
                <v-row dense>
                  <v-col cols="11">
                    <CardTitle
                      :text="`GENERAL${isStoreMode ? '' : ' | ' + (item.uiid || '')}`"
                      sub
                    />
                  </v-col>
                  <v-col cols="1" class="text-right" />
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" md="3" class="d-flex align-center" style="gap: 8px">
                    <v-file-input
                      label="Documento*"
                      v-model="item.assistance_file_doc"
                      variant="outlined"
                      density="compact"
                      prepend-icon=""
                      show-size
                      accept=".svr"
                      :rules="rules.imageOptional"
                      :disabled="item.assistance_file_dlt"
                      class="flex-grow-1"
                    >
                      <template v-slot:append>
                        <div
                          v-if="!isStoreMode && item.assistance_file && !item.assistance_file_doc"
                          class="d-flex"
                        >
                          <BtnDwd
                            :value="item.assistance_file_b64"
                            :disabled="item.assistance_file_dlt"
                          />
                        </div>
                      </template>
                    </v-file-input>
                    <v-btn
                      v-if="!isStoreMode && item.assistance_file && !item.assistance_file_doc"
                      icon
                      variant="text"
                      size="small"
                      :color="item.assistance_file_dlt ? 'error' : 'default'"
                      @click="item.assistance_file_dlt = !item.assistance_file_dlt"
                      class="ml-1"
                      style="margin-top: -20px"
                    >
                      <v-icon size="small">
                        {{ item.assistance_file_dlt ? 'mdi-close-circle' : 'mdi-delete' }}
                      </v-icon>
                      <v-tooltip activator="parent" location="bottom">
                        {{ item.assistance_file_dlt ? 'Revertir eliminación' : 'Eliminar' }}
                      </v-tooltip>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12">
            <div class="text-right">
              <v-btn
                icon
                variant="flat"
                size="x-small"
                :color="isStoreMode ? 'success' : 'warning'"
                @click.prevent="handleAction"
                :loading="isLoading"
              >
                <v-icon>mdi-check</v-icon>
                <v-tooltip activator="parent" location="left">Continuar</v-tooltip>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
  <v-dialog v-model="confirmDialog" max-width="800" persistent>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Confirmar Registros</span>
        <v-btn icon @click="confirmDialog = false" variant="text" size="x-small">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-alert type="info" class="mb-4"> Revise los registros antes de confirmar </v-alert>

        <v-card v-for="(registro, index) in registrosConfirmacion" :key="index" class="mb-4">
          <v-card-title>
            <v-row dense>
              <v-col cols="11">
                <CardTitle :text="`REGISTRO ${index + 1} | ${registro.uiid}`" sub />
              </v-col>
            </v-row>
          </v-card-title>

          <v-card-text>
            <v-row dense>
              <v-col cols="12" md="3">
                <VisVal label="Nombre" :value="registro.name" />
              </v-col>
              <v-col cols="12" md="3">
                <VisVal label="Apellido Paterno" :value="registro.surname_p" />
              </v-col>
              <v-col cols="12" md="3">
                <VisVal label="Apellido Materno" :value="registro.surname_m" />
              </v-col>
              <v-col cols="12" md="3">
                <VisVal label="Fecha" :value="formatDate(registro.timestamp)" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn color="grey" @click="confirmDialog = false">Cancelar</v-btn>
        <v-btn color="primary" @click="confirmSubmit">Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
// Importaciones de librerías externas
import { ref, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

// Importaciones internas del proyecto
import { useStore } from '@/store'
import { URL_API } from '@/utils/config'
import { getHdrs, getErr, getRsp } from '@/utils/http'
import { getDecodeId } from '@/utils/coders'
import { getRules } from '@/utils/validators'
import { getObj, getFormData } from '@/utils/helpers'
import { getUserObj } from '@/utils/objects'

// Componentes
import BtnBack from '@/components/BtnBack.vue'
import CardTitle from '@/components/CardTitle.vue'
import BtnDwd from '@/components/BtnDwd.vue'
import VisVal from '@/components/VisVal.vue'

// Constantes fijas
const routeName = 'assistance'

// Estado y referencias
const alert = inject('alert')
const confirm = inject('confirm')
const store = useStore()
const router = useRouter()
const route = useRoute()

// Estado reactivo
const itemId = ref(route.params.id ? getDecodeId(route.params.id) : null)
const isStoreMode = ref(!itemId.value)
const isLoading = ref(true)
const formRef = ref(null)
const item = ref({
  assistance_file: null,
  assistance_file_doc: null,
  assistance_file_dlt: false,
})
const rules = getRules()
const roles = ref([])
const rolesLoading = ref(true)
const confirmDialog = ref(false)
const registrosConfirmacion = ref([])

// Obtener datos
const getItem = async () => {
  if (isStoreMode.value) {
    item.value = {
      assistance_file: null,
      assistance_file_doc: null,
      assistance_file_dlt: false,
    }
    isLoading.value = false
  } else {
    try {
      const endpoint = `${URL_API}/users/${routeName}/file/${itemId.value}`
      const response = await axios.get(endpoint, getHdrs(store.getAuth?.token))
      item.value = getRsp(response).data.item
    } catch (err) {
      alert?.show('red-darken-1', getErr(err))
    } finally {
      isLoading.value = false
    }
  }
}

const handleAction = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) {
    alert?.show('red-darken-1', 'Revisa los detalles señalados')
    return
  }

  isLoading.value = true
  const payload = getObj(item.value, isStoreMode.value)

  try {
    const endpoint = `${URL_API}/users/${routeName}/file/records`
    const response = getRsp(
      await axios.post(endpoint, getFormData(payload), getHdrs(store.getAuth?.token, true))
    )

    registrosConfirmacion.value = response.data
    confirmDialog.value = true
  } catch (err) {
    alert?.show('red-darken-1', getErr(err))
  } finally {
    isLoading.value = false
  }
}

const confirmSubmit = async () => {
  isLoading.value = true
  const payload = getObj(item.value, isStoreMode.value)

  try {
    const endpoint = `${URL_API}/users/${routeName}/file`
    const response = getRsp(
      await axios.post(endpoint, getFormData(payload), getHdrs(store.getAuth?.token, true))
    )

    alert?.show('success', response.msg)
    confirmDialog.value = false

    router.push({
      name: 'assistance/file'
    })
  } catch (err) {
    alert?.show('red-darken-1', getErr(err))
  } finally {
    isLoading.value = false
  }
}

//Formatear fecha
const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  return date.toLocaleString('es-MX', {
    timeZone: 'America/Mexico_City',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Inicialización
onMounted(() => {
  getItem()
})
</script>