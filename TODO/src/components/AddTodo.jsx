import { useState, useRef } from "react";
import { MdLibraryAdd } from "react-icons/md";

function AddTodo({ onNewItems }) {
  const todoNameElement = useRef();
  const todoDateElement = useRef();

  const handleAddButtonClicked = (event) => {
    event.preventDefault();
    const todoName = todoNameElement.current.value;
    const dueDate = todoDateElement.current.value;
    todoNameElement.current.value = "";
    todoDateElement.current.value = "";
    onNewItems(todoName, dueDate);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="container">
      <div className="row kg-row">
        <div className="col-6">
          <input
            type="text"
            ref={todoNameElement}
            placeholder="Enter TODO Here"
          />
        </div>
        <div className="col-4">
          <input type="date" ref={todoDateElement} min={today} />
        </div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-success kg-button"
            onClick={handleAddButtonClicked}
          >
            <MdLibraryAdd />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;
