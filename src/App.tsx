import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './pages/auth/login/Login.tsx';
import AuthLayout from './layouts/AuthLayout.tsx';
import { ConfigProvider } from 'antd';
import theme from './lib/ant/theme.ts';

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
