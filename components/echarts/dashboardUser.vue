<template>
    <section class="flex flex-col max-w-full overflow-x-hidden p-8">
  
      <div class="flex md:flex-nowrap flex-wrap w-full justify-between gap-4">
        <!-- Total de Asistencias -->
        <div class="min-w-60 grow p-4 rounded-md text-white gradient-verde">
          <div class="text-sm font-outfit font-bold">TOTAL DE ASISTENCIAS</div>
          <div class="font-bold flex items-center space-x-1 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 40 40" fill="none">
              <path
                d="M35 33.3335V10.0002C35 8.16183 33.505 6.66683 31.6667 6.66683H28.3333V3.3335H25V6.66683H15V3.3335H11.6667V6.66683H8.33333C6.495 6.66683 5 8.16183 5 10.0002V33.3335C5 35.1718 6.495 36.6668 8.33333 36.6668H31.6667C33.505 36.6668 35 35.1718 35 33.3335ZM15 30.0002H11.6667V26.6668H15V30.0002ZM15 23.3335H11.6667V20.0002H15V23.3335ZM21.6667 30.0002H18.3333V26.6668H21.6667V30.0002ZM21.6667 23.3335H18.3333V20.0002H21.6667V23.3335ZM28.3333 30.0002H25V26.6668H28.3333V30.0002ZM28.3333 23.3335H25V20.0002H28.3333V23.3335ZM31.6667 15.0002H8.33333V11.6668H31.6667V15.0002Z"
                fill="white" />
            </svg>
            <span class="text-3xl font-bold">50</span>
          </div>
          <div class="text-xs mt-2 font-outfit">+12 asistencias el mes pasado</div>
        </div>
  
        <!-- Mayor  Asistencias -->
        <div class=" min-w-60 grow p-4 rounded-md text-white gradient-morado">
          <div class="text-sm font-outfit font-bold">MAYOR ASISTENCIAS</div>
          <div class="font-bold flex items-center space-x-1 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 41 40" fill="none">
              <path
                d="M30.3335 6.66683H28.6668V5.00016C28.6668 4.55814 28.4912 4.13421 28.1787 3.82165C27.8661 3.50909 27.4422 3.3335 27.0002 3.3335C26.5581 3.3335 26.1342 3.50909 25.8217 3.82165C25.5091 4.13421 25.3335 4.55814 25.3335 5.00016V6.66683H15.3335V5.00016C15.3335 4.55814 15.1579 4.13421 14.8453 3.82165C14.5328 3.50909 14.1089 3.3335 13.6668 3.3335C13.2248 3.3335 12.8009 3.50909 12.4883 3.82165C12.1758 4.13421 12.0002 4.55814 12.0002 5.00016V6.66683H10.3335C9.00741 6.66683 7.73564 7.19361 6.79796 8.1313C5.86028 9.06898 5.3335 10.3407 5.3335 11.6668V31.6668C5.3335 32.9929 5.86028 34.2647 6.79796 35.2024C7.73564 36.14 9.00741 36.6668 10.3335 36.6668H30.3335C31.6596 36.6668 32.9313 36.14 33.869 35.2024C34.8067 34.2647 35.3335 32.9929 35.3335 31.6668V11.6668C35.3335 10.3407 34.8067 9.06898 33.869 8.1313C32.9313 7.19361 31.6596 6.66683 30.3335 6.66683ZM13.6668 28.3335C13.3372 28.3335 13.015 28.2357 12.7409 28.0526C12.4668 27.8695 12.2532 27.6092 12.127 27.3046C12.0009 27.0001 11.9679 26.665 12.0322 26.3417C12.0965 26.0184 12.2552 25.7214 12.4883 25.4883C12.7214 25.2552 13.0184 25.0965 13.3417 25.0322C13.665 24.9679 14.0001 25.0009 14.3046 25.127C14.6092 25.2532 14.8695 25.4668 15.0526 25.7409C15.2357 26.015 15.3335 26.3372 15.3335 26.6668C15.3335 27.1089 15.1579 27.5328 14.8453 27.8453C14.5328 28.1579 14.1089 28.3335 13.6668 28.3335ZM27.0002 28.3335H20.3335C19.8915 28.3335 19.4675 28.1579 19.155 27.8453C18.8424 27.5328 18.6668 27.1089 18.6668 26.6668C18.6668 26.2248 18.8424 25.8009 19.155 25.4883C19.4675 25.1758 19.8915 25.0002 20.3335 25.0002H27.0002C27.4422 25.0002 27.8661 25.1758 28.1787 25.4883C28.4912 25.8009 28.6668 26.2248 28.6668 26.6668C28.6668 27.1089 28.4912 27.5328 28.1787 27.8453C27.8661 28.1579 27.4422 28.3335 27.0002 28.3335ZM32.0002 18.3335H8.66683V11.6668C8.66683 11.2248 8.84242 10.8009 9.15498 10.4883C9.46755 10.1758 9.89147 10.0002 10.3335 10.0002H12.0002V11.6668C12.0002 12.1089 12.1758 12.5328 12.4883 12.8453C12.8009 13.1579 13.2248 13.3335 13.6668 13.3335C14.1089 13.3335 14.5328 13.1579 14.8453 12.8453C15.1579 12.5328 15.3335 12.1089 15.3335 11.6668V10.0002H25.3335V11.6668C25.3335 12.1089 25.5091 12.5328 25.8217 12.8453C26.1342 13.1579 26.5581 13.3335 27.0002 13.3335C27.4422 13.3335 27.8661 13.1579 28.1787 12.8453C28.4912 12.5328 28.6668 12.1089 28.6668 11.6668V10.0002H30.3335C30.7755 10.0002 31.1994 10.1758 31.512 10.4883C31.8246 10.8009 32.0002 11.2248 32.0002 11.6668V18.3335Z"
                fill="white" />
            </svg>
            <span class="text-3xl font-bold font-outfit">Miercoles</span>
          </div>
          <div class="text-xs mt-2 font-outfit">4 veces este mes</div>
        </div>
  
        <!-- Nivel de actividad -->
        <div class=" min-w-60 grow p-4 rounded-md text-white gradient-azul">
          <div class="text-sm font-outfit font-bold">NIVEL DE ACTIVIDAD</div>
          <div class="font-bold flex items-center space-x-1 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path
                d="M10.9585 2.89577C11.0825 3.01977 11.1645 3.14977 11.2165 3.24577C11.2955 3.39077 11.3545 3.54577 11.4015 3.68577C11.4915 3.95377 11.5835 4.31077 11.6885 4.71777L15.3685 18.9578L16.9765 12.8998L16.9895 12.8498L16.9925 12.8388C17.0365 12.6688 17.1095 12.3848 17.2755 12.1458C17.4264 11.9259 17.6331 11.7502 17.8745 11.6368C18.0655 11.5468 18.2435 11.5198 18.3745 11.5098C18.4795 11.4998 18.5945 11.5008 18.6825 11.5008H21.6665C21.9317 11.5008 22.1861 11.6061 22.3736 11.7937C22.5611 11.9812 22.6665 12.2356 22.6665 12.5008C22.6665 12.766 22.5611 13.0203 22.3736 13.2079C22.1861 13.3954 21.9317 13.5008 21.6665 13.5008H18.8865L17.0825 20.2958C16.9745 20.7018 16.8805 21.0578 16.7885 21.3258C16.7376 21.4772 16.6748 21.6243 16.6005 21.7658C16.4924 21.9674 16.3365 22.1394 16.1465 22.2668C15.9112 22.4199 15.6363 22.5009 15.3556 22.4998C15.0749 22.4988 14.8006 22.4157 14.5665 22.2608C14.3775 22.1317 14.223 21.9584 14.1165 21.7558C14.0432 21.6139 13.9813 21.4665 13.9315 21.3148C13.8415 21.0468 13.7495 20.6898 13.6445 20.2828L9.9645 6.04277L8.3565 12.0998L8.3435 12.1498L8.3405 12.1608C8.2965 12.3308 8.2225 12.6148 8.0575 12.8538C7.90663 13.0737 7.69986 13.2494 7.4585 13.3628C7.2675 13.4528 7.0895 13.4798 6.9585 13.4898C6.8535 13.4998 6.7385 13.4988 6.6505 13.4988H3.6665C3.40129 13.4988 3.14693 13.3934 2.9594 13.2059C2.77186 13.0183 2.6665 12.764 2.6665 12.4988C2.6665 12.2336 2.77186 11.9792 2.9594 11.7917C3.14693 11.6041 3.40129 11.4988 3.6665 11.4988H6.4465L8.2505 4.70277C8.3585 4.29777 8.4525 3.94077 8.5445 3.67477C8.5925 3.53477 8.6525 3.37977 8.7325 3.23477C8.8405 3.03282 8.99639 2.86045 9.1865 2.73277C9.45702 2.55647 9.77909 2.47656 10.1006 2.50596C10.4222 2.53536 10.7244 2.67334 10.9585 2.89577Z"
                fill="white" />
            </svg>
            <span class="text-3xl font-bold font-outfit">En progreso</span>
          </div>
          <div class="text-xs mt-2 font-outfit">Compromiso en actividades: 85%</div>
        </div>
  
        <!-- Nivel de actividad -->
        <div class=" min-w-60 grow p-4 rounded-md text-white gradient-celeste">
          <div class="text-sm font-outfit font-bold">ASISTENCIAS POR HORARIOS</div>
          <div class="font-bold flex items-center space-x-1 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 40 40" fill="none">
              <path
                d="M20.0002 3.3335C29.2052 3.3335 36.6668 10.7952 36.6668 20.0002C36.6668 29.2052 29.2052 36.6668 20.0002 36.6668C10.7952 36.6668 3.3335 29.2052 3.3335 20.0002C3.3335 10.7952 10.7952 3.3335 20.0002 3.3335ZM20.0002 10.0002C19.5581 10.0002 19.1342 10.1758 18.8217 10.4883C18.5091 10.8009 18.3335 11.2248 18.3335 11.6668V20.0002C18.3336 20.4422 18.5092 20.866 18.8218 21.1785L23.8218 26.1785C24.1362 26.4821 24.5572 26.6501 24.9942 26.6463C25.4312 26.6425 25.8492 26.4672 26.1582 26.1582C26.4672 25.8492 26.6425 25.4312 26.6463 24.9942C26.6501 24.5572 26.4821 24.1362 26.1785 23.8218L21.6668 19.3102V11.6668C21.6668 11.2248 21.4912 10.8009 21.1787 10.4883C20.8661 10.1758 20.4422 10.0002 20.0002 10.0002Z"
                fill="white" />
            </svg>
            <span class="text-3xl font-bold font-outfit">Mañanas</span>
          </div>
          <div class="text-xs mt-2 font-outfit">Asistencias por la mañana: 70%</div>
        </div>
  
      </div>
  
  
        <div class="flex justify-between flex-nowrap p-4">
          <div class="flex flex-col grow">
            <h3 class="text-lg font-semibold mb-4 font-outfit">Asistencias por semana</h3>
            <div class="aspect-[4/2] max-w-full object-fill" ref="barChart" ></div>
          </div>
    
          <div class=" flex flex-col grow ">
            <h3 class="text-lg font-bold mb-4">Estado de las asistencias</h3>
            <div ref="pieChart" style="width: 100%; height: 400px;"></div>
          </div>
        </div>
  
      <div class="w-full">
        <h3 class="text-lg font-bold mb-4">Cantidad de asistencias y actividades por mes</h3>
  
        <div ref="barChart2" style="width: 100%; height: 400px;"></div>
      </div>
    </section>
  
  </template>
  
  <script>
  // Importa ECharts
  import * as echarts from 'echarts';
  
  export default {
    name: 'AttendanceCharts',
    mounted() {
      this.initBarChart();
      this.initPieChart();
      this.initBarChart2();
    },
    methods: {
      initBarChart() {
        const barChart = echarts.init(this.$refs.barChart);
  
        const barOption = {
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: 'category',
            data: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: 'Asistencias',
              type: 'bar',
              data: [10, 15, 20, 12, 18],
              color: '#4CAF50', // Color para las barras
            }
          ]
        };
  
        barChart.setOption(barOption);
      },
  
      // Inicializa el gráfico de tarta
      initPieChart() {
        const pieChart = echarts.init(this.$refs.pieChart);
  
        const pieOption = {
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
              avoidLabelOverlap: false,
              padAngle: 5,
              itemStyle: {
                borderRadius: 10
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
              ]
            }
          ]
        };
  
        pieChart.setOption(pieOption);
      },
  
      initBarChart2() {
        const barChart2 = echarts.init(this.$refs.barChart2);
  
        const option = {
          title: {
  
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            top: '5%',
            left: 'center',
            data: ['Asistencias', 'Actividades']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['Ene', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Asistencias',
              type: 'bar',
              data: [120, 132, 101, 134, 90, 230, 210, 120, 170, 150, 200, 230],
              color: '#00FF00', // Color para las barras de asistencias
              barWidth: '35%', // Ancho de las barras
            },
            {
              name: 'Actividades',
              type: 'bar',
              data: [100, 120, 140, 150, 170, 180, 160, 140, 130, 120, 110, 90],
              color: '#FF9900', // Color para las barras de actividades
              barWidth: '35%', // Ancho de las barras
            }
          ]
        };
  
        barChart2.setOption(option);
      }
    }
  };
  </script>
  