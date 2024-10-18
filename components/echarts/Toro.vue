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
      const response = await fetch(BeefCutsFranceSvg);
      if (!response.ok) {
        throw new Error('Error cargando el archivo SVG');
      }
      const svg = await response.text();
    
      // Registrar el mapa con el SVG cargado
      echarts.registerMap('Beef_cuts_France', { svg });
    
      // Definir la configuración del gráfico
      chartOptions.value = {
        tooltip: {},
        visualMap: {
          left: 'center',
          bottom: '10%',
          min: 5,
          max: 100,
          orient: 'horizontal',
          text: ['', 'Price'],
          realtime: true,
          calculable: true,
          inRange: {
            color: ['#dbac00', '#db6e00', '#cf0000']
          }
        },
        series: [
          {
            name: 'French Beef Cuts',
            type: 'map',
            map: 'Beef_cuts_France',
            roam: true,
            emphasis: {
              label: {
                show: false
              }
            },
            selectedMode: false,
            data: [
              { name: 'Jack Troncos', value: 15 },
              { name: 'Langue', value: 35 },
              { name: 'Plat de joue', value: 15 },
              { name: 'Gros bout de poitrine', value: 25 },
              { name: 'Jumeau à pot-au-feu', value: 45 },
              { name: 'Onglet', value: 85 },
              { name: 'Plat de tranche', value: 25 },
              { name: 'Araignée', value: 15 },
              { name: 'Gîte à la noix', value: 55 },
              { name: "Bavette d'aloyau", value: 25 },
              { name: 'Tende de tranche', value: 65 },
              { name: 'Rond de gîte', value: 45 },
              { name: 'Bavettede de flanchet', value: 85 },
              { name: 'Flanchet', value: 35 },
              { name: 'Hampe', value: 75 },
              { name: 'Plat de côtes', value: 65 },
              { name: 'Tendron Milieu de poitrine', value: 65 },
              { name: 'Macreuse à pot-au-feu', value: 85 },
              { name: 'Rumsteck', value: 75 },
              { name: 'Faux-filet', value: 65 },
              { name: 'Côtes Entrecôtes', value: 55 },
              { name: 'Basses côtes', value: 45 },
              { name: 'Collier', value: 85 },
              { name: 'Jumeau à biftek', value: 15 },
              { name: 'Paleron', value: 65 },
              { name: 'Macreuse à bifteck', value: 45 },
              { name: 'Gîte', value: 85 },
              { name: 'Aiguillette baronne', value: 65 },
              { name: 'Filet', value: 95 }
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
  