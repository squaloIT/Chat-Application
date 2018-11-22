import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    // this.httpClient.get('http://localhost:3000/users').subscribe( (users) => {
    //   console.log(users);
    // });
  }
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
  onLogout() {
    this.authService.logOut();
    // this.loggedIn = false;
    this.router.navigate(['./../auth/login']);
  }
}
