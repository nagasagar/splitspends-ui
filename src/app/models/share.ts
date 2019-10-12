import { User } from './user';
import { Expense } from './expense';

export class Share {
  id: number;
  amount: number;
  expense: Expense;
  spender: User;
  constructor(id: number, detail: string, amount: number,  expense: Expense, spender: User) {
    this.id = id;
    this.amount = amount;
    this.expense = expense;
    this.spender = spender;
  }
}
