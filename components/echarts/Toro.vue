<template>
    <div class="borde">
      <client-only>
        <v-chart class="chart" :option="chartOptions" autoresize />
      </client-only>
    </div>
  </template>
  
  <script setup>
  // Importar la imagen
import BeefCutsFranceSvg from '@/assets/Beef_cuts_France.svg';

  import { ref, onMounted } from 'vue';
  import VChart from 'vue-echarts'; 
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { BarChart } from 'echarts/charts';
  import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent
  } from 'echarts/components';
  import * as echarts from 'echarts';
  
  // Registrar los componentes de ECharts
  use([
    CanvasRenderer,
    BarChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent
  ]);
  
  // Referencia reactiva para las opciones del gráfico
  const chartOptions = ref(null);
  
  onMounted(async () => {
    try {
      // Cargar el archivo SVG usando Fetch API
      chartOptions.value = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '70%'],
      // adjust the start and end angle
      startAngle: 180,
      endAngle: 360,
      data: [
        { value: 1048, name: 'Ing. Software con IA' },
        { value: 735, name: 'Diseño Grafico' },
        { value: 580, name: 'Ing. Ciberseguridad' },
        { value: 484, name: 'Soporte TI' },

      ]
    }
  ]
};
    } catch (error) {
      console.error('Error al cargar los datos del gráfico:', error);
    }
  });
  </script>
  
  <style scoped>
  .chart {
    height: 500px; 
  }
  </style>
  