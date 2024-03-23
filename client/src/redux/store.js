import {configureStore} from '@reduxjs/toolkit'
import studentAlumniReducer from './slices/studentAlumniSlice'
 export const store=configureStore({
     reducer:{
         studentAlumniLoginReducer:studentAlumniReducer
     }
 })