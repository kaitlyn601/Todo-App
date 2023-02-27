const db = require('./conn');
const Todo = require('./Todo');

const syncAndSeed = async () => {
  await db.sync({ force: true });

  await Todo.create({
    taskName: 'Buy cat food',
    deadline: '2023-03-07T08:00:00.000Z',
    priority: 'Low',
  });

  await Todo.create({
    taskName: 'Do Laundry',
    deadline: '2023-03-08T08:00:00.000Z',
    priority: 'Medium',
  });

  console.log(`
    Seeding successful!
  `);
};

module.exports = {
  db,
  syncAndSeed,
  models: {
    Todo,
  },
};
