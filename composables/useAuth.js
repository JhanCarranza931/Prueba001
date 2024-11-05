export function useAuth() {
    const sessionStorage = useSessionStore();
    const isAuthenticated = ref(false);
    const user = ref(null);
    const role = ref(null);

    async function loadAuthData() {
        if (import.meta.client) {
            try {
                const decryptedRole = sessionStorage.decrypt(sessionStorage.role);
                const decryptedUser = sessionStorage.decrypt(sessionStorage.us);

                if (decryptedRole) {
                    role.value = decryptedRole;
                } else {
                    console.warn("El rol desencriptado es nulo o vacío.");
                }

                if (decryptedUser) {
                    user.value = JSON.parse(decryptedUser);
                } else {
                    console.warn("El usuario desencriptado es nulo o vacío.");
                }

                isAuthenticated.value = sessionStorage.isAuthenticated;
            } catch (error) {
                console.error("Error al cargar los datos de autenticación:", error);
            }
        }
    }

    loadAuthData();

    return {
        isAuthenticated,
        user,
        role,
        loadAuthData,
    };
}
