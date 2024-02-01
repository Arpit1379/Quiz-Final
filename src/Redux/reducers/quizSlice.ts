import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuizState {
  currentQuestionIndex: number;
  questions: Question[];
  timer: number;
  userAnswers: string[];
}

interface Question {
  question: string;
  options: string[];
  answer: string;
}


const initialState: QuizState = {
  currentQuestionIndex: 0,
  questions: [], // This will later be filled with questions from the mock API
  timer: 10, // Example timer value
  userAnswers: [],
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setTimer: (state:any, action: PayloadAction<number>) => {
        state.timer = action.payload;
      },
    setQuestions: (state:any, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    nextQuestion: (state:any) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
        state.timer = 10;
      }
    },
    prevQuestion: (state:any) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
        state.timer = 10;
      }
    },
    decrementTimer: (state:any) => {
        if (state.timer > 0) {
            state.timer -= 1;
          }
    },
    submitAnswer(state:any, action: PayloadAction<{questionIndex: number, answer: string}>) {
        const { questionIndex, answer } = action.payload;
        state.userAnswers[questionIndex] = answer;
      },
      resetQuiz: (state:any) => {
        state.currentQuestionIndex = 0;
        state.answers = [];
        state.timer = 10;
      },
      submitQuiz: (state:any) => {
        let score = 0;
        state.answers.forEach((answer:any, index:any) => {
          if (answer === state.questions[index].correctAnswer) {
            score += 1;
          }
        });
        state.score = score; // Assume you have a score field in your state
        state.quizCompleted = true; // Flag to indicate the quiz is over
      },
  },
});

export const { setQuestions, nextQuestion, prevQuestion, decrementTimer ,setTimer,resetQuiz} = quizSlice.actions;

export default quizSlice.reducer;
