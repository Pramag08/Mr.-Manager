import React, { useMemo, useState } from "react";
import CircleIcon from '@mui/icons-material/Circle';
import ListIcon from '@mui/icons-material/List';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Checkbox from '@mui/material/Checkbox';
import CachedIcon from '@mui/icons-material/Cached';
import { useContextApp } from "@/app/Pages/ContextApp";
import { Task } from "@/app/Components/Data/AllProjects";
import { useEffect } from "react";
import { get } from "http";
import { getIconComponent } from "@/app/Components/Functions/IconAction";
import { sortTasks } from "@/app/Components/Functions/sortingFunctions";

// function TasksList(){
//     return(
//         <div className="ml-12 mt-11 flex-col flex gap-4  max-sm:ml-0">   
//             <Tabs/>
//             <div className="flex flex-col gap-6 mt-8 ">
//                 <SingleTask />
//                 <SingleTask />
//             </div>
//         </div>
//     );
// }
const TasksList=()=>{
        const{
            allProjectsObject:{allProjects, setAllProjects},
            chosenProjectObject:{chosenProject, setChosenProject},
            tabsOptionsObject:{tabsOptions,setTabsOptions},
            allTasksObject:{allTasks, setAllTasks},
            sortingOptionObject:{sortingOptions},
        }=useContextApp();

        // toggle task status (Completed <-> In Progress)
        function toggleTaskStatus(taskId: string) {
            // update global allTasks
            const updatedAllTasks = allTasks.map(t =>
                t.id === taskId ? { ...t, status: (t.status === 'Completed' ? 'In Progress' : 'Completed') as 'In Progress' | 'Completed' } : t
            );
            setAllTasks(updatedAllTasks);

            // update allProjects tasks
            const updatedProjects = allProjects.map(proj => ({
                ...proj,
                tasks: proj.tasks.map(t => t.id === taskId ? { ...t, status: (t.status === 'Completed' ? 'In Progress' : 'Completed') as 'In Progress' | 'Completed' } : t)
            }));
            setAllProjects(updatedProjects);

            // if chosenProject is the one containing the task, update it too
            if (chosenProject) {
                const contains = chosenProject.tasks.some(t => t.id === taskId);
                if (contains) {
                    const updatedChosen = { ...chosenProject, tasks: chosenProject.tasks.map(t => t.id === taskId ? { ...t, status: (t.status === 'Completed' ? 'In Progress' : 'Completed') as 'In Progress' | 'Completed' } : t) };
                    setChosenProject(updatedChosen);
                }
            }
        }


        // Filter tasks based on chosen project and status
    const filteredTasks = useMemo(() => {
        let tasks = allTasks;

        // Filter by project
        if (chosenProject) {
            tasks = tasks.filter((task) => task.projectName === chosenProject.title);
        }

        // Filter by status if "Completed" tab is selected
        if (tabsOptions[1].isSelected) {
            tasks = tasks.filter((task) => task.status === "Completed");
        } else {
            tasks = tasks.filter((task) => task.status === "In Progress");
        }

        // Apply sorting
        const currentSortingOption = sortingOptions
            .flatMap((category) => category.options)
            .find((option) => option.selected);
        
        if (currentSortingOption) {
            tasks = sortTasks(tasks, currentSortingOption.value);
        }

        return tasks;
    }, [allTasks, chosenProject, tabsOptions, sortingOptions]);
    return (
        <div className="ml-12 max-sm:ml-0 mt-11 flex-col flex gap-4">
            <Tabs />
            <div className="flex flex-col w-full gap-4">
            {filteredTasks.map((singleTask) => (
                <SingleTask key={singleTask.id} task={singleTask} onToggle={() => toggleTaskStatus(singleTask.id)} />
            ))}
            </div>
        </div>
    );
}
export default TasksList;
function Tabs(){
    const{
        allProjectsObject:{allProjects},
        chosenProjectObject:{chosenProject},
        tabsOptionsObject:{tabsOptions,setTabsOptions},
    }=useContextApp();
        function countOnGoingTasks() {
            //If chosen project is not null, count the tasks are in progress by using the
            //reduce method based on its status
            if (chosenProject) {
                return chosenProject.tasks.reduce((accTask, task) => {
                    return accTask + (task.status === "In Progress" ? 1 : 0);
                }, 0);
            }

            //otherwise count the total of all tasks in the all Projects
            return allProjects.reduce((accProjects, project) => {
                return (
                    accProjects +
                    project.tasks.reduce((accTasks, task) => {
                        return accTasks + (task.status === "In Progress" ? 1 : 0);
                    }, 0)
                );
            }, 0);
        }
        function completedTasks() {
            //If chosen project is selected, calculate the difference between the on going tasks
            // and the total of all tasks in this project
            if (chosenProject) {
                return chosenProject.tasks.length - countOnGoingTasks();
            }

            //The same for all projects, but first we need to count all the tasks
            //in all projects, that's why I'm using reduce function
            const totalTasksInAllProjects = allProjects.reduce((acc, project) => {
                return acc + project.tasks.length;
            }, 0);

            //if the chosen project is still null, return the completed tasks of all projects
            return totalTasksInAllProjects - countOnGoingTasks();
        }
        function switchTabs(index: number) {
            setTabsOptions((prevState) =>
                prevState.map((tab, i) => ({
                ...tab,
                isSelected: index === i,
                }))
            );
        }
    return (
        <div className="flex items-center gap-6 ml-3 mt-8 mb-5">
            {tabsOptions.map((singleTabOption, index) => (
            <div
                key={index}
                onClick={() => switchTabs(index)}
                className={`flex gap-2 cursor-pointer ${
                singleTabOption.isSelected
                    ? "text-orange-600 font-semibold"
                    : "text-slate-300"
                }`}
            >
                <span>{singleTabOption.name}</span>
                <span
                className={`${
                    singleTabOption.isSelected ? "bg-orange-600" : "bg-slate-300"
                } text-white px-2 rounded-md max-[420px]:hidden`}
                >
                {singleTabOption.id === 1 ? countOnGoingTasks() : completedTasks()}
                </span>
            </div>
            ))}
        </div>
        );
}
function SingleTask( {task, onToggle}: {task:Task, onToggle?: ()=>void} ){
    const {
        selectedTaskObject: { setSelectedTask },
        openTasksWindowObject: { setOpenTasksWindow },
        allProjectsObject: { allProjects, setAllProjects },
        allTasksObject: { allTasks, setAllTasks },
        chosenProjectObject: { chosenProject, setChosenProject },
        } = useContextApp();

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(task.status === "Completed");
    }, [task]);

    function updateStatus() {
  const newStatus: "In Progress" | "Completed" = checked ? "In Progress" : "Completed";

  // Update allProjects
  const updatedProjects = allProjects.map((project) => ({
    ...project,
    tasks: project.tasks.map((t) =>
      t.id === task.id ? { ...t, status: newStatus } : t
    ),
  }));

  // Update allTasks
  const updatedTasks = allTasks.map((t) =>
    t.id === task.id ? { ...t, status: newStatus } : t
  );

  if (chosenProject) {
    const updateChosenProject = {
      ...chosenProject,
      tasks: chosenProject.tasks.map((t) => {
        if (task.id === t.id) {
          return { ...t, status: newStatus };
        }
        return t;
      }),
    };
    setChosenProject(updateChosenProject);
  }

  // Update state
  setAllProjects(updatedProjects);
  setAllTasks(updatedTasks);
  setChecked(!checked);
}
    return(
        <div className="flex gap-1 items-center">
      <Checkbox
        sx={{
          color: "orangered",
          "&.Mui-checked": {
            color: "orange",
          },
        }}
        onClick={updateStatus}
        checked={checked}
      />
            <div className="w-full bg-white rounded-lg border border-slate-100 flex gap-3 items-center justify-between p-5 py-6 max-sm:p-4">
                <div className="flex gap-3 items-center ">
                    <div>
                        <div className="bg-orange-200 rounded-lg p-2 flex items-center justify-center">
                            {getIconComponent(task.icon, 'text-orange-600', "19px")}
                        </div>
                    </div>
                    <div 
                    onClick={() => {
                        if (setSelectedTask) setSelectedTask(task);
                        if (setOpenTasksWindow) setOpenTasksWindow(true);
                    }}
                    className="flex flex-col cursor-pointer">
                        <span className="font-bold hover:text-orange-600 cursor-pointer text-slate-700 max-sm:text-sm"> 
                            {task.title}
                        </span>
                        <div className="flex">
                            <span className="text-slate-400 text-[13px] p-[2px]">
                                {task.projectName}
                            </span>
                        </div>
                    </div>
                </div>
                {/* Status */}
                <div className="flex gap-36 font-bold items-center max-[770px]:hidden">
                    <div className="flex gap-2 items-center">
                        <CachedIcon className="text-[24px] text-slate-400"/>
                        <span className="text-slate-400 text-[14px]">{task.status}</span>
                    </div>
                    {/*prioriy*/}
                    <div className="flex gap-2 items-center max-[940px]:hidden">
                        <CircleIcon className={`text-[10px] ${task.priority === 'High' ? 'text-red-600' : task.priority === 'Medium' ? 'text-yellow-500' : 'text-green-600'}`}/>
                        <span className="text-slate-400 text-[14px]">{task.priority}</span>
                    </div>

                    {/* Edit and Delete icons */}
                    <div className="flex gap-2 items-center">
                        <div
                                className=" rounded-lg p-2 hover:bg-orange-300 transition-all cursor-pointer"
                                onClick={() => {
                                        if (setSelectedTask) setSelectedTask(task);
                                        if (setOpenTasksWindow) setOpenTasksWindow(true);
                                    }}
                            >
                                <EditOutlinedIcon className="text-orange-600" sx={{ fontSize: "17px" }} />
                            </div>
                        <div className=" rounded-lg p-2 hover:bg-slate-300 flex items-center justify-center cursor-pointer transition-all">
                            <DeleteOutlinedIcon className="text-slate-600" sx={{ fontSize: "17px" }}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}