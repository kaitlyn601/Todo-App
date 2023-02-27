import React from 'react';
import Modal from './Modal';
import { useState } from 'react';
import { useTodo } from '../TodoContext';

function Header() {
  const [showModal, setShowModal] = useState(false);
  const { setTasks, tasks, getData } = useTodo();

  const handleChange = (e) => {
    const priorityValue = {
      Low: 1,
      Medium: 2,
      High: 3,
    };
    switch (e.target.value) {
      case 'LowToHigh':
        setTasks([
          ...tasks.sort(
            (a, b) => priorityValue[a.priority] - priorityValue[b.priority],
          ),
        ]);
        break;
      case 'HighToLow':
        setTasks([
          ...tasks.sort(
            (a, b) => priorityValue[b.priority] - priorityValue[a.priority],
          ),
        ]);
        break;
      case 'AscendingDate':
        const AscendingDate = [
          ...tasks?.sort(
            (a, b) =>
              new Date(a.deadline.slice(0, 10)) -
              new Date(b.deadline.slice(0, 10)),
          ),
        ];
        setTasks(AscendingDate);

        break;
      case 'DescendingDate':
        const DescendingDate = [
          ...tasks?.sort(
            (a, b) =>
              new Date(b.deadline.slice(0, 10)) -
              new Date(a.deadline.slice(0, 10)),
          ),
        ];
        setTasks(DescendingDate);
        break;
      default:
    }
  };

  return (
    <div className='w-full flex justify-between '>
      <h1>To-Do List</h1>
      <div className='flex items-center'>
        <button
          className='py-2 px-3 rounded-sm bg-pink-100'
          onClick={() => setShowModal(true)}
        >
          Add New
        </button>
      </div>
      <div>
        <label htmlFor='SortBy'>SortBy</label>
        <select onChange={handleChange} name='' id='SortBy'>
          <option value='LowToHigh'>Ascending Priority</option>
          <option value='HighToLow'>Descending Priority</option>
          <option value='AscendingDate'>Ascending Date</option>
          <option value='DescendingDate'>Descending Date</option>
        </select>
      </div>
      {showModal && <Modal mode={'create'} setShowModal={setShowModal} />}
    </div>
  );
}

export default Header;
