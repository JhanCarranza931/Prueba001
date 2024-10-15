<template>
    <section class="container_stats mx-auto px-4 py-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          v-for="stat in stats" 
          :title="stat.title" 
          :value="stat.value" 
          :increase="stat.increase"
          :icon="stat.icon"
        />
      </div>
    <section>
      <prueba ></prueba>
        
    </section>
    </section>
    
  </template>
  
  <script setup >
  
  const stats = ref([
    { title: 'Total de empleados', value: 12, increase: 12, icon: 'mynaui:users-group' },
    { title: 'Asistencia Promedio', value: '98%', increase: 12, icon: 'octicon:checklist-24' },
    { title: 'Ausencias no justificadas', value: 23, increase: 15, icon: 'bi:journal-x' },
    { title: 'Actividades completadas ', value: 23, increase: 20, icon: 'mynaui:chart-line' }
  ])
  console.log(stats)
  </script>