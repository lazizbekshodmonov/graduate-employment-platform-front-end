import { Route, Routes } from 'react-router-dom';
import Login from '../pages/auth/login/Login.tsx';
import Hemis from '../pages/auth/hemis/Hemis.tsx';

export default function AuthRoutes() {
  return (
    <Routes location={'/auth'}>
      <Route path={'/login'} element={<Login />}></Route>
      <Route path={'/hemis'} element={<Hemis />}></Route>
    </Routes>
  );
}
