import { saveAs } from 'file-saver';
import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { authInstance } from "src/services/axios";


export const getExpense = createAsyncThunk('expense/getExpense', async () => {

    try {
        const response = await authInstance.get('expense')
        return response.data
    } catch (error) {
        console.log(error)
        toast(error.response.data.detail)
        return null
    }

})


export const exportExpense = createAsyncThunk('expense/exportExpense', async () => {
    try {
        const response = await authInstance.post('expense/export', {}, { responseType: 'blob' });
        saveAs(response.data, 'expenses.xlsx');
        return response.data;
    } catch (error) {
        console.log(error);
        toast(error.response.data.detail);
        return null;
    }

})

export const addExpense = createAsyncThunk('expense/addExpense', async (data) => {
    try {
        const response = await authInstance.post('expense/add', data)
        toast('Expense added successfully')
        return response.data
    } catch (error) {
        console.log(error)
        toast(error.response.data.detail)
        return null
    }

})

export const deleteExpense = createAsyncThunk('expense/deleteExpense', async (expenseId) => {
    try {
        const response = await authInstance.delete(`expense/delete/${expenseId}`)
        toast('Expense deleted successfully')
        return response.data
    } catch (error) {
        console.log(error)
        toast(error.response.data.detail)
        return null
    }

})


export const getSingleExpense = createAsyncThunk('expense/getSingleExpense', async (expenseId) => {

    try {
        const response = await authInstance.get(`expense/${expenseId}`)
        return response.data
    } catch (error) {
        console.log(error)
        toast(error.response.data.detail)
        return null
    }

})

export const updateExpense = createAsyncThunk('expense/updateExpense', async ( {data ,expenseId}) => {
    try {
        console.log(expenseId)
        const response = await authInstance.post(`expense/update/${expenseId}`, data)
        toast('Expense Updated successfully')
        return response.data
    } catch (error) {
        console.log(error)
        toast(error.response.data.detail)
        return null
    }

})





const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        expense: null,
        singleExpense:null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {

        // add expense

        builder.addCase(addExpense.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addExpense.fulfilled, (state, action) => {
            state.loading = false;
            state.expense = action.payload.data
        })
        builder.addCase(addExpense.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        // get all expenses

        builder.addCase(getExpense.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getExpense.fulfilled, (state, action) => {
            state.loading = false;
            state.expense = action.payload.data
        })
        builder.addCase(getExpense.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        // delete expense

        builder.addCase(deleteExpense.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteExpense.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(deleteExpense.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        // get single expense 

        builder.addCase(getSingleExpense.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getSingleExpense.fulfilled, (state,action) => {
            state.loading = false;
            state.singleExpense = action.payload.data
        })
        builder.addCase(getSingleExpense.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        // update expense 

        builder.addCase(updateExpense.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateExpense.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(updateExpense.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        
    }
})

export default expenseSlice.reducer