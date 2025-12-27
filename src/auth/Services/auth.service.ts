import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Example: roles come from decoded JWT
  private userRoles: string[] = [];
  private baseUrl = 'https://localhost:44391/api/Auth';

  constructor(private http: HttpClient) {
    this.loadRoles();
  }

  loadRoles() {
    const token = localStorage.getItem('token'); 
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userRoles = payload.roles || [];
    }
  }

  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(r => this.hasRole(r));
  }

  login(data: any) {
    const apiurl = `${this.baseUrl}/Login`;
    return this.http.post(apiurl, data);
  }

  register(data: any) {
    const apiurl = `${this.baseUrl}/register`;
    return this.http.post(apiurl, data);
  }
}
