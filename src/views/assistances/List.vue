<template>
  <v-card elevation="24" :disabled="isLoading">
    <v-card-title>
      <v-row dense>
        <v-col cols="10">
          <BtnBack
            :route="{
              name: 'assistance/file',
            }"
          />
          <CardTitle :text="route.meta.title" :icon="route.meta.icon" />
        </v-col>
        <v-col cols="2" class="text-right">
          <v-btn
            icon
            variant="flat"
            size="x-small"
            color="success"
            :to="{ name: `${routeName}/store` }"
          >
            <v-icon>mdi-plus</v-icon>
            <v-tooltip activator="parent" location="bottom">Agregar</v-tooltip>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text>
      <v-row dense>
        <v-col cols="12" md="9" class="pb-0">
          <v-row dense>
            <v-col v-if="store.getAuth?.user?.role_id === 1" cols="12" md="3" class="pb-0">
              <v-select
                label="Mostrar"
                v-model="active"
                variant="outlined"
                density="compact"
                :items="activeOptions"
                item-title="name"
                item-value="id"
                :disabled="!isItemsEmpty"
              />
            </v-col>
            <v-col cols="12" md="3" class="pb-0">
              <v-select
                label="Filtro"
                v-model="filter"
                variant="outlined"
                density="compact"
                :items="filterOptions"
                item-title="name"
                item-value="id"
                :disabled="!isItemsEmpty"
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="3" class="pb-0">
          <v-text-field
            label="Buscar"
            v-model="search"
            type="text"
            variant="outlined"
            density="compact"
            append-inner-icon="mdi-magnify"
            :disabled="isItemsEmpty"
          />
        </v-col>

        <v-col cols="12">
          <v-btn
            block
            size="small"
            :color="isItemsEmpty ? 'info' : 'grey-darken-1'"
            :loading="isItemsEmpty && isLoading"
            @click.prevent="isItemsEmpty ? getItems() : (items = [])"
          >
            {{ isItemsEmpty ? 'Aplicar' : 'Cambiar' }} filtros
            <v-icon right>mdi-filter</v-icon>
          </v-btn>
        </v-col>

        <v-col cols="12">
          <v-table density="compact">
            <thead>
              <tr>
                <th>#</th>
                <th>Usuario</th>
                <th>Fecha de registro</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in items" :key="item.id">
                <td>
                  <b>{{ index + 1 }}</b>
                </td>
                <td>{{ item.user?.full_name || 'N/A' }}</td>
                <td>{{ formatDateTime(item.registered_at) }}</td>
                <td class="text-right">
                  <v-btn
                    icon
                    variant="text"
                    size="x-small"
                    :color="item.active ? '' : 'error'"
                    :to="{ name: `${routeName}/show`, params: { id: getEncodeId(item.id) } }"
                  >
                    <v-icon>mdi-eye</v-icon>
                    <v-tooltip activator="parent" location="left">Detalle</v-tooltip>
                  </v-btn>
                </td>
              </tr>
              <tr v-if="items.length === 0">
                <td colspan="4" class="text-center py-4">No hay registros para mostrar</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
// Importaciones de librerías externas
import { ref, inject, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

// Importaciones internas del proyecto
import { useStore } from '@/store'
import { URL_API } from '@/utils/config'
import { getHdrs, getErr, getRsp } from '@/utils/http'
import { getDecodeId, getEncodeId } from '@/utils/coders'
import BtnBack from '@/components/BtnBack.vue'

// Componentes
import CardTitle from '@/components/CardTitle.vue'

// Constantes fijas
const routeName = 'assistance'

// Estado y referencias
const alert = inject('alert')
const store = useStore()
const router = useRouter()
const route = useRoute()

// Estado reactivo
const fileId = ref(getDecodeId(route.params.file_id))
const isLoading = ref(false)
const items = ref([])
const isItemsEmpty = computed(() => items.value.length === 0)
const search = ref('')
const active = ref(1)
const activeOptions = ref([])
const filter = ref(0)
const filterOptions = ref([])

// Cargar registros
const getItems = async () => {
  isLoading.value = true
  items.value = []

  try {
    const endpoint = `${URL_API}/users/${routeName}`
    const response = await axios.get(endpoint, {
      params: {
        active: active.value,
        filter: filter.value,
        user_assistance_files_id: fileId.value,
      },
      ...getHdrs(store.getAuth?.token),
    })

    items.value = getRsp(response).data.items
  } catch (err) {
    alert?.show('red-darken-1', getErr(err))
  } finally {
    isLoading.value = false
  }
}

const formatDateTime = (timestamp) => {
  if (!timestamp) return ''
  return new Date(timestamp).toLocaleString('es-MX', {
    timeZone: 'America/Mexico_City',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Inicializar
onMounted(() => {
  activeOptions.value = [
    { id: 1, name: 'ACTIVOS' },
    { id: 0, name: 'INACTIVOS' },
  ]

  filterOptions.value = [{ id: 0, name: 'TODOS' }]

  getItems()
})
</script>