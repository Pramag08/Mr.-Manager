"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AppType, SidebarMenuItem, IconData, TabOption } from "./types/AppType";
import { allIconsArray } from '@/app/Components/Data/AllIcons';
import { Project,projectsData, Task } from "@/app/Components/Data/AllProjects";
// note: no runtime zod usage here

//setting up the structure of context
// type AppType={
//     openSideBarObject:{
//         openSideBar:boolean,
//         setOpenSideBar:React.Dispatch<React.SetStateAction<boolean>>;
//     }
// }

// // Sidebar menu item type
// type SidebarMenuItem = {
//     id: number;
//     name: string;
//     isSelected: boolean;
// }

//setting default values for context
const defaultAppContext:AppType={
    openTasksWindowObject:{
        openTasksWindow:false,
        setOpenTasksWindow:()=>{}
    },
    tabsOptionsObject:{
        tabsOptions:[],
        setTabsOptions:()=>{}
    },
    openSideBarObject:{
        openSideBar:false,
        setOpenSideBar:()=>{}
    },
    sideBarMenuObject:{
        sideBarMenu:[],
        setSideBarMenu:()=>{}
    },
    openProjectWindowObject:{
        openProjectWindow:false,
        setOpenProjectWindow:()=>{}
    },
    allIconsDataObject:{
        allIconsData:[],
        setAllIconsData:()=>{}
    },
    openIconWindowObject:{
        openIconWindow:false,
        setOpenIconWindow:()=>{}
    },
    selectedIconObject:{
        selectedIcon:null,
        setSelectedIcon:()=>{}
    },
    allProjectsObject:{
        allProjects:[],
        setAllProjects:()=>{}
    },
    dropDownPositionsObject:{
        dropDownPositions:{ top: 0, left: 0 },
        setDropDownPositions:()=>{}
    },
    openDropDownObject:{
        openDropDown:false,
        setOpenDropDown:()=>{}
    },
    selectedProjectObject:{
        selectedProject:null,
        setSelectedProject:()=>{}
    },
    openConfirmationWindowObject:{
        openConfirmationWindow:false,
        setOpenConfirmationWindow:()=>{}
    },
    sortingOptionObject:{
        sortingOptions:[],
        setSortingOptions:()=>{}
    },
    sortingDropDownPositionsObject:{
        sortingDropDownPositions:{top:0,left:0},
        setSortingDropDownPositions:()=>{}
    },
    openSortingDropDownObject:{
        openSortingDropDown:false,
        setOpenSortingDropDown:()=>{}
    },
    chosenProjectObject:{
        chosenProject:null,
        setChosenProject:()=>{}
    },
    openProjectsDropDownObject:{
        openProjectsDropDown:false,
        setOpenProjectsDropDown:()=>{},
    },
    projectsDropDownPositionsObject:{
        projectsDropDownPositions:{top:0,left:0},
        setProjectsDropDownPositions:()=>{},
    },
    allTasksObject:{
        allTasks:[],
        setAllTasks:()=>{}
    },
    selectedTaskObject:{
        selectedTask:null,
        setSelectedTask:()=>{}
    },
    projectClickedObject:{
        projectClicked:null,
        setProjectClicked:()=>{}
    },

};
//creating context
const ContextApp=createContext<AppType>(defaultAppContext);


