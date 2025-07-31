<template>
  <v-navigation-drawer
    v-model="drawerModel"
    :permanent="!isMobile"
    :temporary="isMobile"
    :expand-on-hover="!isMobile"
    :rail="!isMobile"
  >
    <v-list nav>
      <v-list-item
        v-for="(item, i) in menuItems"
        :key="i"
        :title="item.title"
        :prepend-icon="item.icon"
        :to="{ name: item.link }"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
// Importaciones
import { computed } from 'vue'
import { menuItems } from '@/utils/menu'

// Props y eventos
const props = defineProps({
  modelValue: Boolean,
  isMobile: Boolean,
})
const emit = defineEmits(['update:modelValue'])

// Estado computado
const drawerModel = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>
