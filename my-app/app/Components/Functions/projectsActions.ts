import React,{Dispatch, SetStateAction} from 'react';

import {v4 as uuidv4} from 'uuid';
import { Project,projectsData } from '../Data/AllProjects';
import { IconData } from '@/app/Pages/types/AppType';
import type { ProjectFormData } from '@/app/Components/Windows/ProjectWindow';

export function addNewProject(
    data: ProjectFormData,
    allProjects:Project[],
    setAllProjects:Dispatch<SetStateAction<Project[]>>,
    setOpenProjectWindow:Dispatch<SetStateAction<boolean>>,
    selectedIcon:IconData | null,
    reset:()=>void
){
    try{
        const newProject:Project={
            id:uuidv4(),
            title:data.projectName,
            icon:selectedIcon?.name || "LocalLibrary",
            tasks:[],
            clerkUserId:"123", // Placeholder, replace with actual user ID
            createdAt:new Date().toISOString(),
            updatedAt:new Date().toISOString(),
        };
        setAllProjects([...allProjects,newProject]);
        setOpenProjectWindow(false);
        reset();
    }
    catch(error){}
}

export function editProject(
  selectedProject: Project | null,
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>,
  data: ProjectFormData,
  selectedIcon: IconData | null,
  allProjects: Project[],
  setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>,
  setOpenConfirmationWindow: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (selectedProject) {
    const updateProject: Project = {
      ...selectedProject,
      title: data.projectName,
      icon: selectedIcon?.name || "LocalLibrary",
      tasks: selectedProject.tasks.map(task=>({
        ...task,
        projectName:data.projectName,
      })
      ),
    };

    const updateAllProjects = allProjects.map((project) => {
      if (project.id === selectedProject.id) {
        return updateProject;
      }

      return project;
    });

    setAllProjects(updateAllProjects);
    setSelectedProject(null);
    setOpenConfirmationWindow(false);
  }
}

export function deleteProject(
  selectedProject: Project | null,
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>,
  allProjects: Project[],
  setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>,
  setOpenConfirmationWindow: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (selectedProject) {
    const updateAllProjects = allProjects.filter(
      (project) => project.id !== selectedProject.id
    );

    setAllProjects(updateAllProjects);
    setSelectedProject(null);
    setOpenConfirmationWindow(false);
  }
}