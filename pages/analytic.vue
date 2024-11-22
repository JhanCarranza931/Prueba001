<template>
  <section class="p-6 flex flex-col gap-6">
    <div>
      <h1 class="text-2xl font-medium text-emerald-600">
        Asistencia Colaboradores
      </h1>
      <p class="font-medium text-gray-600 text-sm">
        Descarga los reportes de cada colaborador o en general de acuerdo a las
        fechas que desees.
      </p>
    </div>
    <header class="flex justify-between text-gray-700 items-center">
      <select name="" id="" class="border py-1 px-4 rounded-md">
        <option value="">Todos los colaboradores</option>
        <template v-for="usuario in users">
          <template v-for="rol in usuario.roles">
            <option :value="usuario.id" v-if="rol.rol_id === 2">
              {{ usuario.nombre + " " + usuario.apellido }}
            </option>
          </template>
        </template>
      </select>
      <div class="flex gap-6">
        <label for="">Desde: <input type="date" name="" id="" v-model="form.fechaInicio"  /></label>
        <label for="">Hasta: <input type="date" name="" id="" v-model="form.fechaFinal" /></label>
      </div>
      <button @click="exportToCSV"
        class="flex items-center px-4 bg-[#e9e7fd] rounded-md py-1 text-purple-600"
      >
        <Icon name="hugeicons:download-04" class="mr-2"></Icon>Exportar
      </button>
    </header>
  </section>
  <section class="px-6">
    <TablesAsistencias></TablesAsistencias>
  </section>

  <section class="p-6 flex flex-col gap-6">
    <div>
      <h1 class="text-2xl font-medium text-emerald-600">
        Actividad de los colaboradores
      </h1>
      <p class="font-medium text-gray-600 text-sm">
        Descarga los reportes de cada colaborador o en general de acuerdo a las
        fechas que desees.
      </p>
    </div>
    <header class="flex justify-between text-gray-700 items-center">
      <select name="" id="" class="border py-1 px-4 rounded-md">
        <option value="">Todos los colaboradores</option>
        <template v-for="usuario in users">
          <template v-for="rol in usuario.roles">
            <option :value="usuario.id" v-if="rol.rol_id === 2">
              {{ usuario.nombre + " " + usuario.apellido }}
            </option>
          </template>
        </template>
      </select>
      <div class="flex gap-6">
        <label for="">Desde: <input type="date" name="" id="" v-model="periodo.fechaInicio"/></label>
        <label for="">Hasta: <input type="date" name="" id="" v-model="periodo.fechaFinal" /></label>
      </div>
      <button
      @click="exportActividad"
        class="flex items-center px-4 bg-[#e9e7fd] rounded-md py-1 text-purple-600"
      >
      <Toaster
            richColors
            position="top-center"
            />
        <Icon name="hugeicons:download-04" class="mr-2"></Icon>Exportar
      </button>
    </header>
  </section>
  <section class="px-6 pb-[40px]">
    <TablesActividades></TablesActividades>
  </section>
</template>

<script setup>
import { Toaster, toast } from 'vue-sonner'
definePageMeta({
  middleware: "auth",
});

const user = useUserStore();

const users = computed(() => user.users);
const report = useReporteStore()
const reportActividades = useReporteActividadesStore()

const form = ref({
  fechaInicio: '',
  fechaFinal:''
})
const periodo = ref({
  fechaInicio: '',
  fechaFinal:''
})


onMounted(() => {
  user.fetchUsers();
  report.fetchAsistencias();
  reportActividades.fetchActividades()
});

const exportToCSV = async ()  => {
  if(!form.value.fechaInicio){
    toast.error('Debes incluir el rango de fechas')
  }
  else
  {
    console.log(form.value.fechaInicio)
  const data = await report.procesarAsistencias(form.value.fechaInicio,form.value.fechaFinal);
  if (data.length === 0) {
    alert('No hay datos para exportar.');
    return;
  }
  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]).join(","); 
    const rows = data.map((row) =>
      Object.values(row)
        .map((value) => `"${value}"`) 
        .join(",")
    );
    return [headers, ...rows].join("\n");
  };

  const csvData = convertToCSV(data);


  const blob = new Blob([csvData], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Reporte_Asistencias.csv";
  a.click();
  URL.revokeObjectURL(url);
};
}

const exportActividad = async ()  => {
  if(!periodo.value.fechaInicio){
    toast.error('Debes incluir el rango de fechas')
  }
  else
  {
    console.log(periodo.value.fechaInicio)
  const data = await reportActividades.procesarActividades(periodo.value.fechaInicio,periodo.value.fechaFinal);
  if (data.length === 0) {
    alert('No hay datos para exportar.');
    return;
  }
  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]).join(","); 
    const rows = data.map((row) =>
      Object.values(row)
        .map((value) => `"${value}"`) 
        .join(",")
    );
    return [headers, ...rows].join("\n");
  };

  const csvData = convertToCSV(data);


  const blob = new Blob([csvData], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Reporte_Asistencias.csv";
  a.click();
  URL.revokeObjectURL(url);
};
}
</script>

<style scoped>
select{
  display: none;
}
</style>
