import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { userApi } from "src/services/userApi";



export const getUser_ = createAsyncThunk('user/getUser_',async()=>{
    try {
        const response = await userApi.getUser()
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        toast(error.response.data.detail || 'Erro in getting User')
        return error.response.data
    }
})


const userSlice = createSlice({
    name : 'user',
    initialState :{
        user : null ,
        loading : false ,
        error :null
    },
    reducers:{},
    extraReducers: (builder) =>{

        
        builder.addCase(getUser_.pending , (state)=>{
            state.loading = true;
            state.error = null
        })
        builder.addCase(getUser_.fulfilled,(state,action)=>{
            state.loading = false ;
            state.user = action.payload.data[0]
        })
        builder.addCase(getUser_.rejected, (state,action)=>{
            state.loading  = true ;
            state.error = action.error.message
        })

    }
})

export default userSlice.reducer