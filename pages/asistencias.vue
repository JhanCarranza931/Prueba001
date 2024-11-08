<template>
  <template v-if="isAdmin">
    <div class="p-6 ">
      <table class="min-w-full bg-white">
        <thead>
          <tr class="border-b">
            <th class="text-left py-3 px-4  text-sm">Nombres</th>
            <th class="text-left py-3 px-4  text-sm">Hora Entrada</th>
            <th class="text-left py-3 px-4  text-sm">Hora Salida</th>
            <th class="text-left py-3 px-4  text-sm">Asistencia</th>
            <th class="text-left py-3 px-4  text-sm">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(asis,index) in asistencias" :key="asis.id" :class="{ 'bg-gray-50': index % 2 === 0 }">
            <td class="py-3 px-4">
              <div class="flex items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png" class="w-10 h-10 rounded-full mr-4">
                <div>
                  <p class="font-semibold text-sm">{{ asis.usuario.nombre+' '+asis.usuario.apellido }}</p>
                  <p class="text-xs text-gray-600">{{ asis.usuario.carrera }}</p>
                </div>
              </div>
            </td>
            <td class="py-3 px-4 text-sm">{{ formatDate(asis.hora_entrada) }}</td>
            <td class="py-3 px-4 text-sm">{{ formatDate(asis.hora_salida)  }}</td>
            <td class="py-3 px-4">
              <span  class="px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                {{ asis.estadoAsis.stado_asis}}
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
  import { useSessionStore } from '~/stores/sessionStore';
  const  sessionStore = useSessionStore()
  const isAdmin = sessionStore.isAdmin;
  const isUser = sessionStore.isUser;
  definePageMeta({
    middleware:'auth',
  });

  const asisStore = useAsistenciasStore();
  const asistencias = computed( () => asisStore.asistencias)
  console.log(asistencias)

  onMounted(async () => {
        asisStore.fetchAsistencia();
  })

  function formatDate(dateString) {
    if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleString('es-ES', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12:true,
      });
    }
  </script>