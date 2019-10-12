import { User } from './user';
import { Group } from './group';
import { Payment } from './payment';
import { Share } from './share';
export class Expense {
  id: number;
  detail: string;
  amount: number;
  group: Group;
  payments: Payment[];
  shares: Share[];
  author: User;
  constructor(id: number, detail: string, amount: number,  group: Group, payments: Payment[], shares: Share[]) {
    this.id = id;
    this.detail = detail;
    this.amount = amount;
    this.group = group;
    this.payments = payments;
    this.shares = shares;
  }
}
