import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { authInstance } from "src/services/axios";


export const getIncome = createAsyncThunk('income/getIncome', async () => {

    try {
        const response = await authInstance.get('income')
        return response.data
    } catch (error) {
        console.log(error)
        toast(error.response.data.detail)
        return null
    }

})

export const addIncome = createAsyncThunk('income/addIncome', async (data) => {
    try {
        const response = await authInstance.post('income/add', data)
        toast('Income added successfully')
        return response.data
    } catch (error) {
        console.log(error)
        toast(error.response.data.detail)
        return null
    }

})

export const deleteIncome = createAsyncThunk('income/deleteIncome', async (incomeId) => {
    try {
        const response = await authInstance.delete(`income/delete/${incomeId}`)
        toast('Income deleted successfully')
        return response.data
    } catch (error) {
        console.log(error)
        toast(error.response.data.detail)
        return null
    }

})


export const getSingleIncome = createAsyncThunk('income/getSingleIncome', async (incomeId) => {

    try {
        const response = await authInstance.get(`income/${incomeId}`)
        return response.data
    } catch (error) {
        console.log(error)
        toast(error.response.data.detail)
        return null
    }

})

export const updateIncome = createAsyncThunk('income/updateIncome', async ( {data ,incomeId}) => {
    try {
        console.log(incomeId)
        const response = await authInstance.post(`income/update/${incomeId}`, data)
        toast('Income Updated successfully')
        return response.data
    } catch (error) {
        console.log(error)
        toast(error.response.data.detail)
        return null
    }

})





const incomeSlice = createSlice({
    name: "income",
    initialState: {
        income: null,
        singleIncome:null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {

        // add income

        builder.addCase(addIncome.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addIncome.fulfilled, (state, action) => {
            state.loading = false;
            state.income = action.payload.data
        })
        builder.addCase(addIncome.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        // get all incomes

        builder.addCase(getIncome.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getIncome.fulfilled, (state, action) => {
            state.loading = false;
            state.income = action.payload.data
        })
        builder.addCase(getIncome.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        // delete income

        builder.addCase(deleteIncome.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteIncome.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(deleteIncome.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        // get single income 

        builder.addCase(getSingleIncome.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getSingleIncome.fulfilled, (state,action) => {
            state.loading = false;
            state.singleIncome = action.payload.data
        })
        builder.addCase(getSingleIncome.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        // update income 

        builder.addCase(updateIncome.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateIncome.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(updateIncome.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        
    }
})

export default incomeSlice.reducer