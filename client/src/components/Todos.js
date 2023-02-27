import React from 'react';
import { useTodo } from '../TodoContext';
import SingleTodo from './SingleTodo';

function Todos() {
  const { tasks } = useTodo();
  console.log(tasks);
  return (
    <div>
      {' '}
      {tasks?.map((task) => (
        <SingleTodo key={task.id} task={task} />
      ))}
    </div>
  );
}

export default Todos;
