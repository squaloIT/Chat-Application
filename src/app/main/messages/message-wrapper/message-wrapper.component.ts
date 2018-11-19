import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as moment from 'moment';
import { Subscription } from 'rxjs';

import { MessageModel } from '../message.model';
import { MessageService } from '../messages.service';
import { UserProfile } from 'src/app/user/user-profile.service';

@Component({
  selector: 'app-message-wrapper',
  templateUrl: './message-wrapper.component.html',
  styleUrls: ['./message-wrapper.component.css']
})
export class MessageWrapperComponent implements OnInit, OnDestroy {
  private receiverId: string;

  messagesToDisplay: MessageModel[];
  message: MessageModel;
  private subscriptionMessageService: Subscription;
  private subscriptionUserProfileService: Subscription;

  constructor(private messageService: MessageService, private userProfileService: UserProfile) { }

  ngOnInit() {
    this.subscriptionMessageService = this.messageService.onMessages.subscribe((messages: MessageModel[]) => {
      this.messagesToDisplay = messages;
    });

    this.subscriptionUserProfileService = this.userProfileService.onChangeFriendForChat.subscribe( (receiverId) => {
      this.receiverId = receiverId;
    });
  }
  ngOnDestroy() {
    this.subscriptionMessageService.unsubscribe();
    this.subscriptionUserProfileService.unsubscribe();
  }
  onSubmit(form: NgForm) {
    const sentMessage = form.value.taMessage;
    const senderId = this.userProfileService.getUserIDFromLoggedUser();

    console.log(this.receiverId);
    this.messageService.sendMessage( senderId, this.receiverId , new MessageModel( moment().valueOf(), sentMessage, true ) );
    form.reset();
  }
}
