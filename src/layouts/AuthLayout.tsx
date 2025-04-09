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
    <div className={'w-screen h-screen flex justify-center items-center'}>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
