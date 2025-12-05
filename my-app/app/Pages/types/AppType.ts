import { Project, Task } from "@/app/Components/Data/AllProjects";
import React from 'react';

// setting up the structure of context
export type AppType={
    openTasksWindowObject:{
        openTasksWindow:boolean;
        setOpenTasksWindow:React.Dispatch<React.SetStateAction<boolean>>;
    };
    projectsDropDownPositionsObject: {
    projectsDropDownPositions: SortingDropDownPosition;
    setProjectsDropDownPositions: React.Dispatch<
        React.SetStateAction<SortingDropDownPosition>
    >;
    };

    openProjectsDropDownObject: {
    openProjectsDropDown: boolean;
    setOpenProjectsDropDown: React.Dispatch<React.SetStateAction<boolean>>;
    };
    openSideBarObject:{
        openSideBar:boolean,
        setOpenSideBar:React.Dispatch<React.SetStateAction<boolean>>;
    };
    sideBarMenuObject:{
        sideBarMenu:SidebarMenuItem[],
        setSideBarMenu:React.Dispatch<React.SetStateAction<SidebarMenuItem[]>>;
    };
    openProjectWindowObject:{
        openProjectWindow:boolean,
        setOpenProjectWindow:React.Dispatch<React.SetStateAction<boolean>>;
    };
    allIconsDataObject:{
        allIconsData: IconData[];
        setAllIconsData:React.Dispatch<React.SetStateAction<IconData[]>>;
    };
    openIconWindowObject:{
        openIconWindow:boolean,
        setOpenIconWindow:React.Dispatch<React.SetStateAction<boolean>>;
    };
    selectedIconObject:{
        selectedIcon:IconData | null;
        setSelectedIcon:React.Dispatch<React.SetStateAction<IconData | null>>;
    };
    allProjectsObject:{
        allProjects:Project[];
        setAllProjects:React.Dispatch<React.SetStateAction<Project[]>>;
    };
    dropDownPositionsObject:{
        dropDownPositions: { top: number; left: number };
        setDropDownPositions: React.Dispatch<React.SetStateAction<{ top: number; left: number }>>;
    };
    openDropDownObject:{
        openDropDown: boolean;
        setOpenDropDown: React.Dispatch<React.SetStateAction<boolean>>;
    };
    selectedProjectObject: {
        selectedProject: Project | null;
        setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
    };
    openConfirmationWindowObject: {
        openConfirmationWindow: boolean;
        setOpenConfirmationWindow: React.Dispatch<React.SetStateAction<boolean>>;
    };
    sortingOptionObject:{
        sortingOptions:SortingOption[];
        setSortingOptions:React.Dispatch<React.SetStateAction<SortingOption[]>>;
    }
    sortingDropDownPositionsObject: {
    sortingDropDownPositions: SortingDropDownPosition;
    setSortingDropDownPositions: React.Dispatch<
      React.SetStateAction<SortingDropDownPosition>
        >;
    };
    openSortingDropDownObject: {
        openSortingDropDown: boolean;
        setOpenSortingDropDown: React.Dispatch<React.SetStateAction<boolean>>;
    };
    chosenProjectObject:{
        chosenProject:Project | null;
        setChosenProject:React.Dispatch<React.SetStateAction<Project | null>>;
    };
    tabsOptionsObject:{
        tabsOptions:TabOption[];
        setTabsOptions:React.Dispatch<React.SetStateAction<TabOption[]>>;
    };
    allTasksObject:{
        allTasks:Task[];
        setAllTasks:React.Dispatch<React.SetStateAction<Task[]>>;
    };
    selectedTaskObject:{
        selectedTask: Task | null;
        setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
    };
    projectClickedObject:{
        projectClicked: Project | null;
        setProjectClicked: React.Dispatch<React.SetStateAction<Project | null>>;
    };
};
export type SortingDropDownPosition={
    left:number;
    top:number;
    width?:number;
}

// Sidebar menu item type
export type SidebarMenuItem = {
    id: number;
    name: string;
    isSelected: boolean;
};

export interface IconData {
    id: number;
    name: string;
    icon:React.ReactNode;
    isSelected: boolean;
}
type SortingOption = {
  category: string;
  options: {
    label: string;
    value: string;
    selected: boolean;
  }[];
};
export type TabOption = {
  id: number;
  name: string;
  isSelected: boolean;
};

