<template>
    <div class="w-[350px] flex flex-col gap-[27px]">
    <h1 class=" text-4xl font-black text-center" >INICIAR SESIÓN</h1>
    <p class=" text-sm text-[#7C7272] text-center">Ingresa tu  usuario y contraseña para acceder al panel de control</P>
      
    <form action="" method="POST" class="flex flex-col " @submit.prevent="signIn">
        <label class=" text-sm font-bold mb-4 flex flex-col gap-5">Nombre
            <input v-model="auth.mail" type="email" placeholder="Ingresa tu Correo" class="borde py-3 px-5 mb-4 font-medium">
        </label>
        
        <div class="mb-6">
        <label for="password" class=" text-sm font-bold  flex flex-col gap-5">Contraseña
            <input v-model="auth.pass"  type="password" placeholder="Ingresaa tu contraseña" name="password" id="password" class="borde py-3 px-5  font-medium">
            
        </label>
        <span class=" text-xs text-red-700 ">{{ alerta }}</span>
      </div>
        <button  type="submit" class=" bg-black text-white font-bold py-3 rounded-lg" >
          <span v-if="isLoading">Cargando...</span>
          <span v-else>Ingresar</span>
        </button>
    </form>
    <p class=" text-sm text-[#7C7272] text-center">O</p>
    <NuxtLink to="/asistencia" class="text-sm text-center text-[#36b62a] cursor-pointer  underline">Registra tu asistencia</NuxtLink>
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
 
      console.log(userData)
      console.log('Esto es la data que deberia mostrar: ',data.body.user.us)
      sessionStore.setUser(userData);
      router.push('/dashboard');
    } else {
      console.log("Login failed:", data.body.message);
      console.log (data.body)
      if(!data.body.success){
        alerta.value = data.body.message
        auth.value.pass= ''
      }
      
      // alert("Username or password is invalid");
    }
  } catch (error) { 
    console.error("Error during login:", error);
    alert("Error during login. Please try again.");
  }finally{
    isLoading.value = false
  }
};
</script>