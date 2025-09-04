import React from 'react';

// Assuming UserAnswer type is defined elsewhere, e.g., in '../types'
type UserAnswer = {
  question: string;
  answer: string;
  correctAnswer: string;
};

type Props = {
  question: string;
  answers: string[];
  callback: (selectedAnswer: string) => void;
  userAnswer: UserAnswer | undefined;
  questionNr: number;
  totalQuestions: number;
  timer: number; // Add timer prop
};

// Use dangerouslySetInnerHTML to decode HTML entities like &quot;
const decodeHTML = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
  timer
}) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl text-center animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600 font-semibold">
          Question: {questionNr} / {totalQuestions}
        </p>
        <div className="text-lg font-bold text-[#3E506C] bg-[#E0E8F0] px-3 py-1 rounded-full">
          Time: {timer}s
        </div>
      </div>
      <p className="text-2xl font-bold mb-6 text-gray-800" dangerouslySetInnerHTML={{ __html: decodeHTML(question) }} />
      <div className="flex flex-col space-y-4">
        {answers.map((answer) => {
          const isSelected = userAnswer?.answer === answer;
          const isCorrect = userAnswer?.correctAnswer === answer;
          
          let btnClasses = 'bg-[#91ADC8] hover:bg-[#647FBC]'; // Default button with new colors
          if (userAnswer) { // An answer has been selected
            if (isCorrect) {
              btnClasses = 'bg-[#556B2F] text-white animate-pulse'; // Correct answer - new green
            } else if (isSelected) {
              btnClasses = 'bg-red-500 text-white'; // Incorrectly selected answer
            } else {
              btnClasses = 'bg-gray-400 text-gray-800 opacity-70'; // Other options, disabled look
            }
          }

          return (
            <button
              key={answer}
              disabled={!!userAnswer}
              onClick={() => callback(answer)}
              className={`text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 w-full text-lg transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#647FBC]
                ${userAnswer ? 'cursor-not-allowed' : ''} ${btnClasses}`}
              aria-label={`Answer option: ${decodeHTML(answer)}`}
            >
              <span dangerouslySetInnerHTML={{ __html: decodeHTML(answer) }} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;

