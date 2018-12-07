import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('noUser') noUser: ElementRef;
  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(form: NgForm) {
    this.authService.signInUser(form.value.tbEmail, form.value.tbPsw)
    .subscribe((response) => {
      const user = response.body.user;

      if (response.status === 200 && response.headers.has('authorization')) {
        const token = response.headers.get('authorization');
        console.log(token);
        this.authService.setToken(token);
        this.noUser.nativeElement.style.display = 'none';
        this.router.navigate(['']);
      }
      if (response.status === 400) {
        this.noUser.nativeElement.innerText = 'User with specified email and password does not exist';
        this.noUser.nativeElement.style.display = 'block';
        this.authService.setToken(null);
      }
    },
    (error) => {
      this.noUser.nativeElement.innerText = error;
      this.noUser.nativeElement.style.display = 'block';
    });
  }
  onReset(form: NgForm) {
    form.reset();
    this.noUser.nativeElement.style.display = 'none';
  }
}
