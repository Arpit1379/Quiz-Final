  interface Question {
    question: string;
    options: string[];
    answer: string;
  }
  
  const mockQuestions: Question[] = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      answer: 'Paris'
    },
    {
      question: 'Which element has the chemical symbol "O"?',
      options: ['Gold', 'Oxygen', 'Silver', 'Helium'],
      answer: 'Oxygen'
    },
    {
      question: 'What is the largest planet in our solar system?',
      options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      answer: 'Jupiter'
    },
    {
      question: 'What is the capital of India?',
      options: ['London', 'London', 'Berlin', 'Delhi'],
      answer: 'Delhi'
    },
    {
      question: 'What is the capital of Nepal?',
      options: ['Delhi', 'London', 'Berlin', 'Katmandu'],
      answer: 'Katmandu'
    },
    // Add more questions as needed.
  ];
  
  export const fetchQuestions = (): Promise<Question[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockQuestions), 500); // Simulate network delay
    });
  };
  