
  <template>
  <div class="borde">
    <client-only>
      <v-chart class="chart" :option="chartOptions" autoresize />
    </client-only>
  </div>
</template>



<script setup>
import { ref } from 'vue';
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

// Definir la opción del gráfico como una referencia reactiva
const chartOptions = ref({
  title: {
    text: 'Datos de Asistencias',
    left: 'center', // Alineación del título
    top: '20px'
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep','Oct','Nov','Dec'], // Categorías del eje X
    axisLabel: {
      rotate: 30 // Rote las etiquetas si es necesario
    }
  },
  yAxis: {
    type: 'value',
    name: 'Cantidad' // Nombre del eje Y
  },
  series: [
    {
      name: 'Asistencias',
      data: [120, 170, 150, 80, 70, 110, 130, 11,80, 70, 110, 130], // Datos del gráfico
      type: 'bar',
      itemStyle: {
        color: '#00DC82',
        borderRadius: [4, 4, 0, 0] // Personalización del estilo de las barras
      }
    }
  ],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow' // Tipo de puntero para el tooltip
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true // Contener etiquetas dentro del área del gráfico
  }
});
</script>

<style scoped>
.chart {
  height: 500px; 
}
</style>
