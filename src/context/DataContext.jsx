import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();
export const DataContextProvider = ({ children }) => {
  const [inputData, setInputData] = useState("");
  const LOCAL_STORAGE_KEY = "items";
  const [todoItems, setTodoItems] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
  );

  const addTodoHandler = () => {
    let newItem = { id: Date.now(), todoItem: inputData, isCompleted: false };

    if (inputData === "") {
      alert("Please enter a valid todo item");
      return;
    }
    setTodoItems((prev) => {
      return [...prev, newItem];
    });
    setInputData("");
  };

  const getInputDataHandler = (e) => {
    setInputData(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(todoItems));
  }, [todoItems]);

  return (
    <DataContext.Provider
      value={{
        getInputDataHandler,
        addTodoHandler,
        todoItems,
        inputData,
        setTodoItems,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
