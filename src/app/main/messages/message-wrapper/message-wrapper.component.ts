import { Component, OnInit } from '@angular/core';
import { MessageService } from '../messages.service';
import { MessageModel } from '../message.model';

@Component({
  selector: 'app-message-wrapper',
  templateUrl: './message-wrapper.component.html',
  styleUrls: ['./message-wrapper.component.css']
})
export class MessageWrapperComponent implements OnInit {
  sent_messages: MessageModel[];
  received_messages: MessageModel[];
  messages: MessageModel[];

  constructor(private messageService: MessageService) {   }

  ngOnInit() {
    this.messageService.onMessages.subscribe( ( messages: MessageModel[]) => {
      this.sent_messages = messages.filter( (message) => message.sent );
      this.received_messages = messages.filter( (message) => !message.sent );
      this.messages = messages;
    });
  }

}
