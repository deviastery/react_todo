type todo = {
  id: number;
  completed: boolean;
  title: string;
};

type Column = {
  name: string;
  items: {
    id: string;
    content: string;
  }[];
};

type todosColumns = {
  requested: Column;
  toDo: Column;
  inProgress: Column;
  done: Column;
  [key: string]: Column;
};

export type { todo, todosColumns };
