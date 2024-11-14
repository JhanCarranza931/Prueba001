<template>
  <template v-if="isAdmin">
    <section>
      <div class=" flex justify-between p-6 items-center">
        <div>
          <h1 class=" text-4xl font-medium text-emerald-700">Actividades</h1>
          <p class=" text-sm text-gray-400">En este apartado podrás asignar las actividades que realizaran  los colaboradores (staff coworking) de la Plataforma Social Tangarana.</p>
        </div>
        <button @click="isShowModal = true" class="text-sm px-8  bg-emerald-600 h-fit py-2 rounded-lg flex items-center text-white text-nowrap"> <Icon name="hugeicons:add-01" class="mr-3"></Icon> Asignar Actividad</button>
      </div>
      <Transition
      enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0">
      <div v-if="isShowModal ===true" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" >
        <div class="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative flex flex-col gap-4 ">
          <h1 class="text-2xl font-medium text-emerald-700">Asignar Actividad</h1>
          <div class=" border-b"></div>
          <form action="" class="flex flex-col gap-4" @submit.prevent="submitForm">
              <div>
                <label class="block mb-1 ">Actividad</label>
                <input  v-model="data.actividad" placeholder="Escribe una actividad" type="text" required class="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
              <div class="flex items-end">
              <div>
                <label  class=" block mb-1 text-nowrap">Asignado a</label>
                <select name="" id="" v-model="data.id_user" required class="w-fit p-2 border rounded focus:outline-none">
                  <option value=""  disabled selected>Elige un colaborador</option>
                  <template v-for="usuario in users">
                    <template v-for="rol in usuario.roles">
                      <option :value="usuario.id"    v-if="rol.rol_id===3">{{ usuario.nombre+' '+usuario.apellido }}</option>
                    </template >
                  </template>
                

              </select>
            </div>
              <div class="flex gap-4 w-full justify-end h-fit">
                <p @click="isShowModal = false" class="border border-emerald-600 text-emerald-600 px-4 py-1 rounded w-fit cursor-pointer">Cerrar</p>
                <button type="submit" class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1 rounded w-fit">Agregar</button>
              </div>

              
            </div>
              
            
          </form>
          
        </div>
      </div>
    </Transition>

 
      <div class="flex justify-between py-6 px-6 border-b mb-6">
        <div class="relative">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            class="p-2 pl-11 w-[328px] font-normal focus:outline-none placeholder:font-light"
            v-model="searchName"
          />
          <Icon
            name="hugeicons:search-01"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600"
            size="20px"
          />
        </div>
        <div class="flex gap-12">
          <input type="date" class="borde p-1 w-[226px]" />
          <select v-model="selectedState" class="borde p-2 w-[200px]">
            <option value="">Todos los estados</option>
            <option value="En progreso">En progreso</option>
            <option value="Completado">Completado</option>
            <option value="Pendiente">Pendiente</option>
          </select>
        </div>
      </div>

      <div class="flex flex-wrap px-6 gap-6 w-full">
        <div v-if="isLoading" class="flex w-full justify-between">
        <SkeletonActividades></SkeletonActividades>
        <SkeletonActividades></SkeletonActividades>
        <SkeletonActividades></SkeletonActividades>
        <SkeletonActividades></SkeletonActividades>
      </div>
        <div
        v-else
          v-for="item in actividades"
          :key="item.id"
          class="flex flex-col p-6 gap-3 borde flex-1 min-w-[340px] max-w-[420px]"
        >
          <div class="flex justify-between items-center border-b pb-2">
            <div class="flex items-center">
              <img
                class="h-8 max-w-8 rounded-full mr-4"
                :src="'https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png'"
                alt="free"
              />
              <div>
                <div class="font-medium">{{ item.usuario.nombre + ' ' + item.usuario.apellido }}</div>
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
          <span class="text-sm text-[#2E875A] font-bold">Actividades</span>
          <p class="text-[13.33px]">{{ item.actividad }}</p>
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

  const isLoading = ref(true)
  const isShowModal = ref(false);
  const actividadesStore = new useActividadStore()
  const user = useUserStore();

  const users =   computed(()=>user.users)
  const data = ref({
    actividad: '',
    id_user : '',
    id_estado:1
  })

 const submitForm= async()=>{
    const response = await actividadesStore.addActividad(data.value)
    isShowModal.value=false
    isLoading.value=false
    console.log(response)
 }
 const actividades = computed(()=> actividadesStore.actividades)
 


 onMounted(async()=>{
    await actividadesStore.fetchActividades();
    user.fetchUsers()
    isLoading.value=false
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
  