<template>
    <template v-if="isAdmin">
        <ModalNewCoworking></ModalNewCoworking>
        <TablesCoworkingTable></TablesCoworkingTable>
    </template>
    <template v-else-if="isUser">
    <h1>Hola Coworking</h1>
    </template>
    
</template>
<script setup>
import { useSessionStore } from '~/stores/sessionStore';
const  sessionStore = useSessionStore()
const isAdmin = sessionStore.isAdmin;
const isUser = sessionStore.isUser;

definePageMeta({
     middleware:'auth',
});


</script>