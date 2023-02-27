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
    <li className='w-full flex justify-between my-2'>
      <div>
        <p>{task.taskName}</p>
        <p>{task.priority}</p>
        <p>{task.deadline.slice(0, 10)}</p>
      </div>
      <div className=''>
        <button onClick={() => setShowModal(true)}>EDIT</button>
        <button onClick={deleteTask}>DELETE</button>
      </div>
      {showModal && (
        <Modal mode={'edit'} setShowModal={setShowModal} task={task} />
      )}
    </li>
  );
}

export default SingleTodo;
