<template>
  <v-dialog v-model="show" persistent scrim="black" max-width="600">
    <v-card flat>
      <v-card-title>
        <v-row dense>
          <v-col cols="11">
            <CardTitle text="REGISTRO" icon="mdi-clock-outline" sub />
          </v-col>
          <v-col cols="1" class="text-right">
            <v-btn icon variant="text" size="x-small" @click="show = false">
              <v-icon>mdi-close</v-icon>
              <v-tooltip activator="parent" location="left">Cerrar</v-tooltip>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text v-if="item">
        <v-row dense>
          <v-col cols="6">
            <VisVal label="Creación" :value="item.created_by?.email" :sub="item.created_at" />
          </v-col>
          <v-col cols="6">
            <VisVal label="Últ. edición" :value="item.updated_by?.email" :sub="item.updated_at" />
          </v-col>
          <v-col v-if="item.email_verified_at" cols="6">
            <VisVal label="Verif." :value="item.email_verified_at" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
// Importaciones
import { computed } from 'vue'
import CardTitle from '@/components/CardTitle.vue'
import VisVal from '@/components/VisVal.vue'

// Props
const props = defineProps({
  modelValue: Boolean,
  item: Object,
})

// Emit
const emit = defineEmits(['update:modelValue'])

// Modelo bidireccional
const show = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})
</script>
