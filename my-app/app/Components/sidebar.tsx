"use client";
import React, { use, useEffect, useRef } from 'react'; 
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import  SplitscreenIcon  from '@mui/icons-material/Splitscreen';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContextApp } from '@/app/Pages/ContextApp';
import { SvgIconProps } from '@mui/material/SvgIcon';
function Sidebar(){
    const{
        openSideBarObject:{openSideBar,setOpenSideBar},
        sideBarMenuObject:{sideBarMenu,setSideBarMenu},
    }=useContextApp();

    const sideBarMenuRef=useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if ( sideBarMenuRef.current && !sideBarMenuRef.current.contains(event.target as Node) ) {
            setOpenSideBar(false);
          }
        }

        if(openSideBar){
            document.addEventListener('mousedown', handleClickOutside);
        }
        else{
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openSideBar, setOpenSideBar]);
    
    return(
        <div 
        ref={sideBarMenuRef}
        // Sidebar container to contain logo menu and profile; fixed so it stays visible while the page scrolls
                className={`fixed left-0 top-0 ${
                        openSideBar ? "w-[280px] shadow-xl" : "w-[72px] sm:w-[97px]"
                    } h-screen py-10 bg-white flex flex-col items-center justify-between z-[90] transition-all text-slate-700`}>
        <Logo />
        <Menu />
        <Profile />
      </div>
    );
    // LOGO COMPONENT  returns one element(icon) 
    function Logo(){
        return (
            <div className="flex items-center justify-center gap-2">
                <TaskAltIcon className="text-orange-600 font-bold" sx={{ fontSize: "41px" }} />
                {openSideBar && (
                    <div className="flex text-xl items-center gap-1">
                        <span className="font-bold ">Project</span>
                        <span className="text-slate-600">Master</span>
                    </div>
                )}
            </div>
        );
    }
    function Profile(){
        return(
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-600 rounded-md"></div>
                {openSideBar && (
                    <ul>
                        <li className="font-bold text-[14px]">Pramag Basantia</li>
                        <li className="text-slate-400 text-[11px]">pramag24421@iiitd.ac.in </li>
                    </ul>
                )}
            </div>
        );
    }
    function Menu(){
        const iconMap:Record<string,React.ComponentType<SvgIconProps>>={
            "1": BorderAllIcon,
            "2": SplitscreenIcon,
            "3": LogoutIcon
        }
        function handleClickedItem(id:number){
            const updated = sideBarMenu.map(item => (
                item.id === id ? { ...item, isSelected: true } : { ...item, isSelected: false }
            ));
            setSideBarMenu(updated);
            
            // Handle logout
            if (id === 3) {
                // Clear all data
                localStorage.clear();
                sessionStorage.clear();
                // Reload the page to reset the app
                window.location.reload();
            }
        }
        return(
            <div className="flex flex-col gap-6">
                {sideBarMenu.map(menuItem => {
                    const IconComponent = iconMap[menuItem.id.toString()];
                    return (
                        <div
                            key={menuItem.id}
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => handleClickedItem(menuItem.id)}
                        >
                            <IconComponent
                                sx={{ fontSize: "25px" }}
                                className={menuItem.isSelected ? "text-orange-600" : "text-slate-300"}
                            />
                            {openSideBar && (
                                <span className={menuItem.isSelected ? "text-orange-600" : "text-slate-600"}>
                                    {menuItem.name}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }
    
}

export default Sidebar;