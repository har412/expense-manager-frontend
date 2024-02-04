
import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./auth/authSlice";
import userSlice from "./user/userSlice";
import incomeSlice from "./income/incomeSlice";
import expenseSlice from "./expense/expenseSlice";

export const rootReducer = combineReducers({
    auth:authSlice,
    user:userSlice,
    expense:expenseSlice,
    income :incomeSlice
})

