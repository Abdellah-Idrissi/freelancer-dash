import { configureStore } from "@reduxjs/toolkit";
import { asideReducer } from "./slices/aside/aside-slice";

export const store = configureStore({
  reducer: {
    aside:asideReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),

  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch