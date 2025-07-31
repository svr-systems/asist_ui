<template>
  <v-row align="center" justify="center">
    <v-icon :color="!isDark ? 'warning' : 'grey'">mdi-white-balance-sunny</v-icon>
    <v-switch v-model="darkMode" hide-details inset class="mx-2" color="primary" />
    <v-icon :color="isDark ? 'info' : 'grey'">mdi-weather-night</v-icon>
  </v-row>
</template>

<script setup>
// Estado global
import { ref, watch, computed } from 'vue'
import { useTheme } from 'vuetify'
import { useStore } from '@/store'

const store = useStore()
const theme = useTheme()

// Computados y estado local
const isDark = computed(() => store.conf.theme_dark)
const darkMode = ref(isDark.value)

// Sincronización entre toggle y estado global
watch(darkMode, (val) => {
  store.themeDarkAction()
  theme.global.name.value = val ? 'dark' : 'light'
})

watch(
  isDark,
  (val) => {
    darkMode.value = val
  },
  { immediate: true }
)
</script>
