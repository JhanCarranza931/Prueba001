<template>
      <div class="w-full max-w-md bg-white rounded-lg borde overflow-hidden">
        <header class="p-4 border-b">
          <div class="flex items-center justify-between">
            <p class="text-xl font-medium text-gray-800">{{ currentMonthYear }}</p>
            <div class="flex space-x-2">
              <button @click="changeMonth(-1)" class="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button @click="changeMonth(1)" class="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </header>
        <div class="p-4">
          <div class="grid grid-cols-7 gap-2 mb-2">
            <div v-for="day in weekDays" :key="day" class="text-center text-sm font-medium text-gray-500">
              {{ day }}
            </div>
          </div>
          <div class="grid grid-cols-7 gap-2">
            <div
              v-for="(day, index) in calendarDays"
              :key="index"
              @click="selectDate(day)"
              :class="[
                'text-center p-2 rounded-full cursor-pointer transition-colors duration-200',
                {
                  'text-gray-400': day.inactive,
                  'bg-emerald-500 text-white': day.active,
                  'hover:bg-gray-100': !day.inactive && !day.active,
                  'text-gray-800 ': !day.inactive && !day.active
                }
              ]"
            >
              {{ day.date }}
            </div>
          </div>
        </div>
      </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  const weekDays = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  const months = ["January", "February", "March", "April", "May", "June", "July",
                  "August", "September", "October", "November", "December"];
  
  const currentDate = ref(new Date());
  const currYear = ref(currentDate.value.getFullYear());
  const currMonth = ref(currentDate.value.getMonth());
  
  const currentMonthYear = computed(() => `${months[currMonth.value]} ${currYear.value}`);
  
  const calendarDays = ref([]);
  
  const renderCalendar = () => {
    const firstDayOfMonth = new Date(currYear.value, currMonth.value, 1).getDay();
    const lastDateOfMonth = new Date(currYear.value, currMonth.value + 1, 0).getDate();
    const lastDayOfMonth = new Date(currYear.value, currMonth.value, lastDateOfMonth).getDay();
    const lastDateOfLastMonth = new Date(currYear.value, currMonth.value, 0).getDate();
  
    calendarDays.value = [];
  
    for (let i = firstDayOfMonth; i > 0; i--) {
      calendarDays.value.push({ date: lastDateOfLastMonth - i + 1, inactive: true });
    }
  
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isToday = i === currentDate.value.getDate() && 
                      currMonth.value === currentDate.value.getMonth() && 
                      currYear.value === currentDate.value.getFullYear();
      calendarDays.value.push({ date: i, inactive: false, active: isToday });
    }
  
    for (let i = lastDayOfMonth; i < 6; i++) {
      calendarDays.value.push({ date: i - lastDayOfMonth + 1, inactive: true });
    }
  };
  
  const changeMonth = (delta) => {
    currMonth.value += delta;
    if (currMonth.value < 0 || currMonth.value > 11) {
      const date = new Date(currYear.value, currMonth.value, new Date().getDate());
      currYear.value = date.getFullYear();
      currMonth.value = date.getMonth();
    } else {
      currentDate.value = new Date();
    }
    renderCalendar();
  };
  
  const selectDate = (day) => {
    if (!day.inactive) {
      calendarDays.value.forEach(d => d.active = false);
      day.active = true;
    }
  };
  
  onMounted(() => {
    renderCalendar();
  });
  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
  
  .font-roboto {
    font-family: 'Roboto', sans-serif;
  }
  </style>