import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_KEY, USERNAME_KEY, AUTHORITIES_KEY, EMAIL_KEY, IMAGE_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router) { }

  public logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  public saveToken(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(name: string) {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.setItem(USERNAME_KEY, name);
  }

  public getUsername(): string {
    return localStorage.getItem(USERNAME_KEY);
  }

  public saveEmail(email: string) {
    localStorage.removeItem(EMAIL_KEY);
    localStorage.setItem(EMAIL_KEY, email);
  }

  public getEmail(): string {
    return localStorage.getItem(EMAIL_KEY);
  }

  public saveAuthority(role: string) {
    localStorage.removeItem(AUTHORITIES_KEY);
    localStorage.setItem(AUTHORITIES_KEY, role);
  }

  public getAuthority(): string {
    return localStorage.getItem(AUTHORITIES_KEY);
  }

  public saveImageUrl(url: string) {
    localStorage.removeItem(IMAGE_URL);
    localStorage.setItem(IMAGE_URL, url);
  }

  public getImageUrl(): string {
    return localStorage.getItem(IMAGE_URL);
  }
}
