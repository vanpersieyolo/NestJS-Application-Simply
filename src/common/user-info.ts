import { Expose } from 'class-transformer';

export class UserInfo {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  access_token?: string;
}
