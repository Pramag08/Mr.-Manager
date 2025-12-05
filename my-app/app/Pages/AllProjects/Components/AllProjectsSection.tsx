import React, { useMemo } from 'react';
import SingleProjectCard from './SingleProjectCard';
import { useContextApp } from '@/app/Pages/ContextApp';
import { ProjectsEmptyScreen } from '@/app/Components/EmptyScreens/ProjectsEmptyScreen';
import { sortProjects } from '@/app/Components/Functions/sortingFunctions';

function AllProjectsSection() {
    const {
        allProjectsObject: { allProjects },
        sortingOptionObject: { sortingOptions },
    } = useContextApp();

    // Apply sorting
    const sortedProjects = useMemo(() => {
        const currentSortingOption = sortingOptions
            .flatMap((category) => category.options)
            .find((option) => option.selected);
        
        if (currentSortingOption) {
            return sortProjects(allProjects, currentSortingOption.value);
        }
        return allProjects;
    }, [allProjects, sortingOptions]);

    // If there are no projects, show the empty screen component
    if (!sortedProjects || sortedProjects.length === 0) {
        return (
            <div className="w-full">
                <ProjectsEmptyScreen />
            </div>
        );
    }

    return(
        <ul className=" overflow-auto flex gap-4 flex-wrap mt-6 max-sm:grid max-sm:grid-cols-1">
            {sortedProjects.map((project) => (
                <SingleProjectCard key={project.id} project={project} />
            ))}
        </ul>
    );
}

export default AllProjectsSection;