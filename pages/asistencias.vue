<template>
  <template v-if="isAdmin">
    <div class="p-6">
      <table class="min-w-full bg-white">
        <thead>
          <tr class="border-b">
            <th class="text-left py-3 px-4 text-sm">Nombres</th>
            <th class="text-left py-3 px-4 text-sm">Hora Entrada</th>
            <th class="text-left py-3 px-4 text-sm">Hora Salida</th>
            <th class="text-left py-3 px-4 text-sm">Asistencia</th>

          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(asis, index) in asistencias"
            :key="asis.id"
            :class="{ 'bg-gray-50': index % 2 === 0 }"
          >
            <td class="py-3 px-4">
              <div class="flex items-center">
                <img
                  :src="getbase(asis.usuario.foto.data)"
                  class="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p class="font-semibold text-sm">
                    {{ asis.usuario.nombre + " " + asis.usuario.apellido }}
                  </p>
                  <p class="text-xs text-gray-600">
                    {{ asis.usuario.carrera }}
                  </p>
                </div>
              </div>
            </td>
            <td class="py-3 px-4 text-sm">
              {{ formatDate(asis.hora_entrada) }}
            </td>
            <td class="py-3 px-4 text-sm">
              {{ formatDate(asis.hora_salida) }}
            </td>
            <td class="py-3 px-4">
              <span
                class=" py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 px-4"
              >
                • {{ asis.estadoAsis.stado_asis }}
              </span>
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
import { useSessionStore } from "~/stores/sessionStore";
const sessionStore = useSessionStore();
const isAdmin = sessionStore.isAdmin;
const isUser = sessionStore.isUser;
definePageMeta({
  middleware: "auth",
});

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
console.log(asistencias);

onMounted(async () => {
  asisStore.fetchAsistencia();
});

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
</script>
