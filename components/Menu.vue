<template>
    <nav  class="flex flex-col gap-6">
        <template v-for="i in link">
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
    Value : "Analytic",
    To : "/analytic",
},
{
    Icon : "hugeicons:information-circle",
    Value : "Info.",
    To : "/informacion",
},

]

</script>