import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';
// import { environment } from 'src/environments/environment';
// import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    firebase.initializeApp(environment.firebase);
  }
  // constructor() {
  //   this.initializeApp();
  // }
  // initializeApp(): void {
  //   firebase.initializeApp(environment.firebase);
  // }

}
