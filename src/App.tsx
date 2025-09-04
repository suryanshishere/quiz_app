    import React from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import Quiz from './pages/Quiz';
    import ResultsPage from './pages/ResultsPage';
    import StartMenu from './pages/StartMenu';
    import HistoryPage from './pages/HistoryPage';

    function App() {
      return (
        <Router>
            <div className="min-h-screen flex items-center justify-center font-sans p-4">
                <Routes>
                    <Route path="/" element={<StartMenu />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/results" element={<ResultsPage />} />
                    <Route path="/history" element={<HistoryPage />} />
                </Routes>
            </div>
        </Router>
      );
    }

    export default App;
    
