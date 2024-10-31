<script setup>
 const actividadesStore = new useActividadStore()
 const sessionStore = new useSessionStore();

 console.log('Losss',sessionStore.us)

const actividades = computed(()=> actividadesStore.actividades)

const fechActividades = async ()=>{
   await actividadesStore.fetchActividades();

   
}

const data = ref({
  actividad: '',
  id_user : sessionStore.us.id,
  id_estado:1
})

const submitActividad = async ()=>{
    const Response = await actividadesStore.addActividad(data.value)
    const datas = await Response;

   alert(datas.message)
}
console.log(data.value)

onMounted(fechActividades)
</script>

<template>
     <main class="flex min-h-screen flex-col gap-5 p-6">
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
        
        <div class="flex gap-4 items-end">
          <div class="flex flex-col w-full max-w-screen-md gap-3">
            <form action="" method="post" @submit.prevent="submitActividad">
            <label class="font-medium" for="dni">Actividad</label>
            <textarea id="actividad"
              placeholder="Ingresa tus actividades de manera ordenada.."
              class="w-full max-w-[720px] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              v-model="data.actividad"
              required
              ></textarea>
              <button type="submit" class="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-600 font-extrabold">Registrar actividad</button>
              
            </form>
          </div>
          
          
        </div>
      </section>
  
      <div class="flex items-center justify-end gap-5 | space-x-4 p-4 ">
      <!-- Filtro Icon -->
      <button class="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#5F5F5F" fill="none">
      <path d="M3 7H6" stroke="#5F5F5F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M3 17H9" stroke="#5F5F5F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M18 17L21 17" stroke="#5F5F5F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M15 7L21 7" stroke="#5F5F5F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z" stroke="#5F5F5F" stroke-width="1.5" />
      <path d="M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z" stroke="#5F5F5F" stroke-width="1.5" />
  </svg>
  
        <span class="ml-2 text-[#5F5F5F]">Filtrar</span>
      </button>
  
      <!-- Fecha Picker -->
      <div class="relative">
        <input  type="date" placeholder="3 de Octubre 2024" class="w-40 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" />
      </div>
  
      <!-- Estado Dropdown -->
      <div>
        
        <select class="w-40 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400">
          <option value="all">Todos los estados</option>
          <option value="completed">Completada</option>
          <option value="pending">En proceso</option>
          <option value="pending">Pendiente</option>

        </select>
      </div>
    </div>
  
  
    <div class="p-6">
      <!-- Tabla de Actividades -->
      <table class="min-w-full bg-white">
        <thead>
          <tr class="border-b">
            <th class="py-3 px-6 text-left text-[#7C7C7C] font-semibold">Nombres</th>
            <th class="py-3 px-6 text-left text-[#7C7C7C] font-semibold">Actividades</th>
            <th class="py-3 px-6 text-left text-[#7C7C7C] font-semibold">Correo</th>
            <th class="py-3 px-6 text-left text-[#7C7C7C] font-semibold">Asistencia</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="py-4 px-6 flex items-center gap-4">
              <img src="https://via.placeholder.com/40" alt="Foto de perfil" class="w-10 h-10 rounded-full" />
              <div>
                <p class="font-semibold">Jhan Carranza</p>
                <p class="font-medium text-gray-500">75258714</p>
              </div>
            </td>
            <td class="py-4 px-6 text-gray-600">Realizar un post de grace....</td>
            <td class="py-4 px-6 text-gray-600">jhancarranza@gmail.com</td>
            <td class="py-4 px-6">
              <span class="inline-flex items-center gap-3 px-5 py-1 text-sm font-semibold text-[#00AE34] bg-[#E7FFDC] rounded-full">
                <span class="w-2 h-2 rounded-full bg-green-500 "></span>
                COMPLETADA
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  
  
  
    </main>
</template>

