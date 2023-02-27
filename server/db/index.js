const db = require('./conn');
const Todo = require('./Todo');

const syncAndSeed = async () => {
  await db.sync({ force: true });

  await Todo.create({
    taskName: 'Buy dog food',
    deadline: '2023-02-07T08:00:00.000Z',
    priority: 'Low',
  });

  await Todo.create({
    taskName: 'Take over world',
    deadline: '2023-02-08T08:00:00.000Z',
    priority: 'High',
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
