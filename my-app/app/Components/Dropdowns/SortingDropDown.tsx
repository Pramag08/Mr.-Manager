"use client";

import { useContextApp } from "@/app/Pages/ContextApp";
import React, { useState } from "react"; 
import { useEffect } from "react";
import { useCallback } from "react";
import { sortProjects } from "../Functions/sortingFunctions";


function SortingDropDown() {
  const {
    sortingOptionObject: { sortingOptions, setSortingOptions },
    sortingDropDownPositionsObject: { sortingDropDownPositions, setSortingDropDownPositions },
    openSortingDropDownObject: { openSortingDropDown, setOpenSortingDropDown },
    allProjectsObject: { allProjects, setAllProjects },
  } = useContextApp();

  const dropDownRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        // Close the drop down menu if the user clicks outside of it
        setOpenSortingDropDown(false);
      }
    }

    function handleResize() {
      // Close the drop down menu when the window is resized
      setOpenSortingDropDown(false);
    }

    if (openSortingDropDown) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("resize", handleResize);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
      // Restore scrolling
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
      // Restore scrolling
    };
    }, [openSortingDropDown, setOpenSortingDropDown]);
    //This function is memoized and only re-created if `allProjects` changes.
    //and to avoid unnecessary re-render
    //------------------
    // Removed sorting logic from here - sorting now happens at render time in AllProjects and TasksList components

    function handleOpenSelected(categoryIndex:number, optionIndex:number){
        //Update the selection in the sorting options array
        const updateSortingOptions = sortingOptions.map((category, cIndex) => ({
            ...category,
            options: category.options.map((option, oIndex) => ({
            ...option,
            selected: cIndex === categoryIndex && oIndex === optionIndex,
            })),
        }));
        // get the option object that has the isSelected property as true
        const selectedOption = updateSortingOptions
            .flatMap((option) => option.options)
            .find((option) => option.selected);

        console.log(selectedOption);

        setSortingOptions(updateSortingOptions);
    }

  return (
    <div
      ref={dropDownRef}
      style={{
        top: `${sortingDropDownPositions.top}px`,
        left: `${sortingDropDownPositions.left}px`,
        width: `${sortingDropDownPositions.width}px`,
      }}
      className={`bg-white text-sm top-[226px] right-60 z-[60] px-5
      border-slate-50 fixed py-6 w-[160px] select-none shadow-md rounded-lg
      flex flex-col ${openSortingDropDown ? "block" : "hidden"}`}
    >
      {/* each category */}
      {sortingOptions.map((category,categoryIndex) => (
        <div
          key={categoryIndex}
          className="flex flex-col gap-1 text-slate-700 cursor-pointer"
        >
          <span
            className={`text-[13px] font-bold ${
              category.category === "Date" ? "mt-5" : ""
            }`}
          >
            {category.category}
          </span>
          {/* each option */}
          <div className="flex flex-col gap-1 w-full text-[13px]">
            {category.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <span
                  onMouseDown={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    handleOpenSelected(categoryIndex, optionIndex);
                    // Close after selecting
                    setOpenSortingDropDown(false);
                  }}
                  className={`${
                    option.selected ? "text-orange-600" : "text-slate-500"
                  } cursor-pointer hover:text-orange-600`}
                >
                    {option.label}
                </span>
                </div>
            ))}
            </div>
        </div>
      ))}
    </div>
  );
}
export default SortingDropDown;