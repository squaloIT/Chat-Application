import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/user/user-profile.service';

@Component({
  selector: 'app-friends-wrapper',
  templateUrl: './friends-wrapper.component.html',
  styleUrls: ['./friends-wrapper.component.css']
})
export class FriendsWrapperComponent implements OnInit {
  friends: [{ uid: string, email: string, image: { url: string }, username: string }];

  constructor(private userProf: UserProfile) {
    this.userProf.onFriendsChanged.subscribe( (friends) => {
      this.friends = friends;
    });
   }

  ngOnInit() {  }

}
