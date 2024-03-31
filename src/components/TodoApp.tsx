import { useState, useRef, useEffect } from "react";
import "./TodoApp.css";
import crossIcon from '../cross_icon.png';
import { Task, TodoAppProps } from "../interfaces";

const STATUS_CONSTANTS = ["All", "Pending", "Completed"];

export default function TodoApp({ initialTasksList, theme }: TodoAppProps) {
    const [activeStatus, setActiveStatus] = useState(STATUS_CONSTANTS[0]);
    const [tasksList, setTasksList] = useState(initialTasksList);
    const [inputErr, setInputErr] = useState("");
    let inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasksList));
    }, [tasksList]);

    // on moving to different task status tab
    const onStatusTabChange = (status: string) => {
        setActiveStatus(status);
    };

    // on changing the status of the task
    const onTaskStatusChange = (taskId: number) => {
        let updatedTasks = tasksList.map((item: Task) => {
            if (item.id === taskId) {
                return {
                    ...item,
                    status: !item.status,
                };
            } else {
                return item;
            }
        });
        setTasksList([...updatedTasks]);
    };

    // adding a new task
    const addTask = () => {
        let maxId = Math.max(...tasksList.map((item: Task) => item.id), 0);
        let errorMsg = getError();
        if (errorMsg !== "") {
            setInputErr(errorMsg);
            return;
        } else {
            setInputErr("");
        }
        let newTask = {
            id: maxId + 1,
            label: inputRef?.current?.value || "",
            status: false,
        };
        setTasksList([...tasksList, newTask]);
        // Clear the input field value
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    // removing a task
    const removeTask = (taskId: number) => {
        let updatedList = tasksList.filter((item: Task) => item.id !== taskId);
        setTasksList([...updatedList]);
    }

    // handling the invalid input in new task
    const getError = () => {
        let currTask = inputRef?.current?.value || "";
        let labelsList = tasksList.map((item: Task) => item.label.toLowerCase());
        if (currTask === "") {
            return ("Task cannot be empty string");
        } else if (currTask.length > 200) {
            return ("Task cannot have more than 200 characters");
        } else if (labelsList.includes(currTask.toLowerCase())) {
            return ("Task is already added. Remove it to add again.");
        } else {
            return ("");
        }
    }

    // showing the task list
    const showTask = (item: Task) => {
        return (
            <div className={item.status ? "colored-task-box" : "task-box"} key={`task_${item.id}`}>
                <div className="task-input-box" key={`task_${item.id}`}>
                    <input
                        type="checkbox"
                        id={`taskLabel_${item.id}`}
                        name="label"
                        value={item.label}
                        checked={item.status}
                        onChange={() => onTaskStatusChange(item.id)}
                    />
                    <label htmlFor={`taskLabel_${item.id}`} className={item.status ? "strike-text" : ""}>{item.label}</label>
                </div>
                <div onClick={() => removeTask(item.id)} key={`task_${item.id}`}><img src={crossIcon} /></div>
            </div>
        );
    };

    return (
        <div className={`todo-tab-container ${theme}`}>
            <div className="heading-box">
                <h1>{"Todo App"}</h1>
            </div>
            <div className="status-box">
                {STATUS_CONSTANTS.map((item: string, index: number) => {
                    return (
                        <button
                            id={`${item}_${index}`}
                            className={
                                activeStatus === item ? "active-status-btn" : "status-btn"
                            }
                            onClick={() => onStatusTabChange(item)}
                        >
                            {item}
                        </button>
                    );
                })}
            </div>
            <div className="task-list-box">
                {tasksList.map((item: Task) => {
                    if (activeStatus === STATUS_CONSTANTS[0]) {
                        return showTask(item);
                    } else {
                        if (
                            (activeStatus === STATUS_CONSTANTS[1] && !item.status) ||
                            (activeStatus === STATUS_CONSTANTS[2] && item.status)
                        ) {
                            {
                                return showTask(item);
                            }
                        }
                    }
                })}
            </div>
            <div className="add-task-box">
                <input type="text" placeholder="Add todo" ref={inputRef} className="add-task-textbox"/>
                <button className="active-status-btn" onClick={addTask}>
                    {"Add"}
                </button>
            </div>
            <div className="err-box">
                <span className="err-text">{inputErr.length !== 0 ? <span>{inputErr}</span> : ""}</span>
            </div>
        </div>
    );
}
