import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('noUser') noUser: ElementRef;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    this.authService.signInUser(form.value.tbEmail, form.value.tbPsw).then( (token) => {
      this.authService.setToken(token);
      this.router.navigate(['']);
    }).catch((error) => {
      this.authService.setToken(null);
      this.noUser.nativeElement.innerText = error;
    });

    if (this.authService.getToken() == null) {
      this.noUser.nativeElement.style.display = 'block';
    } else {
      this.noUser.nativeElement.style.display = 'none';
    }
  }
  onReset(form: NgForm) {
    form.reset();
    this.noUser.nativeElement.style.display = 'none';
  }
}
