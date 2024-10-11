import React, { useState, useEffect } from 'react';
import '../styles/Register.css';

const Notes = () => {
    const [newTodo, setNewTodo] = useState('');
    const [todoItems, setTodoItems] = useState([]);

    useEffect(() => {
        const storedTodos = localStorage.getItem('todoItems');
        if (storedTodos && storedTodos !== "[]") {
            setTodoItems(JSON.parse(storedTodos));
        }
    }, []);

    useEffect(() => {
        if (todoItems.length > 0) {
            localStorage.setItem('todoItems', JSON.stringify(todoItems));
        }
    }, [todoItems]);

    const handleInputChange = (e) => {
        setNewTodo(e.target.value);
    };

    const addTodo = () => {
        const trimmedTodo = newTodo.trim();
        if (trimmedTodo) {
            setTodoItems([...todoItems, trimmedTodo]); // Add new todo to state
            setNewTodo(''); // Clear the input after adding
        }
    };

    const deleteTodo = (taskText) => {
        const updatedTodos = todoItems.filter(item => item !== taskText);
        setTodoItems(updatedTodos); // Update state and trigger localStorage sync
    };

    return (
        <div className="register-container register-wrapper" style={{ minWidth: "900px", padding: "0"}}>
            <h1>TODO List</h1>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <input
                    id="addTODO"
                    type="text"
                    maxLength="69"
                    value={newTodo}
                    onChange={handleInputChange}
                    placeholder="Add a new task"
                />
                <button onClick={addTodo}>Add new</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}} id="todo-list">
                {todoItems.map((todo, index) => (
                    <div style={{ display: 'flex', flexDirection: 'row', padding: '5px' }} key={index} className="todo-item">
                        <div>{todo}</div>
                        <button onClick={() => deleteTodo(todo)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notes;
