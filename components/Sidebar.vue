<template>
    <aside class=" w-[256px]  p-6 border-r flex flex-col justify-between sticky h-screen top-0">
        <div class="flex flex-col gap-11">
            <div class=" text-[64px]  p-4 "><h1 class="ibrand p-0 leading-none">sadit</h1></div>
            <Menu></Menu>
        </div>
        
        <button @click="log" class="group hover:bg-red-500 hover:text-[#ffffff] rounded-lg flex cursor-pointer   p-4 items-center text-[#1F1F22]"><Icon class=" mr-[10px]" name="hugeicons:logout-02"/> Salir</button>
    </aside>
</template>
<script setup>

    const log = ()=>{
        localStorage.removeItem('authToken');
        navigateTo('/')
    }
</script>
