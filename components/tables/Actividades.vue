<template>
  <div>
    <div class=" max-h-[350px] overflow-y-auto sc">
    <table class="min-w-full bg-white">
      <thead>
        <tr class="border-b text-sm">
          <th class="text-left py-3 px-4 font-semibold">Nombres</th>
          <th class="text-left py-3 px-4 font-semibold">DNI</th>
          <th class="text-left py-3 px-4 font-semibold">Actividad</th>
          <th class="text-left py-3 px-4 font-semibold">Fecha de Inicio</th>
          <th class="text-left py-3 px-4 font-semibold">Estado</th>

        </tr>
      </thead>




      <tbody v-if="isAdmin">
        <tr v-for="item in actividades" class="border-b hover:bg-gray-100">
          <td class="py-2 px-4">
            <div class="flex items-center">
              <img class="h-8 max-w-8 rounded-full mr-4" :src="getbase(item.usuario.foto.data)" >
              <div>
                <div class="font-medium">{{ item.usuario.nombre +' '+  item.usuario.apellido }}</div>
                <div class="text-gray-500 text-xs">Ing. Software con IA</div>
              </div>
            </div>
          </td>
          <td class="py-2 px-4 text-sm">{{ item.usuario.dni }}</td>
          <td class="py-2 px-4 text-sm">{{ item.actividad }}</td>
          <td class="py-2 px-4 text-sm">{{ item.fecha }}</td>
          <td class="py-2 px-4 text-sm">{{ item.estado.stado_actividad }}</td>

          
        </tr>
      

      </tbody>
      <tbody v-else>
        <tr v-for="item in actividades" class="border-b hover:bg-gray-100"
        :key="item.id || item.usuario?.dni" >
          <template v-if="item.usuario && item.usuario.dni === dni">
          <td class="py-2 px-4">
            <div class="flex items-center">
              <img class="h-8 max-w-8 rounded-full mr-4" :src="getbase(item.usuario.foto.data)" >
              <div>
                <div class="font-medium">{{ item.usuario.nombre +' '+  item.usuario.apellido }}</div>
                <div class="text-gray-500 text-xs">Ing. Software con IA</div>
              </div>
            </div>
          </td>
          <td class="py-2 px-4 text-sm">{{ item.usuario.dni }}</td>
          <td class="py-2 px-4 text-sm">{{ item.actividad }}</td>
          <td class="py-2 px-4 text-sm">{{ item.fecha }}</td>
          <td class="py-2 px-4 text-sm">{{ item.estado.stado_actividad }}</td>
          
        </template>
          
        </tr>
      

      </tbody>
    </table>
  </div>
  </div>
</template>

<script  setup>
const actividadesStore = new useActividadStore();
const actividades = computed(() => actividadesStore.actividades);
const sessionStore = useSessionStore();
const isAdmin = sessionStore.isAdmin;
const isUser = sessionStore.isUser;
const { user } = useAuth();

const dni = user.value.dni;

onMounted(async () => {
  await actividadesStore.fetchActividades();
});

const getbase = (data) => {
  if (import.meta.client) {
    return `data:image/jpeg;base64,${btoa(
      String.fromCharCode(...new Uint8Array(data))
    )}`;
  }
  return ""; 
};
</script>

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