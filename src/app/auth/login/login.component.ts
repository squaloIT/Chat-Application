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
    const errorOrTrue = this.authService.signInUser(form.value.tbEmail, form.value.tbPsw);
    if (errorOrTrue) {
      this.noUser.nativeElement.style.display = 'none';
      this.router.navigate(['']);
    } else {
      this.noUser.nativeElement.innerText = errorOrTrue;
      this.noUser.nativeElement.style.display = 'block';
    }
  }
  onReset(form: NgForm) {
    form.reset();
    this.noUser.nativeElement.style.display = 'none';
  }
}
