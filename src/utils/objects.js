/**
 * Objeto base para formularios de usuario.
 * @returns {Object} Estructura inicial de usuario.
 */
export const getUserObj = () => ({
  id: null,
  active: true,
  name: null,
  surname_p: null,
  surname_m: null,
  avatar: null,
  avatar_doc: null,
  avatar_dlt: false,
  email: null,
  role_id: null,
  phone: null,
  movil_phone: null,
})
