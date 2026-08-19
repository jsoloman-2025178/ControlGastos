import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
  private expiryTimer: ReturnType<typeof setTimeout> | null = null;
  sessionExpired = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.scheduleExpiryRedirect();
  }

  login(username: string, password: string): Observable<LoginResponse> {
    this.sessionExpired = false;
    return this.http.post<LoginResponse>(this.loginUrl, { username, password });
  }

  logout(): void {
    this.clearExpiryTimer();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  onSessionExpired(): void {
    this.sessionExpired = true;
    this.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : null;
  }

  scheduleExpiryRedirect(): void {
    this.clearExpiryTimer();
    const exp = this.getTokenExpiration();
    if (exp === null) {
      return;
    }

    const delay = Math.max(0, exp - Date.now());
    this.expiryTimer = setTimeout(() => {
      this.onSessionExpired();
    }, delay);
  }

  private getTokenExpiration(): number | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    const base64Url = token.split('.')[1];
    if (!base64Url) {
      return null;
    }

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');

    try {
      const payload = JSON.parse(atob(padded));
      return typeof payload.exp === 'number' ? payload.exp * 1000 : null;
    } catch {
      return null;
    }
  }

  private clearExpiryTimer(): void {
    if (this.expiryTimer !== null) {
      clearTimeout(this.expiryTimer);
      this.expiryTimer = null;
    }
  }
}