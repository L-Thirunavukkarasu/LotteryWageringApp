import { configureStore } from "@reduxjs/toolkit";
import lotterySlice from "./slices/lotterySlice";

export const store = configureStore({
  reducer: {
    lottery: lotterySlice,
  },
});

// RootState type
export type RootState = ReturnType<typeof store.getState>;