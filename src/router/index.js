// Importaciones de Vue Router
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

// Importación de las rutas definidas
import routes from './routes'

// Selección del historial según entorno
const isProd = process.env.NODE_ENV === 'production'
const history = isProd
  ? createWebHashHistory(import.meta.env.BASE_URL)
  : createWebHistory(import.meta.env.BASE_URL)

// Instancia del router
const router = createRouter({
  history,
  routes,
})

// Middleware y título de la página
router.beforeEach((to, from, next) => {
  if (to.meta?.title) {
    document.title = to.meta.title
  }

  const middleware = to.meta?.middleware
  return typeof middleware === 'function' ? middleware(to, from, next) : next()
})

export default router
