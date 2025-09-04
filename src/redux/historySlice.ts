import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAnswer } from "../types";

export interface QuizResult {
  score: number;
  totalQuestions: number;
  userAnswers: UserAnswer[];
  timestamp: string; // ISO string for date
}

export interface HistoryState {
  results: QuizResult[];
}

const initialState: HistoryState = {
  results: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addResult: (state, action: PayloadAction<QuizResult>) => {
      state.results.unshift(action.payload); // Add to the beginning of the array
    },
  },
});

export const { addResult } = historySlice.actions;
export default historySlice.reducer;
