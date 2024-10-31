import {AuthUser} from "../types.ts";
import {jwtDecode} from "jwt-decode";

export const isValidToken = (accessToken: string) => {
    if (!accessToken) {
        return false;
    }
    const decoded = jwtDecode<AuthUser>(accessToken)
    return decoded.exp > Date.now() / 1000;
};

export const getAccessToken = (): string | null => localStorage.getItem('auth:access');
export const saveAccessToken = (token: string) => localStorage.setItem('auth:access', token);
export const clearSession = () => localStorage.clear();
