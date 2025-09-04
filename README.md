# Quizo

A dynamic, full-featured quiz application built with React, TypeScript, Redux, and Tailwind CSS. This project was developed to showcase modern front-end development practices, including robust state management, API handling, and a focus on a clean, responsive user experience.

## Features

This application includes a wide range of features to provide a complete and engaging quiz experience.

### Core Features

- **Dynamic Question Loading**: Fetches multiple-choice questions from the Open Trivia DB API
- **API Fallback**: Includes a local JSON file of questions to ensure functionality when offline or if the API is unavailable
- **Sequential Question Display**: Presents questions individually for better user focus
- **Score Tracking**: Accurately tracks the user's score throughout the quiz
- **Detailed Results Page**: Provides a full summary of the user's answers, highlighting correct and incorrect selections
- **Quiz Restart**: Allows users to reset the quiz and attempt a new set of questions
- **Responsive UI**: A mobile-first design that works seamlessly across all device sizes

### Bonus Features

- **Difficulty Levels**: Users can select 'easy', 'medium', or 'hard' difficulty before starting
- **Question Timer**: A 30-second timer for each question that auto-submits an incorrect answer if time expires
- **Progress Indicator**: A visual progress bar showing the user's advancement through the quiz
- **Persistent State**: Uses localStorage to save quiz progress, allowing users to refresh the page and continue
- **Persistent High Scores**: Saves the user's highest score locally
- **UI Animations**: Includes smooth fade-in animations for questions and tactile feedback on button clicks
- **Accessibility**: Implemented with accessibility in mind, including ARIA labels, focus states, and keyboard navigation

## Technologies Used

- **React**: For building the user interface with functional components and hooks
- **TypeScript**: For static typing to improve code quality and maintainability
- **Redux Toolkit**: For centralized and predictable state management
- **React Router**: For handling client-side routing
- **Tailwind CSS**: For a utility-first approach to styling and responsive design
- **Open Trivia DB**: As the API source for quiz questions

## Architecture & Design Decisions

### State Management

Redux Toolkit was chosen to manage the application's state, providing a centralized "single source of truth" that makes the state predictable and easier to debug.

The state is divided into logical slices (`quizSlice`, `historySlice`, `highScoreSlice`) to keep concerns separated and the codebase organized.

### Data Persistence

The Redux store is connected to the browser's localStorage to persist data across sessions.

To optimize performance, a throttle function limits state-saving operations to at most once per second, preventing excessive writes.

The application intelligently loads from localStorage, allowing users to resume an in-progress quiz while starting a new one if the previous quiz was completed.

### API Handling

The application is designed for resilience. The primary data source is the Open Trivia DB API.

A fallback mechanism is in place: if the API call fails, the app seamlessly loads questions from a local `questions.json` file.

### Component Structure

The application is broken down into container components (e.g., `Quiz.tsx`) that handle logic and data, and presentational components (e.g., `QuestionCard.tsx`) that are responsible for rendering the UI. This separation of concerns improves readability and maintainability.

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

Ensure you have Node.js and npm installed on your machine.

```bash
npm install npm@latest -g
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repository-name.git
   ```

2. Navigate to the project directory:
   ```bash
   cd your-repository-name
   ```

3. Install NPM packages:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:

```bash
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode
- `npm run build`: Builds the app for production to the build folder
- `npm test`: Launches the test runner in interactive watch mode
- `npm run eject`: Removes the single-file dependency configuration (use with caution)

## License

Distributed under the MIT License. See `LICENSE` for more information.
