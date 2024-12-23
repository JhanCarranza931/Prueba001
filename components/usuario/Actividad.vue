<script setup>
const actividadesStore = useActividadStore();

const { user } = useAuth();

const id = user.value.id;
const isloading = ref(true);

onMounted(async () => {
  await actividadesStore.fechActividadesForId(id);
  isloading.value = false;
});

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

function getLocalDate() {
  const ahora = new Date();
  const year = ahora.getFullYear();
  const month = String(ahora.getMonth() + 1).padStart(2, "0");
  const day = String(ahora.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
const selectedDate = ref(getLocalDate());
const selectedState = ref("");
function updateState(state) {
  selectedState.value = state;
}
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
//Formato Fecha
//   function formatDateOnly(dateString) {
//   const date = new Date(dateString);
//   return date.toLocaleString('es-ES', {
//     year: 'numeric',
//     month: 'long',
//     day: '2-digit'
//   });
// }
//Formato Hora
// function formatTimeOnly(dateString) {
//   const date = new Date(dateString);
//   return date.toLocaleString('es-ES', {
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//     hour12: false
//   });
// }
</script>
<template>
  <main class="flex flex-col gap-5 p-6">
    <header
      class="header flex justify-start items-center md:bg-header bg-no-repeat bg-contain min-h-72 bg-right py-8 border-b border-gray-200"
    >
      <div class="flex flex-col">
        <h1 class="text-4xl font-bold">
          ¡Bienvenido a tu espacio de Actividades, Jhan!"
        </h1>
        <p class="text-gray-600 mt-2">
          Este es el lugar donde podrás organizar y gestionar todas tus
          actividades de manera eficiente y productiva.
        </p>
      </div>
      <div class="flex w-full justify-center">
        <img
          src="/assets/img/actividades-hero.webp"
          width="281px"
          alt="Actividades"
        />
      </div>
    </header>
    <section class="flex flex-col gap-1 w-full">
      <h2 class="text-2xl font-semibold text-[#3B5649]">
        Actividades asignadas
      </h2>
      <p class="text-gray-600 mb-6 font-medium">
        Aqui podras ver las actividades asignadas del día
      </p>
    </section>
    <section class="flex justify-between gap-[87px] py-6">
      <nav class="px-8 min-w-fit">
        <div class="flex flex-col">
          <div class="flex flex-col gap-2">
            <button
              class="text-start text-sm flex items-center"
              @click="updateState('')"
            >
              <Icon name="hugeicons:task-01" class="mr-2" size="20px"></Icon
              >Todas las Tareas
            </button>
            <button
              class="text-start text-sm flex items-center"
              @click="updateState('Completada')"
            >
              <Icon name="hugeicons:tick-01" class="mr-2" size="20px"></Icon
              >Completadas
            </button>
            <button
              class="text-start text-sm flex items-center"
              @click="updateState('En progreso')"
            >
              <Icon
                name="fluent-mdl2:processing"
                class="mr-2"
                size="20px"
              ></Icon
              >En progreso
            </button>
            <button
              class="text-start text-sm flex items-center"
              @click="updateState('Pendiente')"
            >
              <Icon
                name="hugeicons:time-quarter-pass"
                class="mr-2"
                size="20px"
              ></Icon
              >Pendiente
            </button>
          </div>
        </div>
      </nav>
      <div class="w-full flex flex-col gap-7">
        <header class="flex justify-between">
          <h1>Lista de Actividades</h1>
          <div class="flex gap-6">
            <button>Filtrar</button>
            <input
              type="date"
              class="p-2 border rounded-lg"
              v-model="selectedDate"
            />
          </div>
        </header>
        <div class="flex flex-wrap gap-3">
          <div
            v-if="isloading"
            v-for="n in 3"
            class="border p-4 flex flex-col gap-4 flex-1 min-w-[340px] max-w-[420px] rounded-lg bg-gray-50 animate-pulse"
          >
            <div class="h-4 bg-gray-200 rounded w-1/3"></div>
            <div class="h-6 bg-gray-200 rounded w-full"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div v-else-if="filteredActividades.length===0">
            <span>No se encontraron actividades asignadas</span>
          </div>
          

          <article
            v-else
            v-for="actividad in filteredActividades"
            :key="actividad.id"
            class="border p-4 flex flex-col gap-4 flex-1 min-w-[340px] max-w-[420px] rounded-lg"
            :class="{
              'border-[#ffae0077]':
                actividad.estado.stado_actividad === 'En progreso',
              'border-[#00AE34]':
                actividad.estado.stado_actividad === 'Completado',
              'border-[#FF3300]':
                actividad.estado.stado_actividad === 'Pendiente',
            }"
          >
            <div class="flex justify-between">
              <span
                class="rounded-full px-3 py-1 font-semibold text-[13.33px] cursor-pointer"
                :class="{
                  'bg-[#FFF1C1] text-[#E9AB00]':
                    actividad.estado.stado_actividad === 'En progreso',
                  'bg-[#E7FFDC] text-[#00AE34]':
                    actividad.estado.stado_actividad === 'Completado',
                  'bg-[#FFD3D3] text-[#FF3300]':
                    actividad.estado.stado_actividad === 'Pendiente',
                }"
              >
                •
                {{ actividad.estado.stado_actividad }}
              </span>
            </div>
            <p>{{ actividad.actividad }}</p>
            <span class="text-sm text-gray-800">Fecha Limite : {{
              formatDate(actividad.fecha_limite)
            }}</span>
          </article>
          
        </div>  
      </div>
    </section>
  </main>
</template>
