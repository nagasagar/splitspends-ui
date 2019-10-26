import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {httpOptions} from './index';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http: HttpClient) {
  }

  getUserFriends(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/friends', httpOptions);
  }

  addUserFriend(user: User): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/addfriend', user, httpOptions);
  }

  removeUserFriend(user: User): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/removefriend', user , httpOptions);
  }
}
