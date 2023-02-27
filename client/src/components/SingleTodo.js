import React from 'react';
import { useState } from 'react';
import Modal from './Modal';
import { useTodo } from '../TodoContext';
function SingleTodo({ task }) {
  const { getData } = useTodo();
  const [showModal, setShowModal] = useState(false);
  const deleteTask = async () => {
    try {
      const res = await fetch(`http://localhost:8080/todos/${task.id}`, {
        method: 'DELETE',
      });
      if (res.status === 201 || 200) {
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <li className='grid grid-cols-6 w-full p-1 items-center rounded-md my-2 shadow-sm bg-gray-50'>
      <p className='col-span-2'>{task.taskName}</p>
      <p className='col-span-1'>{task.priority}</p>
      <p className='col-span-1'>{task.deadline.slice(0, 10)}</p>
      <div className='col-span-2 justify-self-end pr-4'>
        <button
          className='text-sm border-2 px-3 py-1 rounded-full hover:bg-purple-300 border-purple-300 mr-3 ease-in-out duration-200'
          onClick={() => setShowModal(true)}
        >
          Edit
        </button>
        <button
          className='text-sm border-2 px-3 py-1 rounded-full hover:bg-red-300 border-red-300 ease-in-out duration-200'
          onClick={deleteTask}
        >
          Delete
        </button>
      </div>

      {showModal && (
        <Modal mode={'edit'} setShowModal={setShowModal} task={task} />
      )}
    </li>
  );
}

export default SingleTodo;
