<script setup>
const asisStore = useAsistenciasStore();
const { user } = useAuth();

const id = user.value.id;
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString("es-PE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
const asistencia = computed(() => asisStore.asistencias);
onMounted(() => {
  asisStore.fetchAsistencia();
});
</script>

<template>
  <main class="flex min-h-screen flex-col gap-5 p-6">
    <!-- Header -->
    <header
      class="header flex justify-between items-center md:bg-header bg-no-repeat bg-contain min-h-72 bg-right py-8 border-b border-gray-200"
    >
      <div class="flex flex-col">
        <h1 class="text-4xl font-bold">
          ¡Bienvenido a tu espacio de asistencias, Jhan!
        </h1>
        <p class="text-gray-600 mt-2">
          Este es el lugar donde podrás llevar un control súper fácil de todas
          tus asistencias.
        </p>
      </div>
      <div class="flex justify-center w-full">
        <img
          src="/assets/img/asistencia-hero.webp"
          width="493px"
          alt="actividades-hero"
        />
      </div>
    </header>

    <section class="flex flex-col gap-1 w-full">
      <h2 class="text-2xl font-semibold text-[#3B5649]">Asistencias</h2>
      <p class="text-gray-600  font-medium">
        Aquí puedes visualizar tus asistencias
      </p>
    </section>

    <div class="flex items-center justify-end gap-5 space-x-4 ">
      <!-- Filtro Icon -->
      <button
        class="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <Icon name="hugeicons:filter-horizontal"></Icon>

        <span class="ml-2 text-[#5F5F5F]">Filtrar</span>
      </button>

      <!-- Fecha Picker -->
      <div class="relative">
        <input
          type="date"
          placeholder="3 de Octubre 2024"
          class="w-40 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <!-- Estado Dropdown -->
      <div>
        <select
          class="w-40 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="all">Todos los estados</option>
          <option value="completed">Presente</option>
          <option value="pending">Ausente</option>
          <!-- <option value="pending">Tardanza</option>
          <option value="pending">Permiso</option> -->
          <!-- Agrega más opciones según sea necesario -->
        </select>
      </div>
    </div>

    <div class="p-6">
      <!-- Tabla de Asistencias -->
      <table class="min-w-full bg-white">
        <thead>
          <tr class="border-b">
            <th class="py-3 px-6 text-left text-[#7C7C7C] font-semibold">
              Fecha Entrada
            </th>
            <th class="py-3 px-6 text-left text-[#7C7C7C] font-semibold">
              Fecha Salida
            </th>
            <th class="py-3 px-6 text-left text-[#7C7C7C] font-semibold">
              Asistencia
            </th>
          </tr>
        </thead>
        <tbody v-for="asis in asistencia">
          <tr>
            <td class="py-2 px-6 text-gray-600" v-if="asis.usuario.id === id">
              {{ formatDate(asis.hora_entrada) }}
            </td>
            <td class="py-2 px-6 text-gray-600" v-if="asis.usuario.id === id">
              {{ formatDate(asis.hora_salida) }}
            </td>

            <td class="py-2 px-6" v-if="asis.usuario.id === id">
              <span
                class="inline-flex items-center gap-3 px-5 py-1 text-sm font-semibold text-[#00AE34] bg-[#E7FFDC] rounded-full"
              >
                <span class="w-2 h-2 rounded-full bg-green-500"></span>
                Presente
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
