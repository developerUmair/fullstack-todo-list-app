import { Router } from "express";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controller.js";
import authorize from "../middleware/auth.middleware.js";

const todoRouter = Router();

todoRouter.get("/todos", authorize, getTodos);
todoRouter.post("/todo", authorize, addTodo);
todoRouter.put("/todo/:id", authorize, updateTodo);
todoRouter.delete("/todo/:id", authorize, deleteTodo);

export default todoRouter;
