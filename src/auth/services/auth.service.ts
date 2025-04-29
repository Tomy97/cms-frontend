import {AUTHLOGINURL} from "../../config/setupUrls.ts";
import axios from 'axios'

export interface AuthPayload {
    email: string;
    password: string;
}

export interface AuthResponse {
    'access_token': string
}
export const useAuthService =  async (payload: AuthPayload): Promise<AuthResponse> => {
    const { data } = await axios.post<AuthResponse>(AUTHLOGINURL, payload);

    return data
}