export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  birthdate: Date;
  dateOfJoining: Date;
  isAdmin: boolean;
}
