import React from 'react';
import Modal from './Modal';
import { useState } from 'react';
import { useTodo } from '../TodoContext';

function Header() {
  const [showModal, setShowModal] = useState(false);
  const { setTasks, tasks } = useTodo();

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
    <div className='flex-col flex w-full '>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-bold'>Todo List</h1>
        <button
          className='px-3 py-2 rounded-md bg-purple-300 text-sm'
          onClick={() => setShowModal(true)}
        >
          Add New
        </button>
      </div>
      <div className='flex justify-end my-4'>
        <select onChange={handleChange} name='' id='SortBy'>
          <option value='none' selected disabled>
            Sort By
          </option>
          <option value='LowToHigh'>Ascending Priority</option>
          <option value='HighToLow'>Descending Priority</option>
          <option value='AscendingDate'>Ascending Deadline</option>
          <option value='DescendingDate'>Descending Deadline</option>
        </select>
      </div>
      {showModal && <Modal mode={'create'} setShowModal={setShowModal} />}
    </div>
  );
}

export default Header;
