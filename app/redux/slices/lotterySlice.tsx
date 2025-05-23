import { Strings } from "@/app/utills";
import { createSlice } from "@reduxjs/toolkit";

const lotterySlice = createSlice({
  name: Strings.app_str_lottery_path,
  initialState: {
    selectedNumbers: [],
  },
  reducers: {
    updateSelectedNum: (state, action) => {
      let array: any = state.selectedNumbers;
      array.push(action.payload);
      state.selectedNumbers = array;
    },
    deleteSelectedRow: (state, action) => {
      state.selectedNumbers = action.payload;
    },
  },
});

export const { updateSelectedNum, deleteSelectedRow } = lotterySlice.actions;
export default lotterySlice.reducer;
