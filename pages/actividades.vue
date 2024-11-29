<template>
  <template v-if="isAdmin">
    <section>
      <div class="flex justify-between p-6 items-center">
        <div>
          <h1 class="text-2xl font-medium text-emerald-600">Asignar tareas</h1>
          <p class="text-sm text-gray-400">
            En este apartado podrás asignar las actividades que realizaran los
            colaboradores (staff coworking) de la Plataforma Social Tangarana.
          </p>
        </div>
        <button
          @click="isShowModal = true"
          class="text-sm px-4 bg-emerald-600 h-fit py-2 rounded-lg flex items-center text-white text-nowrap"
        >
          <Icon name="hugeicons:add-01" class="mr-3"></Icon> Asignar Actividad
        </button>
      </div>
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isShowModal === true"
          class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
          <div
            class="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative flex flex-col gap-4"
          >
            <h1 class="text-2xl font-medium text-emerald-700">
              Asignar Actividad
            </h1>
            <div class="border-b"></div>
            <form
              action=""
              class="flex flex-col gap-4"
              @submit.prevent="submitForm"
            >
              <div>
                <label class="block mb-1">Actividad</label>
                <input
                  v-model="data.actividad"
                  placeholder="Escribe una actividad"
                  type="text"
                  required
                  class="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <div class="flex justify-between">
                <div>
                  <label class="block mb-1 text-nowrap">Asignado a</label>
                  <select
                    name=""
                    id=""
                    v-model="data.id_user"
                    required
                    class="w-fit p-2 border rounded focus:outline-none"
                  >
                    <option value="" disabled selected>
                      Elige un colaborador
                    </option>
                    <template v-for="usuario in users">
                      <template v-for="rol in usuario.roles">
                        <option :value="usuario.id" v-if="rol.rol_id === 2">
                          {{ usuario.nombre + " " + usuario.apellido }}
                        </option>
                      </template>
                    </template>
                  </select>
                </div>
                <div>
                  <label class="block mb-1 text-nowrap">Fecha Limite</label>
                  <input
                    v-model="data.limit"
                    type="datetime-local"
                    name=""
                    id=""
                  />
                </div>
              </div>
              <div class="flex gap-4 w-full justify-end h-fit">
                <p
                  @click="isShowModal = false"
                  class="border border-emerald-600 text-emerald-600 px-4 py-1 rounded w-fit cursor-pointer"
                >
                  Cerrar
                </p>
                <button
                  type="submit"
                  class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1 rounded w-fit"
                  v-if="!process"
                >
                  Agregar
                </button>
                <!-- Cargando .......-->
                <button
                v-if="process"
                  class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1 rounded flex w-[90px] justify-center items-center"
                  disabled
                >
                  <svg
                    class="animate-spin -ml-1 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </button>
                
              </div>
            </form>
          </div>
        </div>
      </Transition>
      <Toaster
            richColors 
            position="top-center"
            />

      <div class="flex justify-between py-6 px-6 border-b mb-6">
        <div class="relative hidden">
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
          <input
            type="date"
            class="borde p-1 px-3 w-[226px] focus:outline-none"
            v-model="selectedDate"
          />

          <select
            v-model="selectedState"
            class="borde p-2 w-[200px] focus:outline-none"
          >
            <option value="" selected>Todos los estados</option>
            <option value="En progreso" class="text-yellow-600">
              En progreso
            </option>
            <option value="Completado" class="text-emerald-700">
              Completado
            </option>
            <option value="Pendiente" class="text-red-600">Pendiente</option>
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
          v-else-if="filteredActividades.length === 0"
          class="w-full text-center"
        >
          <p class="text-gray-500 font-medium">No se encontraron registros.</p>
        </div>
        <div
          v-else
          v-for="item in filteredActividades"
          :key="item.id"
          class="flex flex-col p-6 gap-3 borde flex-1 min-w-[340px] max-w-[420px]"
        >
          <div class="flex justify-between items-center border-b pb-2">
            <div class="flex items-center">
              <img
                class="h-8 max-w-8 rounded-full mr-4"
                :src="getbase(item.usuario.foto.data)"
                alt="free"
              />
              <div>
                <div class="font-medium">
                  {{ item.usuario.nombre + " " + item.usuario.apellido }}
                </div>
                <div class="text-gray-500 text-xs">
                  {{ item.usuario.carrera }}
                </div>
              </div>
            </div>
            <select
              v-model="item.estado.id"
              @change="cambiarEstado(item.id, item.estado.id)"
              class="rounded-full px-3 py-1 font-semibold text-[13.33px] focus:outline-none"
              :class="{
                'bg-[#FFF1C1] text-[#E9AB00]': item.estado.id === 1,
                'bg-[#E7FFDC] text-[#00AE34]': item.estado.id === 2,
                'bg-[#FFD3D3] text-[#FF3300]': item.estado.id === 3,
              }"
            >
              <option :value="3">• Pendiente</option>
              <option :value="1">• En progreso</option>
              <option :value="2">• Completado</option>
            </select>
          </div>
          <span class="text-sm text-[#2E875A] font-bold">Actividades</span>
          <p class="text-[13.33px]">{{ item.actividad }}</p>
          <span class="text-xs text-gray-600"
            >Fecha Limite: {{ formatDate(item.fecha_limite) }}</span
          >
          
        </div>
      </div>
    </section>
  </template>

  <template v-else-if="isUser">
    <UsuarioActividad></UsuarioActividad>
  </template>
