import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { authApi } from "src/services/authApi";


export const loginUser = createAsyncThunk('auth/loginUser',async(credentials ,{rejectWithValue})=>{
    try {
        const response = await authApi.login(credentials)
        console.log(response.data)
        localStorage.setItem("access_token",JSON.stringify(response.data.data.access_token))
        return response.data
    } catch (error) {
        console.log(error)
        toast(error.response.data.detail || 'Login failed')
        return rejectWithValue(error.response.data)
    }
})


const authSlice = createSlice({
    name : 'auth',
    initialState :{
        user : null ,
        token : null ,
        loading : false ,
        error :null
    },
    reducers:{},
    extraReducers: (builder) =>{

        
        builder.addCase(loginUser.pending , (state)=>{
            state.loading = true;
            state.error = null
        })
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false ;
            state.user = action.payload
        })
        builder.addCase(loginUser.rejected, (state,action)=>{
            state.loading  = true ;
            state.error = action.error.message
        })

    }
})

export default authSlice.reducer