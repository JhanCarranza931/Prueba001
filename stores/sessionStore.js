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
      if (data && data.role && data.token && data.us) {
        this.role = this.encrypt(data.role.toString());
        this.token = this.encrypt(data.token);
        this.us = this.encrypt(JSON.stringify(data.us));
    } else {
        console.error("Datos incompletos o inválidos en setUser:", data);
    }
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
      if (!encryptedData) {
          console.error("Datos encriptados ausentes o inválidos en decrypt.");
          return null;
      }
  
      try {
          const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
          const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  
          if (!decryptedData) {
              throw new Error("La des-encriptación devolvió un valor vacío.");
          }
  
          return decryptedData;
      } catch (error) {
          console.error("Error al desencriptar los datos:", error);
          return null;
      }
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
            if (import.meta.client) {
                const encryptedData = localStorage.getItem(key);
                if (!encryptedData) {
                    return null;
                }

                try {
                    const decryptedData = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY).toString(CryptoJS.enc.Utf8);
                    return JSON.parse(decryptedData);
                } catch (error) {
                    console.error("Error al desencriptar los datos de sesión:", error);
                    return null;
                }
            }
            return null;
        },
        setItem: (key, value) => {
            if (import.meta.client) {
                try {
                    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString();
                    localStorage.setItem(key, encryptedData);
                } catch (error) {
                    console.error("Error al encriptar los datos de sesión:", error);
                }
            }
        },
        removeItem: (key) => {
            if (import.meta.client) {
                localStorage.removeItem(key);
            }
        },
    },
},

});
