import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../user/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.authService.onAuth.subscribe((uid) => {
      // tslint:disable-next-line:max-line-length
      this.httpClient.get(`https://chatapp-with-angular.firebaseio.com/users/${uid}.json`).subscribe((user: User) => {
        this.user = user;
      });
    });
  }
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
