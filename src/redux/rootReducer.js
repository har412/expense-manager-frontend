
import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./auth/authSlice";
import userSlice from "./user/userSlice";
import incomeSlice from "./income/incomeSlice";
import expenseSlice from "./expense/expenseSlice";
import incomeCategorySlice from "./incomeCategory/incomeCategorySlice";
import expenseCategorySlice from "./expenseCategory/expenseCategorySlice";

export const rootReducer = combineReducers({
    auth:authSlice,
    user:userSlice,
    expense:expenseSlice,
    income :incomeSlice,
    incomeCategory:incomeCategorySlice,
    expenseCategory:expenseCategorySlice
})

