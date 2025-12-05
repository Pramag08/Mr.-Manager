"use client"
import React, { useEffect, useLayoutEffect } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useContextApp } from '@/app/Pages/ContextApp';
import IconWindow from './IconWindow';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import {
    useForm,
    SubmitHandler,
    FieldErrors,
    UseFormRegister,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getIconComponent } from '../Functions/IconAction';
import { addNewProject, editProject } from '../Functions/projectsActions';
import { toast } from 'react-hot-toast';
import { allIconsArray } from '../Data/AllIcons';
import { IconData } from '@/app/Pages/types/AppType';
import { Project } from '../Data/AllProjects';

const schema = z.object({
    projectName: z.string().min(1,{message:"Project Name is required"}).max(30,{message:"Project Name should be less than 50 characters"}),
});
export type ProjectFormData = z.infer<typeof schema>;

export function ProjectWindow() {
    const{
        openProjectWindowObject:{openProjectWindow,setOpenProjectWindow},
        allProjectsObject:{allProjects,setAllProjects},
        selectedIconObject:{selectedIcon,setSelectedIcon},
        selectedProjectObject:{selectedProject,setSelectedProject},
        chosenProjectObject:{chosenProject,setChosenProject},

    }=useContextApp();

    const{
        openIconWindowObject:{openIconWindow},
    }=useContextApp();

    const [isLoading, setLoading] = React.useState(false);  

    const{
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setFocus,
        setValue,
        reset,
        }=useForm<ProjectFormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit:SubmitHandler<ProjectFormData>=(data:ProjectFormData)=>{
        const existingProject=allProjects.find(
            (project)=>project.title.toLowerCase()===data.projectName.toLowerCase()
        );

        if(existingProject && !selectedProject){
            setError("projectName",{
                type:"manual",
                message:"A project with this name already exists.",
            });
            setFocus("projectName");
            return;
        }
        else{
            projectsFunction();
        }

        async function projectsFunction() {
            try {
            // set the Loading as true
            setLoading(true);

            //simulate a delay
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if(!selectedProject){
            addNewProject(
            data,
            allProjects,
            setAllProjects,
            setOpenProjectWindow,
            selectedIcon,
            reset
            );}
            else{
                editProject(
                    selectedProject,
                    setSelectedProject,
                    data,
                    selectedIcon,
                    allProjects,
                    setAllProjects,
                    setOpenProjectWindow
                );
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            // set the Loading as false
            setLoading(false);

            //Update the chosen project
            if (selectedProject && chosenProject) {
            //if the project we want to edit is the same that is
            //selected in the all tasks page
            if (chosenProject.id === selectedProject.id) {
                const updateChosenProject: Project = {
                ...chosenProject,
                title: data.projectName,
                };
                setChosenProject(updateChosenProject);
            }
}
            toast.success(`Project ${selectedProject ? "edited" : "added"} successfully`);
        }
        }
    };
    

    // const onSubmit:SubmitHandler<FormData>=(data)=>{
    //     console.log("Form Data:",data);
    //     handleClose();
    // }
    const handleClose=()=>{
        console.log("Closing Project Window and resetting form");
        setOpenProjectWindow(false);
        reset();
    }
    useLayoutEffect(() => {
        if(openProjectWindow){
            // console.log("Project Window Opened,resetting form");
            // reset();
            //If the selectedProject state is not null, meaning we are creating a project
            if (!selectedProject) {
                reset();
            } else {
                //Else we are going to edit a project
                setValue("projectName", selectedProject.title);

                const findIconInAllIconsArray = allIconsArray.find(
                (icon) => icon.name === selectedProject.icon
                );
                if (findIconInAllIconsArray) {
                setSelectedIcon(findIconInAllIconsArray);
                }
            }
        }
    }, [openProjectWindow, reset]);

    console.log("Project Window Rendered,openProjectWindow:", { openProjectWindow });
    return(
        <div className={`${openProjectWindow ? "block" : "hidden"} w-[48%] max-sm:w-[82%] max-[600px]:w-[93%] z-[80] p-3 left-1/2 top-[47%] -translate-y-1/2 -translate-x-1/2 absolute flex flex-col gap-3 border border-slate-500 bg-white rounded-lg shadow-md`}>
        {/* Header */}
        <Header handleClose={handleClose} />
        {/* Body */}
        <form 
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 pt-8 px-7 mt-3">
            {/* Project Name */}
            <ProjectInput register={register} errors={errors} />
            {/* Project Description */}
            <Footer handleClose={handleClose} isLoading={isLoading} />
        </form>
    {/* Icon picker is rendered at top-level (page.tsx) to avoid showing inside other modals */}
        </div>
    );
}
function Header({ handleClose }: { handleClose: () => void }) {
    // console.log("Rendering Header Component");
    // const{
    //     openProjectWindowObject:{setOpenProjectWindow},
    // }=useContextApp();
    const { selectedIconObject: { setSelectedIcon } , selectedProjectObject: { setSelectedProject,selectedProject}
    } = useContextApp();
    return(
    <div className="flex justify-between items-center pt-7 px-7 text-slate-800">
            <div className="flex items-center gap-2">
                {/* Icon */}
                <div className="p-[7px] bg-orange-200 rounded-lg flex items-center justify-center">
                    <BorderAllIcon className="text-orange-600" sx={{ fontSize: "21px" }} />
                </div>
                {/* Title */}
                <span className="font-semibold text-lg">
                    {selectedProject ? "Edit Project" : "New Project"}
                </span>
        </div>
        {/* Close Icon */}
        <CloseOutlinedIcon
        sx={{ fontSize: "18px" }}
        className="cursor-pointer text-slate-300" 
        onClick={()=>{
            console.log("Closing Project Window");
            setSelectedIcon(null);
            handleClose();
        }}/>
        </div>
    );
}
function ProjectInput({
    register,
    errors,
}:{
    register: UseFormRegister<ProjectFormData>;
    errors: FieldErrors<ProjectFormData>;
}){
    const {
  openProjectWindowObject: { openProjectWindow },
  openIconWindowObject: { setOpenIconWindow },
  selectedIconObject: { selectedIcon ,setSelectedIcon},
} = useContextApp();
    useEffect(() => {
        if(openProjectWindow){
            const inputElement=document.querySelector<HTMLInputElement>('input[name="projectName"]');
            inputElement?.focus();
        }
    }, [openProjectWindow]);
    return(
        <div className="flex flex-col gap-2">
            <span className="text-[14px] font-medium text-slate-600">Project Name</span>
            <div className="flex gap-3 justify-between">
                {/* Input */}
                <div className="w-full">
                    <input
                    {...register("projectName")}
                    placeholder="Enter Project Name..."
                    className="p-[10px] text-[13px] w-full rounded-md border outline-none text-slate-800"/>
                    {errors.projectName && (
                        <p className="text-[11px] text-red-500 mt-2">{errors.projectName?.message}</p>
                    )}
                </div>
                {/* Icon */}
                <div onClick={()=> setOpenIconWindow(true)}
                className="w-12 h-10 text-white bg-orange-600 rounded-lg flex items-center justify-center cursor-pointer">
                    {selectedIcon?(getIconComponent(selectedIcon?.name,"text-white")):(<LibraryBooksIcon/>)}
                </div>
            </div>
        </div>
    );
}
function Footer({ handleClose,isLoading, }: { handleClose: () => void; isLoading: boolean; }){
     const { selectedIconObject: { setSelectedIcon } , selectedProjectObject: { setSelectedProject,selectedProject}
    } = useContextApp();
    return(
        <div className="w-[102%] p-[12px] mt-8 mb-4 flex gap-3 justify-end items-center">
            <button 
            type="button"
            onClick={()=>{
                // console.log("Closing Project Window from Footer");
                handleClose();
                setSelectedIcon(null);
                setSelectedProject(null); 
            }}
            // onClick={()=>setOpenProjectWindow(false)}
            className="border border-slate-200 text-slate-400 text-[13px] p-2 px-6 rounded-md hover:border-slate-300 transition-all">
                Cancel
            </button>
            <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white text-[13px] p-2 px-4 rounded-md transition-all">
                {isLoading ? "Saving..." : (selectedProject ? "Edit Project" : "Add Project")}
            </button>
        </div>
    );
}
export default ProjectWindow;
