import React, { useState } from "react";
import TodoList from "../components/TodoList";
import { todo } from "../models/todos";

const App = () => {
  const [todos, setTodos] = useState<todo[]>([
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Read a book", completed: false },
  ]);

  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [filter, setFilter] = useState("All tasks");

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTodoTitle) return;

    const newTodoItem = {
      id: Date.now(),
      title: newTodoTitle,
      completed: false,
    };

    setTodos([...todos, newTodoItem]);
    setNewTodoTitle("");
  };

  const filteredTodos =
    filter === "All tasks"
      ? todos
      : filter === "Only completed"
      ? todos.filter((todo) => todo.completed)
      : todos.filter((todo) => !todo.completed);

  return (
    <div className="bg-white rounded-xl shadow-lg w-1/2 mx-auto p-5 m-20">
      <h1 className="text-center text-4xl font-bold underline">
        My To-Do List
      </h1>
      <form onSubmit={addTodo} className="m-3 flex justify-between">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Add new task..."
          className="p-1 focus:outline-none"
        />
        <button
          type="submit"
          className="px-6 py-2 rounded-md bg-gray-300 text-white font-medium hover:bg-gray-400"
        >
          Add
        </button>
      </form>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full"
      >
        <option value="All tasks">All tasks</option>
        <option value="Only completed">Only completed</option>
        <option value="Only uncompleted">Only uncompleted</option>
      </select>
      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default App;
