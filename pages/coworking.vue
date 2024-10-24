<template>
    <ModalNewCoworking></ModalNewCoworking>
    <TablesCoworkingTable></TablesCoworkingTable>
</template>
<script setup>
    definePageMeta({
        middleware:'auth',
    });
</script>