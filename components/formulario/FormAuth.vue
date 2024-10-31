<template>
    <div class="w-[350px] flex flex-col gap-[27px]">
    <h1 class=" text-4xl font-black text-center" >INICIAR SESIÓN</h1>
    <p class=" text-sm text-[#7C7272] text-center">Ingresa tu  usuario y contraseña para acceder al panel de control</P>
    <form action="" method="POST" class="flex flex-col " @submit.prevent="signIn">
        <label class=" text-sm font-bold mb-4 flex flex-col gap-5">Nombre
            <input v-model="auth.mail" type="text" placeholder="Ingresa tu Correo" class="borde py-3 px-5 mb-4 font-medium">
        </label>
        
        <label for="password" class=" text-sm font-bold mb-4 flex flex-col gap-5">Contraseña
            <input v-model="auth.pass"  type="password" placeholder="Ingresaa tu contraseña" name="password" id="password" class="borde py-3 px-5 mb-7 font-medium">
        </label>
        <button  type="submit" class=" bg-black text-white font-bold py-3 rounded-lg">Ingresar</button>
    </form>
    <p class=" text-sm text-[#7C7272] text-center">Ingresa como usuario o como administrador al panel de control y administre sus asistencias y actividades</p>
</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useSessionStore } from '~/stores/sessionStore';
const sessionStore = useSessionStore();
const router = useRouter();

const auth = ref({
    mail:'',
    pass:''
})
    


const signIn = async () => {
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
    console.log(data.body);
    if (data.statusCode === 200) {
      // Establecer el token en local storage
      localStorage.setItem("authToken", data.body.token);
      const userData = {
        token : data.body.token,
        role: parseInt(data.body.user.rol,10),
        us: data.body.user.us
      }
      console.log(parseInt(data.body.user.rol,10))
      console.log('Esto es la data que deberia mostrar: ',data.body.user.us)
      sessionStore.setUser(userData);
      // localStorage.setItem("rol",data.body.user.rol)
      // alert("Login is successful");
      
    
      router.push('/dashboard');
    } else {
      console.log("Login failed:", data.message);
      alert("Username or password is invalid");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Error during login. Please try again.");
  }
};
</script>