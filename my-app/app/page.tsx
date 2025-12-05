'use client';
import Sidebar from "./Components/sidebar";
import ProjectWindow from "./Components/Windows/ProjectWindow";
import { TasksWindow } from "./Components/Windows/TasksWindow";
import IconWindow from "./Components/Windows/IconWindow";
import AllProjects from "./Pages/AllProjects/AllProjects";
import AllTasksContainer from "./Pages/AllTasks/AllTasks";
import { useContextApp } from "./Pages/ContextApp";
import MoreDropDown from "./Components/Dropdowns/MoreDropDown";
import ConfirmationWindow from "./Components/Windows/ConfirmationWindow";
import {Toaster} from 'react-hot-toast';
import SortingDropDown from "./Components/Dropdowns/SortingDropDown";
import ProjectDropDown from "./Components/Dropdowns/ProjectsDropDown";

//sidebar then main content area to have a fix layout
export default function Home() {
  const{
    openSideBarObject:{openSideBar},
    openProjectWindowObject:{openProjectWindow}, 
    sideBarMenuObject:{sideBarMenu},
    openConfirmationWindowObject:{openConfirmationWindow},
    openTasksWindowObject:{openTasksWindow},
    openIconWindowObject:{openIconWindow},
  }=useContextApp();
  const componentMap:Record<number,React.ReactNode>={
    1:<AllProjects />,
    2:<AllTasksContainer />,
  }
  const componentKey=sideBarMenu.findIndex((item)=>item.isSelected);
  const SelectedComponent=componentMap[componentKey+1] || null;
  return (
    // Use min-h-screen so the page can grow taller than the viewport and allow normal scrolling
    <div className="flex w-full min-h-screen poppins">
      {/*Soft Layer - backdrop should be rendered first so windows appear on top.
         Only show when modal windows are open (not when sidebar is toggled). Use inset-0 so it covers the full viewport. */}
      {(openProjectWindow || openConfirmationWindow || openTasksWindow) && (
        <div className={`fixed inset-0 ${openProjectWindow || openConfirmationWindow || openTasksWindow ? "z-[70]" : "z-50"} bg-slate-800/30`} />
      )}
      <ProjectDropDown />
      <SortingDropDown />
      <Toaster />
      <ConfirmationWindow />
  <TasksWindow />
  {/* Icon picker rendered at top-level so it opens regardless of which modal triggered it */}
  {openIconWindow && <IconWindow />}
      <MoreDropDown />
      {<ProjectWindow />}
      {/* sidebar (fixed) */}
      <Sidebar />

      {/* Main content area - offset by sidebar width so content isn't overlapped when sidebar is fixed */}
      <div className={`flex-1 transition-all p-6 min-h-screen bg-slate-50 ${openSideBar ? 'ml-[280px]' : 'ml-[72px] sm:ml-[97px]'}`}>
        {SelectedComponent && SelectedComponent}
      </div>
      {/* This is a Mr. Manager app. */}
      {/* <AllTasksContainer /> */}
      {/* <AllProjects /> */}
    </div>
  );
}
