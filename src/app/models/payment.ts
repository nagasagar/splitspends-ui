import { User } from './user';
import { Expense } from './expense';

export class Payment {
  id: number;
  amount: number;
  expense: Expense;
  payee: User;
  constructor(id: number, detail: string, amount: number,  expense: Expense, payee: User) {
    this.id = id;
    this.amount = amount;
    this.expense = expense;
    this.payee = payee;
  }
}