//context provider component to wrap around parts of app that need access to context
export default function ContextAppProvider({
    children,
}:{
    children:React.ReactNode;
}){
    const [openSideBar,setOpenSideBar]=useState<boolean>(false);
    const [isMobileView,setIsMobileView]=useState<boolean>(false);
    const [sideBarMenu,setSideBarMenu]=useState<SidebarMenuItem[]>([
        {
            id:1,
            name:"All Projects",
            isSelected:true,
        },
        {
            id:2,
            name:"All Tasks",
            isSelected:false,
        },
        {
            id:3,
            name:"Logout",
            isSelected:false,
        },
    ]);
    const [openProjectWindow,setOpenProjectWindow]=useState(false);
    const [allIconsData,setAllIconsData]=useState<IconData[]>(allIconsArray);
    const [openIconWindow,setOpenIconWindow]=useState(false);
    const [selectedIcon,setSelectedIcon]=useState<IconData | null>(null);
    const [allProjects,setAllProjects]=useState<Project[]> ([]);
    const [dropDownPositions,setDropDownPositions]=useState({top:0,left:0});
    const [openDropDown,setOpenDropDown]=useState(false);
    const [selectedProject,setSelectedProject]=useState<Project | null>(null);
    const [openConfirmationWindow,setOpenConfirmationWindow]=useState<boolean>(false);
    const [sortingOptions, setSortingOptions] = useState([
    {
        category: "Order",
        options: [
        { label: "A-Z", value: "asc", selected: true },
        { label: "Z-A", value: "desc", selected: false },
        ],
    },
    {
        category: "Date",
        options: [
        { label: "Newest", value: "newest", selected: false },
        { label: "Oldest", value: "oldest", selected: false },
        ],
    },
    ]);
    const [openSortingDropDown, setOpenSortingDropDown] = useState(false);
    const [sortingDropDownPositions, setSortingDropDownPositions] = useState({
    top: 0,
    left: 0,
    });
    const [chosenProject,setChosenProject]=useState<Project | null>(null);
    const [tabsOptions, setTabsOptions] = useState<TabOption[]>(() => ([
        { id: 1, name: "On Going Tasks", isSelected: true },
        { id: 2, name: "Completed Tasks", isSelected: false },
        ]));

    const [openProjectsDropDown, setOpenProjectsDropDown] = useState(false);
    const [projectsDropDownPositions, setProjectsDropDownPositions] = useState({
    top: 0,
    left: 0,
    });
    const [openTasksWindow, setOpenTasksWindow] = useState(false);
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [projectClicked, setProjectClicked] = useState<Project | null>(null);
    
    //update window size
    useEffect(()=>{
    },[]);
    //handling responsive sidebar behavior
    useEffect(()=>{
        function handleResize(){
            setIsMobileView(window.innerWidth <= 940);
        }
        handleResize();
        window.addEventListener('resize',handleResize);
        return()=>{window.removeEventListener('resize',handleResize);};
    },[]);
    //simulate the fetching of projects data
useEffect(() => {
  const fetchData = async () => {
    try {
      //Simulate a network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      //Update the state

      const extractAllTasks = projectsData.flatMap(
        (project) => project.tasks
      );
      setAllTasks(extractAllTasks);
      setAllProjects(projectsData);
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, []);
    //close sidebar on larger screens
    useEffect(()=>{
        if(!isMobileView){
            setOpenSideBar(false);
        }
    },[isMobileView]);
    //close sidebar on menu item change
    useEffect(()=>{
        setOpenSideBar(false);
    },[sideBarMenu]);
    return(
        <ContextApp.Provider 
        value={{
            openTasksWindowObject:{
                openTasksWindow,setOpenTasksWindow
            },
            openSideBarObject:{
                openSideBar,setOpenSideBar
            },
            sideBarMenuObject:{
                sideBarMenu,setSideBarMenu
            },
            openProjectWindowObject:{
                openProjectWindow,setOpenProjectWindow
            },
            allIconsDataObject:{
                allIconsData,setAllIconsData
            },
            openIconWindowObject:{
                openIconWindow,setOpenIconWindow
            },
            selectedIconObject:{
                selectedIcon,setSelectedIcon
            },
            allProjectsObject:{
                allProjects,setAllProjects
            },
            dropDownPositionsObject:{
                dropDownPositions,setDropDownPositions
            },
            openDropDownObject:{
                openDropDown,setOpenDropDown
            },
            selectedProjectObject:{
                selectedProject,setSelectedProject
            },
            openConfirmationWindowObject:{
                openConfirmationWindow,setOpenConfirmationWindow
            },
            sortingOptionObject:{
                sortingOptions,setSortingOptions
            },
            openSortingDropDownObject:{
                openSortingDropDown,setOpenSortingDropDown
            },
            sortingDropDownPositionsObject:{
                sortingDropDownPositions,setSortingDropDownPositions
            },
            chosenProjectObject:{
                chosenProject,setChosenProject
            },
            
            tabsOptionsObject:{
                tabsOptions,setTabsOptions
            },
            openProjectsDropDownObject:{
                openProjectsDropDown,setOpenProjectsDropDown,
            },
            projectsDropDownPositionsObject:{
                projectsDropDownPositions,setProjectsDropDownPositions,
            },
            allTasksObject:{
                allTasks,setAllTasks
            },
            selectedTaskObject:{
                selectedTask,setSelectedTask
            },
            projectClickedObject:{
                projectClicked,setProjectClicked
            },
        }}>
            {children}
        </ContextApp.Provider>
    )
}

//custom hook to use context easily in other components
export function useContextApp(){
    return useContext(ContextApp);
}