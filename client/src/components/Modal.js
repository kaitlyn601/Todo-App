import React from 'react';
import { useState } from 'react';
import { useTodo } from '../TodoContext';
import moment from 'moment';

function Modal({ mode, setShowModal, task }) {
  const { getData } = useTodo();
  const editMode = mode === 'edit' ? true : false;
  const [data, setData] = useState({
    taskName: editMode ? task.taskName : null,
    deadline: editMode ? task.deadline.slice(0, 10) : null,
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
      console.log(res);
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
      console.log(res);
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
    <div className='absolute w-screen left-0 top-0 h-screen bg-pink-100/20 flex items-center justify-center'>
      <div className='w-96 rounded-sm bg-white shadow-black/10 p-10 '>
        <div className='flex justify-between'>
          <h3>Let's {mode} your task</h3>
          <button className='' onClick={() => setShowModal(false)}>
            X
          </button>
        </div>
        <form className='flex flex-col' action=''>
          <input
            className='m-3 py-3 px-4 rounded-xl border-zinc-900 border'
            required
            maxLength={50}
            placeholder='Enter task'
            name='taskName'
            value={data.taskName}
            type='text'
            onChange={handleChange}
          />
          <div className='flex'>
            <label for='deadline'>Deadline:</label>
            <input
              id='deadline'
              required
              min={moment(minDate).format('YYYY-MM-DD')}
              type='date'
              name='deadline'
              value={data.deadline}
              onChange={handleChange}
            />
          </div>

          <div className='flex '>
            <label for='priority'>Priority:</label>
            <select
              name='priority'
              value={data.priority}
              onChange={handleChange}
            >
              <option value='none' selected disabled hidden>
                Select option
              </option>
              <option value='Low'>Low</option>
              <option value='Medium'>Medium</option>
              <option value='High'>High</option>
            </select>
          </div>

          <input
            className={mode}
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
