<template>
  <v-row justify="center">
    <v-col cols="12" md="4" class="mt-11">
      <v-card elevation="24" class="py-4 px-4" :loading="isLoading" :disabled="isLoading">
        <v-card-text class="text-center">
          <v-row dense>
            <v-col cols="12" class="text-left" style="height: 40px" />
            <v-col cols="12" class="pb-6">
              <Logo width="60%" />
            </v-col>
            <v-col cols="12">
              <v-form ref="formRef" @submit.prevent="loginAction">
                <v-row dense>
                  <v-col cols="12" class="text-left">
                    <v-text-field
                      v-model="item.email"
                      label="E-mail"
                      type="email"
                      variant="outlined"
                      density="compact"
                      maxlength="65"
                      counter
                      :rules="rules.emailRequired"
                      autocomplete="email"
                      hide-details="auto"
                    />
                  </v-col>
                  <v-col cols="12" class="text-left">
                    <InpPassword
                      v-model="item.password"
                      label="Contraseña"
                      counter
                      :rules="rules.required"
                      autocomplete="current-password"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-btn block color="info" type="submit" :loading="isLoading">
                      Iniciar sesión
                      <v-icon end>mdi-login</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
            <v-col cols="12" class="pt-4">
              <v-btn
                variant="text"
                size="x-small"
                :to="{ name: 'user_password_recover', query: { email: item.email } }"
              >
                ¿Olvidaste tu contraseña?
              </v-btn>
            </v-col>
            <v-col cols="12" class="pt-8">
              <BtnTheme />
            </v-col>
            <v-col cols="12" class="pt-2">
              <Version />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
// Librerías
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// Estado global y utilidades
import { useStore } from '@/store'
import { URL_API } from '@/utils/config'
import { getHdrs, getErr, getRsp } from '@/utils/http'
import { getObj } from '@/utils/helpers'
import { getRules } from '@/utils/validators'

// Componentes
import Logo from '@/components/Logo.vue'
import InpPassword from '@/components/InpPassword.vue'
import BtnTheme from '@/components/BtnTheme.vue'
import Version from '@/components/Version.vue'

// Estado
const alert = inject('alert')
const router = useRouter()
const store = useStore()

const isLoading = ref(false)
const formRef = ref(null)
const item = ref({
  email: '',
  password: '',
})
const rules = getRules()

// Funciones
const loginAction = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  isLoading.value = true
  const payload = getObj(item.value, true)

  try {
    const endpoint = `${URL_API}/login`
    const response = await axios.post(endpoint, payload, getHdrs())

    await store.loginAction(getRsp(response).data.auth)
    await router.push({ name: 'home' })
  } catch (err) {
    alert?.show('red-darken-1', getErr(err))
  } finally {
    isLoading.value = false
  }
}
</script>
