import { authInstance } from "./axios"

export const userApi = {
    getUser:async()=>{
        const user = await authInstance.get('user')
        return user
    }
}