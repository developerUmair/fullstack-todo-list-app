import Todo from "../models/todo.model.js";

export const getTodos = async (req, res, next) => {
  try {
    let todos;
    if (req.user.isAdmin) {
      todos = await Todo.find().populate("user", "name email").sort({ createdAt: -1 });
    } else {
      todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
    }
    res.json(todos);
  } catch (error) {
    next(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const addTodo = async (req, res, next) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
      user: req.user._id,
    });

    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    next(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (!req.user.isAdmin && todo.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unathorized can't update this todo" });
    }

    if (req.body.text !== undefined) {
      todo.text = req.body.text;
    }

    if (req.body.completed !== undefined) {
      todo.completed = req.body.completed;
    }

    await todo.save();
    res.json(todo);
  } catch (err) {
    next(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (!req.user.isAdmin && todo.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized: Cannot delete this todo" });
    }

    await todo.deleteOne();
    res.json({ message: "Todo removed" });
  } catch (err) {
    next(err);
    res.status(500).json({ message: "Server Error" });
  }
};
