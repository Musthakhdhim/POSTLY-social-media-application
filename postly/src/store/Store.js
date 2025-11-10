import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./Auth/Reducer";


const reducer=combineReducers({
    auth:authReducer
})

const store=configureStore({
    reducer,
    middleware:(getDefaultMiddleWare)=>
        getDefaultMiddleWare({
            serializableCheck:false
        })
    
})

export default store;