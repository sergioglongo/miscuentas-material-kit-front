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
  user_unit: any;
}

export interface IUnit {
  id: number;
  name: string;
  description?: string | null;
  photo?: string | null;
  is_premium?: boolean;
  last_change_date?: Date | null;
  is_active?: boolean;
  is_main_unit?: boolean;
  deleted: boolean;
  created_at?: Date | null;
  updated_at?: Date | null;
  user_unit?: any;
}

export interface IUserState {
  userData: IUser;
  isAuthorized: boolean;
  accessToken: string;
}
export enum InOutType {
  in = 'in',
  out = 'out',
}
export interface IArea {
  id: number;
  name: string;
  description?: string | null;
  color?: string | null;
  icon?: string | null;
  type: InOutType;
  default?: boolean;
  deleted: boolean;
  is_active?: boolean;
  created_at?: Date | null;
  updated_at?: Date | null;
  unitId?: number;
}
export interface ICategory {
  id: number;
  name: string;
  description?: string | null;
  color?: string | null;
  icon?: string | null;
  default?: boolean;
  deleted: boolean;
  type?: string;
  is_active?: boolean;
  created_at?: Date | null;
  updated_at?: Date | null;
  areaId?: number;
}
enum AccountType {
  bank = 'bank',
  electronic = 'electronic',
  cash = 'cash',
  debt = 'debt',
  other = 'other',
}
enum AccountCurrency {
  Pesos = 'Pesos',
  Dolar = 'Dolar',
  Euro = 'Euro',
}
export interface IAccount {
  id: number;
  name: string;
  balance?: number;
  currency: AccountCurrency;
  type: AccountType;
  deleted?: boolean;
  is_active?: boolean;
  created_at?: Date | null;
  updated_at?: Date | null;
  unitId?: number;
}
enum PayMethodMethods {
  debit = 'debit',
  credit = 'credit',
  cash = 'cash',
  transfer = 'transfer',
  other = 'other',
}
export interface IPayMethod {
  id: number;
  name: string;
  method?: PayMethodMethods;
  type?: InOutType;
  excluded?: boolean;
  deleted?: boolean;
  is_active?: boolean;
  created_at?: Date | null;
  updated_at?: Date | null;
  accountId?: number;
}

export interface ITransaction {
  id: number;
  name: string;
  description?: string | null;
  amount: number;
  discount?: number;
  type?: InOutType;
  date?: string;
  deleted?: boolean;
  created_at?: Date | null;
  updated_at?: Date | null;
  categoryId?: number;
  unitId?: number;
  payMethodId?: number;
}