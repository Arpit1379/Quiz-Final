import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress, Typography } from '@mui/material';
import { RootState } from '../Redux/store';
import { nextQuestion, prevQuestion, setQuestions, setTimer, submitQuiz } from '../Redux/reducers/quizSlice';
import { fetchQuestions } from '../mockapi';

const Quiz: React.FC = () => {
  const dispatch = useDispatch();
  const { currentQuestionIndex, questions } = useSelector((state: RootState) => state.quiz);
  const [localTimer, setLocalTimer] = useState(10); // Assuming timer should not exceed 10 seconds
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  useEffect(() => {
    fetchQuestions().then((questions) => {
      dispatch(setQuestions(questions));
      setUserAnswers(new Array(questions.length).fill('')); // Initialize userAnswers with empty strings
    });
  }, [dispatch]);

  useEffect(() => {
    // Setup timer
    const timerId = setInterval(() => {
      setLocalTimer((prevTimer) => {
        if (prevTimer === 1) {
          // Automatically move to the next question or submit if it's the last question
          if (currentQuestionIndex < questions.length - 1) {
            dispatch(nextQuestion());
          } else {
            calculateScoreAndSubmit();
          }
          return 10; // Reset timer to 10
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [dispatch, currentQuestionIndex, userAnswers]); // Dependency on currentQuestionIndex to reset interval

  const handleNavigation = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      if (currentQuestionIndex < questions.length - 1) {
        dispatch(nextQuestion());
      } else {
        calculateScoreAndSubmit();
      }
    } else {
      dispatch(prevQuestion());
    }
    setLocalTimer(10); // Reset local timer for next or previous question
  };

  const handleAnswerSelection = (selectedOption: string, index: number) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = selectedOption;
    setUserAnswers(updatedAnswers);
  };

  const calculateScoreAndSubmit = () => {
    let score = 0;
    questions.forEach((question:any, index:any) => {
      if (question.correctAnswer === userAnswers[index]) {
        score += 1;
      }
    });
    // Here, you could dispatch an action to update the store with the score or navigate to a results screen
    console.log("Final Score:", score); // For demonstration
    // Assuming you have an action like submitQuiz in your quizSlice
    dispatch(submitQuiz(score));
  };

  if (questions.length === 0) {
    return <CircularProgress />;
  }

  const { question, options } = questions[currentQuestionIndex];

  return (
    <div>
      <Typography variant="h5">Timer: {localTimer}</Typography>
      <Typography variant="h4">{question}</Typography>
      {options.map((option:any, index:any) => (
        <Button
          key={index}
          variant="contained"
          color={userAnswers[currentQuestionIndex] === option ? "primary" : "default"}
          onClick={() => handleAnswerSelection(option, currentQuestionIndex)}
          style={{ display: 'block', margin: '10px 0' }}
        >
          {option}
        </Button>
      ))}
      <Button onClick={() => handleNavigation('prev')} disabled={currentQuestionIndex === 0}>Previous</Button>
      <Button onClick={() => handleNavigation('next')} disabled={currentQuestionIndex >= questions.length - 1}>
        {currentQuestionIndex >= questions.length - 1 ? 'Submit Quiz' : 'Next'}
      </Button>
    </div>
  );
};

export default Quiz;
