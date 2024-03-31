import { useState, useEffect } from 'react';
import TodoApp from './components/TodoApp';
import CurrencyConverter from './components/CurrencyConverter';
import './App.css';
import { Task, CardType } from './interfaces';

function App() {
    const [activeApp, setActiveApp] = useState("todoApp");
    const [theme, setTheme] = useState("lightTheme");
    const [initialTasksList, setInitialTasksList] = useState<Task[]>([]);
    const [initialCardsList, setInitialCardsList] = useState<CardType[]>([]);

    useEffect(() => {
        const initialTasksListJSON = localStorage.getItem("tasks");
        if (initialTasksListJSON) {
            const parsedInitialTasksList = JSON.parse(initialTasksListJSON);
            setInitialTasksList(parsedInitialTasksList);
        }
        const initialCardsListJSON = localStorage.getItem("cards");
        if (initialCardsListJSON) {
            const parsedInitialCardsList = JSON.parse(initialCardsListJSON);
            setInitialCardsList(parsedInitialCardsList);
        }
    }, [activeApp]);

    const onToggle = () => {
        setTheme(theme === "lightTheme" ? "darkTheme" : "lightTheme");
    }
    const onTabClick = (tabName: string) => {
        setActiveApp(tabName);
    }

    return (
        <div className="main-container">
            <div className="nav-container">
                <ul>
                    <li onClick={() => onTabClick("todoApp")}>
                        {"Todo App"}
                    </li>
                    <li onClick={() => onTabClick("currencyConverter")}>
                        {"Currency Converter"}
                    </li>
                    <li onClick={onToggle}>
                        {"Toggle"}
                    </li>
                </ul>
            </div>
            <div className={activeApp === "todoApp" ? "todo-app-container" : `cc-app-container ${theme}-cc`}>
                {activeApp === "todoApp" ?
                <TodoApp initialTasksList={initialTasksList} theme={`${theme}-todo`}/> :
                (activeApp === "currencyConverter" ?
                    <div className="currency-converter-container">
                        <CurrencyConverter initialCardsList={initialCardsList} theme={""}/>
                    </div> : "")
                }
            </div>
        </div>
    );
}

export default App;
