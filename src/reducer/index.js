
import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice"
import examReducer from "../slices/examSlice"
import viewPaperReducer from "../slices/viewPaperSlice";

const rootReducer  = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    cart:cartReducer,
    exam:examReducer,
    viewPaper:viewPaperReducer,
})

export default rootReducer