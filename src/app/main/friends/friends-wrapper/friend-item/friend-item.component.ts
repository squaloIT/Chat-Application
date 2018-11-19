import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'src/app/main/messages/messages.service';

@Component({
  selector: 'app-friend-item',
  templateUrl: './friend-item.component.html',
  styleUrls: ['./friend-item.component.css']
})
export class FriendItemComponent implements OnInit {
  @Input() friend: { email: string, image: { url: string }, username: string };
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    console.log(this.friend);
  }
  onFriendClickOpenChat(friendID: string) {
    this.messageService.getMessagesForChat(friendID);
    // firebase.database().ref(`messages/${this.userProfile.getUserIDFromLoggedUser()}/${uid}`).set([
    //   {
    //     'time': 1508001399,
    //     'content': 'My name is Jack',
    //     'sent': true
    //   },
    //   {
    //     'time': 1508113399,
    //     'content': 'I live near the city center',
    //     'sent': true
    //   },
    //   {
    //     'time': 1508155399,
    //     'content': 'Nice to meet you',
    //     'sent': true
    //   },
    //   {
    //     'time': 1508000399,
    //     'content': 'Hi whats your name?',
    //     'sent': false
    //   },
    //   {
    //     'time': 1508010399,
    //     'content': 'And where do you live?',
    //     'sent': false
    //   },
    //   {
    //     'time': 1508220399,
    //     'content': 'I am really glad to have met you :)',
    //     'sent': false
    //   }
    // ]);
  }
}
