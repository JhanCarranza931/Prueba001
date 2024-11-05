<script setup>
 const actividadesStore =  useActividadStore()

 const {user } =  useAuth();

const id = user.value.id

onMounted(async () => {
      actividadesStore.fechActividadesForId(id); // Corregir el nombre de la función
    });

const actividades = computed(()=> actividadesStore.userActividad)



console.log('Actividades',actividades)

const data = ref({
  actividad: '',
  id_user : id,
  id_estado:1
})

const submitActividad = async ()=>{
    await actividadesStore.addActividad(data.value)
    isShowModal.value = false
}
console.log(data.value)


//Modal 
 const isShowModal = ref(false)


 function CloseModal (){
  isShowModal.value = false
 }

 function ShowModal (){
  isShowModal.value=true
 }

 


</script>
<template>
  <main class="flex  flex-col gap-5 p-6">
   <!-- Header -->
    <header class="header flex justify-start items-center md:bg-header bg-no-repeat bg-contain min-h-72 bg-right py-8 border-b border-gray-200">
       <div class="flex flex-col">
         <h1 class="text-4xl font-bold">¡Bienvenido a tu espacio de Actividades, Jhan!"</h1>
         <p class="text-gray-600 mt-2">Este es el lugar donde podrás organizar y gestionar todas tus actividades de manera eficiente y productiva.</p>
       </div>
       <div class="flex w-full justify-center">
         <img src="/assets/img/actividades-hero.webp" width="281px" alt="Actividades">
       </div>
   </header>

   <!-- Registro de actividadd -->
   <section class="flex flex-col gap-1 w-full">
     <h2 class="text-2xl font-semibold text-[#3B5649]  ">Registra tu Actividad</h2>
     <p class="text-gray-600 mb-6 font-medium">Llena los datos para registrar tus actividades  que realizarás durante el día</p>
   </section>
   <section class="flex justify-between gap-[87px] py-6">
      <nav class="px-8 min-w-fit">
        <div class="flex flex-col">
          <button @click="ShowModal" class="text-start whitespace-nowrap flex justify-center px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 mb-5 text-white">
            <Icon name="hugeicons:task-add-01" class=" mr-2"></Icon>
            Agregar actividad
          </button>
         <div class="flex flex-col gap-2">
            <button class="text-start text-sm">Todas las Tareas</button>
            <button class="text-start text-sm">Completadas</button>
            <button class="text-start text-sm">En proceso</button>
            <button class="text-start text-sm">Pendiente</button>
        </div>
        </div>

        <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        >
          <!-- Modal -->
          <div v-if="isShowModal" @close="CloseModal"  class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" >
            
       
            <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative flex flex-col gap-4 ">
              <h2 class=" text-xl font-semibold">Ingresa la actividad a realizar </h2>
              <form action="" class="w-full" @submit.prevent="submitActividad">  
                <label for="" class="flex flex-col mb-4"> Avtividad
                  <textarea v-model="data.actividad" name="actividad" id="" placeholder="Ingresa una actividad" class=" border p-2" required></textarea>
                </label>
                <div class="flex gap-4 w-full justify-end">
                <button @click="CloseModal" class="bg-red-400 text-white px-4 py-2 rounded w-fit">Cerrar</button>
                <button type="submit" class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded w-fit">Agregar</button>
              </div>
              </form>
              
              
              
            </div>
          </div>
        </Transition>
            <!-- Fin del modal -->      
              

      </nav>
      <div class="w-full flex flex-col gap-7">
        <header class="flex justify-between">
          <h1>Lista de Actividades</h1>
          <div class="flex gap-6">
            <button>Filtrar</button>
            <input type="date" class="p-2 border rounded-lg">
          </div>
        </header>
        <div class="flex  flex-wrap gap-3 ">
          <article v-for="actividad in actividades" class="borde p-4 flex flex-col gap-4 flex-1 min-w-[340px] max-w-[420px]">
            <div class="flex justify-between">
              <span class="rounded-full px-3 py-1 font-semibold text-[13.33px] cursor-pointer "
              :class="{
                'bg-[#FFF1C1] text-[#E9AB00]': actividad.estado.stado_actividad === 'En progreso',
                'bg-[#E7FFDC] text-[#00AE34]': actividad.estado.stado_actividad === 'Completado',
                'bg-[#FFD3D3] text-[#FF3300]': actividad.estado.stado_actividad === 'Pendiente'
              }"> • {{ actividad.estado.stado_actividad }}</span>
              
              <button>Editar</button>
            </div>
            <p>{{ actividad.actividad }}</p>
            <span>{{ actividad.fecha }}</span>
            
          </article>
        </div>
      </div>
     </section>




 </main>
</template>


