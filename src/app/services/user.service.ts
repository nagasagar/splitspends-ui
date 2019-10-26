import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService, TokenService } from '../services';
import { environment } from '../../environments/environment';
import {httpOptions} from './index';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private auth: AuthenticationService, private tokenService: TokenService, private http: HttpClient) { }


  saveUserProfile() {
    this.auth.getUserProfile().subscribe(
      data => {
        this.tokenService.saveUsername(data.name);
        this.tokenService.saveEmail(data.email);
        this.tokenService.saveImageUrl(data.imageUrl);
        this.tokenService.saveCurrentUserId(data.id);
      },
      error => {
        console.log(error);
      }
    );
  }

  findByEmailID(email: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/users/email?email=' + email, httpOptions);
  }

}
