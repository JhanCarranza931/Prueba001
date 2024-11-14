<template>
  <main class="flex justify-center items-center w-full h-screen">
    <section class="flex flex-col gap-8 max-w-[460px]">
        <img class=" self-center" width="240px" src="https://pstangarana.com/wp-content/uploads/2023/05/Logo-Tangarana-Alargado.webp" alt="Tangarana" srcset="">
        <div>
            <h3 class=" text-[#108047] font-bold">¡BIENVENIDO!  </h3>
            <h1 class="text-[#108047] font-extrabold text-4xl">REGISTRA TU ASISTENCIA</h1>
        </div>
        <p class=" text-[#7c7272]">Fecha: {{ currentDate }} Hora: {{ currentTime }} </p>
        <form action="" class="flex flex-col gap-8 " @submit.prevent >
        <label for="dni" class="relative flex flex-col gap-2">
            <span class=" font-semibold text-xs">DNI</span> <!-- Etiqueta de texto para el campo -->
            
            <div class="relative">
                <input
                id="dni"
                type="text"
                class="pl-10 w-full pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                :class="{ 'border-red-200 border-[2px] focus:ring-red-300': dniError===true}"
                placeholder="Ingresa tu DNI"
                v-model="dni"
                @input="validateDni"
                autocomplete="off"
                maxlength="8"
                />
                <Icon
                name="hugeicons:user"
                class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                ></Icon>
            </div>
            <span v-if="dniError && dni.length > 0" class=" float-start text-sm text-red-600">El dni debe contener 8 digitos</span>
        </label>
        
       
            
        
        <div class="flex justify-between gap-5">
            <Toaster
            richColors
            position="top-center"
            />
            <button type="submit" @click="submitAsis" class=" bg-emerald-600 hover:bg-emerald-700 py-3 px-[58px] rounded-lg  font-bold text-white w-full">ENTRADA</button>
            <button type="button" @click="submitSalida" class=" bg-emerald-600 hover:bg-emerald-700 py-3 px-[58px] rounded-lg font-bold text-white w-full">SALIDA</button>
        </div>
    </form>
    <p class=" text-center text-[#FF6900] text-sm">10 años al pie del cañon</p>

    <div>
        <span class="text-[#108047] font-bold">¡Importante!</span>
        <p class="text-[#A0A2A4] text-sm font-normal">No olvides  ingresar al panel de control para  gestionar tus asistencias y actividades</p>  
    </div>
    <NuxtLink class=" justify-end w-full flex text-sm text-[#1A7C4A] font-medium underline " to="/">Ingresar al sistema</NuxtLink>
    </section>
  </main>
  <Loading v-if="isLoading"></Loading>
</template>

<script  setup>
    import { Toaster, toast } from 'vue-sonner'
    definePageMeta({
        layout: false
    });
    const dni = ref('')
    const dniError = ref(false);
    const isLoading = ref(false)


    const validateDni = () => {
        dni.value = dni.value.replace(/\D/g, '');
        const dniPattern = /^[0-9]{1,8}$/; 
        dniError.value = !dniPattern.test(dni.value) || dni.value.length !== 8;
    };


    const asisStore = useAsistenciasStore();

    const submitAsis = async () => {
        isLoading.value = true
        validateDni();
        if(dni.value === '' ){
            dniError.value = true
        }

        if (dniError.value) {
            isLoading.value = false
            return; 
        }
        try {
            console.log("Enviando datos:", dni);
            const response = await asisStore.addAsistencia(dni.value);
            isLoading.value=false
            if(response.status === 404){
                toast.error(response.message)
            }
            else if(response.status === 409){
                toast.warning(response.message)
            }
            else if(response.status === 201){
                toast.success(response.message)
            }
            else if(response.status === 500){
                toast.error(response.message)
            }
            
        } catch (error) {
            console.log("Error al registrar asistencia:", error);
        }
    };

    const submitSalida = async () => {
        isLoading.value = true
        validateDni();
        if(dni.value === '' ){
            dniError.value = true
        }

        if (dniError.value) {
            isLoading.value = false
            return; 
        }
        try{
            const response = await asisStore.aditAsistencia(dni.value)
            isLoading.value = false
            if(response.status === 404){
                toast.error(response.message)
            }
            else if(response.status === 409){
                toast.warning(response.message)
            }
            else if(response.status === 400){
                toast.warning(response.message)
            }
            else if(response.status === 201){
                toast.success(response.message)
            }
            else if(response.status === 500){
                toast.error(response.message)
            }
        }catch(error){
            console.log('Error al registrar asistencia', error)
            isLoading.value = false
        }
    }


//Reloj Interval
const currentDate = ref('');
const currentTime = ref('');

const updateDate = () => {
  const now = new Date();
  currentDate.value = now.toLocaleDateString(); 
};

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString(); 
};

onMounted(() => {
  updateDate();
  updateTime();
  const dateInterval = setInterval(updateDate, 60000);  
  const timeInterval = setInterval(updateTime, 1000);   
  onUnmounted(() => {
    clearInterval(dateInterval);
    clearInterval(timeInterval);
  });
});

</script>