


"use client";
import React, { useRef, useEffect, useState } from "react";
import { useTaskFormContext } from "../Windows/TasksWindow";
import PriorityListComponent from "./TasksDropDowns/PriorityListComponent";
import ProjectsListComponent from "./TasksDropDowns/ProjectsListComponent";

export default function TasksDropDown(){
  const { 
    openTasksDropDown,
    setOpenTasksDropDown,
    tasksDropDownPositions,
    clickedSelection
  } = useTaskFormContext();
  const { 
    setTasksDropDownPositions,
  } = useTaskFormContext();

  const menuRef = useRef<HTMLDivElement>(null);
  const [updatedLeftPos, setUpdatedLeftPos] = useState(0);
  
  const dropDownToggle = openTasksDropDown && tasksDropDownPositions.width > 0 ? "block" : "hidden";

  useEffect(() => {
    let timer: number | undefined;
    let bound = false;
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenTasksDropDown(false);
        // clear positions to avoid flicker when reopening
        setTasksDropDownPositions({ left: 0, top: 0, width: 0 });
      }
    }

    if (openTasksDropDown) {
      // Defer attaching the listener to avoid closing immediately when the opener is clicked.
      timer = window.setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
        bound = true;
      }, 0);
    }

    return () => {
      if (timer) window.clearTimeout(timer);
      if (bound) document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openTasksDropDown, setOpenTasksDropDown]);

  useEffect(() => {
    if (tasksDropDownPositions.width) {
      setUpdatedLeftPos(tasksDropDownPositions.left);
    }
  }, [tasksDropDownPositions]);
  // Avoid rendering the dropdown until we have computed positions to prevent
  // a flicker where it briefly appears at (0,0) or another spot then jumps.
  if (!openTasksDropDown || !tasksDropDownPositions.width) return null;

   return (
    <div
      ref={menuRef}
      style={
        openTasksDropDown && tasksDropDownPositions.width > 0
          ? {
              left: updatedLeftPos,
              top: tasksDropDownPositions.top,
              width: tasksDropDownPositions.width,
            }
          : { visibility: "hidden" }
      }
      className={`${dropDownToggle} bg-white absolute p-3 z-[90] border border-slate-50 select-none shadow-md rounded-lg flex flex-col gap-2 transition-opacity duration-150`}
    >
      {clickedSelection === "priority" ? (
        <PriorityListComponent />
      ) : (
        <ProjectsListComponent />
      )}
    </div>
  );
}