export const getUserObj = () => {
  return {
    id: null,
    active: true,
    name: null,
    surname_p: null,
    surname_m: null,
    avatar: null, //NOMBRE DEL ARCHIVO EN BD
    avatar_doc: null, //REGRESAR NULL, OBJETO FILE EN FRONT
    avatar_dlt: false, //FALSE EN API, BORRA EL ARCHIVO DE LA CARPETA EN TRUE
    email: null,
    role_id: null,
    phone: null,
    movil_phone: null,
  }
}
