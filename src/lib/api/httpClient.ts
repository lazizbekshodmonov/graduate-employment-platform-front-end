import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useToast } from '../../context/toastContext.tsx';

type HttpClientOptions<T = unknown> = {
  url: string;
  data?: T;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  open?: boolean;
  pk?: string | number;
};

type Lang = 'uz' | 'en' | 'ru' | 'cyr';

// interface CustomAxiosRequestConfig extends AxiosRequestConfig {
//   _retry?: boolean;
// }

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/`,
  timeout: 5000,
  headers: {
    'Content-type': 'application/json',
  },
});

export function httpClient<T = unknown, R = unknown>(
  options: HttpClientOptions<T>
): Promise<AxiosResponse<R>> {
  const access_token = localStorage.getItem('access_token');
  const lang: Lang = (localStorage.getItem('lang') as Lang) || 'uz';

  const config: AxiosRequestConfig = {
    ...options,
    url: options.pk ? `${options.url}/${options.pk}` : options.url,
    method: options.method || 'GET',
    headers: {
      hl: lang,
      ...(options.headers || {}),
      ...(options.open ? {} : { Authorization: `Bearer ${access_token}` }),
    },
  };

  return instance(config);
}

instance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      const { setToast } = useToast();
      setToast({
        type: 'error',
        message: error.message,
      });
    }

    // const originalRequest: CustomAxiosRequestConfig | undefined = error.config;
    //&& originalRequest?._retry
    if (error.response?.status === 401) {
      const response = await refreshToken();

      const { access_token, refresh_token } = response.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      return instance({
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    }

    return Promise.reject(error);
  }
);

function refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    clear();
  }
  return instance.post('/auth/token', {
    refresh_token: refreshToken,
    grant_type: 'REFRESH_TOKEN',
  });
}

function clear() {
  localStorage.clear();
  window.location.replace('/');
}
