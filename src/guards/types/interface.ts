import { JwtPayload } from 'jwt-decode';

export interface Auth0JwtPayload extends JwtPayload {
  scope: string;
}
