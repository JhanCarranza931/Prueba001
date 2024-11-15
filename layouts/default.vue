<template>
  <div v-if="isLoading">
    <p>Loading...</p>
  </div>
  <div v-else class="w-full flex">
    <Sidebar v-if="isAuthenticated" />
    <main v-show="isAuthenticated" class="w-full">
      <nav class="flex justify-between w-full h-[70px] items-center pr-6 pl-6 border-b">
        <h3 class="capitalize">{{ routerName }}</h3>
        <div class="flex gap-6 items-center">
          <div >
            <h3 class="font-medium text-sm">{{ user.nombre +' '+ user.apellido }}</h3>
            <p class=" text-xs font-medium text-gray-600 text-end">{{ user.carrera }}</p>
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


const {isAuthenticated,user} = useAuth()

const getbase = (data)=>{
  if (import.meta.client) {
        // Convertir el array de bytes en base64 solo en el cliente
        return `data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(data)))}`;
      }
      return ''; // En el servidor, no mostramos la imagen
}



onMounted(async ()=>{
  if(isAuthenticated){
  isLoading.value = false;
  

}
  
})




watch(
  () => route.name,
  (newName) => {
    routerName.value = newName;
  }
);
</script>
