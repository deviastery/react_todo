import TodoItem from "./TodoItem";
import { todo } from "../models/todos";

type Props = {
  todos: todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

const TodoList = ({ todos, toggleTodo, deleteTodo }: Props) => {
  return (
    <div className="py-1">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
