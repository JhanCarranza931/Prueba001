
  <template>
  <div class="borde">
    <client-only>
      <v-chart class="chart" :option="chartOptions" autoresize />
    </client-only>
  </div>
</template>



<script setup>
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

// Registrar los componentes de ECharts
use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent]);

// Definir la variable para almacenar los datos de asistencias por mes
const asistenciasPorMes = ref([]);

// Año para la consulta
const year = 2024;

// Datos del gráfico
const chartOptions = ref({
  title: {
    text: 'Datos de Asistencias',
    left: 'center', 
    top: '20px'
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 
    axisLabel: {
      rotate: 30 
    }
  },
  yAxis: {
    type: 'value',
    name: 'Cantidad' 
  },
  series: [
    {
      name: 'Asistencias',
      data: [], // Se llena dinámicamente después de cargar los datos
      type: 'bar',
      itemStyle: {
        color: '#10b985',
        borderRadius: [4, 4, 0, 0] 
      }
    }
  ],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow' 
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true 
  }
});

// Cargar los datos de las asistencias por mes cuando el componente se monte
onMounted(async () => {
  const { data } = await $fetch(`/api/actividadmes?year=${year}`);
  asistenciasPorMes.value = data;

  console.log(asistenciasPorMes.value);  // Muestra los datos obtenidos de la API

  // Actualiza los datos del gráfico una vez se haya cargado la información
  chartOptions.value.series[0].data = asistenciasPorMes.value;

  // Reacciona a la actualización de los datos en el gráfico
});
</script>


<style scoped>
.chart {
  height: 500px; 
}
</style>
