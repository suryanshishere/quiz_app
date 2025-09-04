import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../redux/store';

const HistoryPage: React.FC = () => {
  const { results } = useSelector((state: RootState) => state.history);

  return (
    <div className="bg-[#91ADC8] p-8 rounded-lg shadow-lg w-full max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quiz History</h1>
        <Link 
          to="/" 
          className="bg-[#556B2F] hover:bg-[#8FA31E] text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Home
        </Link>
      </div>
      {results.length === 0 ? (
        <p className="text-center text-gray-500">No past results found.</p>
      ) : (
        <div className="space-y-4 bg-gray-50 rounded-lg">
          {results.map((result, index) => (
            <div 
              key={index} 
              className="p-4 rounded-lg border border-[#647FBC]"
            >
              <p className="font-bold text-lg">
                Score: {result.score} / {result.totalQuestions}
              </p>
              <p className="text-sm text-gray-500">
                Completed on: {new Date(result.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;