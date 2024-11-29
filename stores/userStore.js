// stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
  }),
  actions: {
    async fetchUsers() {
      try {
        this.users = await $fetch('/api/usuarios');
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
      }
    },

    async addUser(userData) {
      try {
        const response = await $fetch('/api/usuarios', {
          method: 'POST',
          body: userData,
        });
        
        await this.fetchUsers();
        return response;
      } catch (error) {
        console.error('Error en addUser:', error);
        if (error.response) {
          throw createError({
            statusCode: error.response.status,
            message: error.response._data.message || 'Error del servidor'
          });
        } else if (error.request) {
          throw createError({
            statusCode: 500,
            message: 'No se recibió respuesta del servidor'
          });
        } else {
          throw createError({
            statusCode: 500,
            message: `Error al configurar la petición: ${error.message}`
          });
        }
      }
    },

    async delete(userId) {
      try {
        await $fetch(`/api/usuarios/${userId}`, {
          method: 'DELETE'
        });
        await this.fetchUsers();
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw error;
      }
    },

  async updateUser(data){
    try{
      console.log(data)
      const response = await $fetch('/api/updateuser',{
        method:'PUT',
        body:JSON.stringify(data)
      })
      console.log(response)


      console.log('Datos enviados: ',data)

    }
    catch(error){
      console.log(error)
    }
  }
  },
});
