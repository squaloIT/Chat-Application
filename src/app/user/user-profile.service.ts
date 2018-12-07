import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
// import * as jwt from 'jsonwebtoken';


@Injectable()
export class UserProfile implements OnDestroy {
  private arrayOfFriends: { uid: string, email: string, image: { url: string }, username: string }[];
  // tslint:disable-next-line:max-line-length
  private userID: string;
  private chattingWithId: string;
  private subscription: Subscription;

  onFriendsChanged = new Subject<{ uid: string, email: string, image: { url: string }, username: string }[]>();

  onChangeFriendForChat = new Subject<string>();

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    // ! Postavio sam da je ovo sa null moguce jer ako se neko izloguje,
    // ! potrebno je skloniti onu listu user-a sa stranice. Mogao je i novi Subject ali dobro.

    this.subscription = this.authService.onAuth.subscribe((token: string) => {
      console.log('TOken koji je stigao nakon obavestenja');
      const userIDAndTimeWhenTokenIsMade = token;
      console.log(userIDAndTimeWhenTokenIsMade);
      // this.setUserIDForLoggenUser(userIDAndTimeWhenTokenIsMade);

      // if (this.getUserIDFromLoggedUser() === null) {
      //   this.arrayOfFriends = [{ uid: '', email: '', image: { url: '' }, username: '' }];
      //   this.onFriendsChanged.next(this.arrayOfFriends);
      //   return;
      // }
      // this.getFriends();
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  getFriends() {
    // this.httpClient.get(`http://localhost:3000/user/friends`).subscribe( (response: {message: string, friends: [{ _id: string}]}) => {
    //   if (response.friends) {
    //     // this.arrayOfFriends = response.friends;
    //     console.log(response.friends);
    //   }
    //   // const replika = this.arrayOfFriends.slice();
    //   // this.onFriendsChanged.next(replika);
    //   // console.log(response);
    //   // ! OVDE SVE FUNKCIONISE, DOHVATA SE USER KOJI BI TREBALO
    //   // ! TREBA SREDITI NEKOLIKO STVARI A TO JE DA SE PRILIKOM LOGOUT BRISE TOKEN IZ BAZE
    //   // ! ALI SAMO ONAJ TOKEN KOJI JE BIO TU U LOCALSTORAGE.
    //   // ! TAKODJE SREDITI PRIKAZ PRIJATELJA
    // }, (_error) => {
    //   console.error(_error);
    // });
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
