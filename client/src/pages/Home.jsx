import React, { useEffect, useState } from "react";
import apiClient from "../api/client";
import AddTodo from "../components/AddTodo";
import Todos from "../components/todos";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await apiClient.get("/todos");
        setTodos(res.data);
      } catch (err) {
        console.error("Error fetching todos:", err);
      }
    };

    fetchTodos();
  }, []);

  // Add todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await apiClient.post("/todo", { text });

      setTodos([res.data, ...todos]);
      setText("");
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  // Toggle complete
  const toggleComplete = async (id, completed) => {
    try {
      const res = await apiClient.put(`/todo/${id}`, { completed: !completed });

      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await apiClient.delete(`/todo/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  // Start editing todo
  const startEdit = (todo) => {
    setEditing(todo._id);
    setEditText(todo.text);
  };

  // Update todo
  const updateTodo = async (id) => {
    if (!editText.trim()) return;

    try {
      const res = await apiClient.put(`/todo/${id}`, { text: editText });

      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
      setEditing(null);
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };
  return (
    <div className="todo-container">
      <AddTodo text={text} setText={setText} addTodo={addTodo} />
      <Todos
        todos={todos}
        editing={editing}
        setEditing={setEditing}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        startEdit={startEdit}
        updateTodo={updateTodo}
        editText={editText}
        setEditText={setEditText}
      />
    </div>
  );
};

export default Home;
