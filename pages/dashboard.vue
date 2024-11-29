<template>
  <section
    v-if="isAdmin"
    class="container_stats mx-auto px-4 py-10 flex flex-col gap-10"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        v-for="stat in stats"
        :key="stat.title"
        :title="stat.title"
        :value="stat.value"
        :increase="stat.increase"
        :icon="stat.icon"
      />
    </div>
    <section class="flex justify-between">
      <EchartsChart class="w-[48%]"></EchartsChart>
      <EchartsToro class="w-[48%]"></EchartsToro>
    </section>
    <section class="flex w-full gap-6">
      <TablesTable class="w-full borde pt-6"></TablesTable>
      <Calendar></Calendar>
    </section>
  </section>
  <div v-else-if="isUser">
    <EchartsDashboardUser></EchartsDashboardUser>
  </div>
</template>

<script setup>
import { useSessionStore } from "~/stores/sessionStore";

// Variables relacionadas con la sesión
const sessionStore = useSessionStore();
const isAdmin = sessionStore.isAdmin;
const isUser = sessionStore.isUser;

// Asegurar que la página requiere autenticación
definePageMeta({
  middleware: "auth",
});


// Obtener datos de usuarios desde el servidor
const { data: coworking, } = useAsyncData("fetch-users", async () => $fetch('/api/usuarios'));
const { data: actividades, } = useAsyncData("fetch-actividades", async () => $fetch('/api/actividades'));





// Métricas generales y dinámicas
const stats = computed(() => [
  {
    title: "Total de empleados",
    value: coworking.value?.length | "0",
    increase: 2,
    icon: "tabler:align-box-bottom-right",
  },
  {
    title: "Asistencia Promedio",
    value: "98%", // Valor estático por ahora
    increase: 12,
    icon: "octicon:checklist-24",
  },
  {
    title: "Ausencias no justificadas",
    value: 23, // Valor estático
    increase: 15,
    icon: "bi:journal-x",
  },
  {
    title: "Actividades Realizadas",
    value: actividades.value?.length | '0', // Valor estático
    increase: 10,
    icon: "mynaui:chart-line",
  },
]);
</script>
