import React from "react";
import { todo } from "../models/todos";
import delete_icon from "../assets/img/DeleteIcon.svg";

type Props = {
  todo: todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

const TodoItem = ({ todo, toggleTodo, deleteTodo }: Props) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span>{todo.title}</span>
      <button onClick={() => deleteTodo(todo.id)}>
        <img src={delete_icon} alt="Delete" />
      </button>
    </div>
  );
};
export default TodoItem;
