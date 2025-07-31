/**
 * Retorna la fecha y hora actual con separadores personalizados.
 * @param {string} dateSep - Separador entre año, mes y día (por defecto: '-').
 * @param {string} dateTimeSep - Separador entre fecha y hora (por defecto: ' ').
 * @param {string} timeSep - Separador entre horas, minutos y segundos (por defecto: ':').
 * @returns {string} Fecha y hora en formato YYYY-MM-DD HH:MM:SS.
 */
export const getDateTime = (dateSep = '-', dateTimeSep = ' ', timeSep = ':') => {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  const date = [year, month, day].join(dateSep)
  const time = [hours, minutes, seconds].join(timeSep)

  return `${date}${dateTimeSep}${time}`
}

/**
 * Formatea un número como monto en USD con dos decimales.
 * Retorna '-' si el valor no es válido.
 * @param {number|string|null} value - Valor a formatear.
 * @returns {string} Monto formateado o '-'.
 */
export const getAmountFormat = (value) => {
  if (value === null || value === '') return '-'

  const numeric = parseFloat(value)
  if (isNaN(numeric)) return '-'

  return numeric.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

/**
 * Formatea un número como porcentaje.
 * Retorna '-' si el valor no es válido.
 * @param {number|string|null} value - Valor a formatear.
 * @returns {string} Porcentaje formateado o '-'.
 */
export const getPercentFormat = (value) => {
  if (value === null || value === '') return '-'

  const numeric = parseFloat(value)
  if (isNaN(numeric)) return '-'

  return `${numeric}%`
}
