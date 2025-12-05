"use client";
import AddIcon from '@mui/icons-material/Add';
import React from 'react';  
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { useContextApp } from '@/app/Pages/ContextApp';

function TaskHeader() {
    return(
        <div className='flex justify-between'>  
        {/* Search bar */}
        <SearchBar />
        {/* Add Project Button */}
        <AddProjectButton />
        </div>
    );
}
function SearchBar() {
    return (
        <div className="flex items-center">
            {/* Search Icon */}
            <div className="border-b-2 border-orange-600 h-[39px] w-11 justify-center flex items-center">
            <SearchIcon
                className="text-slate-600 outline-none"
                sx={{fontSize:"26px"}}
             />
        </div>
            {/* Search Icon */}
            <div className=" border-b-2 border-slate-200 text-slate-800">
                <input
                    placeholder="Search a Task..." 
                    className="p-2 bg-transparent text-[14px] text-slate-800 outline-none"/>
            </div>
        </div>
    );
}
function AddProjectButton() {
    const{
        openSideBarObject:{openSideBar,setOpenSideBar},
        openTasksWindowObject:{setOpenTasksWindow},
    }=useContextApp();  
    return (
        <div className='flex gap-3 items-center'>
        <button 
            onClick={() => setOpenTasksWindow(true)}
            className="flex items-center gap-1 bg-orange-600 text-white px-2 pr-3 rounded-md text-[14px] p-2">
            <AddIcon sx={{ fontSize: "22px" }} className="mt-[2px]" />
            <span className="max-sm:hidden">New Task</span>
            </button>
            <div className="sm:hidden">
                <MenuIcon 
                onClick={()=>setOpenSideBar(!openSideBar)}
                className="text-slate-400 h-9 cursor-pointer max-[942px]:block" />
            </div>
        </div>
    );
}
export default TaskHeader;