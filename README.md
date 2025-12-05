# Project Manager

A full-stack task and project management application built with React, Next.js, and TypeScript. Organize your projects, manage tasks, and track progress with an intuitive interface.

![Project Manager](https://img.shields.io/badge/Next.js-16.0.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=flat-square&logo=tailwind-css)

## Features

- **Project Management**: Create, edit, and organize multiple projects with custom icons
- **Task Organization**: Add tasks to projects with priority levels (Low, Medium, High)
- **Dynamic Sorting**: Sort projects and tasks by name (A-Z, Z-A) or date (Newest, Oldest)
- **Status Tracking**: Track task progress with three statuses (In Progress, Completed, On Hold)
- **Statistics Dashboard**: Real-time visualization of project completion rates and task metrics
- **Responsive Design**: Fully responsive UI that works on desktop and mobile devices
- **Data Persistence**: Local storage integration for seamless data retention across sessions
- **Custom Icons**: Choose from 30+ icons to personalize your projects

## Tech Stack

- **Framework**: Next.js 16.0.0 with Turbopack
- **Language**: TypeScript
- **UI Library**: React 18+
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Form Handling**: react-hook-form with Zod validation
- **Icons**: Material-UI Icons
- **Data Visualization**: react-circular-progressbar
- **Notifications**: react-hot-toast

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Pramag08/Mr.-Manager.git
cd Mr.-Manager
```

2. Navigate to the app directory:

```bash
cd my-app
```

3. Install dependencies:

```bash
npm install
# or
yarn install
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
my-app/
├── app/
│   ├── Components/
│   │   ├── Data/           # Data models and types
│   │   ├── sidebar.tsx     # Navigation sidebar
│   │   └── Windows/        # Modal windows (Tasks, Projects, Icons)
│   ├── Pages/
│   │   ├── AllProjects/    # Projects page components
│   │   ├── AllTasks/       # Tasks page components
│   │   └── ContextApp.tsx  # Global state management
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── public/                 # Static assets
└── package.json           # Dependencies
```

## Key Components

### Context Management

- **ContextApp**: Centralized state management using React Context API
- Manages projects, tasks, icons, sorting options, and UI states

### Main Pages

- **All Projects**: Grid view of all projects with completion statistics
- **All Tasks**: List view of all tasks with filtering and sorting

### Modal Windows

- **TasksWindow**: Create and edit tasks with priority and project assignment
- **ProjectWindow**: Create and edit projects with custom icons
- **IconWindow**: Select icons for projects

## Features in Detail

### Sorting System

- Sort by Name: A-Z or Z-A alphabetically
- Sort by Date: Newest or Oldest based on creation time
- Applied to both projects and tasks independently

### Statistics Tracking

- Project completion percentage (circular progress bar)
- Total completed projects count
- Total completed tasks count
- List of completed projects with task counts

### Task Management

- Assign tasks to specific projects
- Set priority levels (Low, Medium, High)
- Update task status (In Progress, Completed, On Hold)
- Edit and delete existing tasks

### Project Management

- Create projects with custom names and icons
- View all tasks within a project
- Edit project details
- Delete projects (with confirmation)

## Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Author

**Pramag Basantia**

- Email: pramag24421@iiitd.ac.in
- GitHub: [@Pramag08](https://github.com/Pramag08)

## Acknowledgments

- Material-UI for the icon library
- Tailwind CSS for the utility-first styling approach
- Next.js team for the excellent framework
