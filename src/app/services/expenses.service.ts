import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {httpOptions} from './index';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  constructor(private http: HttpClient) {
  }

  getUserExpensess(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/expenses', httpOptions);
  }
}
