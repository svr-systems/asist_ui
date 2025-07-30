<template>
  <v-card elevation="24" :disabled="isLoading" :loading="isLoading">
    <v-card-title>
      <v-row dense>
        <v-col cols="10">
          <BtnBack
            :route="{
              name: routeName + (!isStoreMode ? '/show' : ''),
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
                  <v-col cols="12" md="3">
                    <v-text-field
                      label="Nombre"
                      v-model="item.name"
                      type="text"
                      variant="outlined"
                      density="compact"
                      maxlength="50"
                      counter
                      :rules="rules.textRequired"
                    />
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
import { getDecodeId, getEncodeId } from '@/utils/coders'
import { getRules } from '@/utils/validators'
import { getObj, getFormData } from '@/utils/helpers'

// Componentes
import BtnBack from '@/components/BtnBack.vue'
import CardTitle from '@/components/CardTitle.vue'
import BtnDwd from '@/components/BtnDwd.vue'

// Constantes fijas
const routeName = 'branch'

// Estado y referencias
const alert = inject('alert')
const confirm = inject('confirm')
const store = useStore()
const router = useRouter()
const route = useRoute()

// Estado reactivo
const itemId = ref(route.params.id ? getDecodeId(route.params.id) : null)
const companyId = ref(getDecodeId(route.params.company_id))
const isStoreMode = ref(!itemId.value)
const isLoading = ref(true)
const formRef = ref(null)
const item = ref(null)
const rules = getRules()

// Obtener datos
const getItem = async () => {
  if (isStoreMode.value) {
    item.value = {
      id: null,
      name: null,
    }
    isLoading.value = false
  } else {
    isLoading.value = true
    item.value = []

    try {
      const endpoint = `${URL_API}/company/${routeName}/${itemId.value}`
      const response = await axios.get(endpoint, {
        params: {
          id: itemId.value,
          company_id: companyId.value,
        },
        ...getHdrs(store.getAuth?.token),
      })

      item.value = getRsp(response).data.item
    } catch (err) {
      alert?.show('red-darken-1', getErr(err))
    } finally {
      isLoading.value = false
    }
  }
}

// Agregar o editar
const handleAction = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) {
    alert?.show('red-darken-1', 'Revisa los detalles señalados')
    return
  }

  const confirmed = await confirm?.show(
    `¿Confirma ${isStoreMode.value ? 'agregar' : 'editar'} registro?`
  )
  if (!confirmed) return

  isLoading.value = true

  const payload = {
    id: item.value.id,
    name: item.value.name,
    company_id: companyId.value,
  }

  try {
    const endpoint = `${URL_API}/company/${routeName}${
      !isStoreMode.value ? `/${itemId.value}` : ''
    }`
    const method = isStoreMode.value ? 'post' : 'put'
    const response = getRsp(await axios[method](endpoint, payload, getHdrs(store.getAuth?.token)))

    alert?.show('success', response.msg)

    router.push({
      name: `${routeName}/show`,
      params: {
        id: getEncodeId(isStoreMode.value ? response.data.item.id : itemId.value),
        company_id: getEncodeId(companyId.value),
      },
    })
  } catch (err) {
    alert?.show('red-darken-1', getErr(err))
  } finally {
    isLoading.value = false
  }
}

// Inicialización
onMounted(() => {
  getItem()
})
</script>