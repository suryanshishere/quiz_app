import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestionState, UserAnswer } from '../types';

export interface QuizState {
  loading: boolean;
  questions: QuestionState[];
  userAnswers: UserAnswer[];
  score: number;
  currentQuestionIndex: number;
  isQuizOver: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

const initialState: QuizState = {
  loading: true,
  questions: [],
  userAnswers: [],
  score: 0,
  currentQuestionIndex: 0,
  isQuizOver: false,
  difficulty: 'easy', // Default difficulty
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setDifficulty: (state, action: PayloadAction<'easy' | 'medium' | 'hard'>) => {
      state.difficulty = action.payload;
    },
    startQuiz: (state, action: PayloadAction<QuestionState[]>) => {
      state.loading = false;
      state.questions = action.payload;
      state.score = 0;
      state.userAnswers = [];
      state.currentQuestionIndex = 0;
      state.isQuizOver = false;
    },
    answerQuestion: (state, action: PayloadAction<{ answer: string; isCorrect: boolean }>) => {
      const { answer, isCorrect } = action.payload;
      const currentQuestion = state.questions[state.currentQuestionIndex];
      state.userAnswers.push({
        question: currentQuestion.question,
        answer,
        isCorrect,
        correctAnswer: currentQuestion.correct_answer,
      });
      if (isCorrect) {
        state.score += 1;
      }
    },
    nextQuestion: (state) => {
      const nextQuestionIndex = state.currentQuestionIndex + 1;
      if (nextQuestionIndex === state.questions.length) {
        state.isQuizOver = true;
      } else {
        state.currentQuestionIndex = nextQuestionIndex;
      }
    },
    resetQuiz: (state) => {
      // Reset quiz-specific state but keep difficulty
      state.loading = true;
      state.questions = [];
      state.userAnswers = [];
      state.score = 0;
      state.currentQuestionIndex = 0;
      state.isQuizOver = false;
    },
  },
});

export const { setDifficulty, startQuiz, answerQuestion, nextQuestion, resetQuiz } = quizSlice.actions;

export default quizSlice.reducer;

