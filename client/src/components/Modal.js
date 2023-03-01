import React from 'react';
import { useState } from 'react';
import { useTodo } from '../TodoContext';
import moment from 'moment';

function Modal({ mode, setShowModal, task }) {
  const { getData } = useTodo();
  const editMode = mode === 'edit' ? true : false;
  const [data, setData] = useState({
    taskName: editMode ? task.taskName : '',
    deadline: editMode
      ? task.deadline.slice(0, 10)
      : moment(new Date()).format('YYYY-MM-DD'),
    priority: editMode ? task.priority : 'Low',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const postData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.status === 200 || 201) {
        console.log('added task');
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const editData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/todos/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.status === 200 || 201) {
        console.log('edited task');
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const minDate = new Date();
  return (
    <div className='absolute w-screen left-0 top-0 h-screen  flex items-center justify-center shadow-lg rounded-sm bg-black/30'>
      <div className='w-3/5 lg:w-2/5 rounded-md bg-white shadow-lg p-8 '>
        <div className='flex justify-between'>
          <h3 className='font-bold text-xl text-gray-900 mb-2'>
            Let's {mode} your task
          </h3>
          <button
            className='font-bold text-lg hover:text-red-500'
            onClick={() => setShowModal(false)}
          >
            X
          </button>
        </div>
        <form className='flex flex-col gap-3' action=''>
          <input
            type='text'
            maxLength={50}
            placeholder='Enter your task'
            name='taskName'
            required
            value={data.taskName}
            onChange={handleChange}
            className='p-2 mt-3 border-2 focus:border-purple-400 focus:outline-none focus:ring-purple-400 rounded-lg border-gray-300'
          />
          <label
            className='block text-sm font-medium text-gray-700'
            htmlFor='deadline'
          >
            Deadline
          </label>
          <input
            id='deadline'
            type='date'
            min={moment(minDate).format('YYYY-MM-DD')}
            name='deadline'
            value={data.deadline}
            onChange={handleChange}
            required
            className=' block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-purple-400 focus:outline-none focus:ring-purple-400 sm:text-sm'
          />

          <label
            className='block text-sm font-medium text-gray-700'
            htmlFor='priority'
          >
            Priority
          </label>
          <select
            id='priority'
            className='block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-purple-400 focus:outline-none focus:ring-purple-400 sm:text-sm'
            name='priority'
            value={data.priority}
            onChange={handleChange}
          >
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
          </select>

          <input
            className='self-end w-20 text-sm border-2 px-3 py-1 rounded-md hover:bg-purple-300 border-purple-200 bg-purple-200 mr-3 ease-in-out duration-200'
            type='submit'
            onChange={handleChange}
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
}

export default Modal;
