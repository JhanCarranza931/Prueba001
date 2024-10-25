<template>
        <Sidebar ></Sidebar>
        <main class="w-full">
        <nav class="flex justify-between w-full h-[70px]  items-center pr-6 pl-6 border-b">
                <h3 class=" capitalize ">{{ routerName }}</h3>
                <div class="flex gap-6 items-center">
                        <div>
                                <h3 class=" font-bold">Jhan Carranza</h3>
                                <p class="text-[13.33px]">jhancarranza@gmail.com</p>
                        </div>
                        <img src="https://pstangarana.com/wp-content/uploads/2023/09/t.webp" alt="Usuario" class=" w-14 h-14 rounded-full">
                        
                        
                </div>
        
        </nav>
        
        <!-- Aquí se muestra la pagina  -->
        <slot></slot>
        </main>
</template>

<script setup>
const route = useRoute();

const routerName= ref(route.name)

watch(
        
  () => route.name,
  (newName) => {
        console.log(routerName.value)
    routerName.value = newName; 
}
);
</script>