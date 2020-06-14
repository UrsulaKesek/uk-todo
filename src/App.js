import React, { useState, useRef, useEffect } from "react";
import TodoList from "./components/TodoList";
import "./App.css";
import { useId } from "react-id-generator";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos]; //*copy of original todos*//
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos); //*toggles todo from complete to incomplete*//
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: useId, name: name, complete: false }];
    });
    console.log(name);
    todoNameRef.current.value = null;
  }
  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }
  return (
    <div className="list">
      <>
      <header className="top">
          <h1>To Do List</h1>
        </header>
        <TodoList className="list" todos={todos} toggleTodo={toggleTodo} />
        <button className="btn2" onClick={handleClearTodos}>Clear Todo</button>
        <input className="entry" ref={todoNameRef} type="text" />
        <button className="btn1" onClick={handleAddTodo}>Add Todo</button>
        <div className="backlog">{todos.filter((todo) => !todo.complete).length} left to do</div>
      </>
    </div>
  );
}

export default App;
