import { jwtDecode } from "jwt-decode";
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Verificar si estamos en el cliente
  if (import.meta.client) {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        // Verifica si el token ha expirado
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('authToken'); // Eliminar token expirado
          return navigateTo('/'); // Redirigir a login
        }

        // Si el usuario intenta acceder a la página de login mientras está autenticado, redirigir a /app
        if (to.name === 'index') {
          return navigateTo('/dashboard');
        }

      } catch (error) {
        localStorage.removeItem('authToken');
        return navigateTo('/');

      }
    } else if (to.name !== 'index') {
      // Si no hay token y no estamos en la página de login, redirigir a login
      return navigateTo('/');
    }
  }
});