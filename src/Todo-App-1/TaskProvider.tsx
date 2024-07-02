import { createContext, useContext, useState } from "react"

type TaskProviderType = {
    children: React.ReactNode
}
export type TaskType = {
    id: string
    task: string
    isCompleted: boolean
}

type TaskContextType = {
    data: TaskType[]
    handleAdd: (task: string) => void
    toggleChange: (id: string) => void
    handleDelete: (id: string) => void
    handleReset: () => void
}

//context api created------
export const TaskContext = createContext<TaskContextType | null>(null)

//main component-------------
const TaskProvider = ({ children }: TaskProviderType) => {
    const [data, setData] = useState<TaskType[]>([])

    //add data to localstorage--------------------------
    const handleAdd = (task: string) => {
        const tasks: TaskType = {
            id: Math.random() + "",
            task: task,
            isCompleted: false
        }

        let x: string | null = localStorage.getItem("all_task")

        if (x) {
            let previousTask = JSON.parse(x);
            let newTask = [...previousTask, tasks]
            localStorage.setItem("all_task", JSON.stringify((newTask)))
            setData(newTask);
        } else {
            localStorage.setItem("all_task", JSON.stringify([tasks]));
            setData([tasks]);
        }
        // let y = localStorage.getItem("all_task");
        // console.log(JSON.parse(y as string));
    }
    //toggle complete-status of task-------------------------
    const toggleChange = (id: string) => {
        const x: string | null = localStorage.getItem("all_task")
        const data: TaskType[] = JSON.parse(x as string)
        const newdata = data.map((ele) => ele.id === id ? { ...ele, isCompleted: !ele.isCompleted } : ele)
        localStorage.setItem("all_task", JSON.stringify(newdata))
        setData(newdata);
    }

    //delete task-------------------------------------------------
    const handleDelete = (id: string) => {
        const x: string | null = localStorage.getItem("all_task")
        const data: TaskType[] = JSON.parse(x as string)
        const newdata = data.filter((ele) => ele.id !== id)
        localStorage.setItem("all_task", JSON.stringify(newdata))
        setData(newdata);
    }
    // Reset task -------------------------------------------------
    const handleReset = () => {
        localStorage.removeItem("all_task")
        setData([]);
    }
    return (
        <TaskContext.Provider value={{ handleAdd, data, toggleChange, handleDelete, handleReset }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider

// custom hook to provide data-------------------
export const useTask = () => {
    const task = useContext(TaskContext)
    if (!task) {
        throw new Error("some os wrong")
    }
    return task;
}
