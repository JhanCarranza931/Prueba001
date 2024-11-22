<template>
  <div v-if="isLoading">
    <p>Loading...</p>
  </div>
  <div v-else class="w-full flex">
    <Sidebar v-if="isAuthenticated" />
    <main v-show="isAuthenticated" class="w-full">
      <nav
        class="flex justify-between w-full h-[70px] items-center pr-6 pl-6  sticky top-0 backdrop-blur-3xl z-50"
      >
      <div>
        <h3 class="capitalize text-xl font-medium text-emerald-600">{{ routerName }}</h3>
        <p class=" text-sm font-medium text-gray-600">Bienvenido a {{ routerName }}</p>
      </div>
        
      
        <div class="flex gap-6 items-center">
          <div>
            <h3 class="font-medium text-sm">
              {{ user.nombre + " " + user.apellido }}
            </h3>
            <p class="text-xs font-medium text-gray-600 text-end">
              {{ user.carrera }}
            </p>
          </div>
          <img
            v-if="user.foto && user.foto.data"
            :src="getbase(user.foto.data)"
            alt="Usuario"
            class="w-12 h-12 rounded-full"
          />
        </div>
      </nav>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
const route = useRoute();
const routerName = ref(route.name);
const isLoading = ref(true);

const { isAuthenticated, user } = useAuth();

const getbase = (data) => {
  if (import.meta.client) {
    return `data:image/jpeg;base64,${btoa(
      String.fromCharCode(...new Uint8Array(data))
    )}`;
  }
  return ""; 
};

onMounted(async () => {
  if (isAuthenticated) {
    isLoading.value = false;
  }
});

watch(
  () => route.name,
  (newName) => {
    routerName.value = newName;
  }
);
</script>
