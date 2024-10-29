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
        if (to.name === '') {
          return navigateTo('/register');
        }

      } catch (error) {
        // Manejar el error de decodificación del token
        // localStorage.removeItem('authToken');
        // return navigateTo('/'); // Redirigir a login si hay un error
        console.log('Errror')
      }
    } else if (to.name !== '') {
      // Si no hay token y no estamos en la página de login, redirigir a login
      return navigateTo('/');
    }
  }
});