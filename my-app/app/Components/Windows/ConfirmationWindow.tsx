"use client";
import React from "react";
import { useContextApp } from "@/app/Pages/ContextApp";
import {toast} from 'react-hot-toast';
import { deleteProject } from "../Functions/projectsActions";

export default function ConfirmationWindow() {
  const {
    openConfirmationWindowObject: { openConfirmationWindow, setOpenConfirmationWindow },
    selectedProjectObject: { selectedProject, setSelectedProject },
    allProjectsObject: { allProjects, setAllProjects },
    chosenProjectObject: { chosenProject, setChosenProject },
  } = useContextApp();

  const [isLoading, setLoading] = React.useState(false);

  function closeConfirmationWindow() {
    setOpenConfirmationWindow(false);
    setSelectedProject(null);
  }
  async function deleteFunction() {
  try {
    // set the Loading as true
    setLoading(true);

    //simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // delete the project
    deleteProject(
      selectedProject,
      setSelectedProject,
      allProjects,
      setAllProjects,
      setOpenConfirmationWindow
    );
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  } finally {
    // set the Loading as false
    setLoading(false);
    setOpenConfirmationWindow(false);
    setChosenProject(null);
    toast.success("Project deleted successfully");
  }
}

  function handleDelete() {
    if (!selectedProject) {
      closeConfirmationWindow();
      return;
    }
    setAllProjects(allProjects.filter((p) => p.id !== selectedProject.id));
    closeConfirmationWindow();
  }

  return (
    <div
      className={`w-[38%] bg-white max-sm:w-[91%] max-lg:w-[80%] p-6 fixed shadow-md z-[100] rounded-lg flex flex-col top-[30%] left-1/2 -translate-x-1/2 ${
        openConfirmationWindow ? "block" : "hidden"
      }`}
    >
      <div className=" rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-5 text-slate-800">Delete Project</h2>
        <p className={`text-gray-600 mb-4 text-sm`}>
          Are you sure you want to remove this project? This action cannot be
          undone, and will remove all tasks associated with it.
        </p>
      </div>

      <div className="flex justify-end gap-2 mt-6 text-[13px]">
        <button
          onClick={closeConfirmationWindow}
          className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button onClick={deleteFunction} className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-white">
          {isLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}