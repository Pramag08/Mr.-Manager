import React, { useEffect, useState, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useContextApp } from "@/app/Pages/ContextApp";

import { set } from "zod";
// import { useContextApp } from "@app/contextApp"; // Removed failing import

function MoreDropDown() {
  const {
    openDropDownObject: { openDropDown, setOpenDropDown },
    dropDownPositionsObject: { setDropDownPositions, dropDownPositions },
    openConfirmationWindowObject: { setOpenConfirmationWindow },
    openProjectWindowObject: { setOpenProjectWindow },
    selectedProjectObject: { selectedProject, setSelectedProject},
  } = useContextApp();

  const [dropDownOptions, setDropDownOptions] = useState([
    { id: 1, name: "Edit", icon: <EditOutlinedIcon /> },
    { id: 2, name: "Delete", icon: <DeleteIcon /> },
  ]);

  const menuRef = React.useRef<HTMLDivElement>(null);

  function clickedItemHandler(id: number) {
    if(id==1){
      // Open the project editing window
      setOpenProjectWindow(true);
    }
    if (id === 2) {
      //Open the window to confirm the deletion FIRST
      setOpenConfirmationWindow(true);
      // Close the drop down menu with a small delay
      setTimeout(() => {
        setOpenDropDown(false);
      }, 100);
    }
    setOpenDropDown(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenDropDown(false);
        setSelectedProject(null); 
      }
    }
    function handleResize() {
      // Close the drop down menu when the window is resized
      setOpenDropDown(false);
    }

    // Bind the event listener
    if (openDropDown) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("resize", handleResize);
    }
    else{
        document.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener("resize", handleResize);
    }
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };

  }, [openDropDown, setOpenDropDown]);

  console.log('MoreDropDown render -> openDropDown:', openDropDown, 'positions:', dropDownPositions);

  return (
    <div
      ref={menuRef}
      style={{ top: dropDownPositions.top, left: dropDownPositions.left }}
      className={`bg-white fixed z-[90] px-5 border-slate-50 py-6 w-[130px] select-none shadow-md rounded-lg flex flex-col gap-7 ${
        openDropDown ? "block" : "hidden"
      }`}
    >
      {dropDownOptions.map((dropDownOption) => (
        <div
          key={dropDownOption.id}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            clickedItemHandler(dropDownOption.id);
          }}
          className={`flex gap-1 items-center text-slate-400 cursor-pointer hover:text-orange-600 ${
            dropDownOption.id === 2 && "hover:text-red-600"
          }`}
        >
          {/* Edit Icon */}
          {dropDownOption.icon}
          <span className="text-[14px]">{dropDownOption.name}</span>
        </div>
      ))}
    </div>
  );
}

export default MoreDropDown;
