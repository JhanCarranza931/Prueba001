
import { defineStore } from 'pinia';

export const useActividadStore = defineStore('actividades', {
  state: () => ({
    actividades: [],
    userActividad:[],
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
      // await this.fechActividadesForId(response.id)
      await this.fetchActividades()
      return response;
      
    },
    async fechActividadesForId(id){
      this.userActividad = await $fetch(`/api/actividad/${id}`)
      console.log(this.userActividad)
      
    }
    

    // async delete(userId){
    //   await $fetch(`/api/usuarios/${userId}`,{
    //     method:'DELETE'
    //   })
    //   await this.fetchUsers(); 
    // }

    //edit
  },
});
