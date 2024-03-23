import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
export const studentAlumniLoginThunk=createAsyncThunk('student-alumni-login',async(userCredObj,thunkApi)=>{
    try{
    if(userCredObj.userType==='student'){
        const dbRes = await axios.post('http://localhost:4000/student-api/login',userCredObj)
        if(dbRes.data.message==='Login success'){
            // store token in local or session storage
            localStorage.setItem('token',dbRes.data.token)
            // return data
            return dbRes.data;
        }
        else{
            return thunkApi.rejectWithValue(dbRes.data.message)
        }
    }
    if(userCredObj.userType==='alumni'){
        const dbRes = await axios.post('http://localhost:4000/alumni-api/login',userCredObj)
        if(dbRes.data.message==='login success'){
            localStorage.setItem('token',dbRes.data.token)
            return dbRes.data;
        }
        else{
            console.log(dbRes.data.message)
            return thunkApi.rejectWithValue(dbRes.data.message)
        }
    }
}catch(err){
    return thunkApi.rejectWithValue(err)
}
})
export const studentAlumniSlice=createSlice({
    name:"student-alumni-login",
    initialState:{
        isPending:false,
        loginUserStatus:false,
        currentUser:{},
        errorOccured:false,
        errMsg:''
    },
    reducers:{
        resetState:(state,action)=>{
            state.isPending=false
            state.loginUserStatus=false
            state.currentUser={}
            state.errorOccured=false
            state.errMsg=''
        }
    },
    extraReducers:builder=>builder
    .addCase(studentAlumniLoginThunk.pending,(state,action)=>{
        state.isPending=true;
    })
    .addCase(studentAlumniLoginThunk.fulfilled,(state,action)=>{
        state.isPending=false;
        state.currentUser=action.payload.user
        state.loginUserStatus=true
        state.errorOccured=false
        state.errMsg=''

    })
    .addCase(studentAlumniLoginThunk.rejected,(state,action)=>{
        state.isPending=false;
        state.currentUser={}
        state.loginUserStatus=false
        state.errorOccured=true
        state.errMsg=action.payload
    }),
})

export const {resetState}=studentAlumniSlice.actions
export default studentAlumniSlice.reducer