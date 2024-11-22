
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

const chartOptions = ref({
  title: {
    text: 'Datos de Asistencias',
    left: 'center', 
    top: '20px'
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep','Oct','Nov','Dec'], 
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
      data: [120, 170, 150, 80, 70, 110, 130, 11,80, 70, 110, 130],
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
</script>

<style scoped>
.chart {
  height: 500px; 
}
</style>
