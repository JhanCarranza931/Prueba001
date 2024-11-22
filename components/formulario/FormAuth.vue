<template>
    <div class="flex flex-col gap-[27px]  py-[50px] px-[70px] border border-emerald-100 b-login  backdrop-blur-3xl">
    <h1 class=" text-4xl font-black text-emerald-600" >INICIAR SESIÓN</h1>
    
    <div> 
      <span class=" font-medium text-emerald-600">¡Hola! ✌️</span>
      <p class=" text-sm text-[#7C7272] ">Ingresa tu  usuario y contraseña para acceder al panel de control</P>
    </div>

      
    <form action="" method="POST" class="flex flex-col " @submit.prevent="signIn">
        <label class=" text-sm font-bold mb-4 flex flex-col gap-5 text-emerald-600">Nombre
            <input v-model="auth.mail" type="email" placeholder="Ingresa tu Correo" class="borde py-3 px-5 mb-4 font-medium">
        </label>
        
        <div class="mb-6">
        <label for="password" class=" text-sm font-bold  flex flex-col gap-5 text-emerald-600">Contraseña
            <input v-model="auth.pass"  type="password" placeholder="Ingresaa tu contraseña" name="password" id="password" class="borde py-3 px-5  font-medium">
            
        </label>
        <span class=" text-xs text-red-700 ">{{ alerta }}</span>
      </div>
        <button  type="submit" class=" bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg" >
          <span v-if="isLoading">Cargando...</span>
          <span v-else>Ingresar</span>
        </button>
    </form>
    <p class=" text-sm text-[#7C7272] text-center">O</p>
    <NuxtLink to="/asistencia" class="text-sm text-center text-emerald-600 cursor-pointer  underline">Registra tu asistencia</NuxtLink>
</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useSessionStore } from '~/stores/sessionStore';
const sessionStore = useSessionStore();
const router = useRouter();
const alerta= ref('')
const isLoading = ref(false)

const auth = ref({
    mail:'',
    pass:''
})
    


const signIn = async () => {
  isLoading.value=true
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo: auth.value.mail,
        password: auth.value.pass,
      }),
    });

    const data = await response.json();
    if (data.statusCode === 200) {
      localStorage.setItem("authToken", data.body.token);
      const userData = {
        token : data.body.token,
        role: parseInt(data.body.user.rol,10),
        us: data.body.user.us
      }
 
      sessionStore.setUser(userData);
      router.push('/dashboard');
    } else {
      if(!data.body.success){
        alerta.value = data.body.message
        auth.value.pass= ''
      }
    }
  } catch (error) { 

    alert("Error during login. Please try again.");
  }finally{
    isLoading.value = false
  }
};
</script>
<style scoped>
 .b-login{
  background: rgba(26, 124, 74, 0.03);
 }
</style>