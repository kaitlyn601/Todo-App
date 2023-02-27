const router = require('express').Router();
const { Todo } = require('../db').models;

// GET /todos
router.get('/', async (req, res, next) => {
  try {
    res.send(await Todo.findAll());
  } catch (error) {
    next(error);
  }
});

// GET /todos/:id
router.get('/:id', async (req, res, next) => {
  try {
    res.send(await Todo.findByPk(req.params.id));
  } catch (error) {
    next(error);
  }
});

// POST /todos
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Todo.create(req.body));
  } catch (error) {
    next(error);
  }
});

// PUT /todos/:id
router.put('/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    res.send(await todo.update(req.body));
  } catch (error) {
    next(error);
  }
});

// DELETE /todos/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    await todo.destroy();
    res.send(todo);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
