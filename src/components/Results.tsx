import React from "react";
import { UserAnswer } from "../types";
import { Link } from "react-router-dom";

type Props = {
  userAnswers: UserAnswer[];
  score: number;
  totalQuestions: number;
  restartQuiz: () => void;
  highScore: number; // Add high score prop
};

const decodeHTML = (html: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const Results: React.FC<Props> = ({ userAnswers, score, totalQuestions, restartQuiz, highScore }) => {
  const isNewHighScore = score > 0 && score === highScore;

  return (
    <div className="bg-[#ebeff4] p-8 rounded-lg shadow-2xl w-full max-w-3xl text-center animate-fadeIn">
      <h1 className="text-4xl font-bold text-[#556B2F] mb-2">Quiz Complete!</h1>

      {isNewHighScore && <p className="text-2xl font-bold text-[#8FA31E] animate-pulse mb-4">New High Score!</p>}

      <p className="text-2xl text-[#556B2F] mb-2">
        Your Final Score:{" "}
        <span className="font-extrabold text-black">
          {score} / {totalQuestions}
        </span>
      </p>
      <p className="text-lg text-[#647FBC] mb-6">High Score: {highScore}</p>

      <div className="text-left space-y-4 mb-8 max-h-90 overflow-y-auto pr-2">
        {userAnswers.map((answer, index) => (
          <div key={index} className={`p-4 rounded-lg border-2 ${answer.isCorrect ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50"}`}>
            <p className="font-bold text-gray-800" dangerouslySetInnerHTML={{ __html: decodeHTML(answer.question) }} />
            <p>
              Your answer: <span className={`font-semibold ${!answer.isCorrect ? "text-red-600" : "text-green-700"}`} dangerouslySetInnerHTML={{ __html: decodeHTML(answer.answer) }} />
            </p>
            {!answer.isCorrect && answer.answer !== "No Answer (Time ran out)" && (
              <p>
                Correct answer: <span className="text-green-800 font-bold" dangerouslySetInnerHTML={{ __html: decodeHTML(answer.correctAnswer) }} />
              </p>
            )}
          </div>
        ))}
      </div>

      <button onClick={restartQuiz} className="bg-[#556B2F] hover:bg-[#8FA31E] text-white font-bold py-3 px-8 rounded-full transition duration-300 text-xl transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#647FBC]">
        Restart Quiz
      </button>
      <Link to="/" className="ml-4 bg-white hover:bg-gray-100 text-[#556B2F] font-bold py-3 px-8 rounded-full transition duration-300 text-xl transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#647FBC]">
        Go Home
      </Link>
    </div>
  );
};

export default Results;
