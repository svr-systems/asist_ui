<template>
  <div class="text-caption font-weight-thin text-medium-emphasis">
    Desarrollado por SVR © {{ getCurrentYear() }}
    <br />
    <small>{{ APP_VERSION }}</small>
  </div>
</template>

<script setup>
// Constantes y funciones
import { APP_VERSION } from '@/utils/config'
import { getCurrentYear } from '@/utils/helpers'
</script>
