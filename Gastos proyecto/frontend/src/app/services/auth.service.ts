import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: number;
    username: string;
    role: 'ADMIN' | 'USER';
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:3000/api/auth/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, { username, password });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : null;
  }
}