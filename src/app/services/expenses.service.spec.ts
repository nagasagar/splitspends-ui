import { TestBed } from '@angular/core/testing';

import { ExpensesService } from './expenses.service';

describe('ExpensesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: ExpensesService = TestBed.get(ExpensesService);
    expect(service).toBeTruthy();
  });
});
