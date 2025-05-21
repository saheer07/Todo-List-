import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, toggleTodo, setFilter, editTodo } from "./store/store";

export default function App() {
  const todos = useSelector((state) => state.todos);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAdd = () => {
    if (input.trim() !== "") {
      dispatch(addTodo(input));
      setInput("");
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  return (
    <div className="w-full  h-screen  p-8 bg-gradient-to-br from-gray-900 to-black text-whitel shadow-2xl">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-400 tracking-wide">
        📝 Todo List
      </h1>

      <div className="flex mb-6">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-md font-semibold transition duration-200"
        >
          Add
        </button>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => dispatch(setFilter(f))}
            disabled={filter === f}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filter === f
                ? "bg-blue-600 text-white shadow-inner cursor-default"
                : "bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <ul className="space-y-4">
        {filteredTodos.length === 0 && (
          <p className="text-center text-gray-500 italic">No todos here!</p>
        )}
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-4 bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
                className="w-5 h-5 accent-blue-500"
              />

              {editingId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="ml-4 px-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(editTodo({ id: todo.id, newText: editText }));
                        setEditingId(null);
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      dispatch(editTodo({ id: todo.id, newText: editText }));
                      setEditingId(null);
                    }}
                    className="ml-2 px-3 py-1 bg-blue-600 hover:bg-blue-400 rounded-md text-white text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="ml-2 px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded-md text-white text-sm"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <span
                  onClick={() => dispatch(toggleTodo(todo.id))}
                  className={`ml-4 text-lg cursor-pointer select-none ${
                    todo.completed ? "line-through text-gray-500" : "text-gray-100"
                  }`}
                >
                  {todo.text}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setEditingId(todo.id);
                  setEditText(todo.text);
                }}
                className="bg-blue-600 hover:bg-blue-400 text-white px-6 py-3 rounded font-semibold transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="bg-red-600 hover:bg-red-400 text-white px-6 py-3 rounded font-semibold transition duration-200"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
