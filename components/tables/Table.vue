<script setup>
const actividadesStore = new useActividadStore();

const actividades = computed(() => actividadesStore.actividades);

const fechActividades = async () => {
  await actividadesStore.fetchActividades();
};
onMounted(fechActividades);
console.log("Actividades: ", actividades);
</script>

<template>
  <div>
    <div class="flex items-center gap-x-3">
      <h2 class="text-lg font-medium text-gray-800 ml-6">Actividades</h2>
    </div>

    <div class="flex flex-col mt-6">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden border border-gray-200">
            <table
              class="min-w-full divide-y divide-gray-200"
              
            >
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                  >
                    <div class="flex items-center gap-x-3">
                      <span>actividad</span>
                    </div>
                  </th>

                  <th
                    scope="col"
                    class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                  >
                    <span>Estado</span>
                  </th>

                  <th
                    scope="col"
                    class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                  >
                    <span>Actividad</span>
                  </th>

                  <th
                    scope="col"
                    class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                  >
                    Fecha
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200" v-for="actividad in actividades.slice(0,4)">
                <tr>
                  <td
                    class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap"
                  >
                    <div class="inline-flex items-center gap-x-3">
                      <div class="flex items-center gap-x-2">
                        <img
                          class="object-cover w-10 h-10 rounded-full"
                          src="https://pstangarana.com/wp-content/uploads/2024/07/BECADO-g-SN-3.jpg"
                          alt=""
                        />
                        <div>
                          <h2 class="font-medium text-gray-800">
                            {{
                              actividad.usuario.nombre +
                              " " +
                              actividad.usuario.apellido
                            }}
                          </h2>
                          <p class="text-sm font-normal text-gray-600">
                            {{ actividad.usuario.carrera }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    class="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap"
                  >

                      <h2 class="rounded-full px-3 py-1 font-semibold text-[13.33px] w-fit"
                      :class="{
                  'bg-[#FFF1C1] text-[#E9AB00]':
                    actividad.estado.stado_actividad === 'En progreso',
                  'bg-[#E7FFDC] text-[#00AE34]':
                    actividad.estado.stado_actividad === 'Completado',
                  'bg-[#FFD3D3] text-[#FF3300]':
                    actividad.estado.stado_actividad === 'Pendiente',
                }">
                        • {{ actividad.estado.stado_actividad }}
                      </h2>
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {{ actividad.actividad }}
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {{ actividad.fecha }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
