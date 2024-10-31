<template>
  <template v-if="isAdmin">
    <div class="p-6 ">
      <table class="min-w-full bg-white">
        <thead>
          <tr class="border-b">
            <th class="text-left py-3 px-4 font-semibold text-sm">Nombres</th>
            <th class="text-left py-3 px-4 font-semibold text-sm">Hora Entrada</th>
            <th class="text-left py-3 px-4 font-semibold text-sm">Hora Salida</th>
            <th class="text-left py-3 px-4 font-semibold text-sm">Asistencia</th>
            <th class="text-left py-3 px-4 font-semibold text-sm">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(employee, index) in employees" :key="employee.id" :class="{ 'bg-gray-50': index % 2 === 0 }">
            <td class="py-3 px-4">
              <div class="flex items-center">
                <img :src="employee.avatar" :alt="employee.name" class="w-10 h-10 rounded-full mr-4">
                <div>
                  <p class="font-semibold text-sm">{{ employee.name }}</p>
                  <p class="text-xs text-gray-600">{{ employee.position }}</p>
                </div>
              </div>
            </td>
            <td class="py-3 px-4 text-sm">{{ employee.entryTime }}</td>
            <td class="py-3 px-4 text-sm">{{ employee.exitTime }}</td>
            <td class="py-3 px-4">
              <span :class="getStatusClass(employee.status)" class="px-2 py-1 rounded-full text-xs font-semibold">
                {{ employee.status }}
              </span>
            </td>
            <td class="py-3 px-4">
              <button class="text-indigo-600 hover:text-indigo-900">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  
  </template>
  <template v-else-if="isUser">
    <UsuarioAsistencias></UsuarioAsistencias>
  </template>
   
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useSessionStore } from '~/stores/sessionStore';
const  sessionStore = useSessionStore()
const isAdmin = sessionStore.isAdmin;
const isUser = sessionStore.isUser;
  definePageMeta({
    middleware:'auth',
  });
  const employees = ref([
    {
      id: 1,
      name: 'Nilser Villanueva',
      position: 'Diseño gráfico',
      avatar: 'https://pstangarana.com/wp-content/uploads/2024/07/BECADO-g-SN-1-1.jpg',
      entryTime: '12/10/2025 08:50',
      exitTime: '12/10/2025 19:05',
      status: 'Permiso'
    },
    {
      id: 2,
      name: 'Jhan Carranza',
      position: 'Ing. Software',
      avatar: 'https://pstangarana.com/wp-content/uploads/2023/09/jh.webp',
      entryTime: '12/10/2025 08:56',
      exitTime: '12/10/2025 18:40',
      status: 'Presente'
    },
    {
      id: 3,
      name: 'Jack Troncos',
      position: 'Ing. Software',
      avatar: 'https://pstangarana.com/wp-content/uploads/2024/07/BECADO-g-SN-3.jpg',
      entryTime: '12/10/2025 08:57',
      exitTime: '12/10/2025 16:05',
      status: 'Ausente'
    },
    {
      id: 4,
      name: 'Jack Troncos',
      position: 'Ing. Software',
      avatar: 'https://pstangarana.com/wp-content/uploads/2024/07/BECADO-g-SN-3.jpg',
      entryTime: '12/10/2025 08:57',
      exitTime: '12/10/2025 16:05',
      status: 'Ausente'
    }
  ]);
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'Permiso':
        return 'bg-blue-100 text-blue-800';
      case 'Presente':
        return 'bg-green-100 text-green-800';
      case 'Ausente':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  </script>