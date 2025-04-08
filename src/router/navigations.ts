import AuthLayout from '../layouts/AuthLayout.tsx';

export const dashboardRoutes = [
  {
    path: '/auth',
    name: 'Auth',
    component: AuthLayout,
    redirect: 'login',
  },
];
