import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {httpOptions} from './index';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  constructor(private http: HttpClient) {
  }

  getUserExpensess(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/expenses', httpOptions);
  }

  addExpense(expense: Expense): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/expenses', expense, httpOptions);
  }

  deleteExpenseByID(id: number): Observable<any> {
    const url = `${environment.apiUrl}/expenses/${id}`;
    return this.http.delete<any>(url, httpOptions);
  }
}
