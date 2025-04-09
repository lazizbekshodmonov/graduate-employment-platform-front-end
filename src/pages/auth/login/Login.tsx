import React, { ChangeEvent, useState } from 'react';
import { getAccessToken } from '../../../services/auth.api.ts';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import './login.module.css';
import logo from './../../../assets/image/hemis-log.png';

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await getAccessToken(username, password);
      setLoading(false);
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      navigate('/dashboard');
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const loginWithHemis = () => {
    window.location.replace(
      `${import.meta.env.VITE_HEMIS_URL}/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_HEMIS_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_SERVER_URL}/auth/hemis`
    );
  };

  return (
    <Card className="w-[480px]">
      <h1 className="text-2xl mb-4 text-center font-bold">Tizimga kirish</h1>
      <Form layout={'vertical'}>
        <FormItem label={'Foydalanuvchi nomi'}>
          <Input
            size={'large'}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
        </FormItem>
        <FormItem label={'Parol'}>
          <Input
            size={'large'}
            type="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </FormItem>
        <FormItem>
          <Button
            onClick={handleSubmit}
            loading={loading}
            className="w-full"
            size={'large'}
            type="primary"
          >
            Submit
          </Button>
        </FormItem>
      </Form>
      <div className={'flex justify-center'}>
        <Button
          onClick={loginWithHemis}
          size={'large'}
          type="default"
          icon={<img className="w-6" src={logo} alt={'hemi logo'} />}
        >
          Hemis orqali kirish
        </Button>
      </div>
    </Card>
  );
}
