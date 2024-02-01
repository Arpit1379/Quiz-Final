import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import Quiz from './components/Quiz';

function App() {
  return (
    <Provider store={store}>
      <div style={{ padding: '20px' }}>
        <Quiz />
      </div>
      </Provider>
  );
}

export default App;
