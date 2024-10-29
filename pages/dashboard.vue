<template>
    <section class="container_stats mx-auto px-4 py-10 flex flex-col gap-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
            v-for="stat in stats" 
            :title="stat.title" 
            :value="stat.value" 
            :increase="stat.increase"
            :icon="stat.icon"
          />
      </div>
      <section class=" flex justify-between">
        <EchartsChart class=" w-[48%]"></EchartsChart>
        <EchartsToro class="w-[48%]" ></EchartsToro>
      </section>
      <section class=" flex w-full gap-6">
        <Table class="w-full borde pt-6"></Table>
        <Calendar></Calendar>

      </section>

    </section>
    
</template>
  
<script setup>
  import Table from '~/components/tables/Table.vue';



  
  const stats = ref([
    { title: 'Total de empleados', value: 12, increase: 12, icon: 'tabler:align-box-bottom-right' },
    { title: 'Asistencia Promedio', value: '98%', increase: 12, icon: 'octicon:checklist-24' },
    { title: 'Ausencias no justificadas', value: 23, increase: 15, icon: 'bi:journal-x' },
    { title: 'Actividades completadas ', value: 23, increase: 20, icon: 'mynaui:chart-line' },


  ])
  </script>