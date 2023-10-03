import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import "./TodoList.css";
import { useState } from "react";
function TodoList({ item }) {
  const [editData, setEditData] = useState(false);
  const { todoItems, setTodoItems } = useContext(DataContext);
  const [changeData, setChangeData] = useState("");
  const [completed, setCompleted] = useState(false);
  const editHandler = (id) => {
    setEditData(!editData);
  };

  const completeTaskHandler = (id) => {
    let newData = todoItems.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setTodoItems(newData);
  };

  const saveEditedData = (id) => {
    if (changeData === "") {
      alert("Please do make change on data ....");
      return;
    }
    let newData = todoItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          todoItem: changeData,
          isCompleted: item.isCompleted ? false : item.isCompleted,
        };
      }
      return item;
    });
    setChangeData("");
    setTodoItems(newData);
    setEditData(false);
  };

  const deleteHandler = (id) => {
    setTodoItems(todoItems.filter((item) => item.id !== id));
  };

  return (
    <div className="todo-item">
      {editData ? (
        <div className="edit">
          <input
            type="text"
            defaultValue={item.todoItem}
            onChange={(e) => setChangeData(e.target.value)}
          />
          <button
            onClick={() => saveEditedData(item.id)}
            className="save-button"
          >
            Save
          </button>
          <button onClick={() => setEditData(false)} className="cancel-button">
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div
            className={item.isCompleted ? "completed" : "todolist"}
            onClick={() => completeTaskHandler(item.id)}
          >
            {item.todoItem}
          </div>
          <img
            src="./images/image7.png"
            alt=""
            className="edit-image"
            onClick={editHandler}
          />
          <img
            src="./images/image9.png"
            alt=""
            className="delete-image"
            onClick={() => deleteHandler(item.id)}
          />
        </>
      )}
    </div>
  );
}

export default TodoList;
