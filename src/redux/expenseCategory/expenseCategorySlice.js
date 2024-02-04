import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { authInstance } from "src/services/axios";


export const getExpenseCategory = createAsyncThunk('expenseCategory/getExpenseCategory', async () => {

    try {
        const response = await authInstance.get('expenseCategory')
        return response.data
    } catch (error) {
        console.log(error)
        toast(error.response.data.detail)
        return null
    }

})

export const addExpenseCategory = createAsyncThunk('expenseCategory/addExpenseCategory', async (data) => {
    try {
        const response = await authInstance.post('expenseCategory/add', data)
        toast('ExpenseCategory added successfully')
        return response.data
    } catch (error) {
        console.log(error)
        toast(error.response.data.detail)
        return null
    }

})

export const deleteExpenseCategory = createAsyncThunk('expenseCategory/deleteExpenseCategory', async (expenseCategoryId) => {
    try {
        const response = await authInstance.delete(`expenseCategory/delete/${expenseCategoryId}`)
        toast('ExpenseCategory deleted successfully')
        return response.data
    } catch (error) {
        console.log(error)
        toast(error.response.data.detail)
        return null
    }

})


export const getSingleExpenseCategory = createAsyncThunk('expenseCategory/getSingleExpenseCategory', async (expenseCategoryId) => {

    try {
        const response = await authInstance.get(`expenseCategory/${expenseCategoryId}`)
        return response.data
    } catch (error) {
        console.log(error)
        toast(error.response.data.detail)
        return null
    }

})

export const updateExpenseCategory = createAsyncThunk('expenseCategory/updateExpenseCategory', async ( {data ,expenseCategoryId}) => {
    try {
        console.log(expenseCategoryId)
        const response = await authInstance.post(`expenseCategory/update/${expenseCategoryId}`, data)
        toast('ExpenseCategory Updated successfully')
        return response.data
    } catch (error) {
        console.log(error)
        toast(error.response.data.detail)
        return null
    }

})





const expenseCategorySlice = createSlice({
    name: "expenseCategory",
    initialState: {
        expenseCategory: null,
        singleExpenseCategory:null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {

        // add expenseCategory

        builder.addCase(addExpenseCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addExpenseCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.expenseCategory = action.payload.data
        })
        builder.addCase(addExpenseCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        // get all expenseCategorys

        builder.addCase(getExpenseCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getExpenseCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.expenseCategory = action.payload.data
        })
        builder.addCase(getExpenseCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        // delete expenseCategory

        builder.addCase(deleteExpenseCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteExpenseCategory.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(deleteExpenseCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        // get single expenseCategory 

        builder.addCase(getSingleExpenseCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getSingleExpenseCategory.fulfilled, (state,action) => {
            state.loading = false;
            state.singleExpenseCategory = action.payload.data
        })
        builder.addCase(getSingleExpenseCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        // update expenseCategory 

        builder.addCase(updateExpenseCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateExpenseCategory.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(updateExpenseCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        
    }
})

export default expenseCategorySlice.reducer