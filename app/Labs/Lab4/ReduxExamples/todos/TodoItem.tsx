"use client";
import { ListGroupItem, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

type Todo = {
    id: string;
    title: string;
};

export default function TodoItem({ todo }: { todo: Todo }) {
    const dispatch = useDispatch();
    return (
        <ListGroupItem key={todo.id}>
            {todo.title}
            <span className="float-end">
                <Button onClick={() => dispatch(setTodo(todo))} id="wd-set-todo-click">
                    Edit
                </Button>
                <Button
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    id="wd-delete-todo-click"
                    variant="danger"
                >
                    Delete
                </Button>
            </span>
        </ListGroupItem>
    );
}
