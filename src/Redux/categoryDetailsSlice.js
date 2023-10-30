import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";


export let getCategoryDetails=createAsyncThunk(`categoryDetailsSlice/getCategoryDetails`,
async (id)=>{
  let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
return data.data
})
let initialState={categoryDetails:[],loading:false,isError:null};

let categoryDetailsSlice=createSlice({
    name:"categoryDetailsSlice",
    initialState,
 /*{   extraReducers:(builder)=>{
        builder.addCase(getCategoryDetails.fulfilled,(state,action)=>{
            state.categoryDetails=action.payload;
            state.loading=false;
        }),
        builder.addCase(getCategoryDetails.pending,(state)=>{
            state.loading=true;
        }),
        builder.addCase(getCategoryDetails.rejected,(state,action)=>{
            state.isError=action.payload;
            state.loading=false;
        })}}*/
     extraReducers:{
        [getCategoryDetails.pending]:(state,action)=>{
            state.loading=true;
        },
        [getCategoryDetails.fulfilled]:(state,action)=>{
            state.categoryDetails=action.payload;
            state.loading=false;
        },
        [getCategoryDetails.rejected]:(state,action)=>{
           // state.isError=action.payload;
            state.loading=false;
        }
     }
});
export let categoryDetailsReducer = categoryDetailsSlice.reducer;
//export let {}=categoriesDetailsSlice.actions;
