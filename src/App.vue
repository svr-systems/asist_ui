<template>
  <v-app>
    <Alert ref="alert" />
    <Confirm ref="confirm" />
    <NavBar v-if="auth" />

    <v-main>
      <v-container>
        <router-view :key="$route.fullPath" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
// Importaciones de Vue
import { ref, computed, getCurrentInstance, provide } from 'vue'

// Store principal
import { useStore } from '@/store'

// Componentes globales
import Alert from '@/components/Alert.vue'
import Confirm from '@/components/Confirm.vue'
import NavBar from '@/components/NavBar.vue'

// Instancias y estado
const store = useStore()
const alert = ref(null)
const confirm = ref(null)
const auth = computed(() => store.getAuth)
const app = getCurrentInstance()?.appContext.app

// Inyección de métodos globales
provide('alert', {
  show: (color, msg) => alert.value?.show(color, msg),
})

provide('confirm', {
  show: (options) => confirm.value?.show(options),
})
</script>

<style>
@import '@/style.css';
</style>
