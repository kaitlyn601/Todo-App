import './App.css';
import Header from './components/Header';
import { useState } from 'react';

import SingleTodo from './components/SingleTodo';
import { TodoProvider } from './TodoContext';
import Todos from './components/Todos';

function App() {
  return (
    <TodoProvider>
      <div className='bg-white'>
        <Header />
        <Todos />
      </div>
    </TodoProvider>
  );
}

export default App;
