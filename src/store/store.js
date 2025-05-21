// src/store/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, completed: true });
    },
    deleteTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    editTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todo = state.find(todo => todo.id === id);
      if (todo) {
        todo.text = newText;
      }
    }
  },
});

const filterSlice = createSlice({
  name: 'filter',
  initialState: 'all',
  reducers: {
    setFilter: (state, action) => action.payload,
  },
});

// ✅ Export all actions including editTodo
export const { addTodo, deleteTodo, toggleTodo, editTodo } = todosSlice.actions;
export const { setFilter } = filterSlice.actions;

// ✅ Create and export the store
const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    filter: filterSlice.reducer,
  },
});

export default store;
