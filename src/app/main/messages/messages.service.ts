import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { UserProfile } from 'src/app/user/user-profile.service';
import { Subject } from 'rxjs';

@Injectable()
export class MessageService {
  onMessages: Subject<[]> = new Subject<[]>();
  constructor(private userProfile: UserProfile) {  }

  getMessagesForChat(friendID: string) {
    firebase.database().ref(`messages/${this.userProfile.getUserIDFromLoggedUser()}/${friendID}`).on('value', (messages) => {
      if (messages.val() === null) {
        this.onMessages.next([] );
        return;
      }
      const msgForSort = messages.val();
      msgForSort.sort( (a, b) => {
        return a.time - b.time;
      });
      this.onMessages.next(msgForSort);
    });
  }
}
// ! URADITI DA SE PRE SVEGA PORUKE LEPO ISPISUJU, ZATIM DA SE NA KLIK DUGMETA POSALJE NOVA PORUKA! 