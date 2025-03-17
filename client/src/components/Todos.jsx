import React from "react";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";

const Todos = ({
  todos,
  editing,
  editText,
  setEditText,
  updateTodo,
  setEditing,
  toggleComplete,
  startEdit,
  deleteTodo,
}) => {
  return (
    <>
      {todos?.length === 0 ? (
        <h3 className="no-tasks-message">No tasks yet! Add one above.</h3>
      ) : (
        todos?.map((todo) => (
          <div key={todo._id} className="todo-item">
            {editing === todo._id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="edit-input"
                />
                <div className="saveBtnContainer">
                  <button
                    onClick={() => updateTodo(todo._id)}
                    className="save-btn"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div
                  className="todo-text"
                  onClick={() => toggleComplete(todo._id, todo.completed)}
                >
                  {todo.completed && <FaCheck className="check-icon" />}
                  <span className={todo.completed ? "completed-task" : ""}>
                    {todo.text}
                  </span>
                </div>
                <div className="todo-actions">
                  <button onClick={() => startEdit(todo)} className="edit-btn">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="delete-btn"
                  >
                    <FaTrash />
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </>
  );
};

export default Todos;
