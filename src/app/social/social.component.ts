import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  fburl = environment.facebookAuthUrl;
  googleurl = environment.googleAuthUrl;

  constructor() { }

  ngOnInit() {
  }

}
