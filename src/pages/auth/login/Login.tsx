import React, { ChangeEvent, useState } from 'react';
import { getAccessToken } from '../../../services/auth.api.ts';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import './login.module.css';

export function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await getAccessToken(username, password);

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="login-form-card">
      <Form>
        <FormItem>
          <Input
            size={'large'}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
        </FormItem>
        <FormItem>
          <Input
            size={'large'}
            type="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </FormItem>
        <FormItem>
          <Button size={'large'} onClick={handleSubmit} type="primary">
            Submit
          </Button>
        </FormItem>
      </Form>
    </Card>
  );
}
