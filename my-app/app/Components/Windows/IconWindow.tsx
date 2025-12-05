import React,{useEffect,useState} from "react";
import { useContextApp } from '@/app/Pages/ContextApp';

import AppsIcon from '@mui/icons-material/Apps';
import CloseIcon from '@mui/icons-material/Close';
import AllIcons from "../Data/AllIcons";    

function IconWindow(){
    return(
    <div className={`w-[48%] max-sm:w-[82%] max-[600px]:w-[93%] z-[90] p-3 left-1/2 top-[47%] -translate-y-1/2 -translate-x-1/2 absolute flex flex-col gap-3 border border-slate-500 bg-white rounded-lg shadow-md h-[530px] w-[770px] text-slate-700`}>
                {/* Header */}
                <Header />
                <span className="mx-8 text-[13px] mt-4 text-slate-400">{`Please select an icon for your Project:`}
                </span>
                {/* Icons Grid */}
                <IconsArea/>
            </div>
    );
}
export default IconWindow;
function Header(){
    const { openIconWindowObject: { setOpenIconWindow } } = useContextApp();
    return(
        <div className="flex justify-between items-center pt-7 mb-8 px-7">
            <div className="flex items-center gap-2">
                {/* Icon */}
                <div className=" p-2 bg-orange-200 rounded-lg flex items-center justify-center">
                    <AppsIcon sx={{fontSize:"21px"}} className="text-orange-400"/>
                </div>
                {/* Title */}
                <span className="font-semibold text-lg">Select Icon</span>
            </div>
            <CloseIcon
                className="text-slate-400 text-[18px] cursor-pointer"
                onClick={() => setOpenIconWindow(false)}
            />
        </div>
    );
}
function IconsArea(){
    return(
        <div className="w-full flex flex-col items-center mt-3">
            <div className="border border-slate-100 w-[92%] h-[330px] 
            overflow-auto rounded-md bg-slate-100">
            <AllIcons />
            </div>
        </div>
    );
}