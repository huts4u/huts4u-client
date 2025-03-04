import { createAxiosClient } from "./axiosConfig";
import { jwtDecode } from "jwt-decode";

const BASE_URL = 'http://localhost:8080/api/'




export function getCurrentAccessToken() {
    return localStorage.getItem('accessToken');
}

export function isLoggedIn() {
    if (localStorage.getItem('accessToken')) {
        return true;
    }
    else {
        return false;
    }
}

export async function logout() {
    localStorage.clear();
    window.location.href = '/login';
    return 0;
}


export function setCurrentAccessToken(accessToken: any) {
    return localStorage.setItem('accessToken', accessToken)
}






export const client = createAxiosClient({
    options: {
        baseURL: BASE_URL,
        timeout: 300000,
        headers: {
        }
    },
    getCurrentAccessToken,
})
