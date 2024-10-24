<template>
  <div class="bg-gray-100 flex items-center justify-center">
    <button
      @click="isModalOpen = true"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
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
            <form @submit.prevent="submitForm">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Formulario</h3>
                    <div class="mt-2">
                      <div class="space-y-4">
                        <!-- DNI -->
                        <input v-model="form.dni" type="text" placeholder="DNI" class="w-full px-3 py-2 border rounded-md" required>
                        <!-- Nombre -->
                        <input v-model="form.nombre" type="text" placeholder="Nombre" class="w-full px-3 py-2 border rounded-md" required>
                        <!-- Apellido -->
                        <input v-model="form.apellido" type="text" placeholder="Apellido" class="w-full px-3 py-2 border rounded-md">
                        <!-- Carrera -->
                        <input v-model="form.carrera" type="text" placeholder="Carrera" class="w-full px-3 py-2 border rounded-md">
                        <!-- Correo -->
                        <input v-model="form.correo" type="email" placeholder="Correo" class="w-full px-3 py-2 border rounded-md">
                        <!-- Password -->
                        <input v-model="form.password" type="password" placeholder="Contraseña" class="w-full px-3 py-2 border rounded-md">
                        <!-- Teléfono -->
                        <input v-model="form.telefono" type="tel" placeholder="Teléfono" class="w-full px-3 py-2 border rounded-md">
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Aceptar
                </button>
                <button
                  @click="isModalOpen = false"
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/userStore';

const isModalOpen = ref(false);
const userStore = useUserStore();
const form = ref({
  dni: '',
  nombre: '',
  apellido: '',
  carrera: '',
  correo: '',
  password: '',
  telefono: ''
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
      telefono: ''
    };
    
    isModalOpen.value = false; // Cerrar el modal después de enviar
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
};
</script>
