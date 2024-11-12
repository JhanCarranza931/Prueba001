<template>
  <template v-if="isAdmin">
    <section>
      
      <div class="flex justify-between py-6 px-6 border-b mb-6">
        <input type="date" class="borde p-2 w-[226px]" />
        <input
          type="text"
          placeholder="Buscar por nombre"
          class="borde p-2 w-[328px]"
          v-model="searchName"
        />
        <select v-model="selectedState" class="borde p-2 w-[200px]">
          <option value="">Todos los estados</option>
          <option value="En progreso">En progreso</option>
          <option value="Completado">Completado</option>
          <option value="Pendiente">Pendiente</option>
        </select>
      </div>
      
      <div class="flex flex-wrap px-6 gap-6 w-full">
        
        <div
          v-for="item in actividades"
          :key="item.id"
          class="flex flex-col p-6 gap-3 borde flex-1 min-w-[340px] max-w-[420px]"
        >
        <div class="flex justify-between items-center border-b pb-2">
          <div class="flex items-center">
              <img class="h-8 max-w-8 rounded-full mr-4" :src="'https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png'" alt="free">
              <div> 
                <div class="font-medium ">{{item.usuario.nombre+' '+item.usuario.apellido}}</div>
                <div class="text-gray-500 text-xs">{{ item.usuario.carrera }}</div>
              </div>
          </div>
          <span
              class="rounded-full px-3 py-1 font-semibold text-[13.33px]"
              :class="{
                'bg-[#FFF1C1] text-[#E9AB00]': item.estado.stado_actividad === 'En progreso',
                'bg-[#E7FFDC] text-[#00AE34]': item.estado.stado_actividad === 'Completado',
                'bg-[#FFD3D3] text-[#FF3300]': item.estado.stado_actividad === 'Pendiente'
              }"
            >
              • {{ item.estado.stado_actividad }}
            </span>

        </div>
        <span class=" text-sm text-[#2E875A] font-bold">Actividades</span>
        
          <p class=" text-[13.33px]">{{ item.actividad }}</p>
          <div>
            
          </div>
        </div>
      </div>
    </section>
  </template>
  <template v-else-if="isUser">
  <UsuarioActividad></UsuarioActividad>
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


 const actividadesStore = new useActividadStore()

 const actividades = computed(()=> actividadesStore.actividades)
 console.log(actividades.value)


 onMounted(async()=>{
    actividadesStore.fetchActividades();
 })




  import { ref, computed } from 'vue';
  
  const searchName = ref('');
  const selectedState = ref('');
  
  const filteredItems = computed(() => {
    return items.value.filter(actividades => {
      const matchesName = actividades.usuario.nombre.toLowerCase().includes(searchName.value.toLowerCase());
      const matchesState = selectedState.value ? actividades.estado.stado_actividad === selectedState.value : true;
      return matchesName && matchesState;
    });
  });
  </script>
  
  <style scoped>
  .borde {
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  .txtcolor {
    color: #333;
  }
  </style>
  