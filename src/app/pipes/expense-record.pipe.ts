import { Pipe, PipeTransform } from '@angular/core';
import { Expense } from '../models/expense';
import { AuthenticationService, TokenService } from '../services';
import { Payment } from '../models/payment';
import { Share } from '../models/share';

@Pipe({
  name: 'expenseRecord'
})
export class ExpenseRecordPipe implements PipeTransform {
  userPayments: Payment[];
  userShares: Share[];

  constructor(
    public authService: AuthenticationService,
    public tokenService: TokenService) { }

  transform(expense: Expense): string {
    const currentUserId = this.tokenService.getCurrentUserId();
    const paymentTotal = expense.payments.filter(payment => {
      return (payment.payee.id === currentUserId);
    }).reduce((prev, cur) => {
      return prev + cur.amount;
    }, 0);
    const shareTotal = expense.shares.filter(share => {
      return (share.spender.id === currentUserId);
    }).reduce((prev, cur) => {
      return prev + cur.amount;
    }, 0);
    const diff = paymentTotal - shareTotal;
    if ( diff > 0) {
      return '<font color="green">+' + diff + '</font>';
    } else {
      return '<font color="red">' + diff + '</font>';
    }
  }


}
