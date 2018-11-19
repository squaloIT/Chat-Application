import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'src/app/main/messages/messages.service';
import { UserProfile } from 'src/app/user/user-profile.service';

@Component({
  selector: 'app-friend-item',
  templateUrl: './friend-item.component.html',
  styleUrls: ['./friend-item.component.css']
})
export class FriendItemComponent implements OnInit {
  @Input() friend: { email: string, image: { url: string }, username: string };
  constructor(private messageService: MessageService, private userProfile: UserProfile) { }

  ngOnInit() {
    console.log('JEDAN PRIJATELJ IZ FRIEND ITEM-A');
    console.log(this.friend);
  }
  onFriendClickOpenChat(friendID: string) {
    this.messageService.getMessagesForChat(friendID);
    this.userProfile.setChattingWithID(friendID);
  }
}
