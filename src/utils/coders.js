/**
 * Codifica un ID en base64.
 * @param {string|number} id - Identificador a codificar.
 * @returns {string} ID codificado.
 */
export const getEncodeId = (id) => {
  return window.btoa(String(id))
}

/**
 * Decodifica un ID desde base64.
 * @param {string} encodedId - Identificador codificado.
 * @returns {string|null} ID decodificado o null si falla.
 */
export const getDecodeId = (encodedId) => {
  try {
    return window.atob(encodedId)
  } catch (error) {
    return null
  }
}

/**
 * Obtiene un objeto Blob desde base64.
 * @param {string} base64 - Contenido codificado.
 * @param {string} ext - Extensión del archivo (pdf, jpg, png...).
 * @returns {Blob} Blob del contenido con su tipo MIME.
 */
export const getBlob = (base64, ext) => {
  const mimeMap = {
    pdf: 'application/pdf',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    txt: 'text/plain',
    csv: 'text/csv',
  }

  const cleanedBase64 = base64.replace(/\s/g, '')
  const binary = atob(cleanedBase64)
  const byteArray = new Uint8Array(binary.length)

  for (let i = 0; i < binary.length; i++) {
    byteArray[i] = binary.charCodeAt(i)
  }

  const type = mimeMap[ext.toLowerCase()] || `application/${ext}`

  return new Blob([byteArray], { type })
}
