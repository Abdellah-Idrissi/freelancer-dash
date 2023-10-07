import { createSlice } from "@reduxjs/toolkit";

const initialState : asideSliceType = true

export const asideSlice = createSlice({
  name: "aside",
  initialState,
  reducers: {
    toggleAside: (state)=> {
      return state = !state
    }
  }
});


export const  {toggleAside} = asideSlice.actions
export const asideReducer = asideSlice.reducer