import { v4 as uuidv4 } from 'uuid';

export type Task = {
    id: string;
    title: string;
    icon: string;
    projectName: string;
    status: 'In Progress' | 'Completed';
    priority: 'Low' | 'Medium' | 'High';
    createdAt: string;
    dueDate: string;
};

export type Project = {
    id: string;
    clerkUserId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    icon: string;
    tasks: Task[];
};

// sample projects data
export const projectsData: Project[] = [
    {
        id: uuidv4(),
        clerkUserId: '123',
        title: 'Project Title',
        createdAt: '2024-06-01T10:00:00Z',
        updatedAt: '2024-06-01T10:00:00Z',
        icon: 'FolderIcon',
        tasks: [
            {
                id: uuidv4(),
                title: 'Design Homepage',
                icon: 'DesignServicesIcon',
                projectName: 'Project Title',
                status: 'In Progress',
                priority: 'High',
                createdAt: '2024-06-01T10:00:00Z',
                dueDate: '2024-06-10T10:00:00Z',
            },
            {
                id: uuidv4(),
                title: 'Develop API',
                icon: 'CodeIcon',
                projectName: 'Project Title',
                status: 'Completed',
                priority: 'Medium',
                createdAt: '2024-06-02T11:00:00Z',
                dueDate: '2024-06-15T11:00:00Z',
            },
            {
                id: uuidv4(),
                title: 'Testing and QA',
                icon: 'BugReportIcon',
                projectName: 'Project Title',
                status: 'In Progress',
                priority: 'Low',
                createdAt: '2024-06-03T12:00:00Z',
                dueDate: '2024-06-20T12:00:00Z',
            },
        ],
    },
];