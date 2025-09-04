// src/types.ts
export type APIQuestion = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

// Add an 'answers' property to the original type
export type QuestionState = APIQuestion & { answers: string[] };

export type UserAnswer = {
    question: string;
    answer: string;
    isCorrect: boolean;
    correctAnswer: string;
};