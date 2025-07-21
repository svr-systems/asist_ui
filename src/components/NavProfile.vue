<template>
  <v-dialog v-model="dialogModel" persistent scrim="black" max-width="400">
    <v-card
      class="pa-4 text-center"
      elevation="24"
      style="border-radius: 24px"
      :loading="isLoading"
      :disabled="isLoading"
    >
      <v-row dense>
        <v-col cols="6"></v-col>
        <v-col cols="6" class="text-right">
          <v-btn icon variant="text" size="small" @click.prevent="dialogModel = false">
            <v-icon>mdi-close</v-icon>
            <v-tooltip activator="parent" location="bottom">Cerrar</v-tooltip>
          </v-btn>
        </v-col>
      </v-row>

      <div class="text-h6 font-weight-bold mb-2">{{ store.auth?.user?.email || 'Correo' }}</div>

      <v-avatar size="100" class="mx-auto my-2" style="position: relative; overflow: visible">
        <v-img v-if="store.auth?.user?.avatar_b64" :src="store.auth.user.avatar_b64" />
        <v-icon v-else size="120">mdi-account-circle</v-icon>
      </v-avatar>

      <div class="text-subtitle-1 font-weight-medium mb-4">
        {{ store.auth?.user?.name || 'Nombre' }}
      </div>

      <v-row dense>
        <v-col cols="6">
          <v-sheet class="py-2" style="border: 3px solid #222; border-radius: 50px 0 0 50px">
            <div class="text-caption font-weight-bold">Rol</div>
            <div>{{ store.auth?.user?.role?.name || '---' }}</div>
          </v-sheet>
        </v-col>
        <v-col cols="6">
          <v-sheet class="py-2" style="border: 3px solid #222; border-radius: 0 50px 50px 0">
            <div class="text-caption font-weight-bold">ID</div>
            <div>{{ store.auth?.user?.uiid || '---' }}</div>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row align="center" justify="center" class="mt-4">
        <v-icon :color="!isDark ? 'orange' : 'grey'">mdi-white-balance-sunny</v-icon>
        <v-switch
          v-model="isDarkLocal"
          hide-details
          inset
          color="primary"
          class="mx-2"
          style="margin-top: -8px"
        />
        <v-icon :color="isDark ? 'blue-grey' : 'grey'">mdi-weather-night</v-icon>
      </v-row>

      <div class="text-center">
        <v-btn
          style="border: 3px solid #222; border-radius: 20px; min-width: 200px"
          class="mt-4"
          @click="logout"
        >
          Cerrar Sesión
          <v-icon end>mdi-logout</v-icon>
        </v-btn>
      </div>

      <Version class="mt-2" />
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
import { useStore } from '@/store'
import Version from '@/components/Version.vue'

// Store y router
const store = useStore()
const router = useRouter()
const theme = useTheme()

// Props para v-model
const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

// Estado de loading
const isLoading = ref(false)

// Computed para dialog
const dialogModel = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

// Estado tema
const isDark = computed(() => store.conf.theme_dark)
const isDarkLocal = ref(isDark.value)

watch(isDarkLocal, (val) => {
  store.themeDarkAction()
  theme.global.name.value = val ? 'dark' : 'light'
})
watch(
  isDark,
  (val) => {
    isDarkLocal.value = val
  },
  { immediate: true }
)

// Función logout
const logout = async () => {
  isLoading.value = true
  try {
    store.logoutAction()
    router.push({ name: 'login' })
  } catch (err) {
    alert?.show('error', getErr(err))
  } finally {
    isLoading.value = false
    emit('update:modelValue', false)
  }
}
</script>