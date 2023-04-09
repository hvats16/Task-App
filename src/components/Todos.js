import React, { useState, useEffect } from "react";
import "../CSS/Todo.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { Dropdown } from "react-bootstrap";

function Todos() {
  const [allTodos, setAllTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const handleAddNewToDo = () => {
    if (newTodoTitle && newDescription && dueDate && !toggleSubmit) {
      setAllTodos(
        allTodos.map((elem, index) => {
          if (index === isEditItem) {
            return {
              ...elem,
              title: newTodoTitle,
              description: newDescription,
              date: dueDate,
            };
          }
          return elem;
        })
      );
      // let updatedTodoArr = [...allTodos];
      // setAllTodos(updatedTodoArr);
      // localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
      // setIsEditItem(null);
      console.log(allTodos);
      setNewDescription("");
      setNewTodoTitle("");
      setDueDate("");
      setToggleSubmit(true);
      // console.log(editTodo);
    } else {
      let newToDoObj = {
        title: newTodoTitle,
        description: newDescription,
        date: dueDate,
      };
      // console.log(newToDoObj);
      let updatedTodoArr = [...allTodos];
      updatedTodoArr.push(newToDoObj);
      // console.log (updatedTodoArr);
      setAllTodos(updatedTodoArr);
      localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
      setNewDescription("");
      setNewTodoTitle("");
      setDueDate("");
    }
  };

  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedToDos = JSON.parse(
      localStorage.getItem("completedTodos")
    );
    if (savedTodos) {
      setAllTodos(savedTodos);
    }

    if (savedCompletedToDos) {
      setCompletedTodos(savedCompletedToDos);
    }
  }, []);

  const handleToDoDelete = (index) => {
    let reducedTodos = [...allTodos];
    reducedTodos.splice(index, 1);
    // console.log (index);

    // console.log (reducedTodos);
    localStorage.setItem("todolist", JSON.stringify(reducedTodos));
    setAllTodos(reducedTodos);
  };

  const handleCompletedTodoDelete = (index) => {
    let reducedCompletedTodos = [...completedTodos];
    reducedCompletedTodos.splice(index, 1);
    // console.log (reducedCompletedTodos);
    localStorage.setItem(
      "completedTodos",
      JSON.stringify(reducedCompletedTodos)
    );
    setCompletedTodos(reducedCompletedTodos);
  };
  const handleEdit = (title, id) => {
    let editItem = allTodos.find((elem, index) => {
      return index === id;
    });
    // console.log(editItem);
    setToggleSubmit(false);
    // let filteredTodo = allTodos.filter((todo) => todo.title === title);
    // setToggleSubmit(false);
    setNewTodoTitle(editItem.title);
    setNewDescription(editItem.description);
    setDueDate(editItem.date);
    setIsEditItem(id);
  };

  const handleComplete = (index) => {
    const date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var hh = date.getHours();
    var minutes = date.getMinutes();
    var ss = date.getSeconds();
    var finalDate =
      dd + "-" + mm + "-" + yyyy + " at " + hh + ":" + minutes + ":" + ss;

    let filteredTodo = {
      ...allTodos[index],
      completedOn: finalDate,
    };

    // console.log (filteredTodo);

    let updatedCompletedList = [...completedTodos, filteredTodo];
    // console.log(updatedCompletedList);
    setCompletedTodos(updatedCompletedList);
    localStorage.setItem(
      "completedTodos",
      JSON.stringify(updatedCompletedList)
    );
    // console.log (index);

    handleToDoDelete(index);
  };

  const sortByOldest = () => {
    let sortedTodos = [...allTodos];
    sortedTodos.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    // console.log (sortedTodos);
    localStorage.setItem("todolist", JSON.stringify(sortedTodos));
    setAllTodos(sortedTodos);
  };
  const sortByLatest = () => {
    let sortedTodos = [...allTodos];
    sortedTodos.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    // console.log (sortedTodos);
    localStorage.setItem("todolist", JSON.stringify(sortedTodos));
    setAllTodos(sortedTodos);
  };

  return (
    <div className="todo">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title:</label>
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="What's the title of your To Do?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description:</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the description of your To Do?"
            />
          </div>
          <div className="todo-input-item">
            <label>Due Date:</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="What's the description of your To Do?"
            />
          </div>
          <div className="todo-input-item">
            {toggleSubmit ? (
              <button
                className="primary-btn"
                type="button"
                onClick={handleAddNewToDo}
                disabled={
                  newTodoTitle === "" || newDescription === "" || dueDate === ""
                }
              >
                Add
              </button>
            ) : (
              <button
                className="primary-btn"
                type="button"
                onClick={handleAddNewToDo}
                disabled={
                  newTodoTitle === "" || newDescription === "" || dueDate === ""
                }
              >
                Edit
              </button>
            )}
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${
              isCompletedScreen === false && "active"
            }`}
            onClick={() => setIsCompletedScreen(false)}
          >
            To Do
          </button>
          <button
            className={`secondaryBtn ${isCompletedScreen === true && "active"}`}
            onClick={() => setIsCompletedScreen(true)}
          >
            Completed
          </button>
          <Dropdown style={{ paddingTop: "10px" }}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Sort by DueDate
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={sortByLatest}>Latest</Dropdown.Item>
              <Dropdown.Item onClick={sortByOldest}>Oldest</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="todo-list">
          {isCompletedScreen === false &&
            allTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>Title: {item.title}</h3>
                  <p>Description: {item.description}</p>
                  <p>Due-Date: {item.date}</p>
                </div>
                <div>
                  <FiEdit
                    className="edit-icon"
                    title="edit"
                    onClick={() => handleEdit(item.title, index)}
                  />

                  <AiOutlineDelete
                    title="Delete?"
                    className="icon"
                    onClick={() => handleToDoDelete(index)}
                  />
                  <BsCheckLg
                    title="Completed?"
                    className=" check-icon"
                    onClick={() => handleComplete(index)}
                  />
                </div>
              </div>
            ))}

          {isCompletedScreen === true &&
            completedTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>
                    {" "}
                    <i>Completed at: {item.completedOn}</i>
                  </p>
                </div>
                <div>
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleCompletedTodoDelete(index)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Todos;
