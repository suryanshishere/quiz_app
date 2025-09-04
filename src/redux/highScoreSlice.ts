import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HighScoreState {
  score: number;
}

const initialState: HighScoreState = {
  score: 0,
};

const highScoreSlice = createSlice({
  name: 'highScore',
  initialState,
  reducers: {
    // This action will be dispatched at the end of a quiz.
    // It checks if the new score is higher and updates the state if it is.
    updateHighScore: (state, action: PayloadAction<number>) => {
      if (action.payload > state.score) {
        state.score = action.payload;
      }
    },
  },
});

export const { updateHighScore } = highScoreSlice.actions;
export default highScoreSlice.reducer;
