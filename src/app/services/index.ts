import { HttpHeaders } from '@angular/common/http';

export * from './authentication.service';
export * from './token.service';
export * from './user.service';
export * from './friends.service';
export * from './groups.service';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
