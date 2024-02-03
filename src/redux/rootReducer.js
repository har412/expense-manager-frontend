
import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./auth/authSlice";
import userSlice from "./user/userSlice";

export const rootReducer = combineReducers({
    auth:authSlice,
    user:userSlice
})

