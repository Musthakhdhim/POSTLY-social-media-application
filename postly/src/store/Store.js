import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./Auth/Reducer";
import {  twitReducer } from "./Post/Reducer";


const reducer=combineReducers({
    auth:authReducer, 
    twit:twitReducer
})

const store=configureStore({
    reducer,
    middleware:(getDefaultMiddleWare)=>
        getDefaultMiddleWare({
            serializableCheck:false
        })
    
})

export default store;