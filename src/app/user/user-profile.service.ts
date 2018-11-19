import { Injectable, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';

import { AuthService } from '../auth/auth.service';
import { Subject, Subscription } from 'rxjs';

@Injectable()
export class UserProfile implements OnDestroy {
  private arrayOfFriends: { uid: string, email: string, image: { url: string }, username: string }[];
  // tslint:disable-next-line:max-line-length
  private userID: string;
  private chattingWithId: string;
  private subscription: Subscription;

  onFriendsChanged = new Subject<{ uid: string, email: string, image: { url: string }, username: string }[]>();

  onChangeFriendForChat = new Subject<string>();

  constructor(private authService: AuthService) {
    // ! Postavio sam da je ovo sa null moguce jer ako se neko izloguje,
    // ! potrebno je skloniti onu listu user-a sa stranice. Mogao je i novi Subject ali dobro.

    this.subscription = this.authService.onAuth.subscribe((userID) => {
      console.log('User id from user profile');
      console.log(userID);

      this.setUserIDForLoggenUser(userID);
      if (userID === null) {
        this.arrayOfFriends = [{ uid: '', email: '', image: { url: '' }, username: '' }];
        this.onFriendsChanged.next(this.arrayOfFriends);
        return;
      }
      this.getFriends();
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  getFriends() {
    firebase.database().ref('/friends/' + this.getUserIDFromLoggedUser())
      .on('value', (snapshot) => {
        // ! MENJA SE KAD GOD SE DODA NEKI FRIEND
        this.arrayOfFriends = snapshot.val();
        const replika = this.arrayOfFriends.slice();
        this.onFriendsChanged.next(replika);
      }, (_error) => {
        console.error(_error);
      });
    // console.log(this.arrayOfFriends.slice());
  }
  getUserIDFromLoggedUser(): string {
    return this.userID;
  }
  setUserIDForLoggenUser(userID: string) {
    this.userID = userID;
  }
  getChattingWithID(): string {
    return this.chattingWithId;
  }
  setChattingWithID(userID: string) {
    this.chattingWithId = userID;
    this.onChangeFriendForChat.next(this.chattingWithId);
  }
}
