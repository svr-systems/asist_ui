/**
 * Devuelve el año actual.
 * @returns {number} Año en formato YYYY.
 */
export const getCurrentYear = () => {
  return new Date().getFullYear()
}

/**
 * Retorna un objeto clonado y, si es modo edición, agrega _method: PATCH.
 * @param {Object} data - Datos del formulario.
 * @param {boolean} isStoreMode - Indica si es nuevo registro (true) o edición (false).
 * @returns {Object} Objeto modificado.
 */
export const getObj = (data, isStoreMode = false) => {
  const obj = { ...data }
  if (!isStoreMode) obj._method = 'PATCH'
  return obj
}

/**
 * Convierte un objeto plano en FormData, serializando objetos y limpiando nulos.
 * @param {Object} data - Objeto de entrada.
 * @returns {FormData} FormData generado.
 */
export const getFormData = (data) => {
  const formData = new FormData()

  for (const key in data) {
    const value = data[key]
    const isEmpty = typeof value === 'string' && value.trim() === ''
    const isObject = typeof value === 'object' && !(value instanceof File) && value !== null

    formData.append(key, value == null || isEmpty ? '' : isObject ? JSON.stringify(value) : value)
  }

  return formData
}

/**
 * Extrae una subpropiedad anidada y la asigna como propiedad directa.
 * @param {Object} target - Objeto principal.
 * @param {string} sourceKey - Propiedad contenedora.
 * @param {string} nestedKey - Clave a extraer.
 * @returns {Object} Objeto actualizado.
 */
export const extractNestedProp = (target, sourceKey, nestedKey) => {
  const nested = target?.[sourceKey]
  if (nested && typeof nested === 'object') {
    target[`${sourceKey}_${nestedKey}`] = nested[nestedKey]
  }
  return target
}

/**
 * Extrae una clave de cada objeto en un arreglo anidado y las asigna planas.
 * @param {Object} target - Objeto principal.
 * @param {string} arrayKey - Propiedad que contiene el arreglo.
 * @param {string} nestedKey - Clave a extraer.
 * @returns {Object} Objeto actualizado.
 */
export const extractMultipleNestedProps = (target, arrayKey, nestedKey) => {
  const array = target?.[arrayKey]
  if (Array.isArray(array)) {
    array.forEach((item, index) => {
      if (item?.[nestedKey] !== undefined) {
        target[`${arrayKey}_${nestedKey}_${index}`] = item[nestedKey]
      }
    })
  }
  return target
}
