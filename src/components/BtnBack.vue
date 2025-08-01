<template>
  <v-btn icon variant="flat" size="x-small" :to="route">
    <v-icon>mdi-chevron-left</v-icon>
    <v-tooltip activator="parent" location="bottom">Regresar</v-tooltip>
  </v-btn>
</template>

<script setup>
// Props
defineProps({
  route: {
    type: Object,
    required: true,
  },
})
</script>
