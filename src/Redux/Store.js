import {configureStore} from '@reduxjs/toolkit'
import {categoryDetailsReducer} from './categoryDetailsSlice'




export let store=configureStore({
    reducer:{
        categoryDetails:categoryDetailsReducer, 
    }
})
