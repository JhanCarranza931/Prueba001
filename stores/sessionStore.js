// stores/user.js
import { defineStore } from 'pinia';

export const useSessionStore = defineStore('session', {
  state: () => ({
    role: null,
    token: null,
    us:[]
  }),
  actions: {
    setUser(data) {
      this.role = data.role;
      this.token = data.token;
      this.us = data.us;
    },
    clearUser() {
      this.role = null;
      this.token = null;
      this.us = data.us;
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token, // Verifica si el token existe
    isAdmin: (state) => state.role === 2, // Retorna true si el rol es 'admin'
    isUser: (state) => state.role === 3, // Retorna true si el rol es 'user'
  },
  persist:true,
});
