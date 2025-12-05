import { Task } from "@mui/icons-material";
import TaskHeader from "./Components/TaskHeader";
import TaskSubHeader from "./Components/TaskSubHeader";
import TasksList from "./Components/TasksList";

function AllTasksContainer() {
    return(
        <div className="bg-slate-50 w-full p-10 max-sm:py-9 max-sm:p-8">   
        <TaskHeader />
        <TaskSubHeader />
        <TasksList />
        </div>
    );

}

export default AllTasksContainer;