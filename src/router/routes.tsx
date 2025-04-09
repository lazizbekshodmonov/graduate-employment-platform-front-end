import { BrowserRouter, Routes } from 'react-router-dom';
import AuthRoutes from './AuthRoutes.tsx';

export default function routes() {
  return (
    <BrowserRouter>
      <Routes></Routes>
      <AuthRoutes />
    </BrowserRouter>
  );
}
