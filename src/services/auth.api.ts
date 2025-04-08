import { httpClient } from '../lib/api/httpClient.ts';
import { GrantTypeEnum } from '../enums';
import { LoginCredentials, TokenResponse } from '../types';

export function getAccessToken(username: string, password: string) {
  console.log('getAccessToken', username, password, GrantTypeEnum.PASSWORD);
  return httpClient<LoginCredentials, TokenResponse>({
    url: '/auth/token',
    method: 'POST',
    data: {
      username,
      password,
      grant_type: GrantTypeEnum.PASSWORD,
    },
  });
}
