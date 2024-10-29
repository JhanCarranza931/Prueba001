<template>
        <div v-if="isLoading">
          <p>Loading...</p>
        </div>
        <div v-else-if="isAuthenticated" class="w-full flex">
          <Sidebar />
          <main class="w-full">
            <nav class="flex justify-between w-full h-[70px] items-center pr-6 pl-6 border-b">
              <h3 class="capitalize">{{ routerName }}</h3>
              <div class="flex gap-6 items-center">
                <div>
                  <h3 class="font-bold">Jhan Carranza</h3>
                  <p class="text-[13.33px]">jhancarranza@gmail.com</p>
                </div>
                <img
                  src="https://pstangarana.com/wp-content/uploads/2023/09/t.webp"
                  alt="Usuario"
                  class="w-14 h-14 rounded-full"
                />
              </div>
            </nav>
      
            <!-- Aquí se muestra la pagina  -->
            <NuxtPage /> <!-- Usa NuxtPage en lugar de <slot> -->
          </main>
        </div>
        <div v-else>
          <p>Acceso denegado. Por favor, inicie sesión.</p>
        </div>
      </template>
      
      <script setup>
      import { ref, onMounted } from 'vue';
      import { useRouter, useRoute } from 'vue-router';
      
      const router = useRouter();
      const isAuthenticated = ref(false);
      const isLoading = ref(true);
      const route = useRoute();
      const routerName = ref(route.name);
      
      onMounted(() => {
        const token = localStorage.getItem("authToken");
        isAuthenticated.value = !!token;
      
        if (!isAuthenticated.value) {
          router.push("/"); // Redirige si no está autenticado
        }
      
        isLoading.value = false; // Cambia el estado de carga a falso
      });
      
      watch(
        () => route.name,
        (newName) => {
          routerName.value = newName;
        }
      );
      </script>
      
      