

export function useAuth() {
    const sessionStorage = useSessionStore();
    const isAuthenticated = ref(false);
    const user = ref(null);
    const role = ref(null);

    async function loadAuthData() {

                role.value =  sessionStorage.decrypt(sessionStorage.role);
                
                user.value =  JSON.parse(sessionStorage.decrypt(sessionStorage.us));

                isAuthenticated.value = sessionStorage.isAuthenticated;
        }

        loadAuthData();


    return {
        isAuthenticated,
        user,
        role,
        loadAuthData, // Expone la función para su uso en onMounted si es necesario
    };
}

