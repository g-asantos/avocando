import React from 'react';
import Header from './components/Header';
import Timer from './pages/timer';
import GlobalStyle from './styles/global';
import Todo from './pages/todo';

const App = () => {
  return (
    <div>
      <Header title="Avo-can do!" />
      <Timer />
      <Todo />
      <GlobalStyle />
    </div>
  );
};

export default App;
