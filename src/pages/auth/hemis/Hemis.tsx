import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getAccessTokenWithHemisOauth } from '../../../services/auth.api.ts';

export default function Hemis() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const redirect_uri = searchParams.get('redirect_uri');

  useEffect(() => {
    const register = async () => {
      try {
        if (code && redirect_uri) {
          const { data } = await getAccessTokenWithHemisOauth(
            code,
            redirect_uri
          );
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);

          navigate('/dashboard');
        }
      } catch (error) {
        console.log(error);
      }
    };
    register();
  }, [navigate, redirect_uri, code]);
  return <></>;
}
