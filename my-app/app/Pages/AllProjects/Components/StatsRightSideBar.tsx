import React, { useMemo } from "react";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import { useContextApp } from "@/app/Pages/ContextApp";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Project } from "@/app/Components/Data/AllProjects";

function StatsRightSideBar() {
  // { ...
  
  const {
    allProjectsObject: { allProjects },
  } = useContextApp();

  const { completedProjects, completedTasks, completionPercentage } =
    useMemo(() => {
      let completedProjects: Project[] = [];
      let totalTasks = 0;
      let completedTasksCount = 0;

      allProjects.forEach((project) => {
        // Only count projects that have tasks
        if (project.tasks.length > 0) {
          const projectCompleted = project.tasks.every(
            (task) => task.status === "Completed"
          );
          if (projectCompleted) completedProjects.push(project);
        }

        project.tasks.forEach((task) => {
          totalTasks++;
          if (task.status === "Completed") completedTasksCount++;
        });
      });

      // Calculate percentage based on projects with tasks
      const projectsWithTasks = allProjects.filter(p => p.tasks.length > 0);
      const percentage =
        projectsWithTasks.length > 0
          ? Math.round((completedProjects.length / projectsWithTasks.length) * 100)
          : 0;

      return {
        completedProjects: completedProjects,
        completedTasks: completedTasksCount,
        completionPercentage: percentage,
      };
    }, [allProjects]);

  return (
    <div className="w-[22%] flex justify-end items-center max-lg:hidden text-slate-800">
      {/* White background */}
      <div className="h-[95%] w-[94%] bg-white rounded-l-3xl p-3 flex flex-col">
        {/* Header */}
        <Header />
        {/* Circular Chart and the Labals */}
        <div className="flex flex-col gap-11 items-center justify-center mt-6">
          <CircularChart percentage={completionPercentage} />
          <ProjectsCompletedLabels
            completedProjects={completedProjects}
            completedTasks={completedTasks}
          />
        </div>
        {/* Projects List */}
        <ProjectsList completedProjects={completedProjects} />
      </div>
    </div>
  );
  function Header() {
    return (
        <h2 className="text-[22px] font-bold text-center mt-7">
        Projects Completed
        </h2>
    );
    }
  function CircularChart({ percentage }: { percentage: number }) {
    return (
        <div className="w-40 h-40 mt-7 mb-1">
        <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
            textSize: "16px",
            pathColor: `rgba(234, 88, 12, 2)`,
            textColor: "#f97316",
            trailColor: "#f1f5f9",
            backgroundColor: "#3e98c7",
            })}
        />
        </div>
    );
    }
    function ProjectsCompletedLabels({
        completedProjects,
        completedTasks,
        }: {
        completedProjects: Project[];
        completedTasks: number;
        }) {
        return (
            <div className="flex justify-center flex-col gap-1 items-center">
            <p className="font-bold text-[17px] ">
                {completedProjects.length} Completed
            </p>
            <p className="text-[13px] text-slate-400">
                {completedTasks} Tasks done
            </p>
            </div>
        );
        }
    function ProjectsList({
        completedProjects,
        }: { completedProjects: Project[];
        }) {
        return (
            <div className="flex-1 flex flex-col mt-16 overflow-hidden">
                {completedProjects.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="p-1 gap-5 flex flex-col justify-center opacity-40 pb-8 items-center">
                            <NotAchievedProjectsIcon />
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-slate-700 text-[12px] mb-1 text-center">
                                    No Projects accomplished Yet...
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <ul className="flex flex-col gap-3 mx-4 overflow-auto">
                        {completedProjects.map((project, index) => (
                            <div key={project.id}>
                                <SingleProject project={project} />
                                {index < completedProjects.length - 1 && (
                                    <hr className="w-[80%] mx-auto text-slate-100 opacity-50" />
                                )}
                            </div>
                        ))}
                    </ul>
                )}
            </div>
        );
        function SingleProject({ project }: { project: Project }) {
            return (
                <li className="p-3 flex gap-2 items-center">
                <div className="w-8 h-8 bg-orange-600 rounded-md justify-center items-center flex text-white">
                    <SplitscreenIcon sx={{ fontSize: "19px" }} />
                </div>

                <ul className="">
                    <li className="text-[14px] font-semibold">
                    {truncateString(project.title, 40)}
                    </li>
                    <li className="text-[12px] text-slate-400">
                    {project.tasks.length} tasks
                    </li>
                </ul>
                </li>
            );
        }
        
    }
}
function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
    return str.slice(0, num) + "...";
}
function NotAchievedProjectsIcon({ stroke = "#94a3b8", height = "90px" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height={height}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M12 12L9.0423 14.9289C6.11981 17.823 4.65857 19.27 5.06765 20.5185C5.10282 20.6258 5.14649 20.7302 5.19825 20.8307C5.80046 22 7.86697 22 12 22C16.133 22 18.1995 22 18.8017 20.8307C18.8535 20.7302 18.8972 20.6258 18.9323 20.5185C19.1625 19.816 18.8005 19.0506 17.9193 18M12 12L14.9577 14.9289M12 12L14.9577 9.07107C17.8802 6.177 19.3414 4.72997 18.9323 3.48149C18.8972 3.37417 18.8535 3.26977 18.8017 3.16926C18.1995 2 16.133 2 12 2C7.86697 2 5.80046 2 5.19825 3.16926C5.14649 3.26977 5.10282 3.37417 5.06765 3.48149C4.83747 4.18399 5.19945 4.94935 6.08073 6M12 12L9.0423 9.07107"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
      </g>
    </svg>
  );
}

export default StatsRightSideBar;