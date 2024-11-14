<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const isloading = ref(true); // Estado de carga inicial

const coworking = computed(() => userStore.users);

onMounted(async () => {
  await userStore.fetchUsers();
  isloading.value = false; // Actualiza el estado de carga cuando los datos están listos
});

const handleDelete = async (userId) => {
  await userStore.delete(userId);
  console.log(`Deleted user with id: ${userId}`);
};
</script>

<template>
  <div class="mx-auto p-4">
    <table class="min-w-full bg-white">
      <thead>
        <tr class="border-b">
          <th class="text-left py-3 px-4 font-semibold">Nombres</th>
          <th class="text-left py-3 px-4 font-semibold">DNI</th>
          <th class="text-left py-3 px-4 font-semibold">Correo</th>
          <th class="text-left py-3 px-4 font-semibold">Teléfono</th>
          <th class="text-left py-3 px-4 font-semibold">Acción</th>
        </tr>
      </thead>


      <tbody v-if="isloading">
        <tr class="border-b animate-pulse" >
          <td class="py-3 px-4">
            <div class="flex items-center">
              <div class="h-8 w-8 rounded-full bg-gray-300 mr-4"></div>
              <div>
                <div class="h-4 bg-gray-300 rounded w-32 mb-1"></div>
                <div class="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </td>
          <td class="py-3 px-4"><div class="h-4 bg-gray-300 rounded w-20"></div></td>
          <td class="py-3 px-4"><div class="h-4 bg-gray-300 rounded w-32"></div></td>
          <td class="py-3 px-4"><div class="h-4 bg-gray-300 rounded w-20"></div></td>
          <td class="py-3 px-4 flex space-x-2">
            <div class="h-8 w-8 bg-gray-300 rounded"></div>
            <div class="h-8 w-8 bg-gray-300 rounded"></div>
          </td>
        </tr>
        <tr class="border-b animate-pulse" >
          <td class="py-3 px-4">
            <div class="flex items-center">
              <div class="h-8 w-8 rounded-full bg-gray-300 mr-4"></div>
              <div>
                <div class="h-4 bg-gray-300 rounded w-32 mb-1"></div>
                <div class="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </td>
          <td class="py-3 px-4"><div class="h-4 bg-gray-300 rounded w-20"></div></td>
          <td class="py-3 px-4"><div class="h-4 bg-gray-300 rounded w-32"></div></td>
          <td class="py-3 px-4"><div class="h-4 bg-gray-300 rounded w-20"></div></td>
          <td class="py-3 px-4 flex space-x-2">
            <div class="h-8 w-8 bg-gray-300 rounded"></div>
            <div class="h-8 w-8 bg-gray-300 rounded"></div>
          </td>
        </tr>
        <tr class="border-b animate-pulse" >
          <td class="py-3 px-4">
            <div class="flex items-center">
              <div class="h-8 w-8 rounded-full bg-gray-300 mr-4"></div>
              <div>
                <div class="h-4 bg-gray-300 rounded w-32 mb-1"></div>
                <div class="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </td>
          <td class="py-3 px-4"><div class="h-4 bg-gray-300 rounded w-20"></div></td>
          <td class="py-3 px-4"><div class="h-4 bg-gray-300 rounded w-32"></div></td>
          <td class="py-3 px-4"><div class="h-4 bg-gray-300 rounded w-20"></div></td>
          <td class="py-3 px-4 flex space-x-2">
            <div class="h-8 w-8 bg-gray-300 rounded"></div>
            <div class="h-8 w-8 bg-gray-300 rounded"></div>
          </td>
        </tr>
        <tr class="border-b animate-pulse" >
          <td class="py-3 px-4">
            <div class="flex items-center">
              <div class="h-8 w-8 rounded-full bg-gray-300 mr-4"></div>
              <div>
                <div class="h-4 bg-gray-300 rounded w-32 mb-1"></div>
                <div class="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </td>
          <td class="py-3 px-4"><div class="h-4 bg-gray-300 rounded w-20"></div></td>
          <td class="py-3 px-4"><div class="h-4 bg-gray-300 rounded w-32"></div></td>
          <td class="py-3 px-4"><div class="h-4 bg-gray-300 rounded w-20"></div></td>
          <td class="py-3 px-4 flex space-x-2">
            <div class="h-8 w-8 bg-gray-300 rounded"></div>
            <div class="h-8 w-8 bg-gray-300 rounded"></div>
          </td>
        </tr>
        <tr class="border-b animate-pulse" >
          <td class="py-3 px-4">
            <div class="flex items-center">
              <div class="h-8 w-8 rounded-full bg-gray-300 mr-4"></div>
              <div>
                <div class="h-4 bg-gray-300 rounded w-32 mb-1"></div>
                <div class="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </td>
          <td class="py-3 px-4"><div class="h-4 bg-gray-300 rounded w-20"></div></td>
          <td class="py-3 px-4"><div class="h-4 bg-gray-300 rounded w-32"></div></td>
          <td class="py-3 px-4"><div class="h-4 bg-gray-300 rounded w-20"></div></td>
          <td class="py-3 px-4 flex space-x-2">
            <div class="h-8 w-8 bg-gray-300 rounded"></div>
            <div class="h-8 w-8 bg-gray-300 rounded"></div>
          </td>
        </tr>

      </tbody>


      <tbody v-else>
        <tr v-for="user in coworking" :key="user.id" class="border-b hover:bg-gray-100">
          <td class="py-3 px-4">
            <div class="flex items-center">
              <img class="h-8 max-w-8 rounded-full mr-4" :src="`/uploads/${user.foto}`" :alt="user.name">
              <div>
                <div class="font-medium">{{ user.nombre }} {{ user.apellido }}</div>
                <div class="text-gray-500 text-xs">{{ user.carrera }}</div>
              </div>
            </div>
          </td>
          <td class="py-3 px-4">{{ user.dni }}</td>
          <td class="py-3 px-4">{{ user.correo }}</td>
          <td class="py-3 px-4">{{ user.telefono }}</td>
          <td class="py-3 px-4">
            <button @click="handleEdit(user.id)" class="text-indigo-600 hover:text-indigo-900 mr-2 p-0">
              <Icon name="carbon:edit" size="32px"></Icon>
            </button>
            <button @click="handleDelete(user.id)" class="text-red-400 hover:text-red-700 p-0">
              <Icon name="material-symbols:delete-outline" size="32px"></Icon>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
