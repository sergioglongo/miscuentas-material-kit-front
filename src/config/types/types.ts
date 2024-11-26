export interface IUser {
  id: number;
  firstname: string | null;
  lastname: string | null;
  email: string;
  photo?: string | null;
  restore_code?: string | null;
  google_id: string | null;
  google_access_token?: string | null;
  google_refresh_token?: string | null;
  google_token_expires?: Date | null;
  register_date?: Date | null;
  last_login_date?: Date | null;
  type?: string | null;
  permissions?: { [key: string]: any } | null;
  is_active?: boolean;
  is_premium?: boolean;
}