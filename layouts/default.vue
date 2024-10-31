<template>
  <div v-if="isLoading">
    <p>Loading...</p>
  </div>
  <div  v-if="isAuthenticated"  class="w-full flex">
    <Sidebar />
    <main class="w-full">
      <nav class="flex justify-between w-full h-[70px] items-center pr-6 pl-6 border-b">
        <h3 class="capitalize">{{ routerName }}</h3>
        <div class="flex gap-6 items-center">
          <div>
            <h3 class="font-bold">{{ user.nombre+' '+ user.apellido }}</h3>
            <p class="text-[13.33px]">{{ user.correo }}</p>
          </div>
          <img
            src="https://pstangarana.com/wp-content/uploads/2023/09/t.webp"
            alt="Usuario"
            class="w-14 h-14 rounded-full"
          />
        </div>
      </nav>
      <NuxtPage/>
    </main>
  </div>

</template>

<script setup>

const sessionStorage  = new useSessionStore();
const user = sessionStorage.us


const isAuthenticated = ref(false);
const isLoading = ref(true);
const route = useRoute();
const routerName = ref(route.name);

onMounted(() => {
  const token = localStorage.getItem("authToken");
  isAuthenticated.value = !!token;
  isLoading.value = false;
});

watch(
  () => route.name,
  (newName) => {
    routerName.value = newName;
  }
);
</script>
