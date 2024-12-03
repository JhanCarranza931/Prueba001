<template>
    <nav  class="flex flex-col gap-6">
        <template v-for="i in filteredLinks">
            <Links :link="i"></Links>
        </template>
      
    </nav>
</template>
<script setup>
const link = [{
    Icon : "hugeicons:dashboard-square-03",
    Value : "Dashboard",
    To : "/dashboard",
},
{
    Icon : "hugeicons:task-daily-01",
    Value : "Actividades",
    To : "/actividades",
},
{
    Icon : "hugeicons:user",
    Value : "Asistencias",
    To : "/asistencias",
},
{
    Icon : "hugeicons:user-group",
    Value : "Coworking",
    To : "/coworking",
},
{
    Icon : "hugeicons:analytics-01",
    Value : "Reportes",
    To : "/analytic",
}, 

]
const mostrarTodos = true
import { useSessionStore } from "~/stores/sessionStore";
const sessionStore = useSessionStore();

const isAdmin = sessionStore.isAdmin;

const isUser = sessionStore.isUser;

const filteredLinks = link.filter(item => {
    // Si el rol es administrador, mostrar todos los enlaces
    if (isAdmin) {
        return mostrarTodos || item.Value !== "Coworking"; // Ejemplo: excluir "Coworking" si es necesario
    }
    // Si el rol es usuario normal, excluir enlaces específicos solo para admin
    if (isUser) {
        return item.Value !== "Coworking" && item.Value !== "Analytic"; // Excluir "Coworking" y "Analytic" para usuarios
    }
    return false; // No mostrar nada si no es un rol reconocido
});




</script>