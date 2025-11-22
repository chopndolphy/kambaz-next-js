"use client"
import { FaPencil } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import { FaPlusCircle } from "react-icons/fa";
import { FaTrash, } from "react-icons/fa6";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import * as client from "./client";
import { v4 as uuidv4 } from "uuid";
import {AxiosError } from 'axios';
interface Todo {
    id: number;
    title: string;
    completed: boolean;
    editing: boolean;
}
export default function WorkingWithArraysAsynchronously() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [todos, setTodos] = useState<Todo[]>([]);
    const editTodo = (todo: Todo) => {
        const updatedTodos = todos.map(
            (t) => t.id === todo.id ? { ...todo, editing: true } : t);
        setTodos(updatedTodos);
    };
    const updateTodo = async (todo: Todo) => {
        try {
            await client.updateTodo(todo);
            setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
        } catch (error) {
            const axiosError = error as AxiosError<{message: string }>;
            setErrorMessage(axiosError.response?.data?.message || 'An error occurred');
        }
    };
    const createNewTodo = async () => {
        const todos = await client.createNewTodo();
        setTodos(todos);
    };
    const postNewTodo = async () => {
        const newTodo = await client.postNewTodo({ id: parseInt(uuidv4()), title: "New Posted Todo", completed: false, editing: false });
        setTodos([...todos, newTodo]);
    };


    const fetchTodos = async () => {
        const todos = await client.fetchTodos();
        setTodos(todos);
    };
    const removeTodo = async (todo: Todo) => {
        const updatedTodos = await client.removeTodo(todo);
        setTodos(updatedTodos);
    };
    const deleteTodo = async (todo: Todo) => {
        try {
            await client.deleteTodo(todo);
            const newTodos = todos.filter((t) => t.id !== todo.id);
            setTodos(newTodos);
        } catch (error) {
            const axiosError = error as AxiosError<{message: string}>;
            console.log(error);
            setErrorMessage(axiosError.response?.data?.message || 'An error occurred');
        }
    };


    useEffect(() => {
        fetchTodos();
    }, []);
    return (
        <div id="wd-asynchronous-arrays">
            <h3>Working with Arrays Asynchronously</h3>
            {errorMessage && (<div id="wd-todo-error-message" className="alert alert-danger mb-2 mt-2">{errorMessage}</div>)}
            <h4>Todos <FaPlusCircle onClick={createNewTodo} className="text-success float-end fs-3" />
                <FaPlusCircle onClick={postNewTodo} className="text-primary float-end fs-3 me-3" id="wd-post-todo" />
            </h4>
            <ListGroup>
                {todos.map((todo) => (
                    <ListGroupItem key={todo.id}>
                        <FaPencil onClick={() => editTodo(todo)} className="text-primary float-end me-2 mt-1" />

                        <FaTrash onClick={() => removeTodo(todo)}
                            className="text-danger float-end mt-1 me-2" id="wd-remove-todo" />
                        <TiDelete onClick={() => deleteTodo(todo)} className="text-danger float-end me-2 fs-3" id="wd-delete-todo" />


                        <input type="checkbox" className="form-check-input me-2"
                            defaultChecked={todo.completed}
                            onChange={(e) => updateTodo({ ...todo, completed: e.target.checked })} />
                        {!todo.editing ? (todo.title) : (
                            <FormControl className="w-50 float-start" defaultValue={todo.title}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        updateTodo({ ...todo, editing: false });
                                    }
                                }}
                                onChange={(e) =>
                                    updateTodo({ ...todo, title: e.target.value })
                                }
                            />
                        )}

                        <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                            {todo.title} </span>
                    </ListGroupItem>
                ))}
            </ListGroup> <hr />
        </div>
    );
}

