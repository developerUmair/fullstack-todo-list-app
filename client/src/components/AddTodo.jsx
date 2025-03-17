import React from "react";

const AddTodo = ({ text, setText, addTodo }) => {
  return (
    <>
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="todo-input"
      />
      <button onClick={addTodo} className="add-task-btn">
        Add Task
      </button>
    </>
  );
};

export default AddTodo;
