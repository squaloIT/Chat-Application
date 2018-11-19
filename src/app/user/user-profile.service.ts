import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';

@Injectable()
export class UserProfile {
  private arrayOfFriends: [{ uid: string, email: string, image: { url: string }, username: string }];
  // tslint:disable-next-line:max-line-length
  private userID: string;

  onFriendsChanged: Subject<[{ uid: string, email: string, image: { url: string }, username: string }]> =
   new Subject<[{ uid: string, email: string, image: { url: string }, username: string }]>();

  constructor(private authService: AuthService) {
    // tslint:disable-next-line:max-line-length
    this.authService.onAuth.subscribe((userID) => { // Postavio sam da je ovo sa null moguce jer ako se neko izloguje, potrebno je skloniti onu listu user-a sa stranice. Mogao je i novi Subject ali dobro.
      this.setUserIDForLoggenUser( userID );
      if (userID === null) {
        this.arrayOfFriends = [{ uid: '', email: '', image: { url: '' }, username: '' }];
        this.onFriendsChanged.next(this.arrayOfFriends);
        return;
      }
      this.initFriends();
    });
  }

  initFriends() {
    // tslint:disable-next-line:max-line-length
    console.log('testiramo userid');
    console.log(this.getUserIDFromLoggedUser());
    // tslint:disable-next-line:max-line-length
    firebase.database().ref('/friends/' + this.getUserIDFromLoggedUser()).on('value', (snapshot) => { // ! MENJA SE KAD GOD SE DODA NEKI FRIEND
      this.arrayOfFriends = snapshot.val();
      this.onFriendsChanged.next(this.arrayOfFriends);
    }, (_error) => {
      console.error(_error);
    });
  }
  getUserIDFromLoggedUser(): string {
    return this.userID;
  }
  setUserIDForLoggenUser(userID: string) {
    this.userID = userID;
  }
}
