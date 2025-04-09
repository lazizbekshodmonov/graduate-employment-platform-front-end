import { GrantTypeEnum } from '../enums';

export type LoginCredentials = {
  username: string;
  password: string;
  grant_type?: GrantTypeEnum;
};
export type HemisOauthCredentials = {
  code: string;
  redirect_url: string;
};

export type TokenResponse = {
  access_token: string;
  refresh_token: string;
  access_expires: number;
  refresh_expires: number;
};
