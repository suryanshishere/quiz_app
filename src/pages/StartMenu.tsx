    import React from 'react';
    import { Link } from 'react-router-dom';

    const StartMenu: React.FC = () => {
        return (
            <div className="text-center">
                <h1 className="text-5xl font-extrabold text-white mb-8">Welcome to the Quiz!</h1>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/quiz">
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full text-2xl transition duration-300 transform hover:scale-105 w-full sm:w-auto">
                            Start Quiz
                        </button>
                    </Link>
                    <Link to="/history">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-full text-2xl transition duration-300 transform hover:scale-105 w-full sm:w-auto">
                            View History
                        </button>
                    </Link>
                </div>
            </div>
        );
    };

    export default StartMenu;
    
