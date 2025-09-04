import { APIQuestion, QuestionState } from '../types';
// Import the fallback questions from the local JSON file.
import fallbackQuestions from './questions.json';

// Helper function to shuffle array (for randomizing answer order)
const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);

/**
 * Processes raw question data into the format needed by the app.
 * @param questions An array of raw question objects.
 * @returns An array of processed questions with shuffled answers.
 */
const processQuestions = (questions: APIQuestion[]): QuestionState[] => {
  return questions.map((question: APIQuestion) => ({
    ...question,
    // Shuffle the correct answer in with the incorrect ones
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};

export const fetchQuizQuestions = async (amount: number, difficulty: string): Promise<QuestionState[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Check for API-specific errors (e.g., no questions for the selected criteria)
    if (data.response_code !== 0) {
        throw new Error('API returned an error code.');
    }

    return processQuestions(data.results);
  } catch (error) {
    console.error("Failed to fetch quiz questions from API:", error);
    console.log("Using local fallback questions instead.");
    // If the API call fails for any reason, use the local fallback questions.
    // We cast the imported JSON to the correct type.
    return processQuestions(fallbackQuestions as APIQuestion[]);
  }
};
