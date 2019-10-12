import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenService } from '../services';
import { AuthLoginInfo } from '../login/login-info';
import { RegisterInfo } from '../register/register-info';
import { User } from '../models/user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authChange = new Subject<boolean>();
  authError = new Subject<string>();

  constructor(private http: HttpClient, private tokenStorage: TokenService) {
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(environment.apiUrl + '/users/me', httpOptions);
  }

  attempAuth(credentials: AuthLoginInfo): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/auth/login', credentials, httpOptions);
  }

  register(info: RegisterInfo): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/auth/signup', info, httpOptions);
  }
  logout() {
    this.authChange.next(false);
    this.tokenStorage.logout();
  }


}
