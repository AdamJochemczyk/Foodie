export interface User {
  email: string;
  password: string;
}
export interface CreateUser extends User {
  name: string;
  surname: string;
  avatar: File | null;
}
export interface NewUser {
  id: string;
  name: string;
  surname: string;
  avatar: File | null;
}
