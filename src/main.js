// Importaciones de librerías externas
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { es } from 'vuetify/locale'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Importaciones de estilos y assets globales
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

// Importaciones internas del proyecto
import App from './App.vue'
import router from '@/router'
import { useStore } from '@/store'

// Crear instancia de Pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Crear instancia de la app
const app = createApp(App)
app.use(pinia)

// Acceder al store después de registrar Pinia
const store = useStore()

// Crear instancia de Vuetify con configuración dinámica
const vuetify = createVuetify({
  components: await import('vuetify/components'),
  directives: await import('vuetify/directives'),
  theme: {
    defaultTheme: store.conf.theme_dark ? 'dark' : 'light',
  },
  locale: {
    locale: 'es',
    fallback: 'es',
    messages: { es },
  },
})

// Montar la aplicación
app.use(vuetify)
app.use(router)
app.mount('#app')
