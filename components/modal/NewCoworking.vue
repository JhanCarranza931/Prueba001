<template>
  <div class="flex items-center justify-end p-6">
    <button
      @click="isModalOpen = true"
      class="px-20 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-300"
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
          <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true" @click="isModalOpen = false"></div>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Agregar nuevo Integrante
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Llena los datos para crear la cuenta de un nuevo integrante
                </p>
              </div>
              <form @submit.prevent="submitForm" class="mt-5 space-y-6">
                <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div class="sm:col-span-3">
                    <label for="dni" class="block text-sm font-medium text-gray-700">DNI</label>
                    <div class="mt-1">
                      <input type="text" name="dni" id="dni" v-model="form.dni" required class=" py-1 px-2 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md">
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="nombre" class="block text-sm font-medium text-gray-700">Nombres</label>
                    <div class="mt-1">
                      <input type="text" name="nombre" id="nombre" v-model="form.nombre" required class="py-1 px-2 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md">
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="apellido" class="block text-sm font-medium text-gray-700">Apellidos</label>
                    <div class="mt-1">
                      <input type="text" name="apellido" id="apellido" v-model="form.apellido" required class="py-1 px-2 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md">
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="correo" class="block text-sm font-medium text-gray-700">Correo</label>
                    <div class="mt-1">
                      <input type="email" name="correo" id="correo" v-model="form.correo" required class="py-1 px-2 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md">
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                    <div class="mt-1">
                      <input type="password" name="password" id="password" v-model="form.password" required class=" py-1 px-2 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md">
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono</label>
                    <div class="mt-1">
                      <input type="tel" name="telefono" id="telefono" v-model="form.telefono" required class="py-1 px-2 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md">
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="carrera" class="block text-sm font-medium text-gray-700">Profesión</label>
                    <div class="mt-1">
                      <input type="text" name="carrera" id="carrera" v-model="form.carrera" required class="py-1 px-2shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md">
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="rol" class="block text-sm font-medium text-gray-700">Rol</label>
                    <div class="mt-1">
                      <select id="rol" name="rol" v-model="form.rol" required class=" py-1 px-2 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md">
                        <option value="">Elige un rol</option>
                        <option value="admin">Administrador</option>
                        <option value="user">Usuario</option>
                      </select>
                    </div>
                  </div>

                  <div class="sm:col-span-6">
                    <label class="block text-sm font-medium text-gray-700">
                      Foto de perfil
                    </label>
                    <div class="mt-1 flex items-center">
                      <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <img v-if="previewImage" :src="previewImage" alt="Preview" class="h-full w-full object-cover" />
                        <svg v-else class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <button type="button" @click="$refs.fileInput.click()" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Seleccionar foto
                      </button>
                      <input ref="fileInput" type="file" @change="handleFileChange" accept="image/*" class="hidden" />
                    </div>
                  </div>
                </div>

                <div v-if="formError" class="mt-2 text-sm text-red-600">
                  {{ formError }}
                </div>

                <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm">
                    Registrar
                  </button>
                  <button type="button" @click="isModalOpen = false" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:col-start-1 sm:text-sm">
                    Cancelar
                  </button>
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
import { ref } from 'vue'
import { useUserStore } from '../../stores/userStore'

const isModalOpen = ref(false)
const userStore = useUserStore()
const formError = ref(null)
const form = ref({
  dni: '',
  nombre: '',
  apellido: '',
  carrera: '',
  correo: '',
  password: '',
  telefono: '',
  rol: '',
  foto: null
})

const previewImage = ref(null)
const fileInput = ref(null)

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    previewImage.value = URL.createObjectURL(file)
    form.value.foto = file
  }
}

const submitForm = async () => {
  try {
    formError.value = null // Limpiar errores previos
    const formData = new FormData()
    
    for (const [key, value] of Object.entries(form.value)) {
      if (key === 'foto' && value instanceof File) {
        formData.append(key, value, value.name)
      } else if (value !== null && value !== '') {
        formData.append(key, value)
      }
    }
    
    if (!form.value.foto) {
      throw new Error('Por favor, selecciona una foto de perfil')
    }
    
    const response = await userStore.addUser(formData)
    console.log('Usuario agregado:', response)
    
    // Limpiar el formulario
    form.value = {
      dni: '',
      nombre: '',
      apellido: '',
      carrera: '',
      correo: '',
      password: '',
      telefono: '',
      rol: '',
      foto: null
    }
    previewImage.value = null
    
    isModalOpen.value = false
  } catch (error) {
    console.error('Error al enviar el formulario:', error)
    formError.value = error.message || 'Ocurrió un error al procesar la solicitud'
  }
}
</script>