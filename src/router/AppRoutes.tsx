import { useRoutes } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout.tsx';
import Login from '../pages/auth/login/Login.tsx';
import Hemis from '../pages/auth/hemis/Hemis.tsx';
import DashboardLayout from '../layouts/DashboardLayout.tsx';
import { Employers } from '../pages/dashboard/employers/Employers.tsx';

export function AppRoutes() {
  return useRoutes([
    {
      path: 'auth',
      element: <AuthLayout />,
      children: [
        {
          index: true,
          path: 'login',
          element: <Login />,
        },
        {
          path: 'hemis',
          element: <Hemis />,
        },
      ],
    },
    {
      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
        {
          path: 'employers',
          element: <Employers />,
        },
      ],
    },
  ]);
}
