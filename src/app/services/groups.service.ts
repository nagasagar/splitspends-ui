import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {httpOptions} from './index';
import { GroupInfo } from '../add-group-modal/group-info';
import { Group } from '../models/group';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {


  constructor(private http: HttpClient) {
  }

  getUserGroups(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/groups', httpOptions);
  }

  getGroupByID(id: number): Observable<Group> {
    const url = `${environment.apiUrl}/groups/${id}`;
    return this.http.get<any>(url, httpOptions);
  }

  createGroup(info: GroupInfo): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/groups', info, httpOptions);
  }

  deleteGroupByID(id: number): Observable<any> {
    const url = `${environment.apiUrl}/groups/${id}`;
    return this.http.delete<any>(url, httpOptions);
  }

  addMemberToGroup(group: Group, member: User): Observable<any> {
    const url = `${environment.apiUrl}/groups/${group.id}/addmember`;
    return this.http.post<any>(url, member, httpOptions);
  }

  removeMemberFromGroup(group: Group, member: User): Observable<any> {
    const url = `${environment.apiUrl}/groups/${group.id}/removemember`;
    return this.http.post<any>(url, member, httpOptions);
  }

}
