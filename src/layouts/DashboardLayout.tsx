import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className={'w-screen h-screen flex justify-center items-center'}>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
