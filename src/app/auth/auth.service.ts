import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

  onAuth: Subject<string | null> = new Subject<string | null>();
  private token = null;

  constructor(private httpClient: HttpClient) {
    this.initializeApp();
  }
  initializeApp(): void {
    firebase.initializeApp(environment.firebase);
  }
  getDatabase() {
    return firebase.database();
  }
  getUserID(): string {
    return firebase.auth().currentUser.uid;
  }
  async signInUser(email: string, password: string): Promise<string> {
    await firebase.auth().signInWithEmailAndPassword(email, password).catch((_error) => {
      return Promise.reject('The user with specified email and password does not exist!');
    });
    return firebase.auth().currentUser.getIdToken();
  }
  async registerUser(email: string, password: string, username: string) {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const token = await firebase.auth().currentUser.getIdToken();
    // DODAVANJE USERA U AUTH DEO

    this.setToken(token);
    // DODAVANJE TOG USERA U REALTIME DATABASE
    this.httpClient.put(`https://chatapp-with-angular.firebaseio.com/users/${firebase.auth().currentUser.uid}.json`, {
      'email': email,
      'username': username,
      'registeredAt': moment().valueOf()
    }, {
        params: new HttpParams().set('auth', this.token)
      })
      .subscribe(async (data) => {
        console.log(data);
      }, (err) => {
        console.log(err);
      });
    // DODAVANJE PRIJATELJA ZA TOG USERA

    this.httpClient.put(`https://chatapp-with-angular.firebaseio.com/friends/${firebase.auth().currentUser.uid}.json`,
      [{
        'email': 'amy@gmail.com',
        'username': 'Amy123',
        'image': {
          // tslint:disable-next-line:max-line-length
          'url': 'https://firebasestorage.googleapis.com/v0/b/chatapp-with-angular.appspot.com/o/uploads%2Famy.jpg?alt=media&token=38c308dc-53b1-4372-a743-0066e1f2124e'
        }
      },
      {
        'email': 'jack@gmail.com',
        'username': 'Jack987',
        'image': {
          // tslint:disable-next-line:max-line-length
          'url': 'https://firebasestorage.googleapis.com/v0/b/chatapp-with-angular.appspot.com/o/uploads%2Famy.jpg?alt=media&token=38c308dc-53b1-4372-a743-0066e1f2124e'
        }
      }],
      {
        params: new HttpParams().set('auth', this.token)
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
  async setToken(token: string) {
    this.token = token;
    const userID = await firebase.auth().currentUser.uid;
    this.onAuth.next(userID); // saljem event i kazem da se userID promenio svima koje to zanima
  }
  logOut(): any {
    firebase.auth().signOut().then(() => {
      this.token = null;
      this.onAuth.next(null);
    });
  }
}
