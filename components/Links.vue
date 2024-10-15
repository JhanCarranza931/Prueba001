<template>
  <NuxtLink :to="link.To" class=" group hover:bg-[#AEFFDE] hover:text-[#003721] rounded-lg flex cursor-pointer   p-4 items-center text-[#1F1F22]" > 
    <Icon :name="link.Icon" size="24" class=" mr-[10px]"/> 
    {{link.Value}}</NuxtLink>
</template>
<script setup>
    defineProps({
        link : Object
    })
</script>