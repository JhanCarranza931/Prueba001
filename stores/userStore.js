// stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
  }),
  actions: {
    async fetchUsers() {
      this.users = await $fetch('/api/usuarios');
    },

    async addUser(userData) {
      await $fetch('/api/usuarios', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      await this.fetchUsers(); 
    },

    async delete(userId){
      await $fetch(`/api/usuarios/${userId}`,{
        method:'DELETE'
      })
      await this.fetchUsers(); 
    }

    //edit
  },
});
