import { ExpenseRecordPipe } from './expense-record.pipe';

describe('ExpenseRecordPipe', () => {
  it('create an instance', () => {
    const pipe = new ExpenseRecordPipe();
    expect(pipe).toBeTruthy();
  });
});
