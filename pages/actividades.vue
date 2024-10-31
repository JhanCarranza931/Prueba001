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
              <img class="h-8 max-w-8 rounded-full mr-4" :src="'https://i.pinimg.com/474x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg'" alt="free">
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

 const fechActividades = async ()=>{
    await actividadesStore.fetchActividades();
 }
 onMounted(fechActividades)


  import { ref, computed } from 'vue';
  
  // Datos de los elementos con más variedad en nombres, descripciones y estados
  const items = ref([
    { name: 'Jhan Carranza', description: 'Crear un prototipo de aplicación', state: 'En progreso' },
    { name: 'Antony Álvarez', description: 'Desarrollar la interfaz de usuario', state: 'Completado' },
    { name: 'Jack Troncos', description: 'Optimizar el rendimiento del sitio', state: 'En progreso' },
    { name: 'Brooklyn Simmons', description: 'Escribir documentación técnica', state: 'En progreso' },
    { name: 'Ronald Richards', description: 'Realizar pruebas de usabilidad', state: 'Pendiente' },
    { name: 'Theresa Webb', description: 'Implementar el diseño responsivo', state: 'En progreso' },
    { name: 'David Smith', description: 'Configuración de la base de datos', state: 'Pendiente' },
    { name: 'Jane Cooper', description: 'Revisar el código y hacer sugerencias', state: 'Completado' },
    { name: 'Cody Fisher', description: 'Crear un plan de lanzamiento', state: 'En progreso' },
    { name: 'Leslie Alexander', description: 'Actualizar el contenido del sitio web', state: 'Completado' },
    { name: 'Mark Johnson', description: 'Recopilar feedback de los usuarios', state: 'Pendiente' },
    { name: 'Emma Brown', description: 'Diseñar una nueva funcionalidad', state: 'En progreso' },
    { name: 'Sofia Davis', description: 'Implementar pruebas automatizadas', state: 'Completado' },
  ]);
  

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
  