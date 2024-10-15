<template>
    <aside class=" w-[256px] h-svh p-6 border-r flex flex-col justify-between">
        <div class="flex flex-col gap-11">
            <div class=" text-[64px]  p-4"><h1 class="ibrand p-0 leading-none">sadit</h1></div>
            <Menu></Menu>
        </div>
        
        <Links :link="logout"></Links>
    </aside>
</template>
<script setup>
    const logout = {
        Icon:"material-symbols-light:logout",
        Value:"Logout",
        To:"/",
    }
</script>
