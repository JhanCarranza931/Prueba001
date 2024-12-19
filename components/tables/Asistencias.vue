<template>
  <div  class="max-h-[350px] overflow-y-auto sc">
    <table class="min-w-full bg-white">
      <thead>
        <tr class="border-b  text-sm">
          <th class="text-left py-3 px-4 font-semibold">Nombres</th>
          <th class="text-left py-3 px-4 font-semibold">DNI</th>
          <th class="text-left py-3 px-4 font-semibold">Hora Entrada</th>
          <th class="text-left py-3 px-4 font-semibold">Hora Salida</th>
          <th class="text-left py-3 px-4 font-semibold">Estado</th>


        </tr>
      </thead>




      <tbody v-if="isAdmin">
        <tr v-for="asis in asistencias" class="border-b hover:bg-gray-100">
          <td class="py-2 px-4">
            <div class="flex items-center">
              <img class="h-8 max-w-8 rounded-full mr-4" :src="getbase(asis.usuario.foto.data)" >
              <div>
                <div class="font-medium">{{ asis.usuario.nombre + ' '+asis.usuario.apellido }}</div>
                <div class="text-gray-500 text-xs">{{asis.usuario.carrera}}</div>
              </div>
            </div>
          </td>
          <td class="py-2 px-4 text-sm">{{asis.usuario.dni}}</td>
          <td class="py-2 px-4 text-sm">{{ asis.hora_entrada }}</td>
          <td class="py-2 px-4 text-sm">{{ asis.hora_salida }}</td>
          <td class="py-2 px-4 text-sm">{{ asis.estadoAsis.stado_asis }}</td>
          
        </tr>


      </tbody >
      <tbody v-else>
  <tr v-for="asis in asistencias" 
      :key="asis.id || asis.usuario?.dni" 
      class="border-b hover:bg-gray-100">
    <template v-if="asis.usuario && asis.usuario.dni === dni">
      <td class="py-2 px-4">
        <div class="flex items-center">
          <img class="h-8 max-w-8 rounded-full mr-4" :src="asis.usuario.foto?.data ? getbase(asis.usuario.foto.data) : ''">
          <div>
            <div class="font-medium">{{ asis.usuario.nombre + ' ' + asis.usuario.apellido }}</div>
            <div class="text-gray-500 text-xs">{{ asis.usuario.carrera }}</div>
          </div>
        </div>
      </td>
      <td class="py-2 px-4 text-sm">{{ asis.usuario.dni }}</td>
      <td class="py-2 px-4 text-sm">{{ asis.hora_entrada }}</td>
      <td class="py-2 px-4 text-sm">{{ asis.hora_salida }}</td>
    </template>
  </tr>
</tbody>






    </table>
  </div>
</template>
<script setup>
const sessionStore = useSessionStore();
const isAdmin = sessionStore.isAdmin;
const isUser = sessionStore.isUser;
const { user } = useAuth();

const dni = user.value.dni;

const getbase = (data) => {
  if (import.meta.client) {
    return `data:image/jpeg;base64,${btoa(
      String.fromCharCode(...new Uint8Array(data))
    )}`;
  }
  return ""; 
};

const asisStore = useAsistenciasStore();
const asistencias = computed(() => asisStore.asistencias);

onMounted(async () => {
  asisStore.fetchAsistencia();
});</script>




<style scoped>

.sc.scroll-active{
    overflow: auto;
    padding-right: 17px; 
}
.sc::-webkit-scrollbar {
  width: 5px;               /* width of the entire scrollbar */
}



.sc::-webkit-scrollbar-thumb {
  background-color: #059669;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
}
</style>
