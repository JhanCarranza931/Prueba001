<template>
    <nav  class="flex flex-col gap-6">
        <template v-for="i in link">
            <Links :link="i"></Links>
        </template>
      
    </nav>
</template>
<script setup>
const link = [{
    Icon : "lets-icons:home-light",
    Value : "Dashboard",
    To : "/dashboard",
},
{
    Icon : "arcticons:current-activity",
    Value : "Actividades",
    To : "/actividades",
},
{
    Icon : "circum:user",
    Value : "Asistencias",
    To : "/asistencias",
},
{
    Icon : "clarity:group-line",
    Value : "Coworking",
    To : "/coworking",
},
{
    Icon : "material-symbols-light:analytics-outline-rounded",
    Value : "Analytic",
    To : "/analytic",
},
{
    Icon : "weui:info-outlined",
    Value : "Info.",
    To : "/informacion",
},

]

</script>