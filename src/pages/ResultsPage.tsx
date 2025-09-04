import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Results from '../components/Results';
import { RootState, AppDispatch } from '../redux/store';
import { resetQuiz } from '../redux/quizSlice';

const ResultsPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { userAnswers, score, questions } = useSelector((state: RootState) => state.quiz);
  const { score: highScore } = useSelector((state: RootState) => state.highScore); // Get high score from state

  if (userAnswers.length === 0) {
    return (
      <div className="text-center text-white p-8 bg-purple-800 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">No results to show.</h2>
        <p className="mb-6">Please start a quiz to see your results here.</p>
        <button onClick={() => navigate('/')} className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-2 px-6 rounded-lg transition duration-300">
          Go to Start Menu
        </button>
      </div>
    );
  }

  const handleRestartQuiz = () => {
    dispatch(resetQuiz());
    navigate('/quiz');
  };

  return (
    <Results
      userAnswers={userAnswers}
      score={score}
      totalQuestions={questions.length}
      restartQuiz={handleRestartQuiz}
      highScore={highScore}
    />
  );
};

export default ResultsPage;

