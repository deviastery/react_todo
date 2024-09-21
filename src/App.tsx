import React, { useState } from "react";
import TodoList from "./components/TodoList";
import { todo } from "./models/todos";

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
    <div>
      <h1>My To-Do List</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Add new task..."
        />
        <button type="submit">Add</button>
      </form>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
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
