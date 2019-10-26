import { ExpenseRecordPipe } from './expense-record.pipe';
import { TestBed, inject } from '@angular/core/testing';
import { TokenService, AuthenticationService } from '../services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

describe('ExpenseRecordPipe', () => {
  let authService: AuthenticationService ;
  let tokenService: TokenService ;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot([])],
      providers: [TokenService, AuthenticationService]
    });
    authService = TestBed.get(AuthenticationService);
    tokenService = TestBed.get(TokenService);
  });

  it('create an instance', () => {
    const pipe = new ExpenseRecordPipe(authService, tokenService);
    expect(pipe).toBeTruthy();
  });
});
