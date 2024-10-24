<script setup >
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

const coworking = computed(() => userStore.users);

const fetchUsers = async () => {
  await userStore.fetchUsers();
};
onMounted(fetchUsers);

const handleDelete = async (userId) => {
  await userStore.delete(userId)

  console.log(`Edit user with id: ${userId}`);
 
};

</script>

<template>
  <div class=" mx-auto p-4">
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
      <tbody>
        <tr v-for="user in coworking" :key="user.id" class="border-b hover:bg-gray-100">
          <td class="py-3 px-4">
            <div class="flex items-center">
              <img class="h-8 max-w-8 rounded-full mr-4" :src="'https://i.pinimg.com/474x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg'" :alt="user.name">
              <div>
                <div class="font-medium ">{{ user.nombre}} {{ user.apellido  }}</div>
                <div class="text-gray-500 text-xs">{{ user.carrera }}</div>
              </div>
            </div>
          </td>
          <td class="py-3 px-4 ">{{ user.dni }}</td>
          <td class="py-3 px-4 ">{{ user.correo }}</td>
          <td class="py-3 px-4 ">{{ user.telefono }}</td>
          <td class="py-3 px-4">
            <button @click="handleEdit(user.id)" class="text-indigo-600 hover:text-indigo-900 mr-2 p-0 ">
              <Icon name="carbon:edit" size="32px"></Icon>
            </button>
            <button @click="handleDelete(user.id)" class="text-red-400 hover:text-red-700  p-0">
              <Icon name="material-symbols:delete-outline" size="32px"></Icon>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>