import { configureStore } from '@reduxjs/toolkit';
import quizReducer, { QuizState } from './quizSlice';
import historyReducer, { HistoryState } from './historySlice';
import highScoreReducer, { HighScoreState } from './highScoreSlice';

// Define a type for the entire app state, combining all slice states.
interface AppState {
  quiz: QuizState;
  history: HistoryState;
  highScore: HighScoreState;
}

// --- Throttling Utility ---
const throttle = <T extends (...args: any[]) => void>(func: T, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;

  return (...args: Parameters<T>) => {
    lastArgs = args;
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        if (lastArgs) {
          func(...lastArgs);
          lastArgs = null;
          timeoutId = null;
        }
      }, delay);
    }
  };
};

// --- Local Storage Utility Functions ---
const loadState = (): AppState | undefined => {
  try {
    const serializedState = localStorage.getItem('quizAppState');
    if (serializedState === null) {
      return undefined; // Let reducers initialize the state
    }

    const state: AppState = JSON.parse(serializedState);

    // Always reset the active quiz portion on load to prevent weird states.
    state.quiz = {
      ...state.quiz, // Keep difficulty setting from previous session
      loading: true,
      questions: [],
      userAnswers: [],
      score: 0,
      currentQuestionIndex: 0,
      isQuizOver: false,
    };

    return state;
  } catch (err) {
    console.error("Error: Could not load state from localStorage.", err);
    return undefined;
  }
};

const saveState = (state: AppState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('quizAppState', serializedState);
  } catch (err) {
    console.error("Error: Could not save state to localStorage.", err);
  }
};

// --- Store Configuration ---
const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    history: historyReducer,
    highScore: highScoreReducer, // Add the high score reducer
  },
  preloadedState,
});

const throttledSaveState = throttle((state: AppState) => {
  saveState(state);
}, 1000);

store.subscribe(() => {
  throttledSaveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

