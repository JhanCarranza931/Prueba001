<template>
    <div class="w-[350px] flex flex-col gap-[27px]">
    <h1 class=" text-4xl font-black text-center" >INICIAR SESIÓN</h1>
    <p class=" text-sm text-[#7C7272] text-center">Ingresa tu  usuario y contraseña para acceder al panel de control</P>
    <form action="" method="POST" class="flex flex-col ">
        <label class=" text-sm font-bold mb-4 flex flex-col gap-5">Nombre
            <input v-model="auth.mail" type="text" placeholder="Ingresa tu Correo" class="borde py-3 px-5 mb-4 font-medium">
        </label>
        
        <label for="password" class=" text-sm font-bold mb-4 flex flex-col gap-5">Contraseña
            <input v-model="auth.pass"  type="password" placeholder="Ingresaa tu contraseña" name="password" id="password" class="borde py-3 px-5 mb-7 font-medium">
        </label>
        <button @click="handleSubmit" type="submit" class=" bg-black text-white font-bold py-3 rounded-lg">Ingresar</button>
    </form>
    <p class=" text-sm text-[#7C7272] text-center">Ingresa como usuario o como administrador al panel de control y administre sus asistencias y actividades</p>
</div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const login = useState('user', () => false)
const router = useRouter();

const auth = ref({
    mail:'',
    pass:''
})
    


const handleSubmit = (event) => {
    console.log(auth.value.mail)
    event.preventDefault()
    if (auth.value.mail === 'jhancarranza931@gmail.com' & auth.value.pass ==='qwerfdsa'){
        login.value = true  
        router.push('/dashboard')
    }
    
}
</script>