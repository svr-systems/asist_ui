/**
 * Genera headers HTTP con o sin token.
 * @param {string|null} token - Token JWT (si aplica).
 * @param {boolean} useFormData - Si true, usa multipart/form-data.
 * @returns {Object} Objeto con headers.
 */
export const getHdrs = (token = null, useFormData = false) => {
  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': useFormData ? 'multipart/form-data' : 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return { headers }
}

/**
 * Devuelve el mensaje principal de un error HTTP y muestra detalles si está activo el debug.
 * @param {Object} error - Objeto de error recibido.
 * @returns {string} Mensaje de error.
 */
export const getErr = (error) => {
  const msg = error?.response?.data?.msg || 'Error desconocido'
  const details = error?.response?.data?.data || null

  if (import.meta.env.VITE_LOG_ERRORS === 'true' && details) {
    console.error(details)
  }

  return msg
}

/**
 * Extrae la propiedad 'data' de la respuesta API.
 * @param {Object} response - Respuesta HTTP.
 * @returns {any} Contenido de response.data.
 */
export const getRsp = (response) => {
  return response?.data
}
