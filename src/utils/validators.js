/**
 * Reglas de validación reutilizables para formularios.
 */
export const getRules = () => {
  const required =
    (msg = 'Campo requerido') =>
    (value) =>
      !!value || msg
  const maxLength = (max, msg) => (value) => !value || value.length <= max || msg
  const minLength = (min, msg) => (value) => !value || value.length >= min || msg
  const regexMatch = (regex, msg) => (value) => !value || regex.test(value) || msg
  const fileMaxSize = (maxBytes, label) => (value) =>
    !value || value.size <= maxBytes || `Máximo ${label}`
  const fileRequiredSize = (maxBytes, label) => (value) =>
    (value && value.size <= maxBytes) || `Máximo ${label}`

  return {
    required: [required()],
    requiredNotNull: [(value) => value != null || 'Campo requerido'],

    textRequired: [required(), minLength(2, 'Mínimo 2 caracteres')],
    textOptional: [minLength(2, 'Mínimo 2 caracteres')],

    emailRequired: [
      required(),
      maxLength(65, 'Máximo 65 caracteres'),
      regexMatch(/.+@.+\..+/, 'Formato inválido'),
    ],
    emailOptional: [
      maxLength(65, 'Máximo 65 caracteres'),
      regexMatch(/.+@.+\..+/, 'Formato inválido'),
    ],

    passwordRequired: [
      required(),
      minLength(8, 'Mínimo 8 caracteres'),
      maxLength(30, 'Máximo 30 caracteres'),
      regexMatch(/(?=.*[A-Z])/, 'Al menos una mayúscula'),
      regexMatch(/(?=.*[a-z])/, 'Al menos una minúscula'),
      regexMatch(/(?=.*[0-9])/, 'Al menos un número'),
      regexMatch(/(?=.*[!@$%*])/, 'Al menos un carácter especial (! @ $ % *)'),
    ],

    fileRequired: [required(), fileRequiredSize(1048576, '1MB')],
    fileOptional: [fileMaxSize(1048576, '1MB')],

    imageRequired: [required(), fileRequiredSize(2097152, '2MB')],
    imageOptional: [fileMaxSize(2097152, '2MB')],

    fiscalCodeRequired: [
      required(),
      maxLength(13, 'Máximo 13 caracteres'),
      regexMatch(/^[A-Za-zñÑ&]{3,4}\d{6}\w{3}$/, 'Formato inválido'),
    ],
    fiscalCodeOptional: [
      maxLength(13, 'Máximo 13 caracteres'),
      regexMatch(/^[A-Za-zñÑ&]{3,4}\d{6}\w{3}$/, 'Formato inválido'),
    ],

    zipRequired: [required(), regexMatch(/^\d{5}$/, 'Ingresar 5 dígitos')],
    zipOptional: [regexMatch(/^\d{5}$/, 'Ingresar 5 dígitos')],

    phoneRequired: [required(), regexMatch(/^\d{10}$/, 'Ingresar 10 dígitos')],
    phoneOptional: [regexMatch(/^\d{10}$/, 'Ingresar 10 dígitos')],
  }
}
