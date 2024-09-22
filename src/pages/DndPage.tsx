import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import delete_icon from "../assets/img/WhiteDeleteIcon.svg";
import { todosColumns } from "../models/todos";
import { Link } from "react-router-dom";

const tasks = [
  { id: "1", content: "First task" },
  { id: "2", content: "Second task" },
  { id: "3", content: "Third task" },
  { id: "4", content: "Fourth task" },
  { id: "5", content: "Fifth task" },
];

const taskStatus: todosColumns = {
  requested: {
    name: "Requested",
    items: tasks,
  },
  toDo: {
    name: "To do",
    items: [],
  },
  inProgress: {
    name: "In Progress",
    items: [],
  },
  done: {
    name: "Done",
    items: [],
  },
};

type OnDragEndProps = {
  result: DropResult;
  columns: todosColumns;
  setColumns: React.Dispatch<React.SetStateAction<todosColumns>>;
};

const onDragEnd = ({ result, columns, setColumns }: OnDragEndProps) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const DndPage = () => {
  const [columns, setColumns] = useState(taskStatus);

  const deleteTodo = (taskId: string) => {
    setColumns((prevColumns) => {
      const updatedColumns = { ...prevColumns };
      for (const columnId in updatedColumns) {
        const column = updatedColumns[columnId];
        column.items = column.items.filter((item) => item.id !== taskId);
      }
      return updatedColumns;
    });
  };

  return (
    <div>
      <Link
        to="/todo"
        className="hover:text-gray-500 transition duration-150 ease-in-out"
      >
        Перейти на обычный To-Do
      </Link>
      <h1 className="text-center text-4xl font-bold underline m-4">
        To-Do Board
      </h1>
      <div className="flex justify-center h-full">
        <DragDropContext
          onDragEnd={(result) => onDragEnd({ result, columns, setColumns })}
        >
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <div key={columnId} className="flex flex-col items-center">
                <h2 className="text-center text-2xl">{column.name}</h2>
                <div className="m-2">
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="p-2 w-64 min-h-96 rounded-md"
                          style={{
                            background: snapshot.isDraggingOver
                              ? "#cbb8e0"
                              : "lightgrey",
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="flex items-center justify-between p-4 m-0 mb-2 min-h-16 rounded-md text-white"
                                      style={{
                                        backgroundColor: snapshot.isDragging
                                          ? "#362847"
                                          : "#644b83",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.content}
                                      <button
                                        onClick={() => deleteTodo(item.id)}
                                        className="ml-2 rounded-md font-medium hover:bg-gray-700 p-1 transition duration-150 ease-in-out"
                                      >
                                        <img
                                          src={delete_icon}
                                          alt="Delete"
                                          className="w-4 h-4"
                                        />
                                      </button>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export default DndPage;
