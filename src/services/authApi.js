import { instance } from "./axios"

export const authApi = {
   
    login:async (credentials) => {
            const response = await instance.post('auth/login', credentials)  
            return response  
    }
}