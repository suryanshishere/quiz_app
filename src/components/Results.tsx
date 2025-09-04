import React from 'react';
import { UserAnswer } from '../types';

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
}

const Results: React.FC<Props> = ({ userAnswers, score, totalQuestions, restartQuiz, highScore }) => {
    const isNewHighScore = score > 0 && score === highScore;

    return (
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-3xl text-center animate-fadeIn">
            <h1 className="text-4xl font-bold text-purple-800 mb-2">Quiz Complete!</h1>
            
            {isNewHighScore && (
                <p className="text-2xl font-bold text-yellow-500 animate-pulse mb-4">
                    New High Score!
                </p>
            )}

            <p className="text-2xl text-gray-700 mb-2">
                Your Final Score: <span className="font-extrabold">{score} / {totalQuestions}</span>
            </p>
            <p className="text-lg text-gray-600 mb-6">
                High Score: {highScore}
            </p>

            <div className="text-left space-y-4 mb-8 max-h-80 overflow-y-auto pr-2">
                {userAnswers.map((answer, index) => (
                    <div key={index} className={`p-4 rounded-lg border-2 ${answer.isCorrect ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'}`}>
                        <p className="font-bold text-gray-800" dangerouslySetInnerHTML={{ __html: decodeHTML(answer.question) }}/>
                        <p>Your answer: <span className={`font-semibold ${!answer.isCorrect ? 'text-red-600' : 'text-green-700'}`} dangerouslySetInnerHTML={{__html: decodeHTML(answer.answer)}} /></p>
                        {!answer.isCorrect && answer.answer !== 'No Answer (Time ran out)' && (
                            <p>Correct answer: <span className="text-green-800 font-bold" dangerouslySetInnerHTML={{__html: decodeHTML(answer.correctAnswer)}}/></p>
                        )}
                    </div>
                ))}
            </div>

            <button
                onClick={restartQuiz}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-xl transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
                Restart Quiz
            </button>
        </div>
    );
};

export default Results;
