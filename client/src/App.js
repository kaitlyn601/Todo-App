import Header from './components/Header';

import SingleTodo from './components/SingleTodo';
import { TodoProvider } from './TodoContext';
import Todos from './components/Todos';

function App() {
  return (
    <TodoProvider>
      <div className='bg-white shadow-lg rounded-lg p-6 mt-12 w-4/5 lg:w-3/5'>
        <Header />
        <Todos />
      </div>
    </TodoProvider>
  );
}

export default App;
