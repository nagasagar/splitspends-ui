import { Component, OnInit } from '@angular/core';
import { TokenService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean;
  constructor(private tokenService: TokenService) {
  }
  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isAuthenticated = true;
    }
  }
}

