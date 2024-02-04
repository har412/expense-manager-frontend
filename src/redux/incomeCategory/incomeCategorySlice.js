import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { authInstance } from "src/services/axios";


export const getIncomeCategory = createAsyncThunk('incomeCategory/getIncomeCategory', async () => {

    try {
        const response = await authInstance.get('incomeCategory')
        return response.data
    } catch (error) {
        console.log(error)
        toast(error.response.data.detail)
        return null
    }

})

export const addIncomeCategory = createAsyncThunk('incomeCategory/addIncomeCategory', async (data) => {
    try {
        const response = await authInstance.post('incomeCategory/add', data)
        toast('IncomeCategory added successfully')
        return response.data
    } catch (error) {
        console.log(error)
        toast(error.response.data.detail)
        return null
    }

})

export const deleteIncomeCategory = createAsyncThunk('incomeCategory/deleteIncomeCategory', async (incomeCategoryId) => {
    try {
        const response = await authInstance.delete(`incomeCategory/delete/${incomeCategoryId}`)
        toast('IncomeCategory deleted successfully')
        return response.data
    } catch (error) {
        console.log(error)
        toast(error.response.data.detail)
        return null
    }

})


export const getSingleIncomeCategory = createAsyncThunk('incomeCategory/getSingleIncomeCategory', async (incomeCategoryId) => {

    try {
        const response = await authInstance.get(`incomeCategory/${incomeCategoryId}`)
        return response.data
    } catch (error) {
        console.log(error)
        toast(error.response.data.detail)
        return null
    }

})

export const updateIncomeCategory = createAsyncThunk('incomeCategory/updateIncomeCategory', async ( {data ,incomeCategoryId}) => {
    try {
        console.log(incomeCategoryId)
        const response = await authInstance.post(`incomeCategory/update/${incomeCategoryId}`, data)
        toast('IncomeCategory Updated successfully')
        return response.data
    } catch (error) {
        console.log(error)
        toast(error.response.data.detail)
        return null
    }

})





const incomeCategorySlice = createSlice({
    name: "incomeCategory",
    initialState: {
        incomeCategory: null,
        singleIncomeCategory:null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {

        // add incomeCategory

        builder.addCase(addIncomeCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addIncomeCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.incomeCategory = action.payload.data
        })
        builder.addCase(addIncomeCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        // get all incomeCategorys

        builder.addCase(getIncomeCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getIncomeCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.incomeCategory = action.payload.data
        })
        builder.addCase(getIncomeCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        // delete incomeCategory

        builder.addCase(deleteIncomeCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteIncomeCategory.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(deleteIncomeCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        // get single incomeCategory 

        builder.addCase(getSingleIncomeCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getSingleIncomeCategory.fulfilled, (state,action) => {
            state.loading = false;
            state.singleIncomeCategory = action.payload.data
        })
        builder.addCase(getSingleIncomeCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        // update incomeCategory 

        builder.addCase(updateIncomeCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateIncomeCategory.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(updateIncomeCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        
    }
})

export default incomeCategorySlice.reducer