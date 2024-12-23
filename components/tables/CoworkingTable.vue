<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const isloading = ref(true); 

const coworking = computed(() => userStore.users);

onMounted(async () => {
  await userStore.fetchUsers();
  isloading.value = false; 
});

const previewImage = ref(null);
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    previewImage.value = URL.createObjectURL(file);
    form.value.foto = file;
  }
};
const formError = ref(null);

const handleDelete = async (userId) => {
  await userStore.delete(userId);
  console.log(`Deleted user with id: ${userId}`);
};
const isModalOpen = ref(false);

const handleEdit = (userId) => {
  isModalOpen.value = true;
  form.value.iduser=userId
  console.log(form.value.iduser)
  const user = coworking.value.find((u) => u.id === userId);
  if (user) {
    Object.assign(form.value, user);
    console.log(form.value)
    previewImage.value = user.foto || null;    

  }
};

const submitForm=  async ()=>{
  await userStore.updateUser(form.value)
}

const form = ref({
  dni: "",
  iduser:"",
  nombre: "",
  apellido: "",
  carrera: "",
  correo: "",
  password: "",
  telefono: "",
  roles: "",
  foto: null,
});
</script>

<template>
  <transition
    enter-active-class="ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          aria-hidden="true"
          @click="isModalOpen = false"
        ></div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3
              class="text-lg leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              Actualizar Registro
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                Actualiza los datos de un integrante
              </p>
            </div>
            <form @submit.prevent="submitForm" class="mt-5 space-y-6">
              <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-3">
                  <label
                    for="dni"
                    class="block text-sm font-medium text-gray-700"
                    >DNI</label
                  >
                  <div class="mt-1">
                    <input
                      type="text"
                      name="dni"
                      id="dni"
                      disabled
                      v-model="form.dni"
                      class="py-1 px-2 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <label
                    for="nombre"
                    class="block text-sm font-medium text-gray-700"
                    >Nombres</label
                  >
                  <div class="mt-1">
                    <input
                      type="text"
                      name="nombre"
                      id="nombre"
                      v-model="form.nombre"
                      required
                      class="py-1 px-2 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <label
                    for="apellido"
                    class="block text-sm font-medium text-gray-700"
                    >Apellidos</label
                  >
                  <div class="mt-1">
                    <input
                      type="text"
                      name="apellido"
                      id="apellido"
                      v-model="form.apellido"
                      required
                      class="py-1 px-2 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <label
                    for="correo"
                    class="block text-sm font-medium text-gray-700"
                    >Correo</label
                  >
                  <div class="mt-1">
                    <input
                      type="email"
                      name="correo"
                      id="correo"
                      v-model="form.correo"
                      required
                      class="py-1 px-2 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <label
                    for="password"
                    class="block text-sm font-medium text-gray-700"
                    >Contraseña</label
                  >
                  <div class="mt-1">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value=""
                      placeholder="Nueva contraseña"
                      class="py-1 px-2 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <label
                    for="telefono"
                    class="block text-sm font-medium text-gray-700"
                    >Teléfono</label
                  >
                  <div class="mt-1">
                    <input
                      type="tel"
                      name="telefono"
                      id="telefono"
                      v-model="form.telefono"
                      required
                      class="py-1 px-2 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <label
                    for="carrera"
                    class="block text-sm font-medium text-gray-700"
                    >Profesión</label
                  >
                  <div class="mt-1">
                    <input
                      type="text"
                      name="carrera"
                      id="carrera"
                      v-model="form.carrera"
                      required
                      class="py-1 px-2shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <label
                    for="rol"
                    class="block text-sm font-medium text-gray-700"
                    >Rol</label
                  >
                  <div class="mt-1" v-for="rol in form.roles">
                    <select
                      id="rol"
                      name="rol"
                      v-model="rol.rol_id"
                      required
                      class="py-1 px-2 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Elige un rol</option>
                      <option :value="1">Administrador</option>
                      <option :value="2">Usuario</option>
                    </select>
                  </div>
                </div>

                <div class="sm:col-span-6">
                  <label class="block text-sm font-medium text-gray-700">
                    Foto de perfil
                  </label>
                  <div class="mt-1 flex items-center">
                    <span
                      class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                    >
                      <img
                        v-if="previewImage"
                        :src="previewImage"
                        alt="Preview"
                        class="h-full w-full object-cover"
                      />
                      <svg
                        v-else
                        class="h-full w-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </span>
                    <button
                      type="button"
                      @click="$refs.fileInput.click()"
                      class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Seleccionar foto
                    </button>
                    <input
                      ref="fileInput"
                      type="file"
                      @change="handleFileChange"
                      accept="image/*"
                      class="hidden"
                    />
                  </div>
                </div>
              </div>

              <div v-if="formError" class="mt-2 text-sm text-red-600">
                {{ formError }}
              </div>

              <div
                class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
              >
                <button
                  type="submit"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm"
                >
                  Actualizar
                </button>
                <button
                  type="button"
                  @click="isModalOpen = false"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <div class="mx-auto p-4">
    <table class="min-w-full bg-white">
      <thead>
        <tr class="border-b text-sm">
          <th class="text-left py-3 px-4 font-semibold">Nombres</th>
          <th class="text-left py-3 px-4 font-semibold">DNI</th>
          <th class="text-left py-3 px-4 font-semibold">Correo</th>
          <th class="text-left py-3 px-4 font-semibold">Teléfono</th>
          <th class="text-left py-3 px-4 font-semibold">Rol</th>
          <th class="text-left py-3 px-4 font-semibold">Acción</th>
        </tr>
      </thead>

      <tbody v-if="isloading">
        <tr class="border-b animate-pulse">
          <td class="py-3 px-4">
            <div class="flex items-center">
              <div class="h-8 w-8 rounded-full bg-gray-300 mr-4"></div>
              <div>
                <div class="h-4 bg-gray-300 rounded w-32 mb-1"></div>
                <div class="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </td>
          <td class="py-3 px-4">
            <div class="h-4 bg-gray-300 rounded w-20"></div>
          </td>
          <td class="py-3 px-4">
            <div class="h-4 bg-gray-300 rounded w-32"></div>
          </td>
          <td class="py-3 px-4">
            <div class="h-4 bg-gray-300 rounded w-20"></div>
          </td>
          <td class="py-3 px-4">
            <div class="h-4 bg-gray-300 rounded w-20"></div>
          </td>
          <td class="py-3 px-4 flex space-x-2">
            <div class="h-8 w-8 bg-gray-300 rounded"></div>
            <div class="h-8 w-8 bg-gray-300 rounded"></div>
          </td>
        </tr>
        <tr class="border-b animate-pulse">
          <td class="py-3 px-4">
            <div class="flex items-center">
              <div class="h-8 w-8 rounded-full bg-gray-300 mr-4"></div>
              <div>
                <div class="h-4 bg-gray-300 rounded w-32 mb-1"></div>
                <div class="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </td>
          <td class="py-3 px-4">
            <div class="h-4 bg-gray-300 rounded w-20"></div>
          </td>
          <td class="py-3 px-4">
            <div class="h-4 bg-gray-300 rounded w-32"></div>
          </td>
          <td class="py-3 px-4">
            <div class="h-4 bg-gray-300 rounded w-20"></div>
          </td>
          <td class="py-3 px-4">
            <div class="h-4 bg-gray-300 rounded w-20"></div>
          </td>
          <td class="py-3 px-4 flex space-x-2">
            <div class="h-8 w-8 bg-gray-300 rounded"></div>
            <div class="h-8 w-8 bg-gray-300 rounded"></div>
          </td>
        </tr>
        <tr class="border-b animate-pulse">
          <td class="py-3 px-4">
            <div class="flex items-center">
              <div class="h-8 w-8 rounded-full bg-gray-300 mr-4"></div>
              <div>
                <div class="h-4 bg-gray-300 rounded w-32 mb-1"></div>
                <div class="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </td>
          <td class="py-3 px-4">
            <div class="h-4 bg-gray-300 rounded w-20"></div>
          </td>
          <td class="py-3 px-4">
            <div class="h-4 bg-gray-300 rounded w-32"></div>
          </td>
          <td class="py-3 px-4">
            <div class="h-4 bg-gray-300 rounded w-20"></div>
          </td>
          <td class="py-3 px-4">
            <div class="h-4 bg-gray-300 rounded w-20"></div>
          </td>
          <td class="py-3 px-4 flex space-x-2">
            <div class="h-8 w-8 bg-gray-300 rounded"></div>
            <div class="h-8 w-8 bg-gray-300 rounded"></div>
          </td>
        </tr>
        <tr class="border-b animate-pulse">
          <td class="py-3 px-4">
            <div class="flex items-center">
              <div class="h-8 w-8 rounded-full bg-gray-300 mr-4"></div>
              <div>
                <div class="h-4 bg-gray-300 rounded w-32 mb-1"></div>
                <div class="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </td>
          <td class="py-3 px-4">
            <div class="h-4 bg-gray-300 rounded w-20"></div>
          </td>
          <td class="py-3 px-4">
            <div class="h-4 bg-gray-300 rounded w-32"></div>
          </td>
          <td class="py-3 px-4">
            <div class="h-4 bg-gray-300 rounded w-20"></div>
          </td>
          <td class="py-3 px-4">
            <div class="h-4 bg-gray-300 rounded w-20"></div>
          </td>
          <td class="py-3 px-4 flex space-x-2">
            <div class="h-8 w-8 bg-gray-300 rounded"></div>
            <div class="h-8 w-8 bg-gray-300 rounded"></div>
          </td>
        </tr>
        <tr class="border-b animate-pulse">
          <td class="py-3 px-4">
            <div class="flex items-center">
              <div class="h-8 w-8 rounded-full bg-gray-300 mr-4"></div>
              <div>
                <div class="h-4 bg-gray-300 rounded w-32 mb-1"></div>
                <div class="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </td>
          <td class="py-3 px-4">
            <div class="h-4 bg-gray-300 rounded w-20"></div>
          </td>
          <td class="py-3 px-4">
            <div class="h-4 bg-gray-300 rounded w-32"></div>
          </td>
          <td class="py-3 px-4">
            <div class="h-4 bg-gray-300 rounded w-20"></div>
          </td>
          <td class="py-3 px-4">
            <div class="h-4 bg-gray-300 rounded w-20"></div>
          </td>
          <td class="py-3 px-4 flex space-x-2">
            <div class="h-8 w-8 bg-gray-300 rounded"></div>
            <div class="h-8 w-8 bg-gray-300 rounded"></div>
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr
          v-for="user in coworking"
          :key="user.id"
          class="border-b hover:bg-gray-100"
        >
          <td class="py-3 px-4">
            <div class="flex items-center">
              <img
                class="h-8 max-w-8 rounded-full mr-4"
                :src="user.foto"
                :alt="user.name"
              />
              <div>
                <div class="font-medium">
                  {{ user.nombre }} {{ user.apellido }}
                </div>
                <div class="text-gray-500 text-xs">{{ user.carrera }}</div>
              </div>
            </div>
          </td>
          <td class="py-3 px-4 text-sm">{{ user.dni }}</td>
          <td class="py-3 px-4 text-sm">{{ user.correo }}</td>
          <td class="py-3 px-4 text-sm">{{ user.telefono }}</td>
          <td v-for="rol in user.roles">
            <p
              v-if="rol.rol_id === 1"
              class="bg-blue-100 w-fit px-4 py-1 rounded-xl text-blue-700 font-bold text-sm"
            >
              • Administrador
            </p>
            <p
              v-if="rol.rol_id === 2"
              class="bg-emerald-100 w-fit px-4 py-1 rounded-xl text-emerald-700 font-bold text-sm"
            >
              • Usuario
            </p>
          </td>
          <td class="py-3 px-4" v-for="rol in user.roles">
            <template v-if="rol.rol_id === 1">
              <button
                @click="handleEdit(user.id)"
                class="text-indigo-600 hover:text-indigo-900 mr-2 p-0"
              >
                <Icon name="carbon:edit" size="24px"></Icon>
              </button>
            </template>

            <template v-else>
              <button
                @click="handleEdit(user.id)"
                class="text-indigo-600 hover:text-indigo-900 mr-2 p-0"
              >
                <Icon name="carbon:edit" size="24px"></Icon>
              </button>
              <button
                @click="handleDelete(user.id)"
                class="text-red-400 hover:text-red-700 p-0"
              >
                <Icon name="material-symbols:delete-outline" size="24px"></Icon>
              </button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
