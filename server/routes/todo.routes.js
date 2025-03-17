import { Router } from "express";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controller.js";

const todoRouter = Router();

todoRouter.get("/todos", getTodos);
todoRouter.post("/todo", addTodo);
todoRouter.put("/todo/:id", updateTodo);
todoRouter.delete("/todo/:id", deleteTodo);

export default todoRouter;
