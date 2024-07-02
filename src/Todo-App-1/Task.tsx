import { Button, Stack } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskType, useTask } from "./TaskProvider";


const Task = ({ id, task, isCompleted }: TaskType) => {
    const { toggleChange, handleDelete } = useTask()
    // const toggleChange = (id: string) => {
    //     const x: string | null = localStorage.getItem("all_task")
    //     const data = JSON.parse(x as string)
    //     const newdata = data.map((ele: TaskType) => ele.id === id ? { ...ele, isCompleted: !ele.isCompleted } : ele)
    //     localStorage.setItem("all_task", JSON.stringify(newdata))
    //     setData(newdata);
    // }
    return (
        <div className="flex justify-between items-center bg-slate-100 my-2 p-4 min-h-[70px] rounded-md min-w-96 max-w-[450px] mx-auto">
            <Stack direction="row" spacing={2} alignItems="center">
                <input type="checkbox" checked={isCompleted} onChange={() => toggleChange(id)} />
                <div>
                    {
                        isCompleted ? <del className="text-red-400"><p className="italic">{task}</p></del> : <p>{task}</p>
                    }
                </div>
            </Stack>
            {
                isCompleted && <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(id)}>
                    Delete
                </Button>
            }
        </div>
    )
}

export default Task