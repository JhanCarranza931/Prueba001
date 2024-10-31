
import { defineStore } from 'pinia';

export const useActividadStore = defineStore('actividades', {
  state: () => ({
    actividades: [],
  }),
  actions: {
    async fetchActividades() {
      this.actividades = await $fetch('/api/actividades');
    },

    async addActividad(actividades) {
      const response = await $fetch('/api/actividad', {
        method: 'POST',
        body: JSON.stringify(actividades),
      });
      // await this.fetchUsers(); 
      return response;
    },

    // async delete(userId){
    //   await $fetch(`/api/usuarios/${userId}`,{
    //     method:'DELETE'
    //   })
    //   await this.fetchUsers(); 
    // }

    //edit
  },
});
