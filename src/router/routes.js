import Auth from './middleware/Auth'
import Public from './middleware/Public'

const routes = [
  //USR SYSTEM
  //users
  {
    path: '/usuarios',
    name: 'users',
    component: () => import('@/views/users/List.vue'),
    meta: {
      title: 'Usuarios',
      icon: 'mdi-account',
      middleware: Auth,
    },
  },
  {
    path: '/usuarios/agregar',
    name: 'users/store',
    component: () => import('@/views/users/Form.vue'),
    meta: {
      title: 'Usuario | Agregar',
      icon: 'mdi-account',
      middleware: Auth,
    },
  },
  {
    path: '/usuarios/:id',
    name: 'users/show',
    component: () => import('@/views/users/Show.vue'),
    props: true,
    meta: {
      title: 'Usuario',
      icon: 'mdi-account',
      middleware: Auth,
    },
  },
  {
    path: '/usuarios/:id/editar',
    name: 'users/update',
    component: () => import('@/views/users/Form.vue'),
    props: true,
    meta: {
      title: 'Usuario | Editar',
      icon: 'mdi-account',
      middleware: Auth,
    },
  },
  //companies
  {
    path: '/empresas',
    name: 'company',
    component: () => import('@/views/companies/List.vue'),
    meta: {
      title: 'Empresas',
      icon: 'mdi-domain',
      middleware: Auth,
    },
  },
  {
    path: '/empresas/agregar',
    name: 'company/store',
    component: () => import('@/views/companies/Form.vue'),
    meta: {
      title: 'Empresa | Agregar',
      icon: 'mdi-domain',
      middleware: Auth,
    },
  },
  {
    path: '/empresas/:id',
    name: 'company/show',
    component: () => import('@/views/companies/Show.vue'),
    props: true,
    meta: {
      title: 'Empresa',
      icon: 'mdi-domain',
      middleware: Auth,
    },
  },
  {
    path: '/empresas/:id/editar',
    name: 'company/update',
    component: () => import('@/views/companies/Form.vue'),
    props: true,
    meta: {
      title: 'Empresa | Editar',
      icon: 'mdi-domain',
      middleware: Auth,
    },
  },
  //branches
  {
    path: '/empresas/:company_id/sucursales',
    name: 'branch',
    component: () => import('@/views/branches/List.vue'),
    props: true,
    meta: {
      title: 'Sucursales',
      icon: 'mdi-bank',
      middleware: Auth,
    },
  },
  {
    path: '/empresas/:company_id/sucursales/agregar',
    name: 'branch/store',
    component: () => import('@/views/branches/Form.vue'),
    meta: {
      title: 'Sucursal | Agregar',
      icon: 'mdi-bank',
      middleware: Auth,
    },
  },
  {
    path: '/empresas/:company_id/sucursales/:id',
    name: 'branch/show',
    component: () => import('@/views/branches/Show.vue'),
    props: true,
    meta: {
      title: 'Sucursal',
      icon: 'mdi-bank',
      middleware: Auth,
    },
  },
  {
    path: '/empresas/:company_id/sucursales/:id/editar',
    name: 'branch/update',
    component: () => import('@/views/branches/Form.vue'),
    props: true,
    meta: {
      title: 'Sucursal | Editar',
      icon: 'mdi-bank',
      middleware: Auth,
    },
  },
  //GENERAL
  {
    path: '/inicio',
    name: 'home',
    component: () => import('@/views/general/Home.vue'),
    meta: {
      title: 'Inicio',
      middleware: Auth,
    },
  },
  {
    path: '/no_autorizado',
    name: 'unauthorized',
    component: () => import('@/views/general/Unauthorized.vue'),
    meta: {
      title: 'Acceso Denegado',
      middleware: Auth,
    },
  },
  //PUBLIC
  {
    path: '/iniciar_sesion',
    name: 'login',
    component: () => import('@/views/public/UserLogin.vue'),
    meta: {
      title: 'Iniciar Sesión',
      middleware: Public,
    },
  },
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/public/Main.vue'),
    meta: {
      title: 'SVR',
      middleware: Public,
    },
  },
  {
    path: '/recuperar_contrasena',
    name: 'user_password_recover',
    component: () => import('@/views/public/UserPasswordRecover.vue'),
    meta: {
      title: 'Recuperar contraseña',
      icon: 'mdi-account',
      middleware: Public,
    },
  },
  {
    path: '/restablecer_contrasena/:id',
    name: 'user_password_reset',
    component: () => import('@/views/public/UserPasswordReset.vue'),
    meta: {
      title: 'Restablecer contraseña',
      icon: 'mdi-account',
      middleware: Public,
    },
  },
  {
    path: '/confirmar_cuenta/:id',
    name: 'user_account_confirm',
    component: () => import('@/views/public/UserAccountConfirm.vue'),
    meta: {
      title: 'Confirmar cuenta',
      icon: 'mdi-account',
      middleware: Public,
    },
  },
  //NOT FOUND
  {
    path: '/:pathMatch(.*)*',
    name: 'not_found',
    component: () => import('@/views/public/NotFound.vue'),
  },
]

export default routes
