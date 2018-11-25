import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {

  onAuth = new Subject<string | null>();
  private token = null;

  constructor(private httpClient: HttpClient) { }
  getDatabase() {
    return firebase.database();
  }
  getUserID(): string {
    return firebase.auth().currentUser.uid;
  }
  signInUser(email: string, password: string): boolean | string {
    let returnValue;
    this.httpClient.post('http://localhost:3000/auth/login', {
      email, password
    })
      .subscribe((user: { _id: string, email: string }) => {
        console.log(user);
        this.onAuth.next(user._id);
        returnValue = true;
      }, (error) => {
        returnValue = error;
      });
      return returnValue;
  }
  registerUser(email: string, password: string, username: string) {

    this.httpClient.post(`http://localhost:3000/users`, {
      'email': email,
      'username': username,
      'password': password
    }, {
        // params: new HttpParams().set('auth', this.token)
      })
      .subscribe(async (data) => {
        console.log(data);
      }, (err) => {
        console.log(err);
      });

    return this.token;
  }
  isAuthenticated() {
    return this.token != null;
  }
  getToken(): string | null {
    return this.token;
  }
  setToken(token: string) {
    this.token = token;
    const userID = this.getUserID();
    this.onAuth.next(userID); // saljem event i kazem da se userID promenio svima koje to zanima
  }
  logOut(): any {
    firebase.auth().signOut().then(() => {
      this.token = null;
      this.onAuth.next(null);
    });
  }
}
