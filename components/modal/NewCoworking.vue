<template>
  <div class="  flex items-center justify-end p-6">
    <button
      @click="isModalOpen = true"
      class="px-20 py-2 bg-[#00DC82] text-white rounded hover:bg-[#00C062] focus:outline-none focus:ring-2  focus:ring-opacity-50 transition duration-300"
    >
      Agregar
    </button>

    <transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed bg-gray-100 inset-0 transition-opacity  bg-opacity-75" aria-hidden="true" @click="isModalOpen = false"></div>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle min-w-[720px]">
            <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-semibold text-green-600 mb-2">Agregar nuevo Integrante</h1>
    <p class="text-gray-600 mb-6">Llena los datos para crear la cuenta de un nuevo integrante</p>
    
    <form @submit.prevent="submitForm" class="flex flex-col md:flex-row gap-6">
      <div class="flex-grow space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block mb-1">DNI (*)</label>
            <input v-model="form.dni" type="text" required class="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none" />
          </div>
          <div>
            <label class="block mb-1">Nombres (*)</label>
            <input v-model="form.nombre" type="text" required class="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none" />
          </div>
          <div>
            <label class="block mb-1">Apellidos (*)</label>
            <input v-model="form.apellido" type="text" required class="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none" />
          </div>
          <div>
            <label class="block mb-1">Correo (*)</label>
            <input v-model="form.correo" type="email" required class="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none" />
          </div>
          <div>
            <label class="block mb-1">Contraseña (*)</label>
            <input v-model="form.password" type="password" required class="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none" />
          </div>
          <div>
            <label class="block mb-1">Teléfono (*)</label>
            <input v-model="form.telefono" type="tel" required class="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none" />
          </div>
          <div>
            <label class="block mb-1">Profesión (*)</label>
            <input v-model="form.carrera" type="tel" required class="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none" />
          </div>
          <div>
            <label class="block mb-1">Rol (*)</label>
            <select v-model="form.rol" required class="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none">
              <option value="">Elige un rol</option>
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
            </select>
          </div>
        </div>
        
        
      </div>

      <div class="md:w-1/3 flex flex-col justify-between">
        <div class="text-center">
          <p class="mb-2">Foto de perfil</p>
          <div class="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-full overflow-hidden">
            <img v-if="previewImage" :src="previewImage" class="w-full h-full object-cover" alt="Preview" />
            <div v-else class="w-full h-full flex items-center justify-center">
              <Icon name="hugeicons:user" class="w-16 h-16 text-gray-400" />
            </div>
          </div>
          <input
            type="file"
            ref="fileInput"
            @change="handleFileChange"
            accept="image/*"
            class="hidden"
          />
          <button
            type="button"
            @click="$refs.fileInput.click()"
            class="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Seleccionar archivo...
          </button>
          
        </div>
        <div class="flex justify-end gap-4 mt-6">
          <button @click="isModalOpen = false" type="button" class="px-6 py-2 border rounded text-green-600 hover:bg-gray-50">
            Cancelar
          </button>
          <button type="submit" class="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Registrar
          </button>
        </div>
      </div>
      
    </form>
  </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useUserStore } from '../../stores/userStore';

const isModalOpen = ref(false);
const userStore = useUserStore();
const form = ref({
  dni: '',
  nombre: '',
  apellido: '',
  carrera: '',
  correo: '',
  password: '',
  telefono: '',
  rol:''
});

const submitForm = async () => {
  try {
    await userStore.addUser(form.value);
    console.log('Usuario agregado:', form.value);
    
    // Limpiar el formulario
    form.value = {
      dni: '',
      nombre: '',
      apellido: '',
      carrera: '',
      correo: '',
      password: '',
      telefono: '',
      rol:''
    };
    
    isModalOpen.value = false;
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
};

const previewImage = ref(null)
const fileInput = ref(null)

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    previewImage.value = URL.createObjectURL(file)
  }
}

</script>
