import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <>
      <h1>Login</h1>
      <Outlet />
    </>
  );
};

export default AuthLayout;
