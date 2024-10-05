import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



// http://localhost:3000/api/hotel/gethotels?destination=&category=&hoteltype=&propertytype=&maxprice=&minprice=&adults=&children=&beds=&bathrooms=&infents=&bedrooms=&selfcheckin=


export interface QueryParameters{
    destination:string | null,
    category:string | null,
    hoteltype:string | null,
    propertytype:string | null,
    maxprice:number | null,
    minprice:number | null,
    adults:number,
    children:number,
    beds:number,
    bathrooms:number,
    infents:number ,
    bedrooms:number ,
    selfcheckin:string | null

}
export interface CounterState {
  value: number
}


const initialState: QueryParameters = {
  destination:'',
  category:'',
  hoteltype:'',
  propertytype:'',
  maxprice:10000000,
  minprice:1,
  adults:1,
  children:0,
  bedrooms:0,
  beds:0,
  bathrooms:0,
  infents:0,
  selfcheckin:''

}

export const queryparameterSlice = createSlice({
  name: 'queryparameter',
  initialState,
  reducers: {
   
    
    incrementAdults: (state) => {
      if(state.adults<10)
      state.adults += 1;

    },
    decrementAdults: (state) => {
      if(state.adults>0)
      state.adults -= 1;

    },

    incrementChildren: (state) => {
      if(state.children<10)
      state.children += 1;

    },
    decrementChildren: (state) => {
      if(state.children>0)
      state.children -= 1;

    },

    incrementBeds: (state) => {
      if(state.beds<10)
      state.beds += 1;

    },
    decrementBeds: (state) => {
      if(state.beds>0)
      state.beds -= 1;

    },

    incrementBedrooms: (state) => {
      if(state.bedrooms<10)
      state.bedrooms += 1;

    },
    decrementBedrooms: (state) => {
      if(state.bedrooms>0)
      state.bedrooms -= 1;

    },

    incrementBathrooms: (state) => {
      if(state.bathrooms<10)
      state.bathrooms += 1;

    },
    decrementBathrooms: (state, action: PayloadAction<number>) => {
      if(state.bathrooms>0)
      state.bathrooms -= 1;

    },

    incrementInfents: (state) => {
      if(state.infents<10)
      state.infents += 1;

    },
    decrementInfents: (state) => {
      if(state.infents>0)
      state.infents -= 1;

    },



    setDestination:(state,action: PayloadAction<string>)=>{
      state.destination = action.payload
    },
    setCategory:(state,action: PayloadAction<string>)=>{
      state.category = action.payload
    },
    setHoteltype:(state,action: PayloadAction<string>)=>{
      state.hoteltype = action.payload
    },
    
    setPropertytype:(state,action: PayloadAction<string>)=>{
      state.propertytype = action.payload
    },

    setSelfcheckin:(state,action: PayloadAction<string>)=>{
      state.selfcheckin = action.payload
    },

    setMaxprice:(state,action: PayloadAction<number>)=>{
      state.maxprice = action.payload
    },
    setMinprice:(state,action: PayloadAction<number>)=>{
      state.minprice = action.payload
    },
    



  },
})

// Action creators are generated for each case reducer function
export const {  incrementAdults,decrementAdults,incrementBathrooms,decrementBathrooms,setDestination,setCategory,incrementChildren,decrementChildren,incrementInfents,decrementInfents } = queryparameterSlice.actions

export default queryparameterSlice.reducer