</template>

<script setup>
import { Toaster, toast } from 'vue-sonner'
definePageMeta({
  middleware: "auth",
});

import { useSessionStore } from "~/stores/sessionStore";
const sessionStore = useSessionStore();

const isAdmin = sessionStore.isAdmin;

const isUser = sessionStore.isUser;

function getLocalDate() {
  const ahora = new Date();
  const year = ahora.getFullYear();
  const month = String(ahora.getMonth() + 1).padStart(2, "0");
  const day = String(ahora.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("es-ES", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

const process = ref(false)
const selectedDate = ref(getLocalDate());
const isLoading = ref(true);
const isShowModal = ref(false);
const actividadesStore = new useActividadStore();
const user = useUserStore();

const users = computed(() => user.users);
console.log(users);
const data = ref({
  actividad: "",
  id_user: "",
  id_estado: 1,
  limit: "",
});

const getbase = (data) => {
  if (import.meta.client) {
    return `data:image/jpeg;base64,${btoa(
      String.fromCharCode(...new Uint8Array(data))
    )}`;
  }
  return "";
};

const submitForm = async () => {
  
  process.value=true
  const response = await actividadesStore.addActividad(data.value);
    

 
  isShowModal.value = false;
  isLoading.value = false;
  console.log(response.message);
  if(response.status===201){
    toast.success(response.message)
  }
  else if(response.status===500){
    toast.error(response.message)

  }
  
 

  actividadesStore.fetchActividades();
  process.value=false
  
};
const actividades = computed(() => actividadesStore.actividades);
console.log("ac", actividades);
//  const filteredActividades = computed(() => {
//   if (!selectedDate.value) {

//     return actividades.value;
//   }
//   return actividades.value.filter((actividad) => {
//     const actividadDate = actividad.fecha.split("T")[0];
//     return actividadDate === selectedDate.value;
//   });
// });
const selectedState = ref("");
const filteredActividades = computed(() => {
  return actividadesStore.actividades.filter((actividad) => {
    const matchesDate =
      !selectedDate.value ||
      actividad.fecha.split("T")[0] === selectedDate.value;
    const matchesState =
      !selectedState.value ||
      actividad.estado.stado_actividad === selectedState.value;
    return matchesDate && matchesState;
  });
});
const cambiarEstado = async (id_actividad, id_estado) => {
  const response = await actividadesStore.updateEstadoActividad(
    id_actividad,
    id_estado
  );
  toast.success(response.message)
  console.log(response);
};

onMounted(async () => {
  await actividadesStore.fetchActividades();
  user.fetchUsers();
  isLoading.value = false;
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
