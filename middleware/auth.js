import { jwtDecode } from "jwt-decode";
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('authToken'); 
          return navigateTo('/'); 
        }
        if (to.name === 'index') {
          return navigateTo('/dashboard');
        }

      } catch (error) {
        localStorage.removeItem('authToken');
        return navigateTo('/');

      }
    } else if (to.name !== 'index') {
      return navigateTo('/');
    }
  }
});