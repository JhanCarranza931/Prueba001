<template>
    <div class=" rounded-lg p-6 transition-all duration-300 txtcolor borde">
      <div class="flex justify-between items-center mb-4">
        <h2 class="">{{ title }}</h2>
        <Icon :name="icon" class="w-6 h-6" />
      </div>
      <div class="text-2xl txtcolor font-bold">{{ value }}</div>
      <div class="text-sm">
        +{{ increase }}% el mes pasado
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  
  defineProps<{
    title: string
    value: string | number
    increase: number
    icon: string
  }>()
  </script> 