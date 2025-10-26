# Quantum Ops - Agency Control Hub Dashboard

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/LXMachado/quantum-ops)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.18.0-blue.svg)](https://www.prisma.io/)
[![Neon](https://img.shields.io/badge/Neon-Postgres-green.svg)](https://neon.tech/)

A full-stack web application for managing an AI agency's operations, including clients, projects, jobs, and calendar scheduling. Built with a modern tech stack for scalability, security, and performance.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Dashboard Overview**: Central hub displaying key metrics such as monthly revenue, active clients, pipeline velocity, and more. Includes interactive charts for revenue trajectory and performance insights.
- **Calendar Management**: Integrated calendar for scheduling and event management using React Big Calendar. Supports drag-and-drop for easy event handling.
- **Client Management**: Comprehensive client tracking system to manage client information, interactions, and history.
- **Project Tracking**: Monitor ongoing and completed projects with detailed views and status updates.
- **Job Listings**: Manage job postings, applications, and related data efficiently.
- **User Authentication**: Secure login and registration system with routing to protected areas.
- **Responsive Design**: Fully responsive layout optimized for desktop, tablet, and mobile devices using Tailwind CSS.
- **Drag and Drop**: Interactive elements powered by @dnd-kit for sortable lists and enhanced user experience.
- **Data Visualization**: Advanced charts and graphs using Recharts for insights into performance, sentiment, and growth metrics.
- **Theme Support**: Built-in theme context for potential dark/light mode switching (expandable for customization).
- **Real-time Updates**: Simulated real-time data updates for metrics like revenue and client sentiment.

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript for type-safe development
- **Build Tool**: Vite for fast development and optimized building
- **Styling**: Tailwind CSS for utility-first, responsive CSS
- **State Management**: Redux Toolkit with RTK Query for API state and caching
- **Routing**: React Router DOM for seamless client-side navigation
- **Icons**: Lucide React for consistent and scalable iconography
- **Calendar**: React Big Calendar for robust scheduling features
- **Charts**: Recharts for interactive data visualization
- **Drag and Drop**: @dnd-kit for sortable and draggable components
- **Date Handling**: date-fns for efficient date utilities
- **Linting**: ESLint with TypeScript support for code quality

### Backend
- **Runtime**: Node.js with Express.js for the API server
- **Language**: TypeScript for type-safe backend development
- **ORM**: Prisma for database access and migrations
- **Database**: PostgreSQL (Neon) for serverless, scalable data storage
- **Authentication**: JWT (JSON Web Tokens) with bcryptjs for secure password hashing
- **Validation**: Zod for schema validation
- **CORS**: Configured for cross-origin requests

### Development Tools
- **Linting**: ESLint with TypeScript support
- **Code Quality**: Prettier for consistent formatting
- **Version Control**: Git with comprehensive .gitignore for sensitive files

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js**: Version 16 or higher (recommended: LTS version)
- **npm**: Comes with Node.js, or use yarn/pnpm as alternatives
- **Git**: For cloning the repository

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/LXMachado/quantum-ops.git
   cd quantum-ops
   ```

2. **Set Up Frontend**:
   ```bash
   # Install frontend dependencies
   npm install
   # Set up environment variables
   cp .env.local.example .env.local  # Update VITE_API_BASE_URL if needed
   ```

3. **Set Up Backend**:
   ```bash
   cd agency-dashboard-api
   # Install backend dependencies
   npm install
   # Set up environment variables
   cp .env.example .env  # Update DATABASE_URL with your Neon connection string
   # Run database migrations
   npx prisma migrate dev --name init
   ```

4. **Run Development Servers**:
   ```bash
   # Terminal 1: Frontend
   npm run dev  # Runs on http://localhost:5173
   # Terminal 2: Backend
   cd agency-dashboard-api && npm run dev  # Runs on http://localhost:4000
   ```

## Environment Variables

### Frontend (.env.local)
```
VITE_API_BASE_URL=http://localhost:4000/api/v1/
```

### Backend (agency-dashboard-api/.env)
```
DATABASE_URL="postgresql://default:uUBSA51HLsJh@ep-summer-cherry-a7fn9kcp-pooler.ap-southeast-2.aws.neon.tech/verceldb?sslmode=require&channel_binding=require"
JWT_SECRET="your-secret-key"
CORS_ORIGIN="http://localhost:5173"
NODE_ENV="development"
PORT=4000
```

## API Documentation

The backend provides a REST API with the following endpoints:

- **Health**: `GET /api/v1/health`
- **Auth**: `POST /api/v1/auth/register`, `POST /api/v1/auth/login`
- **Clients**: `GET /api/v1/clients`, `POST /api/v1/clients`
- **Jobs**: `GET /api/v1/jobs`, `POST /api/v1/jobs`
- **Projects**: `GET /api/v1/projects`, `POST /api/v1/projects`
- **Events**: `GET /api/v1/events`, `POST /api/v1/events`

See `agency-dashboard-api/openapi.yaml` for detailed OpenAPI specification.

## Usage

- **Navigation**: Use the sidebar to navigate between sections like Dashboard, Calendar, Clients, Jobs, and Projects. The sidebar is collapsible for better space utilization.
- **Authentication**: Access the login page at `/login` and register at `/register`. Upon successful login, you'll be redirected to the dashboard.
- **Customization**: The app uses a theme context for potential dark/light mode switching. You can extend this by modifying `src/contexts/ThemeContext.tsx`.
- **Interacting with Features**:
  - **Dashboard**: View key metrics, generate reports, and access quick actions like "Generate Live Pulse" or "Share Snapshot".
  - **Calendar**: Add, edit, or delete events with drag-and-drop support.
  - **Clients/Jobs/Projects**: Manage data with forms and lists; supports sorting and filtering.
- **Responsive Behavior**: Test on different screen sizes to see adaptive layouts.

## Scripts

### Frontend
- `npm run dev`: Start the development server with hot reloading.
- `npm run build`: Build the project for production (outputs to `dist/` folder).
- `npm run lint`: Run ESLint to check for code issues and enforce standards.
- `npm run preview`: Preview the production build locally.

### Backend
- `npm run dev`: Start the development server with hot reloading (in agency-dashboard-api/).
- `npm run build`: Build the project for production.
- `npm run start`: Start the production server.

## Deployment

### Frontend (Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist/` folder to Netlify.
3. Set environment variable: `VITE_API_BASE_URL=https://your-backend-url/api/v1/`

### Backend (Railway/Render)
1. Push the `agency-dashboard-api/` directory to your hosting service.
2. Set environment variables from `agency-dashboard-api/.env`.
3. Ensure the database URL points to your Neon instance.

## Project Structure

```
├── src/                 # Frontend source code
│   ├── components/      # React components
│   │   ├── Calendar.tsx # Calendar view with event management
│   │   ├── Clients.tsx  # Client management interface
│   │   ├── Dashboard.tsx# Main dashboard with metrics
│   │   ├── Header.tsx   # Top header with navigation
│   │   ├── Jobs.tsx     # Job listings and management
│   │   ├── Layout.tsx   # Layout wrapper for routing
│   │   ├── Login.tsx    # Login page
│   │   ├── Projects.tsx # Project tracking
│   │   ├── Register.tsx # Registration page
│   │   └── Sidebar.tsx  # Navigation sidebar
│   ├── contexts/        # React contexts
│   │   └── ThemeContext.tsx # Theme management (light/dark mode)
│   ├── services/        # API services
│   │   └── api.ts       # RTK Query API definitions
│   ├── store.ts         # Redux store configuration
│   ├── App.tsx          # Main app component with routing
│   ├── main.tsx         # Entry point for React app
│   └── index.css        # Global styles and Tailwind imports
├── agency-dashboard-api/ # Backend source code
│   ├── src/             # Backend source code
│   │   ├── routes/      # API route handlers
│   │   │   ├── auth.ts  # Authentication routes
│   │   │   ├── clients.ts # Client management routes
│   │   │   ├── jobs.ts  # Job management routes
│   │   │   ├── projects.ts # Project management routes
│   │   │   └── events.ts # Event management routes
│   │   └── index.ts     # Express server entry point
│   ├── prisma/          # Database schema and migrations
│   │   ├── schema.prisma # Prisma schema definitions
│   │   └── migrations/  # Database migration files
│   ├── openapi.yaml     # API specification
│   └── .env             # Backend environment variables
├── .env.local           # Frontend environment variables
└── README.md            # This file
```

## Screenshots

Below is a screenshot of the main dashboard, showcasing the key metrics, charts, and navigation elements.

![Dashboard Screenshot](https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=Quantum+Ops+Dashboard)
*The Quantum Ops Command Center dashboard with real-time metrics, interactive charts, and intuitive navigation for managing agency operations. (Replace with actual screenshot: dashboard-screenshot.png)*

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Make your changes and ensure they pass linting (`npm run lint`).
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
5. Push to the branch (`git push origin feature/AmazingFeature`).
6. Open a Pull Request with a clear description of changes.

Please follow the existing code style and add tests if applicable.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions, support, or suggestions, please open an issue on GitHub or contact the maintainer at [info@alexandremachado.com.au].

---

Built with ❤️ using React, TypeScript, and Vite.
