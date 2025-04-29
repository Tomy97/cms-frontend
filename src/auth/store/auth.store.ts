import {defineStore} from "pinia";
import {computed, ref} from 'vue'
export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(null);
    const login = (newToken: string) => {
        token.value = newToken
    }

    const logout = () => {
        token.value = null
    }

    const isLogged = computed(() => token.value !== null)
    return {
        token,
        isLogged,
        login,
        logout,
    }
})