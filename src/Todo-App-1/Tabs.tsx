import { useEffect, useState } from "react"
import { TaskType, useTask } from "./TaskProvider"
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Task from "./Task";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        console.log(event);

    };
    //fetching data--------------------------------------
    const { data } = useTask()
    const [task, setTask] = useState<TaskType[] | []>([]);
    useEffect(() => {
        const x = localStorage.getItem("all_task");
        if (x) {
            const all_task = JSON.parse(x);
            setTask(all_task)
        } else {
            setTask([]);
        }
    }, [data])
    return (
        <Box sx={{ width: 'fit-content', margin: "auto" }}>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab label="All" {...a11yProps(0)} />
                    <Tab label="Incomplete" {...a11yProps(1)} />
                    <Tab label="Complete" {...a11yProps(2)} />
                </Tabs>
            </Box>


            <CustomTabPanel value={value} index={0}>
                {
                    task.length ?
                        task.map((ele) => {
                            return <div key={ele.id}><Task {...ele}></Task></div>
                        })
                        :
                        <p className="text-center pt-4 text-gray-500">No Items</p>
                }
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                {
                    task.filter(ele => !ele.isCompleted).length ?
                        task.map((ele) => {
                            return !ele.isCompleted && <div key={ele.id}><Task {...ele}></Task></div>
                        })
                        :
                        <p className="text-center pt-4 text-gray-500">No Items</p>
                }
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                {
                    task.filter(ele => ele.isCompleted).length ?
                        task.map((ele) => {
                            return ele.isCompleted && <div key={ele.id}><Task {...ele}></Task></div>
                        })
                        :
                        <p className="text-center pt-4 text-gray-500">No Items</p>
                }
            </CustomTabPanel>
        </Box>
    );
}
