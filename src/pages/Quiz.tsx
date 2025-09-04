import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuizQuestions } from "../utils/api";
import QuestionCard from "../components/QuestionCard";
import { RootState, AppDispatch } from "../redux/store";
import { startQuiz, answerQuestion, nextQuestion } from "../redux/quizSlice";
import { addResult } from "../redux/historySlice";
import { updateHighScore } from "../redux/highScoreSlice";

const TOTAL_QUESTIONS = 10;
const TIME_PER_QUESTION = 30;

const Quiz: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    questions,
    score,
    userAnswers,
    currentQuestionIndex,
    isQuizOver,
    difficulty,
  } = useSelector((state: RootState) => state.quiz);

  const [timer, setTimer] = useState(TIME_PER_QUESTION);
  const timerRef = useRef<number | null>(null);
  const effectRan = useRef(false);

  // Effect to fetch questions
  useEffect(() => {
    if (effectRan.current === false) {
      if (questions.length === 0) {
        const getQuestions = async () => {
          const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, difficulty);
          dispatch(startQuiz(newQuestions));
        };
        getQuestions();
      }
      effectRan.current = true;
    }
  }, [dispatch, difficulty]);

  // Effect to handle the timer
  useEffect(() => {
    if (!isQuizOver && questions.length > 0 && userAnswers.length <= currentQuestionIndex) {
      // use window.setInterval to get a number id in browsers
      timerRef.current = window.setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isQuizOver, questions.length, currentQuestionIndex, userAnswers.length]);

  // Effect to handle time running out
  useEffect(() => {
    if (timer === 0) {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      handleTimeOut();
    }
  }, [timer]);

  // Effect to handle quiz completion
  useEffect(() => {
    if (isQuizOver) {
      dispatch(
        addResult({
          score,
          totalQuestions: TOTAL_QUESTIONS,
          userAnswers,
          timestamp: new Date().toISOString(),
        })
      );
      dispatch(updateHighScore(score)); // Update high score
      navigate("/results");
    }
  }, [isQuizOver, navigate, dispatch, score, userAnswers]);

  const handleCheckAnswer = (selectedAnswer: string) => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const isCorrect = questions[currentQuestionIndex].correct_answer === selectedAnswer;
    dispatch(answerQuestion({ answer: selectedAnswer, isCorrect }));
  };

  const handleNextQuestion = () => {
    setTimer(TIME_PER_QUESTION); // Reset timer for next question
    dispatch(nextQuestion());
  };

  const handleTimeOut = () => {
    dispatch(answerQuestion({ answer: "No Answer (Time ran out)", isCorrect: false }));
  };

  const progressPercentage = (currentQuestionIndex / TOTAL_QUESTIONS) * 100;

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <h1 className="text-4xl font-extrabold text-white text-center mb-4" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
        React Quiz
      </h1>

      {loading && <p className="text-white text-xl">Loading Questions...</p>}

      {!loading && questions.length > 0 && (
        <>
          {/* Progress Bar */}
          <div className="w-full max-w-2xl bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700" role="progressbar" aria-valuenow={progressPercentage} aria-valuemin={0} aria-valuemax={100}>
            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progressPercentage}%`, transition: "width 0.5s ease-in-out" }}></div>
          </div>

          <div key={currentQuestionIndex}>
            <QuestionCard
              questionNr={currentQuestionIndex + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[currentQuestionIndex].question}
              answers={questions[currentQuestionIndex].answers}
              userAnswer={userAnswers ? userAnswers[currentQuestionIndex] : undefined}
              callback={handleCheckAnswer}
              timer={timer}
            />
          </div>

          {userAnswers.length === currentQuestionIndex + 1 && (
            <button onClick={handleNextQuestion} className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-300 text-xl">
              {currentQuestionIndex === TOTAL_QUESTIONS - 1 ? "Finish Quiz" : "Next Question"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;

