import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from 'src/app/providers/messages.service';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

@Component({
  selector: 'app-chat-board',
  templateUrl: './chat-board.component.html',
  styleUrls: ['./chat-board.component.scss']
})
export class ChatBoardComponent implements OnInit {

  userName: string = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals]
  });

  messages: any = [];

  constructor(private msgService: MessageService) { }

  ngOnInit(): void {
    this.msgService.socket$.subscribe(
      (message: any) => {
        if (message && message.length) {
          const msgs = message.map((msg: any) => {
            return this.msgService.constructMessageFromServer(msg, this.userName);
          });
          this.messages = [...msgs];
        } else {
          const msg = this.msgService.constructMessageFromServer(message, this.userName);
          this.messages.push(msg);
        }
      }
    )
  }

  sendMessage(event: any) {
    this.msgService.socket$.next({
      type: 'chat-message',
      data: {
        userName: this.userName,
        text: event.message
      }
    });
  }

}
