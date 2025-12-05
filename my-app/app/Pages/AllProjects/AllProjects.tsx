import ProjectsHeader from "./Components/ProjectsHeader";
import ProjectsSubHeader from "./Components/ProjectsSubHeader";
import AllProjectsSection from "./Components/AllProjectsSection";
import StatsRightSideBar from "./Components/StatsRightSideBar";
import MoreDropDown from '@/app/Components/Dropdowns/MoreDropDown';
import SortingDropDown from '@/app/Components/Dropdowns/SortingDropDown';

function AllProjects() {
  return (
    <div className="bg-slate-50 w-full flex-grow overflow-auto flex">
      <AllProjectsArea />
      {/* Project side bar we are going to add here */}
      <StatsRightSideBar />
      {/* Global dropdown rendered once for the page */}
      <MoreDropDown />
      <SortingDropDown />
    </div>
  );


  function AllProjectsArea() {
    return (
      <div className="w-[78%] max-lg:w-full p-10  max-sm:p-7 max-sm:pt-9 flex flex-col gap-3">
            {/* search bar and add project */}
            <ProjectsHeader />
            {/* My projects Title and add button */}
            <ProjectsSubHeader />
            {/* All Projects Section */}
            <AllProjectsSection />
            </div>
        );
    }
}

export default AllProjects;