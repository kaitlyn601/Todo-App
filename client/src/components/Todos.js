import React from 'react';
import { useTodo } from '../TodoContext';
import SingleTodo from './SingleTodo';

function Todos() {
  const { tasks } = useTodo();
  return (
    <div>
      <div className='grid grid-cols-6'>
        <p className='col-span-2 font-bold  '>Task</p>
        <p className='col-span-1 font-bold'>Priority</p>
        <p className='col-span-1 font-bold'>Deadline</p>
        <p className='col-span-2 font-bold'></p>
      </div>
      {tasks?.map((task) => (
        <SingleTodo key={task.id} task={task} />
      ))}
    </div>
  );
}

export default Todos;
