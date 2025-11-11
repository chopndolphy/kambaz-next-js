"use client";
import { ListGroupItem, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";

type Todo = {
    id: string;
    title: string;
};
export default function TodoForm() {
    const { todo } = useSelector((state: RootState) => state.todosReducer);
    const dispatch = useDispatch();

    return (
        <ListGroupItem>
            <span className="float-start">
                <FormControl
                    value={todo.title}
                    onChange={(e) =>
                        dispatch(setTodo({ ...todo, title: e.target.value }))
                    }
                />
            </span>
            <span className="float-end">
                <Button
                    onClick={() => dispatch(updateTodo(todo))}
                    id="wd-update-todo-click"
                    variant="warning"
                >
                    Update
                </Button>
                <Button
                    onClick={() => dispatch(addTodo(todo))}
                    id="wd-add-todo-click"
                    variant="success"
                >
                    Add
                </Button>
            </span>
        </ListGroupItem>
    );
}
