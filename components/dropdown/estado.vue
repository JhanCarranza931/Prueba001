<template>
    <div class="relative">
      <button
        class="bg-white border border-gray-300 rounded-md py-2 px-4 w-[230px] focus:outline-none focus:ring-2 focus:ring-green-500"
        @click="toggleDropdown"
      >
        {{ selectedOption || 'Todos los estados' }}
      </button>
  
      <div v-if="isOpen" class="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
        <div
          v-for="(option, index) in options"
          :key="index"
          @click="selectOption(option)"
          class="py-2 px-4 cursor-pointer hover:bg-emerald-600 hover:text-white"
        >
          {{ option }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isOpen: false,
        selectedOption: null,
        options: ['En progreso', 'Completado', 'Pendiente']
      };
    },
    methods: {
      toggleDropdown() {
        this.isOpen = !this.isOpen;
      },
      selectOption(option) {
        this.selectedOption = option;
        this.isOpen = false;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Agrega los estilos que desees para personalizar el dropdown */
  </style>
  