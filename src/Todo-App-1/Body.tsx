import { useState } from "react";
import { useTask } from "./TaskProvider";
import { Button } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";

const Body = () => {
    const { handleAdd, handleReset } = useTask();
    const [value, setValue] = useState<string>("")
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAdd(value);
        setValue("");
    }
    return (
        <div className="bg-white p-10 mb-4 mx-auto w-fit rounded">
            <p className="text-center font-bold text-blue-500 text-xl mb-8">Todo App (React + Typescript)</p>
            <form onSubmit={handleSubmit} className="flex gap-2 items-center">
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="bg-slate-100 h-10 rounded px-2" />
                <Button variant="outlined" startIcon={<AddCircleOutline />} type="submit" disabled={!value}>
                    Add
                </Button>
            </form>
            <div className="w-full flex justify-center pt-4">
                <Button variant="outlined" onClick={handleReset}>Reset</Button>
            </div>
        </div>
    )
}

export default Body