"use client";
import SplitscreenIcon  from '@mui/icons-material/Splitscreen';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useContextApp } from '../../ContextApp';
import type { Task } from "@/app/Components/Data/AllProjects";
import { useRef } from 'react';


function TaskSubHeader() {
    return(
        <div className="mt-[90px] flex justify-between items-center">
            <MyProjectsText />
            <SortByButton />
        </div>
    );
    function MyProjectsText() {
        const {
            chosenProjectObject: { chosenProject, setChosenProject },
            allProjectsObject: { allProjects },
            openProjectsDropDownObject: { openProjectsDropDown, setOpenProjectsDropDown },
            projectsDropDownPositionsObject: { projectsDropDownPositions, setProjectsDropDownPositions },
        } = useContextApp();

        //Calculate the total number of tasks in all projects
        function allTasksInAllProjects() {
            return allProjects.reduce((acc, project) => acc + project.tasks.length, 0);
        }

        //function that returns the number of completed tasks
        function calculateCompletedTasks(tasks: Task[]) {
            return tasks.filter((task) => task.status === "Completed").length;
        }

        //If no project is chosen, return the total number of tasks of all projects
        //otherwise return the number of completed tasks of the chosen project
        const totalTasks = chosenProject
            ? chosenProject.tasks.length
            : allTasksInAllProjects();

            //If no project is chosen, return the completed tasks of all projects
            //otherwise return all completed tasks of chosen projects by using
            //the function calculateCompletedTasks
            //
            const completedTasks = chosenProject
            ? calculateCompletedTasks(chosenProject.tasks)
            : allProjects.reduce(
            (acc, project) => acc + calculateCompletedTasks(project.tasks),
            0
            );


            //Calculate the completion percentage
        const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;


        const projectTitleRef = useRef<HTMLDivElement>(null);

        function openTheProjectDropDown() {
        if (projectTitleRef.current) {
            const rect = projectTitleRef.current.getBoundingClientRect();
            const { top, left, width } = rect;
            setProjectsDropDownPositions({ left, top, width });
        }
        setOpenProjectsDropDown(!openProjectsDropDown);
        }        

        return(
            <div className='flex items-center gap-3 max-sm:gap-2 '>
                {/* Project Icon */}
                <div className='w-[41px] -mt-1 flex justify-center items-center h-[44px] bg-orange-100 rounded-md'>
                <SplitscreenIcon sx={{ fontSize: "21px" }} className="text-orange-600"/>
                </div>
                
                <ul className="flex flex-col gap-[7px] max-sm:gap-[10px] ">
                    <li className="text-[17px] font-semibold flex gap-2 items-center">

                        <div 
                            ref={projectTitleRef}
                            onClick={openTheProjectDropDown}
                            className="text-slate-700 flex gap-2 items-center cursor-pointer hover:text-orange-600"
                        >
                            <span className="text-lg">
                                {chosenProject ? chosenProject.title : "All Tasks"}
                            </span>
                            <span className="bg-slate-700 text-white text-[14px] p-[2px] px-2 rounded-md max-[420px]:hidden">{completedTasks}</span>
                        </div>
                        <KeyboardArrowDownIcon className='text-slate-600 text-lg'/>
                    </li>
                    <div className="flex gap-1 items-center">
                        <li className="text-[12px] h-[4px] w-[280px] max-sm:w-[170px] max-[420px]:w-[130px] bg-slate-200 rounded-md overflow-auto ">
                            <div className="h-[100%] bg-orange-600 rounded-r-xl" style={{width:`${completionPercentage}%`}}></div>
                        </li>

                        <p className='text-[12px] text-slate-400 ml-3 max-sm:hidden'>{completionPercentage.toFixed(0)}% completed</p>
                    </div>
                </ul>
            </div>
        );
    }
}
function SortByButton() {
    const {
        openSortingDropDownObject: { setOpenSortingDropDown, openSortingDropDown },
        sortingDropDownPositionsObject: { setSortingDropDownPositions },
        sortingOptionObject: { sortingOptions },
    } = useContextApp();

    const sortingLinkRef = useRef<HTMLDivElement>(null);

    let sortingLabel = "";

    const flatten = sortingOptions
        .flatMap((option) => option.options)
        .find((option) => option.selected);

    function clickedSortingLink() {
        if (sortingLinkRef.current) {
            const rect = sortingLinkRef.current.getBoundingClientRect();
            const { top, left, width } = rect;
            setSortingDropDownPositions({
                top: top + window.scrollY + 30,
                left: left + window.scrollX,
                width: width,
            });
        }

        setOpenSortingDropDown(true);
    }

    if (flatten) {
        if (flatten.label === "A-Z" || flatten.label === "Z-A") {
            sortingLabel = `Order ${flatten.label}`;
        } else {
            sortingLabel = `${flatten.label} Tasks`;
        }
    }

    return (
        <div className=" flex max-sm:flex-col text-[15px] font-semibold gap-3 text-slate-800">
            <span className=" text-slate-300">Sort By</span>
            <div 
                ref={sortingLinkRef}
                onClick={clickedSortingLink}
                className=" flex gap-1 items-center cursor-pointer text-slate-800 hover:text-orange-600"
            >
                <span>{sortingLabel}</span>
                {openSortingDropDown ? (
                    <KeyboardArrowUpIcon sx={{fontSize:"19px"}} />
                ) : (
                    <KeyboardArrowDownIcon sx={{fontSize:"19px"}} />
                )}
            </div>
        </div>
    );
}

export default TaskSubHeader;