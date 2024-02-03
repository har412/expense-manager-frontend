import axios from "axios"

import { BASE_URL } from "src/config/constants"


export const instance = axios.create({
    baseURL:BASE_URL,
    headers:{
        'Content-Type':'application/json'
    }
})


