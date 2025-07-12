// src/app/models/user.model.ts
export interface User {
  id?: number;
  username: string;
  password: string;
  role: 'READER' | 'WRITER' | 'ADMIN';
}
