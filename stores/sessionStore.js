// stores/user.js
import { defineStore } from 'pinia';
import CryptoJS from 'crypto-js';

const SECRET_KEY = '3shjdfgsjhdfg5674565sdfsdf';

export const useSessionStore = defineStore('session', {
  state: () => ({
    role: null,
    token: null,
    us: null
  }),

  actions: {
    setUser(data) {
      console.log('Dato', data)
      this.role = this.encrypt(data.role.toString()); // Encriptamos el rol como string
      this.token = this.encrypt(data.token);
      this.us = this.encrypt(JSON.stringify(data.us)); // Encriptamos 'us' como string JSON
    },
    clearUser() {
      this.role = null;
      this.token = null;
      this.us = null;
    },
    
    // Métodos de encriptación y desencriptación
    encrypt(data) {
      return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
    },
    decrypt(encryptedData) {
      const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
      console.log('datos ',bytes.toString(CryptoJS.enc.Utf8))
      return bytes.toString(CryptoJS.enc.Utf8);
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.token, // Verifica si el token existe
    isAdmin: (state) => state.role && useSessionStore().decrypt(state.role) === '2',
    isUser: (state) => state.role && useSessionStore().decrypt(state.role) === '3',
  },

  persist: {
    storage: {
      getItem: (key) => {
        const encryptedData = localStorage.getItem(key);
        if (!encryptedData) return null;

        // Desencriptar y convertir a objeto JSON
        try {
          const decryptedData = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY).toString(CryptoJS.enc.Utf8);
          return JSON.parse(decryptedData);
        } catch (error) {
          console.error("Error al desencriptar los datos de sesión:", error);
          return null;
        }
      },
      setItem: (key, value) => {
        try {
          const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString();
          localStorage.setItem(key, encryptedData);
        } catch (error) {
          console.error("Error al encriptar los datos de sesión:", error);
        }
      },
      removeItem: (key) => localStorage.removeItem(key),
    },
  },
});
