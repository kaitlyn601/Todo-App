import { useContext, createContext, useState, useEffect } from 'react';

import React from 'react';

const TodoContext = createContext(undefined);

const useTodo = () => {
  const context = useContext(TodoContext);
  const [setTasks, getData, tasks] = context;
  return { setTasks, getData, tasks };
};

const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState(null);
  const getData = async () => {
    try {
      const res = await fetch('http://localhost:8080/todos');

      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => getData, []);
  const value = [setTasks, getData, tasks];
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
export { useTodo, TodoProvider };
