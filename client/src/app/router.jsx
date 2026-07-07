import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import LoginPage from "@/features/auth/pages/LoginPage";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import ProtectedRoute from "@/routes/ProtectedRoute";
import TasksPage from "@/features/tasks/pages/TasksPage";
import HabitsPage from "@/features/habits/pages/HabitsPage";
import CalendarPage from "@/features/calendar/pages/CalendarPage";
import GoalsPage from "@/features/goals/pages/GoalsPage";
import NotesPage from "@/features/notes/pages/NotesPage";
import SettingsPage from "@/features/settings/pages/SettingsPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
          path: "tasks",
          element: <TasksPage />,
      },
      {
          path: "habits",
          element: <HabitsPage />,
      },
      {
          path: "calendar",
          element: <CalendarPage />,
      },
      {
          path: "goals",
          element: <GoalsPage />,
      },
      {
          path: "notes",
          element: <NotesPage />,
      },
      {
          path: "settings",
          element: <SettingsPage />,
      },
    ],
  },
]);

export default router;