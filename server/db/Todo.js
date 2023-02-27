const Sequelize = require('sequelize');
const conn = require('./conn');

const Todo = conn.define('todos', {
  taskName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  deadline: {
    type: Sequelize.DATE,
  },
  priority: {
    type: Sequelize.ENUM('Low', 'Medium', 'High'),
    defaultValue: 'Low',
  },
});

module.exports = Todo;
