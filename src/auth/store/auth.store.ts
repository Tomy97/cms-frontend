import {defineStore} from "pinia";
import {computed, ref, watch} from 'vue'
import type {JwtPayload} from "../../types/Jwt";
import {jwtDecode} from "jwt-decode";
import {type AuthPayload, useAuthService} from "../services/auth.service.ts";
import type {Client} from "@/types/Client";

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(null);
    const client = ref<Client | null>(null)
    const expiration = ref<number | null>(null)

    const isLogged = computed<boolean>(() => {
        if (!token.value || !client.value) false
        return expiration.value! * 1000 > Date.now()
    })

    const login = async (payload: AuthPayload) => {
        const {access_token} = await useAuthService(payload)
        token.value = access_token
        const {exp, name, email, address, cityId, clientId, rolId, provinceId}: JwtPayload = jwtDecode(access_token);
        expiration.value = exp
        client.value = {
            name: name,
            email: email,
            address: address,
            cityId: cityId,
            clientId: clientId,
            rolId: rolId,
            provinceId: provinceId
        }
    }

    const logout = () => {
        token.value = null
        client.value = null
    }


    watch(expiration, (e) => {
        if (!e) {
            token.value = null
            client.value = null
        }
    }, {immediate: true})

    return {
        client,
        token,
        isLogged,
        login,
        logout,
    }
}, {
    persist: {
        pick: ['token', 'client'],
    }
})