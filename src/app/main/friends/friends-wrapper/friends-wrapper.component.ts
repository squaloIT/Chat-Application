import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserProfile } from 'src/app/user/user-profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-friends-wrapper',
  templateUrl: './friends-wrapper.component.html',
  styleUrls: ['./friends-wrapper.component.css']
})
export class FriendsWrapperComponent implements OnInit, OnDestroy {
  friends: { uid: string, email: string, image: { url: string }, username: string }[];
  private subscription: Subscription;
  constructor(private userProf: UserProfile) { }

  ngOnInit() {
    this.subscription = this.userProf.onFriendsChanged.subscribe((friends) => {
      console.log('POZVAN SAM DA PROMENIM NIZ PRIJATELJA');
      this.friends = friends;
      console.log(this.friends);
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
