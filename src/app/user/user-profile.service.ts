import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

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
    this.httpClient.get(`http://localhost:3000/user/friends/${this.getUserIDFromLoggedUser()}`).subscribe( (response) => {
      // this.arrayOfFriends = response.friends;
      // const replika = this.arrayOfFriends.slice();
      // this.onFriendsChanged.next(replika);
      console.log(response);
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
