import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

import { MessageModel } from './message.model';
import { UserProfile } from 'src/app/user/user-profile.service';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class MessageService {
  onMessages = new Subject<[]>();
  constructor(private userProfileService: UserProfile, private httpClient: HttpClient, private authService: AuthService) { }

  getMessagesForChat(friendID: string) {

    // firebase.database().ref(`messages/${this.userProfileService.getUserIDFromLoggedUser()}/${friendID}`)
    //   .on('value', (messages) => {
    //     if (messages.val() === null) {
    //       this.onMessages.next([]);
    //       return;
    //     }
    //     let msgForSort = messages.val();
    //     msgForSort = Object.values(messages.val());
    //     // Pretvaram objekat koji imam u firebasu u niz da bih mogao da sortiram
    //     console.log(msgForSort);
    //     msgForSort.sort((a, b) => {
    //       return a.time - b.time;
    //     });
    //     this.onMessages.next(msgForSort);
    //   });
  }

  sendMessage(senderId: string, recieverId: string, message: MessageModel) {
    const token = this.authService.getToken();
  //   this.httpClient.post(`https://chatapp-with-angular.firebaseio.com/messages/${senderId}/${recieverId}.json`,
  //     message
  //     , {
  //       params: new HttpParams().set('auth', token)
  //     })
  //     .subscribe(async (data) => {
  //       // console.log(data);
  //       // Ovde treba resetovati formu!
  //     }, (err) => {
  //       console.log(err);
  //     });

  //   // SENDING MESSAGE AS RECEIVER
  //   message.sent = false;
  //   // RECEIVERID I SENDERID TREBA DA BUDU OVIM REDOSLEDOM
  //   this.httpClient.post(`https://chatapp-with-angular.firebaseio.com/messages/${recieverId}/${senderId}.json`,
  //     message, {
  //       params: new HttpParams().set('auth', token)
  //     })
  //     .subscribe(async (data) => {
  //       // console.log(data);
  //     }, (err) => {
  //       console.log(err);
  //     });
 }
}
// ! URADITI DA SE PRE SVEGA PORUKE LEPO ISPISUJU, ZATIM DA SE NA KLIK DUGMETA POSALJE NOVA PORUKA!
