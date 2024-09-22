import { todo } from "../models/todos";
import delete_icon from "../assets/img/BlackDeleteIcon.svg";

type Props = {
  todo: todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

const TodoItem = ({ todo, toggleTodo, deleteTodo }: Props) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="w-4 h-4"
        />
        <span>{todo.title}</span>
      </div>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="ml-2 rounded-md text-white font-medium hover:bg-gray-300 p-1 transition duration-150 ease-in-out"
      >
        <img src={delete_icon} alt="Delete" className="w-4 h-4" />
      </button>
    </div>
  );
};
export default TodoItem;
