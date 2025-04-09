import { ConfigProvider } from 'antd';
import theme from './lib/ant/theme.ts';
import { AppRoutes } from './router/AppRoutes.tsx';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <ConfigProvider theme={theme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
